const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Enable CORS
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/foods', require('./routes/foods'));
app.use('/api/meals', require('./routes/meals'));
app.use('/api/goals', require('./routes/goals'));
app.use('/api/analytics', require('./routes/analytics'));
app.use('/api/ai', require('./routes/ai'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'NutriVision API is running', timestamp: new Date().toISOString() });
});

// API documentation
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'NutriVision API v1.0',
    endpoints: {
      auth: {
        'POST /api/auth/register': 'Register a new user',
        'POST /api/auth/login': 'Login user',
        'GET /api/auth/me': 'Get current user (protected)',
        'PUT /api/auth/profile': 'Update profile (protected)',
        'PUT /api/auth/password': 'Update password (protected)'
      },
      foods: {
        'GET /api/foods': 'Get all foods with filters',
        'GET /api/foods/categories': 'Get food categories',
        'GET /api/foods/popular': 'Get popular foods',
        'GET /api/foods/search?q=query': 'Search foods',
        'GET /api/foods/barcode/:code': 'Get food by barcode',
        'GET /api/foods/:id': 'Get single food'
      },
      meals: {
        'GET /api/meals': 'Get user meals (protected)',
        'POST /api/meals': 'Log a meal (protected)',
        'GET /api/meals/today/summary': 'Get today summary (protected)',
        'GET /api/meals/:id': 'Get single meal (protected)',
        'PUT /api/meals/:id': 'Update meal (protected)',
        'DELETE /api/meals/:id': 'Delete meal (protected)'
      },
      goals: {
        'GET /api/goals': 'Get all goals (protected)',
        'POST /api/goals': 'Create goal (protected)',
        'GET /api/goals/active': 'Get active goal (protected)',
        'PUT /api/goals/:id': 'Update goal (protected)',
        'POST /api/goals/:id/progress': 'Log progress (protected)',
        'DELETE /api/goals/:id': 'Delete goal (protected)'
      },
      analytics: {
        'GET /api/analytics/weekly': 'Get weekly analytics (protected)',
        'GET /api/analytics/monthly': 'Get monthly analytics (protected)',
        'GET /api/analytics/goals': 'Get goal progress (protected)',
        'GET /api/analytics/macros': 'Get macro breakdown (protected)'
      }
    }
  });
});

// Error handler
app.use(errorHandler);

// Handle 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 NutriVision API running on port ${PORT}`);
  console.log(`📚 API Docs: http://localhost:${PORT}/api`);
  console.log(`💚 Health: http://localhost:${PORT}/api/health`);
});
