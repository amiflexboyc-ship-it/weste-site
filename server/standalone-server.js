import http from 'http';
import { processAiMessage } from './aiEngine.js';

const PORT = process.env.PORT || 5001;

const server = http.createServer(async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.url === '/api/ai/status' && req.method === 'GET') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(
      JSON.stringify({
        status: 'online',
        engine: 'WESTE Standalone AI Server',
        port: PORT,
        timestamp: new Date().toISOString()
      })
    );
    return;
  }

  if (req.url === '/api/ai/chat' && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', async () => {
      try {
        const parsed = JSON.parse(body || '{}');
        const aiResponse = await processAiMessage({
          message: parsed.message || '',
          userContext: parsed.user || {},
          history: parsed.history || []
        });

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(aiResponse));
      } catch (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  res.statusCode = 404;
  res.end('Not found');
});

server.listen(PORT, () => {
  console.log(`🐾 WESTE Animal AI Backend running on http://localhost:${PORT}`);
});
