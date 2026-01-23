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
import { Add, ArrowForward } from '@mui/icons-material';
import { motion } from 'framer-motion';
import OptimizedImage from '../ui/OptimizedImage';

const MealTimeline = ({ meals = [], onAddMeal, onViewMeal }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const mealTypes = [
    { id: 'breakfast', label: 'Breakfast', time: '7-10 AM', icon: '🌅', color: '#f59e0b' },
    { id: 'lunch', label: 'Lunch', time: '12-2 PM', icon: '☀️', color: '#10b981' },
    { id: 'snack', label: 'Snack', time: '4-5 PM', icon: '🍪', color: '#8b5cf6' },
    { id: 'dinner', label: 'Dinner', time: '7-9 PM', icon: '🌙', color: '#3b82f6' },
  ];

  const getMealsByType = (type) => {
    return meals.filter((meal) => meal.mealType === type);
  };

  const getTotalCalories = (mealList) => {
    return mealList.reduce((sum, meal) => sum + (meal.nutrition?.calories || 0), 0);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" fontWeight={600}>
          🍽️ Today's Meals
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 2, px: 0.5 }}>
        {mealTypes.map((mealType, index) => {
          const mealList = getMealsByType(mealType.id);
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
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="h4">{mealType.icon}</Typography>
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
                      {mealList.map((meal, idx) => (
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
                              '&:hover': {
                                borderColor: mealType.color,
                                bgcolor: 'action.hover',
                                transform: 'translateX(4px)',
                              },
                            }}
                          >
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
                                {meal.nutrition?.calories || 0} kcal
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
