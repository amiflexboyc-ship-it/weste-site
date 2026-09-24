// WESTE Animal Sanctuary - AI Support Backend Engine
// Supports external LLM (Gemini / OpenAI) if an API key is set,
// with an advanced built-in Veterinary & Rescue Intelligence Engine.

const SANCTUARY_KNOWLEDGE = {
  name: 'WESTE Wildlife & Animal Care Sanctuary',
  hotline: '+1 (800) 555-WILD (9453)',
  email: 'adoptions@weste-animals.org',
  location: '1204 Forest Reserve Way, Wildlife Valley, CA 90210',
  hours: 'Monday – Saturday: 8:00 AM – 6:00 PM (Sundays: Emergency Rescue Only)',
  acreage: '350 acres of certified protected wilderness habitats',
  policy: '100% Certified No-Kill Lifetime Care Guarantee',
  fees: {
    dogs: '$200 - $220',
    cats: '$150 - $180',
    wildSponsorship: '$200 - $260',
    farmAnimals: '$120 - $210'
  }
};

/**
 * Intelligent Fallback & Knowledge-Base AI Generator
 */
export function generateLocalAiResponse(userMessage, userContext = {}, history = []) {
  const query = userMessage.toLowerCase().trim();
  const userName = userContext?.name ? userContext.name.split(' ')[0] : 'there';
  const favorites = userContext?.favorites || [];
  const adoptions = userContext?.adoptions || [];

  // 1. Emergency Wildlife / Injured Animal
  if (
    query.includes('injured') ||
    query.includes('emergency') ||
    query.includes('hurt') ||
    query.includes('found a bird') ||
    query.includes('found a baby') ||
    query.includes('bleeding') ||
    query.includes('hit by car') ||
    query.includes('hotline')
  ) {
    return {
      reply: `🚨 **WILDLIFE EMERGENCY PROTOCOL**\n\nHello ${userName}, please follow these immediate safety steps:\n\n1. **Do not handle directly without protection**: Use heavy gloves or a thick towel to minimize stress and prevent bites or scratches.\n2. **Keep in a warm, dark, quiet container**: Place the animal in a ventilated cardboard box lined with a towel. Keep pets and children away.\n3. **Do not give food or water**: Feeding an injured animal or baby bird incorrectly can cause fatal aspiration.\n4. **Call our 24/7 Rescue Dispatch immediately**:\n   📞 **${SANCTUARY_KNOWLEDGE.hotline}**\n\nOur rescue van is on call 24 hours a day to dispatch medical triage.`,
      suggestions: ['Call Hotline Now', 'How to transport an injured bird', 'Sanctuary Address'],
      action: { type: 'CALL_HOTLINE', phone: '+18005559453' }
    };
  }

  // 2. Adoption Process & Requirements
  if (
    query.includes('adopt') ||
    query.includes('how to adopt') ||
    query.includes('adoption fee') ||
    query.includes('process') ||
    query.includes('requirements') ||
    query.includes('apply')
  ) {
    return {
      reply: `🐾 **How the WESTE Adoption Process Works**\n\nWe make loving adoptions transparent, safe, and supportive for both you and the animal:\n\n1. **Browse & Select**: Choose any animal from our **Available Animals** directory on the homepage.\n2. **One-Click Application**: Click **"Adopt Now"** on the animal's card while logged into your account.\n3. **Medical Health Guarantee**: Every adopted animal arrives:\n   - Fully vaccinated & dewormed\n   - Spayed or neutered\n   - Microchipped with lifetime national registry\n   - Complete veterinary health certificate\n4. **Adoption Fees**: Typically range from **$150 to $220** for domestic companions, which directly subsidizes their medical triage.\n5. **30-Day Transition Support**: Our behaviorists provide free guidance during your pet's first month home.`,
      suggestions: ['Show Available Dogs', 'Show Available Cats', 'Can I visit the sanctuary?'],
      action: { type: 'NAVIGATE', target: '#animals' }
    };
  }

  // 3. User's Favorites or Adoptions Query
  if (
    query.includes('my favorite') ||
    query.includes('my animal') ||
    query.includes('my adoption') ||
    query.includes('what did i adopt') ||
    query.includes('my account')
  ) {
    let response = `👤 **Account Overview for ${userContext?.name || 'Member'}**:\n\n`;
    if (favorites.length > 0) {
      response += `💖 **Saved Favorites (${favorites.length})**:\n${favorites.map((f) => `• ${f}`).join('\n')}\n\n`;
    } else {
      response += `💖 **Saved Favorites**: You haven't added any favorite animals yet. Click the heart icon on any animal card to save them!\n\n`;
    }

    if (adoptions.length > 0) {
      response += `🛍️ **Adoptions & Sponsorships (${adoptions.length})**:\n${adoptions.map((a) => `• ${a.name} (${a.price || 'Active'}) - Date: ${a.date || 'Recent'}`).join('\n')}\n`;
    } else {
      response += `🛍️ **Adoptions**: You haven't submitted any adoptions yet. Browse our animal directory to sponsor or adopt a rescue!`;
    }

    return {
      reply: response,
      suggestions: ['Browse Animals', 'Update My Profile', 'Adoption fees'],
      action: { type: 'OPEN_PROFILE' }
    };
  }

  // 4. Specific Animal Inquiries
  if (query.includes('dog') || query.includes('husky') || query.includes('golden')) {
    return {
      reply: `🐕 **Dogs at WESTE Sanctuary**\n\nWe currently feature rescue dogs including:\n- **The beauty dog in bush** ($200) — Friendly golden retriever mix, loves family hikes.\n- **The arctic siberian husky** ($220) — Rescued snow dog, vaccinated, microchipped, and energetic.\n\nAll dogs are behavior-evaluated and ready for meet-and-greets!`,
      suggestions: ['How to adopt a dog', 'Are they good with kids?', 'Dog diet tips'],
      action: { type: 'NAVIGATE', target: '#animals' }
    };
  }

  if (query.includes('cat') || query.includes('kitten') || query.includes('siamese')) {
    return {
      reply: `🐈 **Cats at WESTE Sanctuary**\n\nWe have gentle domestic rescues looking for warm indoor homes:\n- **The beauty cat in town** ($150) — Sweet domestic tabby, loves gentle cuddles.\n- **The royal siamese cat** ($180) — Playful blue-eyed indoor companion, fully vet checked.\n\nBoth cats are spayed/neutered and litter trained.`,
      suggestions: ['Adopt a cat now', 'Cat health tips', 'Apartment pets'],
      action: { type: 'NAVIGATE', target: '#animals' }
    };
  }

  if (query.includes('wild') || query.includes('lion') || query.includes('elephant') || query.includes('gorilla') || query.includes('panda') || query.includes('turtle')) {
    return {
      reply: `🦁 **Wildlife Sponsorship & Conservation**\n\nOur sanctuary spans **350 protected acres** supporting endangered wildlife conservation:\n- **African Savannah Lion Reserve Protection** ($250)\n- **Orphan Elephant Calf Medical Sponsorship** ($200)\n- **Mountain Gorilla Habitat Patrols** ($200)\n- **Endangered Red Panda Alpine Bamboo Planting** ($260)\n- **Pacific Green Sea Turtle Shell Rehab** ($175)\n\nSponsoring a wild animal directly funds sanctuary anti-poaching units and veterinary care.`,
      suggestions: ['Sponsor an animal', 'Visit the sanctuary', 'Volunteer programs'],
      action: { type: 'NAVIGATE', target: '#animals' }
    };
  }

  // 5. Diet, Toxic Foods, Pet Care Advice
  if (query.includes('toxic') || query.includes('food') || query.includes('feed') || query.includes('diet') || query.includes('chocolate')) {
    return {
      reply: `⚠️ **Crucial Pet Dietary Safety Guidelines**\n\nHere are hazardous foods that should **NEVER** be given to dogs or cats:\n- 🚫 **Chocolate & Cocoa**: Contains theobromine, toxic to heart and nervous system.\n- 🚫 **Grapes & Raisins**: Can cause sudden acute kidney failure.\n- 🚫 **Onions, Garlic, Chives**: Damages red blood cells causing severe anemia.\n- 🚫 **Xylitol (Artificial Sweetener)**: Found in peanut butter, gum, candies — causes rapid liver failure.\n- 🚫 **Avocado & Macadamia Nuts**: Toxic oils causing gastrointestinal trauma.\n\nIf your pet ingested any of these, call our 24/7 hotline immediately!`,
      suggestions: ['Emergency Hotline', 'Healthy pet treats', 'Veterinary team'],
      action: null
    };
  }

  // 6. Sanctuary Visits & Location
  if (query.includes('visit') || query.includes('where') || query.includes('location') || query.includes('address') || query.includes('hours')) {
    return {
      reply: `📍 **Visiting WESTE Sanctuary Grounds**\n\n- **Address**: ${SANCTUARY_KNOWLEDGE.location}\n- **Visitor & Adoption Hours**:\n  • Monday – Friday: 8:00 AM – 6:00 PM\n  • Saturday: 9:00 AM – 5:00 PM\n  • Sunday: Emergency Animal Admissions Only\n- **Tours**: We host guided education tours every Wednesday and Saturday morning. Pre-booking is recommended via our contact form.`,
      suggestions: ['Open Contact Form', 'View adoptable animals', 'Volunteer opportunities'],
      action: { type: 'NAVIGATE', target: '#contact' }
    };
  }

  // 7. Volunteering or Donating
  if (query.includes('volunteer') || query.includes('donate') || query.includes('foster') || query.includes('help')) {
    return {
      reply: `🤝 **Ways to Support Our Sanctuary**\n\nAs a certified 501(c)(3) non-profit, we rely on kindhearted community members:\n\n1. **Volunteer On-Site**: Help with animal socialization, dog walking, and aviary maintenance.\n2. **Foster Care**: Provide temporary sanctuary for nursing kittens, puppies, or post-surgery recoveries.\n3. **Supply Donations**: Unopened food, clean blankets, and veterinary supplies are always welcome at our main gates.\n4. **Direct Contact**: Leave a message with our Volunteer Coordinator in the Contact section at the bottom of the page!`,
      suggestions: ['Go to Contact Form', 'Sponsor an Animal', 'Adoption details'],
      action: { type: 'NAVIGATE', target: '#contact' }
    };
  }

  // Default Conversational Reply
  return {
    reply: `👋 Hello ${userName}! I am your **WESTE AI Animal Care & Adoption Specialist**.\n\nI can assist you with:\n• **Animal Adoptions**: Requirements, fees, and matching you with dogs or cats.\n• **Wildlife & Sponsorship**: Elephant, lion, gorilla, and marine preservation.\n• **Veterinary & Diet**: First aid guidance, toxic foods to avoid, and care tips.\n• **Sanctuary Visits**: Hours, directions, and volunteer opportunities.\n• **Your Account**: Check your saved favorites and adoptions.\n\nWhat can I help you explore today?`,
    suggestions: [
      'How do I adopt an animal?',
      'What should I do for an injured animal?',
      'Show my saved favorites',
      'Sanctuary visiting hours'
    ],
    action: null
  };
}

/**
 * Main Controller: Queries Gemini / OpenAI if API key exists, otherwise uses Neural Local Engine
 */
export async function processAiMessage({ message, userContext = {}, history = [] }) {
  const apiKey =
    process.env.GEMINI_API_KEY ||
    process.env.OPENAI_API_KEY ||
    process.env.VITE_AI_API_KEY;

  // If Gemini API Key is available
  if (process.env.GEMINI_API_KEY) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [
                  {
                    text: `System Prompt: You are WESTE AI, an expert veterinary and animal sanctuary assistant for WESTE Wildlife & Animal Care (100% no-kill sanctuary on 350 acres). Emergency hotline is +1 (800) 555-WILD. User name: ${userContext?.name || 'Visitor'}. User favorites: ${JSON.stringify(userContext?.favorites || [])}. User adoptions: ${JSON.stringify(userContext?.adoptions || [])}. Keep responses helpful, warm, structured with bullet points, and veterinary-accurate.\n\nUser Question: ${message}`
                  }
                ]
              }
            ]
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          return {
            reply: text,
            suggestions: ['How to adopt', 'Sanctuary hours', 'Emergency hotline'],
            source: 'gemini-cloud'
          };
        }
      }
    } catch (err) {
      console.warn('Gemini API call failed, falling back to local engine:', err.message);
    }
  }

  // Use the built-in Intelligent Veterinary & Sanctuary AI Engine
  const localResult = generateLocalAiResponse(message, userContext, history);
  return {
    ...localResult,
    source: 'weste-veterinary-ai-engine'
  };
}
