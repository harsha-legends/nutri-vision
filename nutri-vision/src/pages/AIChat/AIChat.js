import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  TextField,
  IconButton,
  Paper,
  Avatar,
} from '@mui/material';
import { Send, SmartToy, Person } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const AIChat = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: `Hello ${user?.username || 'there'}! 👋 I'm your AI Nutrition Assistant. I'm here to help you with any nutrition questions, meal planning advice, or dietary guidance. How can I help you today?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase().trim();

    // Greetings
    if (['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening'].some(g => lowerMessage.includes(g))) {
      const greetings = [
        `Hello! 😊 Great to see you! How can I assist you with your nutrition today?`,
        `Hey there! 👋 I'm ready to help with any nutrition questions you have!`,
        `Hi! Welcome back! What would you like to know about nutrition today?`,
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }

    // Farewells
    if (['bye', 'goodbye', 'see you', 'take care', 'later'].some(f => lowerMessage.includes(f))) {
      const farewells = [
        `Goodbye! 👋 Remember to stay hydrated and eat well! Come back anytime you need nutrition advice!`,
        `Take care! 🌟 Keep making healthy choices. See you soon!`,
        `Bye for now! 💪 Keep up the great work on your nutrition journey!`,
      ];
      return farewells[Math.floor(Math.random() * farewells.length)];
    }

    // Protein related
    if (lowerMessage.includes('protein')) {
      return `Great question about protein! 💪

**Daily Protein Needs:**
- Sedentary adults: 0.8g per kg body weight
- Active individuals: 1.2-1.7g per kg body weight
- Athletes: 1.6-2.2g per kg body weight

**Best Protein Sources:**
🥩 Lean meats (chicken, turkey, lean beef)
🐟 Fish (salmon, tuna, cod)
🥚 Eggs
🫘 Legumes (lentils, chickpeas, beans)
🥛 Dairy (Greek yogurt, cottage cheese)
🥜 Nuts and seeds

Would you like specific meal ideas or more details about protein timing?`;
    }

    // Calories related
    if (lowerMessage.includes('calorie') || lowerMessage.includes('weight loss') || lowerMessage.includes('lose weight')) {
      return `Let me help you understand calories! 🔥

**Calorie Basics:**
- To lose weight: Consume 500-750 fewer calories than you burn
- To maintain: Calories in = Calories out
- To gain: Consume 300-500 more calories

**Estimated Daily Needs:**
- Women: 1,600-2,400 calories
- Men: 2,000-3,000 calories
(Varies based on age, activity level, and goals)

**Tips for Managing Calories:**
1. Track your food intake
2. Eat more protein and fiber (they keep you full)
3. Drink water before meals
4. Choose whole foods over processed
5. Get enough sleep

Would you like me to calculate a more personalized calorie target?`;
    }

    // Carbs related
    if (lowerMessage.includes('carb') || lowerMessage.includes('carbohydrate')) {
      return `Let's talk about carbohydrates! 🍞

**Types of Carbs:**
1. **Simple carbs** (sugars): Quick energy, limited nutrition
2. **Complex carbs** (starches): Sustained energy, more nutrients
3. **Fiber**: Aids digestion, keeps you full

**Healthy Carb Sources:**
🥗 Vegetables
🍎 Fruits
🌾 Whole grains (oats, quinoa, brown rice)
🫘 Legumes
🥔 Sweet potatoes

**Daily Recommendation:**
- 45-65% of total calories
- Focus on fiber-rich, whole food sources
- Limit added sugars to <10% of calories

Should I suggest some balanced meal ideas with healthy carbs?`;
    }

    // Vitamins
    if (lowerMessage.includes('vitamin')) {
      return `Vitamins are essential for your health! 💊

**Key Vitamins & Their Benefits:**

🍊 **Vitamin C**: Immune system, skin health
   Sources: Citrus, berries, peppers

☀️ **Vitamin D**: Bone health, mood
   Sources: Sunlight, fatty fish, fortified foods

🥕 **Vitamin A**: Vision, immune function
   Sources: Carrots, sweet potatoes, spinach

🥬 **Vitamin K**: Blood clotting, bone health
   Sources: Leafy greens, broccoli

🥜 **Vitamin E**: Antioxidant, skin health
   Sources: Nuts, seeds, vegetable oils

💪 **B Vitamins**: Energy, brain function
   Sources: Whole grains, meat, eggs

Is there a specific vitamin you'd like to know more about?`;
    }

    // Hydration
    if (lowerMessage.includes('water') || lowerMessage.includes('hydrat')) {
      return `Staying hydrated is crucial! 💧

**Daily Water Intake:**
- General guideline: 8 glasses (64 oz) minimum
- Active individuals: Add 16-32 oz per hour of exercise
- Hot weather: Increase intake

**Signs of Dehydration:**
- Dark urine
- Fatigue
- Headaches
- Dry mouth

**Tips to Stay Hydrated:**
1. Carry a water bottle everywhere
2. Set hourly reminders
3. Eat water-rich foods (cucumber, watermelon)
4. Start your day with water
5. Drink before, during, and after exercise

Would you like tips on flavoring water naturally?`;
    }

    // Meal planning
    if (lowerMessage.includes('meal plan') || lowerMessage.includes('meal prep')) {
      return `Let me help you with meal planning! 📋

**Weekly Meal Planning Steps:**

1. **Assess your goals**: Weight loss, muscle gain, or maintenance?

2. **Calculate your needs**: Calories and macros

3. **Plan balanced meals**:
   - Protein source
   - Complex carbs
   - Healthy fats
   - Vegetables

4. **Prep in batches**:
   - Cook grains and proteins
   - Chop vegetables
   - Prepare sauces/dressings

**Sample Daily Structure:**
🌅 Breakfast: Eggs + oatmeal + fruit
🌞 Lunch: Grilled chicken + quinoa + veggies
🍎 Snack: Greek yogurt + nuts
🌙 Dinner: Salmon + sweet potato + salad

Want me to create a specific meal plan based on your goals?`;
    }

    // Healthy eating general
    if (lowerMessage.includes('healthy') || lowerMessage.includes('diet') || lowerMessage.includes('eat better')) {
      return `Here are my top tips for healthy eating! 🥗

**The Basics:**
1. Eat plenty of vegetables and fruits
2. Choose whole grains over refined
3. Include lean proteins
4. Limit processed foods and added sugars
5. Stay hydrated

**The Plate Method:**
- 🥦 Half your plate: Vegetables
- 🍗 Quarter: Lean protein
- 🍚 Quarter: Whole grains

**Healthy Habits:**
- Eat mindfully (no screens)
- Cook at home more often
- Read nutrition labels
- Plan your meals
- Don't skip meals

What specific aspect of healthy eating would you like to explore?`;
    }

    // Sugar
    if (lowerMessage.includes('sugar')) {
      return `Let's discuss sugar! 🍬

**Types of Sugar:**
- **Natural sugars**: Found in fruits, dairy
- **Added sugars**: Added during processing

**Daily Limits (Added Sugar):**
- Women: 25g (6 teaspoons)
- Men: 36g (9 teaspoons)

**Hidden Sugar Sources:**
- Sauces and dressings
- "Low-fat" products
- Flavored yogurt
- Breakfast cereals
- Granola bars

**Tips to Reduce Sugar:**
1. Read labels (look for -ose endings)
2. Choose whole fruits over juice
3. Gradually reduce sweetness
4. Use spices (cinnamon, vanilla) instead

Need help finding low-sugar alternatives?`;
    }

    // Default response for other nutrition questions
    if (lowerMessage.includes('food') || lowerMessage.includes('eat') || lowerMessage.includes('nutrition') || lowerMessage.includes('diet')) {
      return `That's a great nutrition question! 🤔

I'd be happy to help you with:
- **Macronutrients**: Protein, carbs, fats
- **Micronutrients**: Vitamins and minerals
- **Meal planning**: Creating balanced meals
- **Specific diets**: Keto, Mediterranean, vegetarian
- **Health goals**: Weight management, muscle building
- **Food choices**: What to eat for specific needs

Could you be more specific about what you'd like to know? I'm here to provide personalized nutrition guidance!`;
    }

    // General fallback
    return `Thanks for your message! 😊

As your AI Nutrition Assistant, I specialize in:
- 🥗 Healthy eating advice
- 💪 Protein and muscle building
- 🔥 Calorie management
- 💧 Hydration tips
- 📋 Meal planning
- 🍎 Vitamin and mineral guidance

Feel free to ask me anything about nutrition, and I'll do my best to help! What would you like to know?`;
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    const botResponse = {
      id: Date.now() + 1,
      type: 'bot',
      text: generateBotResponse(input),
      timestamp: new Date(),
    };

    setIsTyping(false);
    setMessages(prev => [...prev, botResponse]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, height: 'calc(100vh - 100px)', display: 'flex', flexDirection: 'column' }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Typography variant="h4" fontWeight={700} gutterBottom>
          🤖 AI Nutrition Assistant
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Ask me anything about nutrition, diet, and healthy eating!
        </Typography>
      </motion.div>

      <Card sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Messages Container */}
        <Box
          sx={{
            flex: 1,
            overflow: 'auto',
            p: 2,
            bgcolor: 'grey.50',
          }}
        >
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start',
                    mb: 2,
                  }}
                >
                  {message.type === 'bot' && (
                    <Avatar
                      sx={{
                        bgcolor: 'primary.main',
                        mr: 1,
                        width: 36,
                        height: 36,
                      }}
                    >
                      <SmartToy fontSize="small" />
                    </Avatar>
                  )}
                  <Paper
                    elevation={1}
                    sx={{
                      p: 2,
                      maxWidth: '70%',
                      borderRadius: 3,
                      bgcolor: message.type === 'user' ? 'primary.main' : 'white',
                      color: message.type === 'user' ? 'white' : 'text.primary',
                      borderBottomRightRadius: message.type === 'user' ? 4 : 16,
                      borderBottomLeftRadius: message.type === 'bot' ? 4 : 16,
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        whiteSpace: 'pre-wrap',
                        '& strong': {
                          fontWeight: 700,
                        },
                      }}
                    >
                      {message.text}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        display: 'block',
                        mt: 1,
                        opacity: 0.7,
                        textAlign: message.type === 'user' ? 'right' : 'left',
                      }}
                    >
                      {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </Typography>
                  </Paper>
                  {message.type === 'user' && (
                    <Avatar
                      src={user?.profilePicture}
                      sx={{
                        bgcolor: 'secondary.main',
                        ml: 1,
                        width: 36,
                        height: 36,
                      }}
                    >
                      {user?.username?.charAt(0).toUpperCase() || <Person fontSize="small" />}
                    </Avatar>
                  )}
                </Box>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar sx={{ bgcolor: 'primary.main', width: 36, height: 36 }}>
                  <SmartToy fontSize="small" />
                </Avatar>
                <Paper sx={{ p: 2, borderRadius: 3 }}>
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                          duration: 0.5,
                          repeat: Infinity,
                          delay: i * 0.1,
                        }}
                      >
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            bgcolor: 'grey.400',
                          }}
                        />
                      </motion.div>
                    ))}
                  </Box>
                </Paper>
              </Box>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </Box>

        {/* Input Area */}
        <Box
          sx={{
            p: 2,
            borderTop: '1px solid',
            borderColor: 'divider',
            bgcolor: 'white',
          }}
        >
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              placeholder="Ask me about nutrition..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              multiline
              maxRows={3}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                },
              }}
            />
            <IconButton
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
                '&:disabled': {
                  bgcolor: 'grey.300',
                  color: 'grey.500',
                },
              }}
            >
              <Send />
            </IconButton>
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            Try asking about protein, calories, vitamins, meal planning, or healthy eating!
          </Typography>
        </Box>
      </Card>
    </Box>
  );
};

export default AIChat;
