const Food = require('../models/Food');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Helper function to delay execution
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Analyze food image using Google Gemini Vision with retry logic
exports.analyzeFoodImage = async (req, res) => {
  const MAX_RETRIES = 3;
  let lastError = null;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const { image, hint } = req.body;
      
      if (!image) {
        return res.status(400).json({ success: false, message: 'Image required' });
      }

      // Remove data URL prefix if present (e.g., "data:image/jpeg;base64,")
      const base64Data = image.replace(/^data:image\/\w+;base64,/, '');

      // Use Gemini 2.5 Flash for fast, cost-effective analysis
      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

      // Add user hint to prompt if provided
      const hintText = hint ? `\n\nUser hint about the food: "${hint}"` : '';
      
      const prompt = `Analyze this food image and provide detailed nutritional information.${hintText}

Respond ONLY with a valid JSON object in this exact format (no markdown, no code blocks, just pure JSON):
{
  "name": "Name of the food dish",
  "confidence": 0.95,
  "servingSize": "estimated serving size (e.g., '1 plate', '250g', '1 bowl')",
  "calories": estimated calories as a number,
  "protein": protein in grams as a number,
  "carbs": carbohydrates in grams as a number,
  "fat": fat in grams as a number,
  "fiber": fiber in grams as a number,
  "sugar": sugar in grams as a number (optional, use 0 if unknown),
  "sodium": sodium in mg as a number (optional, use 0 if unknown),
  "ingredients": ["list", "of", "visible", "ingredients"],
  "suggestions": ["health tip 1", "health tip 2"],
  "foodCategory": "category like 'Indian', 'Chinese', 'Italian', 'Snack', 'Beverage', etc.",
  "isHealthy": true or false based on nutritional balance,
  "healthScore": number from 1-10 indicating healthiness
}

Be accurate with Indian foods. If you cannot identify the food clearly, make your best estimate based on visual appearance.`;

      // Prepare the image for Gemini
      const imagePart = {
        inlineData: {
          data: base64Data,
          mimeType: 'image/jpeg',
        },
      };

      console.log(`Attempt ${attempt}: Sending image to Gemini...`);
      
      // Generate content with the image
      const result = await model.generateContent([prompt, imagePart]);
      const response = await result.response;
      const text = response.text();

      console.log('Gemini response received:', text.substring(0, 200) + '...');

      // Parse the JSON response
      let analysisResult;
      try {
        // Clean up the response - remove any markdown code blocks if present
        let cleanedText = text.trim();
        if (cleanedText.startsWith('```json')) {
          cleanedText = cleanedText.slice(7);
        }
        if (cleanedText.startsWith('```')) {
          cleanedText = cleanedText.slice(3);
        }
        if (cleanedText.endsWith('```')) {
          cleanedText = cleanedText.slice(0, -3);
        }
        cleanedText = cleanedText.trim();
        
        analysisResult = JSON.parse(cleanedText);
      } catch (parseError) {
        console.error('Failed to parse Gemini response:', text);
        // Return a fallback response if parsing fails
        analysisResult = {
          name: 'Unknown Food',
          confidence: 0.5,
          servingSize: '1 serving',
          calories: 200,
          protein: 10,
          carbs: 25,
          fat: 8,
          fiber: 3,
          sugar: 5,
          sodium: 400,
          ingredients: [],
          suggestions: ['Unable to fully analyze this image. Please try with a clearer photo.'],
          foodCategory: 'Unknown',
          isHealthy: true,
          healthScore: 5,
        };
      }

      // Try to find a matching food in our database for more accurate nutrition
      let dbMatch = null;
      if (analysisResult.name && analysisResult.name !== 'Unknown Food') {
        const searchName = analysisResult.name.toLowerCase();
        dbMatch = await Food.findOne({
          $or: [
            { name: { $regex: searchName, $options: 'i' } },
            { tags: { $in: [new RegExp(searchName.split(' ')[0], 'i')] } }
          ]
        });
      }

      // If we found a database match, use its verified nutrition data
      if (dbMatch) {
        analysisResult = {
          ...analysisResult,
          name: dbMatch.name,
          calories: dbMatch.nutrition?.calories || analysisResult.calories,
          protein: dbMatch.nutrition?.protein || analysisResult.protein,
          carbs: dbMatch.nutrition?.carbs || analysisResult.carbs,
          fat: dbMatch.nutrition?.fat || analysisResult.fat,
          fiber: dbMatch.nutrition?.fiber || analysisResult.fiber,
          image: dbMatch.image,
          foodId: dbMatch._id,
          source: 'database', // Indicates we used verified data
        };
      } else {
        analysisResult.source = 'ai'; // Indicates AI-estimated data
      }

      return res.json({
        success: true,
        data: analysisResult,
      });

    } catch (error) {
      lastError = error;
      console.error(`Attempt ${attempt} failed:`, error.message);
      
      // Check if it's a rate limit error and we have retries left
      const isRateLimitError = error.message?.includes('429') || 
                               error.message?.includes('quota') || 
                               error.message?.includes('rate') ||
                               error.message?.includes('Resource has been exhausted');
      
      if (isRateLimitError && attempt < MAX_RETRIES) {
        // Wait before retrying (exponential backoff)
        const waitTime = Math.pow(2, attempt) * 1000; // 2s, 4s, 8s
        console.log(`Rate limited. Waiting ${waitTime}ms before retry...`);
        await delay(waitTime);
        continue;
      }
      
      // If not a rate limit error or no retries left, break the loop
      break;
    }
  }

  // All retries failed
  console.error('All retries failed. Last error:', lastError?.message);
  
  // Handle specific Gemini API errors
  if (lastError?.message?.includes('API key') || lastError?.message?.includes('API_KEY_INVALID')) {
    return res.status(500).json({
      success: false,
      message: 'AI service configuration error. Please check API key.',
    });
  }
  
  if (lastError?.message?.includes('quota') || 
      lastError?.message?.includes('rate') || 
      lastError?.message?.includes('429') ||
      lastError?.message?.includes('Resource has been exhausted')) {
    return res.status(429).json({
      success: false,
      message: 'AI service is busy. Please wait a few seconds and try again.',
    });
  }

  res.status(500).json({
    success: false,
    message: 'Failed to analyze image. Please try again.',
    error: lastError?.message,
  });
};
