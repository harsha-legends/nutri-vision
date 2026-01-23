import React, { useMemo, useCallback } from 'react';
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
import { ArrowBack, Warning, CheckCircle, Error } from '@mui/icons-material';
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
import OptimizedImage from '../../components/ui/OptimizedImage';
import { BorderBeam, ShinyText } from '../../components/ui/MagicUI';
import QuantityButton from '../../components/ui/QuantityButton';

const FoodDetails = () => {
  const { foodId } = useParams();
  const navigate = useNavigate();
  const { addMeal, todaysMeals, removeMeal } = useMeals();
  
  const food = getFoodById(foodId);

  // Get meal count for this food
  const mealCount = useMemo(() => {
    if (!food) return 0;
    return todaysMeals.filter(m => m.id === food.id).length;
  }, [todaysMeals, food]);

  const handleAddMeal = useCallback(() => {
    if (food) addMeal(food);
  }, [food, addMeal]);

  const handleRemoveOneMeal = useCallback(() => {
    const mealToRemove = todaysMeals.find(m => m.id === food?.id);
    if (mealToRemove) {
      removeMeal(mealToRemove.mealId);
    }
  }, [todaysMeals, food, removeMeal]);

  if (!food) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5">Food not found</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Food with ID "{foodId}" was not found in the database.
        </Typography>
        <Button onClick={() => navigate(-1)} sx={{ mt: 2 }}>Go Back</Button>
      </Box>
    );
  }

  const category = foodCategories[food.category];
  const { nutrition, healthImpact } = food;

  // Handle both old and new healthImpact formats
  const safeHealthImpact = typeof healthImpact === 'string' 
    ? { 
        riskLevel: healthImpact.toLowerCase(),
        bloodSugar: 'low',
        bloodPressure: 'low'
      }
    : healthImpact;

  const macroData = [
    { name: 'Protein', value: nutrition.protein, color: chartColors.protein },
    { name: 'Carbs', value: nutrition.carbs, color: chartColors.carbs },
    { name: 'Fats', value: nutrition.fats, color: chartColors.fats },
  ];

  // Safe handling of vitamins data with fallback
  const vitaminData = nutrition.vitamins 
    ? Object.entries(nutrition.vitamins).map(([key, value]) => ({
        name: `Vitamin ${key.toUpperCase()}`,
        value,
      }))
    : [];

  // Safe handling of minerals data with fallback
  const mineralData = nutrition.minerals
    ? Object.entries(nutrition.minerals).map(([key, value]) => ({
        name: key.charAt(0).toUpperCase() + key.slice(1),
        value,
      }))
    : [];

  const getImpactIcon = (level) => {
    const normalizedLevel = level?.toLowerCase();
    switch (normalizedLevel) {
      case 'low':
      case 'excellent':
      case 'good':
        return <CheckCircle sx={{ color: 'success.main' }} />;
      case 'medium':
      case 'moderate':
        return <Warning sx={{ color: 'warning.main' }} />;
      case 'high':
        return <Error sx={{ color: 'error.main' }} />;
      default:
        return <CheckCircle sx={{ color: 'success.main' }} />;
    }
  };

  const getImpactColor = (level) => {
    const normalizedLevel = level?.toLowerCase();
    switch (normalizedLevel) {
      case 'low': 
      case 'excellent':
      case 'good':
        return 'success';
      case 'medium': 
      case 'moderate':
        return 'warning';
      case 'high': 
        return 'error';
      default: 
        return 'success';
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
          <ShinyText 
            text={food.name}
            style={{ fontSize: '2rem', fontWeight: 700 }}
          />
        </Box>
      </motion.div>

      <Grid container spacing={3}>
        {/* Main Info Card */}
        <Grid size={{ xs: 12, md: 4 }}>
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
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <BorderBeam 
                size={300} 
                duration={10} 
                colorFrom="#ffffff" 
                colorTo="rgba(255,255,255,0.3)"
              />
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <motion.div
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Box sx={{ 
                    mb: 2, 
                    borderRadius: 3, 
                    overflow: 'hidden',
                    display: 'inline-block',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                    background: 'rgba(255,255,255,0.1)',
                    p: 1,
                  }}>
                    <OptimizedImage 
                      foodName={food.name}
                      subCategory={food.subCategory}
                      category={food.category}
                      alt={food.name}
                      width={180}
                      height={180}
                      style={{ 
                        borderRadius: '12px',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                    />
                  </Box>
                </motion.div>
                <Typography variant="h4" fontWeight={700} gutterBottom>
                  {nutrition.calories}
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  Calories per serving
                </Typography>
                <Box sx={{ mt: 3 }}>
                  <QuantityButton
                    count={mealCount}
                    onAdd={handleAddMeal}
                    onRemove={handleRemoveOneMeal}
                    size="large"
                  />
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Macros Chart */}
        <Grid size={{ xs: 12, md: 4 }}>
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
        <Grid size={{ xs: 12, md: 4 }}>
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
                      {getImpactIcon(safeHealthImpact.bloodSugar)}
                      <Typography>Blood Sugar Impact</Typography>
                    </Box>
                    <Chip
                      size="small"
                      label={safeHealthImpact.bloodSugar.toUpperCase()}
                      color={getImpactColor(safeHealthImpact.bloodSugar)}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {getImpactIcon(safeHealthImpact.bloodPressure)}
                      <Typography>Blood Pressure Impact</Typography>
                    </Box>
                    <Chip
                      size="small"
                      label={safeHealthImpact.bloodPressure.toUpperCase()}
                      color={getImpactColor(safeHealthImpact.bloodPressure)}
                    />
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="body1" fontWeight={600}>
                      Overall Risk Level
                    </Typography>
                    <Chip
                      label={safeHealthImpact.riskLevel.toUpperCase()}
                      color={getImpactColor(safeHealthImpact.riskLevel)}
                      sx={{ fontWeight: 700 }}
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Detailed Nutrition */}
        <Grid size={{ xs: 12, md: 6 }}>
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
                    <Grid size={{ xs: 12 }} key={item.label}>
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
        <Grid size={{ xs: 12, md: 6 }}>
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
