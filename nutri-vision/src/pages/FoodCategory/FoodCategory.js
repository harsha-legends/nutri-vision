import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  IconButton,
  Chip,
  Button,
} from '@mui/material';
import { ArrowBack, Add } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { foods, foodCategories } from '../../data/foodsData';
import { useMeals } from '../../context/MealsContext';

const FoodCategory = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { addMeal } = useMeals();
  
  const category = foodCategories[categoryId];
  const categoryFoods = foods[categoryId] || [];

  const handleAddMeal = (food, e) => {
    e.stopPropagation();
    addMeal(food);
  };

  const getRiskColor = (level) => {
    switch (level) {
      case 'low': return 'success';
      case 'medium': return 'warning';
      case 'high': return 'error';
      default: return 'default';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (!category) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5">Category not found</Typography>
        <Button onClick={() => navigate('/dashboard')}>Go Back</Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <IconButton onClick={() => navigate('/dashboard')} sx={{ mr: 2 }}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h4" fontWeight={700}>
            {category.icon} {category.name}
          </Typography>
        </Box>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Grid container spacing={3}>
          {categoryFoods.map((food) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={food.id}>
              <motion.div variants={cardVariants}>
                <Card
                  sx={{
                    height: '100%',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4,
                    },
                  }}
                >
                  <CardActionArea onClick={() => navigate(`/food/${food.id}`)}>
                    <CardContent>
                      <Box sx={{ textAlign: 'center', mb: 2 }}>
                        <Typography variant="h2">{food.image}</Typography>
                      </Box>
                      <Typography variant="h6" fontWeight={600} gutterBottom>
                        {food.name}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                        <Chip
                          size="small"
                          label={`${food.nutrition.calories} kcal`}
                          color="primary"
                          variant="outlined"
                        />
                        <Chip
                          size="small"
                          label={`${food.nutrition.protein}g protein`}
                          color="secondary"
                          variant="outlined"
                        />
                      </Box>
                      <Chip
                        size="small"
                        label={`Risk: ${food.healthImpact.riskLevel}`}
                        color={getRiskColor(food.healthImpact.riskLevel)}
                      />
                    </CardContent>
                  </CardActionArea>
                  <Box sx={{ px: 2, pb: 2 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<Add />}
                      onClick={(e) => handleAddMeal(food, e)}
                      sx={{
                        background: category.gradient,
                        '&:hover': {
                          background: category.gradient,
                          filter: 'brightness(1.1)',
                        },
                      }}
                    >
                      Add to Meals
                    </Button>
                  </Box>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Box>
  );
};

export default FoodCategory;
