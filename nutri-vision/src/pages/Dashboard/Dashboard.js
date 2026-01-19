import React from 'react';
import { Box, Grid, Typography, Card, CardContent, CardActionArea } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { foodCategories } from '../../data/foodsData';
import { useMeals } from '../../context/MealsContext';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { getTodaysTotals } = useMeals();
  const { user } = useAuth();
  const totals = getTodaysTotals();

  const categories = Object.values(foodCategories);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Welcome, {user?.username || 'User'}! 👋
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Track your nutrition and make healthier choices every day
        </Typography>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Card
          sx={{
            mb: 4,
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
            color: 'white',
          }}
        >
          <CardContent sx={{ py: 3 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Today's Summary
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={6} sm={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" fontWeight={700}>
                    {Math.round(totals.calories)}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Calories
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" fontWeight={700}>
                    {Math.round(totals.protein)}g
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Protein
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" fontWeight={700}>
                    {Math.round(totals.carbs)}g
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Carbs
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" fontWeight={700}>
                    {Math.round(totals.fats)}g
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Fats
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </motion.div>

      {/* Food Categories */}
      <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: 3 }}>
        Food Categories
      </Typography>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Grid container spacing={3}>
          {categories.map((category) => (
            <Grid item xs={12} sm={6} md={3} key={category.id}>
              <motion.div variants={cardVariants}>
                <Card
                  sx={{
                    height: '100%',
                    background: category.gradient,
                    color: 'white',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                    },
                  }}
                >
                  <CardActionArea
                    onClick={() => navigate(`/food-category/${category.id}`)}
                    sx={{ height: '100%', p: 2 }}
                  >
                    <CardContent sx={{ textAlign: 'center' }}>
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <Typography variant="h2" sx={{ mb: 2 }}>
                          {category.icon}
                        </Typography>
                      </motion.div>
                      <Typography variant="h6" fontWeight={700} gutterBottom>
                        {category.name}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        {category.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Box>
  );
};

export default Dashboard;
