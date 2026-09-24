import { processAiMessage } from './aiEngine.js';

export function viteAiBackendPlugin() {
  const handler = async (req, res, next) => {
    // Enable CORS for all incoming AI requests
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
      res.statusCode = 204;
      res.end();
      return;
    }

    // Health check endpoint
    if (req.url === '/api/ai/status' && req.method === 'GET') {
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.end(
        JSON.stringify({
          status: 'online',
          engine: 'WESTE Veterinary & Animal Care AI Backend',
          version: '2.4.0',
          mode: process.env.GEMINI_API_KEY ? 'gemini-cloud' : 'local-expert-engine',
          hotline: '+1 (800) 555-WILD'
        })
      );
      return;
    }

    // AI Chat endpoint
    if (req.url === '/api/ai/chat' && req.method === 'POST') {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
      });

      req.on('end', async () => {
        try {
          const parsed = JSON.parse(body || '{}');
          const message = parsed.message || '';
          const userContext = parsed.user || {};
          const history = parsed.history || [];

          if (!message.trim()) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Message cannot be empty' }));
            return;
          }

          const aiResponse = await processAiMessage({
            message,
            userContext,
            history
          });

          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(aiResponse));
        } catch (err) {
          console.error('[AI Backend Error]:', err);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(
            JSON.stringify({
              error: 'Failed to process AI message',
              details: err.message
            })
          );
        }
      });
      return;
    }

    next();
  };

  return {
    name: 'weste-ai-backend-plugin',
    configureServer(server) {
      server.middlewares.use(handler);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler);
    }
  };
}
