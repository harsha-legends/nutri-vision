import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  IconButton,
  Button,
  Chip,
  LinearProgress,
  Divider,
} from '@mui/material';
import { ArrowBack, Add, Warning, CheckCircle, Error } from '@mui/icons-material';
import { motion } from 'framer-motion';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { getFoodById, foodCategories } from '../../data/foodsData';
import { useMeals } from '../../context/MealsContext';
import { chartColors } from '../../theme/theme';

const FoodDetails = () => {
  const { foodId } = useParams();
  const navigate = useNavigate();
  const { addMeal } = useMeals();
  
  const food = getFoodById(foodId);

  if (!food) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5">Food not found</Typography>
        <Button onClick={() => navigate('/dashboard')}>Go Back</Button>
      </Box>
    );
  }

  const category = foodCategories[food.category];
  const { nutrition, healthImpact } = food;

  const macroData = [
    { name: 'Protein', value: nutrition.protein, color: chartColors.protein },
    { name: 'Carbs', value: nutrition.carbs, color: chartColors.carbs },
    { name: 'Fats', value: nutrition.fats, color: chartColors.fats },
  ];

  const vitaminData = Object.entries(nutrition.vitamins).map(([key, value]) => ({
    name: `Vitamin ${key.toUpperCase()}`,
    value,
  }));

  const mineralData = Object.entries(nutrition.minerals).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value,
  }));

  const getImpactIcon = (level) => {
    switch (level) {
      case 'low':
        return <CheckCircle sx={{ color: 'success.main' }} />;
      case 'medium':
        return <Warning sx={{ color: 'warning.main' }} />;
      case 'high':
        return <Error sx={{ color: 'error.main' }} />;
      default:
        return null;
    }
  };

  const getImpactColor = (level) => {
    switch (level) {
      case 'low': return 'success';
      case 'medium': return 'warning';
      case 'high': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <IconButton onClick={() => navigate(-1)} sx={{ mr: 2 }}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h4" fontWeight={700}>
            {food.image} {food.name}
          </Typography>
        </Box>
      </motion.div>

      <Grid container spacing={3}>
        {/* Main Info Card */}
        <Grid item xs={12} md={4}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card
              sx={{
                height: '100%',
                background: category?.gradient,
                color: 'white',
              }}
            >
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Typography variant="h1" sx={{ mb: 2 }}>
                    {food.image}
                  </Typography>
                </motion.div>
                <Typography variant="h4" fontWeight={700} gutterBottom>
                  {nutrition.calories}
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  Calories per serving
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={() => addMeal(food)}
                  sx={{
                    mt: 3,
                    bgcolor: 'rgba(255,255,255,0.2)',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.3)',
                    },
                  }}
                >
                  Add to Today's Meals
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Macros Chart */}
        <Grid item xs={12} md={4}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Macronutrients
                </Typography>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={macroData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {macroData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                  {macroData.map((item) => (
                    <Box key={item.name} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          bgcolor: item.color,
                        }}
                      />
                      <Typography variant="caption">
                        {item.name}: {item.value}g
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Health Impact */}
        <Grid item xs={12} md={4}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Health Impact
                </Typography>
                <Box sx={{ space: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {getImpactIcon(healthImpact.bloodSugar)}
                      <Typography>Blood Sugar Impact</Typography>
                    </Box>
                    <Chip
                      size="small"
                      label={healthImpact.bloodSugar.toUpperCase()}
                      color={getImpactColor(healthImpact.bloodSugar)}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {getImpactIcon(healthImpact.bloodPressure)}
                      <Typography>Blood Pressure Impact</Typography>
                    </Box>
                    <Chip
                      size="small"
                      label={healthImpact.bloodPressure.toUpperCase()}
                      color={getImpactColor(healthImpact.bloodPressure)}
                    />
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="body1" fontWeight={600}>
                      Overall Risk Level
                    </Typography>
                    <Chip
                      label={healthImpact.riskLevel.toUpperCase()}
                      color={getImpactColor(healthImpact.riskLevel)}
                      sx={{ fontWeight: 700 }}
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Detailed Nutrition */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Detailed Nutrition
                </Typography>
                <Grid container spacing={2}>
                  {[
                    { label: 'Fiber', value: nutrition.fiber, color: chartColors.fiber },
                    { label: 'Sugar', value: nutrition.sugar, color: chartColors.sugar },
                    { label: 'Protein', value: nutrition.protein, color: chartColors.protein },
                    { label: 'Carbs', value: nutrition.carbs, color: chartColors.carbs },
                    { label: 'Fats', value: nutrition.fats, color: chartColors.fats },
                  ].map((item) => (
                    <Grid item xs={12} key={item.label}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body2">{item.label}</Typography>
                        <Typography variant="body2" fontWeight={600}>{item.value}g</Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={Math.min(item.value, 100)}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          bgcolor: 'grey.200',
                          '& .MuiLinearProgress-bar': {
                            bgcolor: item.color,
                            borderRadius: 4,
                          },
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Vitamins & Minerals */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Vitamins & Minerals
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
                  Vitamins (% Daily Value)
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
                  {vitaminData.map((item) => (
                    <Chip
                      key={item.name}
                      label={`${item.name}: ${item.value}%`}
                      size="small"
                      sx={{
                        bgcolor: item.value > 20 ? 'success.light' : 'grey.100',
                        color: item.value > 20 ? 'success.contrastText' : 'text.primary',
                      }}
                    />
                  ))}
                </Box>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
                  Minerals (% Daily Value)
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {mineralData.map((item) => (
                    <Chip
                      key={item.name}
                      label={`${item.name}: ${item.value}%`}
                      size="small"
                      sx={{
                        bgcolor: item.value > 15 ? 'info.light' : 'grey.100',
                        color: item.value > 15 ? 'info.contrastText' : 'text.primary',
                      }}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FoodDetails;
