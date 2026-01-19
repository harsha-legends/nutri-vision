const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// @desc    Chat with AI
// @route   POST /api/ai/chat
// @access  Public
exports.chat = async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        error: 'Message is required'
      });
    }

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

    if (!OPENAI_API_KEY) {
      // Fallback to smart rule-based responses if no API key
      const response = generateSmartResponse(message);
      return res.json({
        success: true,
        data: {
          message: response,
          timestamp: new Date().toISOString()
        }
      });
    }

    // Build messages array for OpenAI
    const messages = [
      {
        role: 'system',
        content: `You are NutriBot, a friendly and knowledgeable AI nutrition assistant for the NutriVision app. 

Your expertise includes:
- Nutritional information about foods (calories, protein, carbs, fats, vitamins, minerals)
- Healthy eating advice and diet planning
- Weight management guidance
- Fitness nutrition tips
- Answering questions about vegetarian and non-vegetarian foods
- Indian cuisine and international foods

Guidelines:
- Be friendly, warm, and conversational
- If someone says "hi" or greets you, respond with a friendly greeting
- If someone says "bye" or farewell, say goodbye warmly
- Keep responses concise but informative
- Use emojis occasionally to be friendly 😊
- For nutrition questions, provide accurate, helpful information
- If asked about something outside nutrition/health, politely redirect to nutrition topics
- Always be encouraging about healthy lifestyle choices`
      },
      ...conversationHistory.map(msg => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.text
      })),
      {
        role: 'user',
        content: message
      }
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: messages,
        max_tokens: 500,
        temperature: 0.7
      })
    });

    const data = await response.json();

    if (data.error) {
      console.error('OpenAI Error:', data.error);
      // Fallback to smart response
      const fallbackResponse = generateSmartResponse(message);
      return res.json({
        success: true,
        data: {
          message: fallbackResponse,
          timestamp: new Date().toISOString()
        }
      });
    }

    const aiMessage = data.choices[0]?.message?.content || generateSmartResponse(message);

    res.json({
      success: true,
      data: {
        message: aiMessage,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('AI Chat Error:', error);
    // Fallback response
    const fallbackResponse = generateSmartResponse(req.body.message || '');
    res.json({
      success: true,
      data: {
        message: fallbackResponse,
        timestamp: new Date().toISOString()
      }
    });
  }
};

// Smart fallback response generator
function generateSmartResponse(message) {
  const lowerMessage = message.toLowerCase().trim();

  // Greetings
  if (/^(hi|hello|hey|good morning|good afternoon|good evening|howdy|hola)/.test(lowerMessage) || 
      lowerMessage === 'hi' || lowerMessage === 'hello' || lowerMessage === 'hey') {
    const greetings = [
      "Hello! 👋 How can I help you with your nutrition today?",
      "Hey there! 😊 What nutrition questions do you have for me?",
      "Hi! Great to see you! Ask me anything about food and nutrition!",
      "Hello! 🌟 I'm here to help with all your nutrition needs!"
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  // Farewells
  if (/^(bye|goodbye|see you|take care|later|good night|gotta go|gtg)/.test(lowerMessage) ||
      lowerMessage === 'bye' || lowerMessage === 'goodbye') {
    const farewells = [
      "Goodbye! 👋 Stay healthy and eat well!",
      "Bye! 🌟 Remember to drink plenty of water!",
      "Take care! 💪 Keep making healthy choices!",
      "See you later! 😊 Come back anytime for nutrition advice!"
    ];
    return farewells[Math.floor(Math.random() * farewells.length)];
  }

  // Thank you
  if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
    return "You're welcome! 😊 Feel free to ask if you have more questions about nutrition!";
  }

  // How are you
  if (lowerMessage.includes('how are you') || lowerMessage.includes("how's it going") || lowerMessage.includes('what\'s up')) {
    return "I'm doing great, thanks for asking! 😊 I'm always ready to help you with nutrition advice. What would you like to know?";
  }

  // Name/identity
  if (lowerMessage.includes('your name') || lowerMessage.includes('who are you')) {
    return "I'm NutriBot, your AI nutrition assistant! 🤖 I'm here to help you with healthy eating, nutrition facts, meal planning, and more. What can I help you with?";
  }

  // Protein
  if (lowerMessage.includes('protein')) {
    return `Great question about protein! 💪

**Daily Protein Needs:**
- Sedentary: 0.8g per kg body weight
- Active: 1.2-1.7g per kg
- Athletes: 1.6-2.2g per kg

**Best Sources:** Chicken, fish, eggs, lentils, paneer, Greek yogurt, tofu

Would you like specific meal suggestions?`;
  }

  // Calories/weight loss
  if (lowerMessage.includes('calorie') || lowerMessage.includes('weight loss') || lowerMessage.includes('lose weight')) {
    return `Here's help with calories! 🔥

**For Weight Loss:**
- Create a 500-750 calorie deficit daily
- Focus on protein and fiber to stay full
- Drink water before meals
- Choose whole foods over processed

**Estimated Daily Needs:**
- Women: 1,600-2,400 cal
- Men: 2,000-3,000 cal

Want me to help plan your meals?`;
  }

  // Carbs
  if (lowerMessage.includes('carb')) {
    return `Let's talk carbs! 🍚

**Healthy Carb Sources:**
- Whole grains (oats, brown rice, quinoa)
- Vegetables and fruits
- Legumes (dal, chickpeas)

**Tip:** Focus on complex carbs and fiber, limit refined sugars.

Carbs should be about 45-65% of your daily calories!`;
  }

  // Vitamins
  if (lowerMessage.includes('vitamin')) {
    return `Vitamins are essential! 💊

**Key Vitamins:**
- 🍊 Vitamin C: Citrus, peppers, guava
- ☀️ Vitamin D: Sunlight, fish, eggs
- 🥕 Vitamin A: Carrots, spinach
- 💪 B Vitamins: Whole grains, meat, eggs

Eating a variety of colorful foods ensures you get all vitamins!`;
  }

  // Water/hydration
  if (lowerMessage.includes('water') || lowerMessage.includes('hydrat')) {
    return `Stay hydrated! 💧

**Daily Goal:** 8-10 glasses (2-3 liters)

**Tips:**
- Carry a water bottle
- Set hourly reminders
- Eat water-rich foods (cucumber, watermelon)
- Drink before meals

Proper hydration improves energy, skin, and digestion!`;
  }

  // Meal planning
  if (lowerMessage.includes('meal plan') || lowerMessage.includes('meal prep') || lowerMessage.includes('what should i eat')) {
    return `Let me help with meal planning! 📋

**Balanced Meal Structure:**
- 🥦 Half plate: Vegetables
- 🍗 Quarter: Protein
- 🍚 Quarter: Whole grains

**Sample Day:**
- Breakfast: Eggs + oats + fruit
- Lunch: Chicken/paneer + rice + veggies
- Snack: Nuts + yogurt
- Dinner: Fish/dal + roti + salad

What are your specific goals?`;
  }

  // General food/nutrition question
  if (lowerMessage.includes('food') || lowerMessage.includes('eat') || lowerMessage.includes('nutrition') || lowerMessage.includes('healthy') || lowerMessage.includes('diet')) {
    return `I can help with nutrition! 🥗

**I can assist with:**
- Calorie and macro information
- Healthy eating tips
- Meal planning advice
- Vitamin and mineral guidance
- Diet recommendations

What specific aspect would you like to know about?`;
  }

  // Default helpful response
  return `Thanks for your message! 😊

As your nutrition assistant, I can help with:
- 🥗 Healthy eating advice
- 💪 Protein and fitness nutrition
- 🔥 Calorie management
- 💧 Hydration tips
- 📋 Meal planning

What would you like to know about nutrition today?`;
}
