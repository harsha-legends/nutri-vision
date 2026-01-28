const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'NutriVision API',
      version: '1.0.0',
      description: 'NutriVision - Nutrition Tracking & Health Management API',
      contact: {
        name: 'NutriVision Team',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            avatar: { type: 'string' },
            phone: { type: 'string' },
            gender: { type: 'string', enum: ['male', 'female', 'other', ''] },
            height: { type: 'number' },
            weight: { type: 'number' },
            activityLevel: { type: 'string', enum: ['sedentary', 'light', 'moderate', 'active', 'very_active', ''] },
            dietaryPreference: { type: 'string', enum: ['vegetarian', 'non-vegetarian', 'vegan', 'eggetarian', ''] },
          },
        },
        Food: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            name: { type: 'string' },
            nameHindi: { type: 'string' },
            category: { type: 'string' },
            subCategory: { type: 'string' },
            description: { type: 'string' },
            image: { type: 'string' },
            servingSize: {
              type: 'object',
              properties: {
                amount: { type: 'number' },
                unit: { type: 'string' },
              },
            },
            nutrition: {
              type: 'object',
              properties: {
                calories: { type: 'number' },
                protein: { type: 'number' },
                carbohydrates: { type: 'number' },
                fat: { type: 'number' },
                fiber: { type: 'number' },
                sugar: { type: 'number' },
                sodium: { type: 'number' },
              },
            },
            tags: { type: 'array', items: { type: 'string' } },
            healthScore: { type: 'number' },
            isPopular: { type: 'boolean' },
          },
        },
        Meal: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            user: { type: 'string' },
            food: { $ref: '#/components/schemas/Food' },
            mealType: { type: 'string', enum: ['breakfast', 'lunch', 'dinner', 'snack'] },
            date: { type: 'string', format: 'date-time' },
            quantity: { type: 'number' },
            nutritionConsumed: {
              type: 'object',
              properties: {
                calories: { type: 'number' },
                protein: { type: 'number' },
                carbohydrates: { type: 'number' },
                fat: { type: 'number' },
              },
            },
          },
        },
        Goal: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            user: { type: 'string' },
            goalType: { type: 'string', enum: ['weight_loss', 'weight_gain', 'maintain', 'muscle_gain', 'improve_health', 'custom'] },
            dailyCalories: { type: 'number' },
            dailyProtein: { type: 'number' },
            dailyCarbs: { type: 'number' },
            dailyFat: { type: 'number' },
            isActive: { type: 'boolean' },
          },
        },
        Water: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            user: { type: 'string' },
            date: { type: 'string', format: 'date' },
            glasses: { type: 'number' },
          },
        },
        Streak: {
          type: 'object',
          properties: {
            currentStreak: { type: 'number' },
            longestStreak: { type: 'number' },
            badges: { type: 'array', items: { type: 'string' } },
          },
        },
        Error: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string' },
          },
        },
      },
    },
    tags: [
      { name: 'Auth', description: 'Authentication endpoints' },
      { name: 'Foods', description: 'Food database endpoints' },
      { name: 'Meals', description: 'Meal logging endpoints' },
      { name: 'Goals', description: 'User goals endpoints' },
      { name: 'Analytics', description: 'Analytics & statistics endpoints' },
      { name: 'Water', description: 'Water intake tracking' },
      { name: 'Streak', description: 'Streak & badges endpoints' },
      { name: 'Image', description: 'Food image analysis' },
      { name: 'AI', description: 'AI chat endpoints' },
    ],
  },
  apis: ['./routes/*.js'], // Path to route files with JSDoc comments
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
