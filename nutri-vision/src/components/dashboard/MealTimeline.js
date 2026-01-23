import React from 'react';
import {
  Box,
  Card,
  Typography,
  Avatar,
  Chip,
  IconButton,
  useTheme,
} from '@mui/material';
import { 
  Add, 
  ArrowForward, 
  WbSunny, 
  LunchDining, 
  Cookie, 
  DinnerDining,
  Restaurant,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import OptimizedImage from '../ui/OptimizedImage';

const MealTimeline = ({ meals = [], onAddMeal, onViewMeal }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const mealTypes = [
    { id: 'breakfast', label: 'Breakfast', time: '7-10 AM', icon: WbSunny, color: '#f59e0b' },
    { id: 'lunch', label: 'Lunch', time: '12-2 PM', icon: LunchDining, color: '#10b981' },
    { id: 'snack', label: 'Snack', time: '4-5 PM', icon: Cookie, color: '#8b5cf6' },
    { id: 'dinner', label: 'Dinner', time: '7-9 PM', icon: DinnerDining, color: '#3b82f6' },
  ];

  const getMealsByType = (type) => {
    // If meals have mealType property, use it
    const mealsWithType = meals.filter((meal) => meal.mealType === type);
    if (mealsWithType.length > 0) {
      return mealsWithType;
    }
    
    // Otherwise, categorize by time added
    return meals.filter((meal) => {
      if (!meal.addedAt) return false;
      const hour = new Date(meal.addedAt).getHours();
      
      switch (type) {
        case 'breakfast':
          return hour >= 5 && hour < 11;
        case 'lunch':
          return hour >= 11 && hour < 15;
        case 'snack':
          return hour >= 15 && hour < 18;
        case 'dinner':
          return hour >= 18 || hour < 5;
        default:
          return false;
      }
    });
  };

  const getTotalCalories = (mealList) => {
    return mealList.reduce((sum, meal) => sum + (meal.nutrition?.calories || 0), 0);
  };

  // Group meals by food id and count quantities
  const getGroupedMeals = (mealList) => {
    const counts = {};
    const grouped = [];
    const seen = new Set();
    
    // Count each food item
    mealList.forEach(meal => {
      counts[meal.id] = (counts[meal.id] || 0) + 1;
    });
    
    // Get unique meals with their counts
    mealList.forEach(meal => {
      if (!seen.has(meal.id)) {
        seen.add(meal.id);
        grouped.push({ ...meal, quantity: counts[meal.id] });
      }
    });
    
    return grouped;
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Restaurant sx={{ fontSize: 24, color: theme.palette.primary.main }} />
          <Typography variant="h6" fontWeight={600}>
            Today's Meals
          </Typography>
        </Box>
        <Typography variant="caption" color="text.secondary">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
        </Typography>
      </Box>
    
      <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 2, px: 0.5 }}>
        {mealTypes.map((mealType, index) => {
          const mealList = getMealsByType(mealType.id);
          const groupedMealList = getGroupedMeals(mealList);
          const totalCals = getTotalCalories(mealList);

          return (
            <motion.div
              key={mealType.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                sx={{
                  minWidth: 280,
                  maxWidth: 320,
                  position: 'relative',
                  overflow: 'visible',
                  border: '1px solid',
                  borderColor: mealList.length > 0 ? `${mealType.color}50` : 'divider',
                  bgcolor: isDark ? 'background.paper' : 'background.default',
                }}
              >
                {/* Header */}
                <Box
                  sx={{
                    background: `linear-gradient(135deg, ${mealType.color}20 0%, ${mealType.color}05 100%)`,
                    p: 2,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar sx={{ bgcolor: `${mealType.color}20`, width: 40, height: 40 }}>
                        <mealType.icon sx={{ color: mealType.color, fontSize: 24 }} />
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1" fontWeight={700}>
                          {mealType.label}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {mealType.time}
                        </Typography>
                      </Box>
                    </Box>
                    {totalCals > 0 && (
                      <Chip
                        label={`${totalCals} kcal`}
                        size="small"
                        sx={{
                          bgcolor: `${mealType.color}20`,
                          color: mealType.color,
                          fontWeight: 600,
                        }}
                      />
                    )}
                  </Box>
                </Box>

                {/* Meals List */}
                <Box sx={{ p: 2, minHeight: 200 }}>
                  {mealList.length === 0 ? (
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        minHeight: 150,
                      }}
                    >
                      <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mb: 2 }}>
                        No meals logged yet
                      </Typography>
                      <IconButton
                        onClick={() => onAddMeal(mealType.id)}
                        sx={{
                          bgcolor: `${mealType.color}10`,
                          color: mealType.color,
                          '&:hover': {
                            bgcolor: `${mealType.color}20`,
                          },
                        }}
                      >
                        <Add />
                      </IconButton>
                    </Box>
                  ) : (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      {groupedMealList.map((meal, idx) => (
                        <motion.div
                          key={meal.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                        >
                          <Box
                            onClick={() => onViewMeal(meal)}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1.5,
                              p: 1.5,
                              borderRadius: 2,
                              border: '1px solid',
                              borderColor: 'divider',
                              cursor: 'pointer',
                              transition: 'all 0.2s',
                              position: 'relative',
                              '&:hover': {
                                borderColor: mealType.color,
                                bgcolor: 'action.hover',
                                transform: 'translateX(4px)',
                              },
                            }}
                          >
                            {/* Quantity Badge */}
                            {meal.quantity > 1 && (
                              <Box
                                sx={{
                                  position: 'absolute',
                                  top: -8,
                                  left: -8,
                                  width: 24,
                                  height: 24,
                                  borderRadius: '50%',
                                  bgcolor: 'primary.main',
                                  color: 'white',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontWeight: 700,
                                  fontSize: '0.75rem',
                                  boxShadow: '0 2px 8px rgba(99, 102, 241, 0.4)',
                                  zIndex: 1,
                                }}
                              >
                                {meal.quantity}
                              </Box>
                            )}
                            {meal.image ? (
                              <Box
                                sx={{
                                  width: 50,
                                  height: 50,
                                  borderRadius: 2,
                                  overflow: 'hidden',
                                  flexShrink: 0,
                                }}
                              >
                                <OptimizedImage
                                  src={meal.image}
                                  alt={meal.name}
                                  width={50}
                                  height={50}
                                />
                              </Box>
                            ) : (
                              <Avatar
                                sx={{
                                  bgcolor: `${mealType.color}20`,
                                  color: mealType.color,
                                  width: 50,
                                  height: 50,
                                }}
                              >
                                {meal.name?.charAt(0)}
                              </Avatar>
                            )}
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                              <Typography
                                variant="body2"
                                fontWeight={600}
                                noWrap
                                sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
                              >
                                {meal.name}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {(meal.nutrition?.calories || 0) * meal.quantity} kcal
                              </Typography>
                            </Box>
                            <ArrowForward sx={{ fontSize: 16, color: 'text.secondary' }} />
                          </Box>
                        </motion.div>
                      ))}
                      
                      {/* Add More Button */}
                      <Box
                        onClick={() => onAddMeal(mealType.id)}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 1,
                          p: 1,
                          borderRadius: 2,
                          border: '1px dashed',
                          borderColor: mealType.color,
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          '&:hover': {
                            bgcolor: `${mealType.color}10`,
                          },
                        }}
                      >
                        <Add sx={{ fontSize: 16, color: mealType.color }} />
                        <Typography variant="caption" sx={{ color: mealType.color, fontWeight: 600 }}>
                          Add more
                        </Typography>
                      </Box>
                    </Box>
                  )}
                </Box>
              </Card>
            </motion.div>
          );
        })}
      </Box>
    </Box>
  );
};

export default MealTimeline;
