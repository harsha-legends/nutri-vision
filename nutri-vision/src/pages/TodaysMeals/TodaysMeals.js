import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Chip,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  LinearProgress,
  useTheme,
  Avatar,
  Modal,
  Paper,
} from '@mui/material';
import { 
  Search, 
  Delete, 
  Restaurant, 
  Info, 
  LocalFireDepartment,
  FitnessCenter,
  Grain,
  WaterDrop,
  Spa,
  Cake,
  Favorite,
  FavoriteBorder,
  Close,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useMeals } from '../../context/MealsContext';
import { searchFoods, foodCategories } from '../../data/foodsData';
import { chartColors } from '../../theme/theme';
import { NumberTicker, BlurFade } from '../../components/ui/MagicUI';
import QuantityButton from '../../components/ui/QuantityButton';

const TodaysMeals = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const location = useLocation();
  const { todaysMeals, addMeal, removeMeal, getTodaysTotals } = useMeals();
  
  // Get mealType from navigation state (from Dashboard meal timeline)
  const selectedMealType = location.state?.mealType || null;
  const totals = getTodaysTotals();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchPortalOpen, setSearchPortalOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);

  // Load meals on mount to fix empty page issue
  useEffect(() => {
    // Force a re-render by updating totals
    const loadData = () => {
      getTodaysTotals();
    };
    loadData();
  }, [getTodaysTotals]);

  // Load favorites from localStorage
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);
  }, []);

  // Get meal counts for each food item
  const mealCounts = useMemo(() => {
    const counts = {};
    todaysMeals.forEach(meal => {
      counts[meal.id] = (counts[meal.id] || 0) + 1;
    });
    return counts;
  }, [todaysMeals]);

  // Group meals by food id (for display - no duplicates)
  const groupedMeals = useMemo(() => {
    const seen = new Set();
    return todaysMeals.filter(meal => {
      if (seen.has(meal.id)) {
        return false;
      }
      seen.add(meal.id);
      return true;
    });
  }, [todaysMeals]);

  // Debounce timer ref
  const searchTimerRef = useRef(null);

  // Debounced search - fast and responsive
  const handleSearch = useCallback((e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    // Clear previous timer
    if (searchTimerRef.current) {
      clearTimeout(searchTimerRef.current);
    }
    
    if (query.trim()) {
      // Debounce search for 150ms for snappy feel
      searchTimerRef.current = setTimeout(() => {
        const results = searchFoods(query);
        setSearchResults(results.slice(0, 20)); // Limit results for performance
      }, 150);
    } else {
      setSearchResults([]);
    }
  }, []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (searchTimerRef.current) {
        clearTimeout(searchTimerRef.current);
      }
    };
  }, []);

  // Toggle favorite
  const toggleFavorite = useCallback((foodId) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(foodId)
        ? prev.filter(id => id !== foodId)
        : [...prev, foodId];
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  }, []);

  // Add meal with quantity support and mealType from navigation
  const handleAddMeal = useCallback((food) => {
    addMeal(food, selectedMealType);
  }, [addMeal, selectedMealType]);

  // Remove one instance of a meal
  const handleRemoveOneMeal = useCallback((foodId) => {
    const mealToRemove = todaysMeals.find(m => m.id === foodId);
    if (mealToRemove) {
      removeMeal(mealToRemove.mealId);
    }
  }, [todaysMeals, removeMeal]);

  const handleCloseSearchPortal = () => {
    setSearchPortalOpen(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleFoodClick = (food) => {
    setSelectedFood(food);
    setDialogOpen(true);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <Restaurant sx={{ fontSize: { xs: 32, md: 40 }, color: 'primary.main' }} />
          <Typography variant="h4" fontWeight={700}>
            Today's Meals
          </Typography>
        </Box>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Track what you eat today
        </Typography>
      </motion.div>

      {/* Centered Search Bar - Click to Open Modal */}
      <Box sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Box
            onClick={() => setSearchPortalOpen(true)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              p: 2,
              borderRadius: 4,
              bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'white',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
              cursor: 'pointer',
              boxShadow: isDark 
                ? '0 8px 32px rgba(0,0,0,0.3)'
                : '0 8px 32px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: isDark 
                  ? '0 12px 48px rgba(0,0,0,0.4)'
                  : '0 12px 48px rgba(0,0,0,0.15)',
                transform: 'translateY(-2px)',
              },
            }}
          >
            <Search sx={{ fontSize: 28, color: 'primary.main' }} />
            <Typography color="text.secondary" sx={{ fontSize: '1.1rem' }}>
              Search for food items...
            </Typography>
          </Box>
        </motion.div>
      </Box>

      {/* Search Modal */}
      <Modal
        open={searchPortalOpen}
        onClose={handleCloseSearchPortal}
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          pt: { xs: 4, md: 8 },
        }}
        slotProps={{
          backdrop: {
            sx: {
              backdropFilter: 'blur(12px)',
              backgroundColor: isDark 
                ? 'rgba(0, 0, 0, 0.8)' 
                : 'rgba(255, 255, 255, 0.8)',
            },
          },
        }}
      >
        <Paper
          elevation={24}
          sx={{
            width: '90%',
            maxWidth: 700,
            maxHeight: '80vh',
            borderRadius: 4,
            overflow: 'hidden',
            bgcolor: isDark ? '#1a1a2e' : 'white',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
            outline: 'none',
          }}
        >
          {/* Search Input in Modal */}
          <Box sx={{ p: 3, borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}` }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <TextField
                fullWidth
                autoFocus
                placeholder="Search for food items..."
                value={searchQuery}
                onChange={handleSearch}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                    fontSize: '1.1rem',
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ fontSize: 28, color: 'primary.main' }} />
                    </InputAdornment>
                  ),
                }}
              />
              <IconButton onClick={handleCloseSearchPortal} sx={{ color: 'text.secondary' }}>
                <Close />
              </IconButton>
            </Box>
          </Box>

          {/* Search Results */}
          <Box sx={{ maxHeight: 'calc(80vh - 120px)', overflow: 'auto' }}>
            {searchResults.length > 0 ? (
              <List sx={{ p: 2 }}>
                <AnimatePresence>
                  {searchResults.map((food, index) => {
                    const category = foodCategories[food.category];
                    const count = mealCounts[food.id] || 0;
                    const isFavorite = favorites.includes(food.id);
                    
                    return (
                      <motion.div
                        key={food.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.03 }}
                      >
                        <ListItem
                          sx={{
                            bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'grey.50',
                            borderRadius: 2,
                            mb: 1.5,
                            border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'transparent'}`,
                            transition: 'all 0.2s',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            '&:hover': {
                              bgcolor: isDark ? 'rgba(255,255,255,0.08)' : 'grey.100',
                            },
                          }}
                        >
                          <Box sx={{ fontSize: '1.5rem' }}>{food.image}</Box>
                          <ListItemText
                            sx={{ flex: 1 }}
                            primary={
                              <Typography variant="body1" fontWeight={600}>
                                {food.name}
                              </Typography>
                            }
                            secondary={
                              <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                                <Chip 
                                  size="small" 
                                  label={`${food.nutrition.calories} kcal`}
                                  sx={{
                                    bgcolor: isDark ? 'rgba(239, 68, 68, 0.2)' : 'rgba(239, 68, 68, 0.1)',
                                    color: '#ef4444',
                                    fontWeight: 600,
                                  }}
                                />
                                <Chip 
                                  size="small" 
                                  label={category?.name} 
                                  variant="outlined"
                                  sx={{
                                    borderColor: isDark ? 'rgba(255,255,255,0.2)' : undefined,
                                  }}
                                />
                              </Box>
                            }
                          />
                          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                            <IconButton
                              size="small"
                              onClick={() => toggleFavorite(food.id)}
                              sx={{ 
                                color: isFavorite ? '#ef4444' : 'text.secondary',
                                '&:hover': { color: '#ef4444' }
                              }}
                            >
                              {isFavorite ? <Favorite /> : <FavoriteBorder />}
                            </IconButton>
                            <IconButton
                              size="small"
                              color="info"
                              onClick={() => handleFoodClick(food)}
                            >
                              <Info />
                            </IconButton>
                            <QuantityButton
                              count={count}
                              onAdd={() => handleAddMeal(food)}
                              onRemove={() => handleRemoveOneMeal(food.id)}
                              size="small"
                            />
                          </Box>
                        </ListItem>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </List>
            ) : searchQuery ? (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography color="text.secondary">
                  No foods found matching "{searchQuery}"
                </Typography>
              </Box>
            ) : (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Search sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                <Typography color="text.secondary">
                  Start typing to search for food items
                </Typography>
              </Box>
            )}
          </Box>
        </Paper>
      </Modal>

      <Grid container spacing={3}>
        {/* Today's Meals Cards - Modern Horizontal Display */}
        <Grid size={{ xs: 12 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <Restaurant sx={{ color: 'primary.main' }} />
                Meals Added Today ({todaysMeals.length})
              </Typography>

              {todaysMeals.length === 0 ? (
                <Card 
                  sx={{ 
                    p: 6, 
                    textAlign: 'center',
                    background: isDark 
                      ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)'
                      : 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)',
                    border: `2px dashed ${isDark ? 'rgba(99, 102, 241, 0.3)' : 'rgba(99, 102, 241, 0.2)'}`,
                    borderRadius: 4,
                  }}
                >
                  <Restaurant sx={{ fontSize: 64, color: 'primary.main', opacity: 0.5, mb: 2 }} />
                  <Typography color="text.secondary" variant="body1">
                    No meals added yet. Start searching to add food!
                  </Typography>
                </Card>
              ) : (
                <Box 
                  sx={{ 
                    display: 'grid',
                    gridTemplateColumns: {
                      xs: 'repeat(2, 1fr)',
                      sm: 'repeat(3, 1fr)',
                      md: 'repeat(4, 1fr)',
                      lg: 'repeat(5, 1fr)',
                    },
                    gap: 2,
                  }}
                >
                  <AnimatePresence>
                    {groupedMeals.map((meal, index) => {
                      const quantity = mealCounts[meal.id] || 1;
                      return (
                        <motion.div
                          key={meal.id}
                          initial={{ opacity: 0, scale: 0.9, y: 20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ delay: index * 0.02, type: 'spring', stiffness: 300 }}
                        >
                          <Card
                            sx={{
                              position: 'relative',
                              borderRadius: 2,
                              overflow: 'visible',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                              bgcolor: isDark ? 'rgba(255,255,255,0.03)' : 'white',
                              border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
                              '&:hover': {
                                transform: 'translateY(-4px) scale(1.02)',
                                boxShadow: isDark 
                                  ? '0 16px 40px rgba(0,0,0,0.4)'
                                  : '0 16px 40px rgba(0,0,0,0.12)',
                                borderColor: 'primary.main',
                              },
                              '&:hover .delete-btn': {
                                opacity: 1,
                                transform: 'translateY(-50%) scale(1)',
                              },
                            }}
                            onClick={() => handleFoodClick(meal)}
                          >
                            {/* Quantity Badge */}
                            {quantity > 1 && (
                              <Box
                                sx={{
                                  position: 'absolute',
                                  top: -8,
                                  left: -8,
                                  width: 28,
                                  height: 28,
                                  borderRadius: '50%',
                                  bgcolor: 'primary.main',
                                  color: 'white',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontWeight: 700,
                                  fontSize: '0.85rem',
                                  boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
                                  zIndex: 2,
                                }}
                              >
                                {quantity}
                              </Box>
                            )}

                            {/* Compact Food Display */}
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1.5,
                                p: 1.5,
                              }}
                            >
                              {/* Food Emoji/Image */}
                              <Box
                                sx={{
                                  width: 48,
                                  height: 48,
                                  borderRadius: 1.5,
                                  background: isDark 
                                    ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)'
                                    : 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '1.5rem',
                                  flexShrink: 0,
                                }}
                              >
                                {meal.image}
                              </Box>
                              
                              {/* Food Info */}
                              <Box sx={{ flex: 1, minWidth: 0, pr: 3 }}>
                                <Typography 
                                  variant="body2" 
                                  fontWeight={600} 
                                  noWrap
                                  sx={{ mb: 0.25 }}
                                >
                                  {meal.name}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                  <LocalFireDepartment sx={{ fontSize: 12, color: '#ef4444' }} />
                                  <Typography variant="caption" sx={{ color: '#ef4444', fontWeight: 600 }}>
                                    {meal.nutrition.calories * quantity}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary" sx={{ mx: 0.5 }}>
                                    •
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    {meal.nutrition.protein * quantity}g
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>
                            
                            {/* Delete Button - Positioned inside card */}
                            <IconButton
                              className="delete-btn"
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveOneMeal(meal.id);
                              }}
                              sx={{
                                position: 'absolute',
                                top: '50%',
                                right: 8,
                                transform: 'translateY(-50%) scale(0.8)',
                                width: 28,
                                height: 28,
                                bgcolor: isDark ? 'rgba(239, 68, 68, 0.15)' : 'rgba(239, 68, 68, 0.1)',
                                color: '#ef4444',
                                opacity: 0,
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                  bgcolor: '#ef4444',
                                  color: 'white',
                                  transform: 'translateY(-50%) scale(1.1)',
                                },
                              }}
                            >
                              <Delete sx={{ fontSize: 16 }} />
                            </IconButton>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </Box>
              )}
            </Box>
          </motion.div>
        </Grid>

        {/* Nutrition Summary - Bigger with Images */}
        <Grid size={{ xs: 12 }}>
          <BlurFade delay={0.3}>
            <Card
              sx={{
                borderRadius: 4,
                background: isDark
                  ? 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%)'
                  : 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #9333ea 100%)',
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Background Pattern */}
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  opacity: 0.1,
                  backgroundImage: `radial-gradient(circle at 20% 50%, white 2px, transparent 2px),
                                   radial-gradient(circle at 80% 50%, white 2px, transparent 2px)`,
                  backgroundSize: '50px 50px',
                }}
              />

              <CardContent sx={{ position: 'relative', zIndex: 1, p: { xs: 4, md: 5 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                  <Avatar sx={{ 
                    bgcolor: 'rgba(255,255,255,0.2)', 
                    backdropFilter: 'blur(10px)',
                    width: 56,
                    height: 56,
                  }}>
                    <Restaurant sx={{ fontSize: 32 }} />
                  </Avatar>
                  <Typography variant="h4" fontWeight={700}>
                    Today's Nutrition Summary
                  </Typography>
                </Box>

                <Grid container spacing={3}>
                  {[
                    { 
                      label: 'Calories', 
                      value: totals.calories, 
                      unit: 'kcal', 
                      icon: LocalFireDepartment, 
                      color: '#ef4444', 
                      gradient: 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)',
                      bgGradient: 'linear-gradient(135deg, #fecaca 0%, #fed7aa 100%)',
                    },
                    { 
                      label: 'Protein', 
                      value: totals.protein, 
                      unit: 'g', 
                      icon: FitnessCenter, 
                      color: '#8b5cf6', 
                      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                      bgGradient: 'linear-gradient(135deg, #ddd6fe 0%, #c7d2fe 100%)',
                    },
                    { 
                      label: 'Carbs', 
                      value: totals.carbs, 
                      unit: 'g', 
                      icon: Grain, 
                      color: '#f59e0b', 
                      gradient: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
                      bgGradient: 'linear-gradient(135deg, #fde68a 0%, #fcd34d 100%)',
                    },
                    { 
                      label: 'Fats', 
                      value: totals.fats, 
                      unit: 'g', 
                      icon: WaterDrop, 
                      color: '#22c55e', 
                      gradient: 'linear-gradient(135deg, #22c55e 0%, #10b981 100%)',
                      bgGradient: 'linear-gradient(135deg, #bbf7d0 0%, #a7f3d0 100%)',
                    },
                    { 
                      label: 'Fiber', 
                      value: totals.fiber, 
                      unit: 'g', 
                      icon: Spa, 
                      color: '#06b6d4', 
                      gradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
                      bgGradient: 'linear-gradient(135deg, #a5f3fc 0%, #67e8f9 100%)',
                    },
                    { 
                      label: 'Sugar', 
                      value: totals.sugar, 
                      unit: 'g', 
                      icon: Cake, 
                      color: '#ec4899', 
                      gradient: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
                      bgGradient: 'linear-gradient(135deg, #fbcfe8 0%, #f9a8d4 100%)',
                    },
                  ].map((item, index) => (
                    <Grid size={{ xs: 6, sm: 4, md: 2 }} key={item.label}>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                      >
                        <Box
                          sx={{
                            textAlign: 'center',
                            p: 3,
                            borderRadius: 4,
                            bgcolor: 'rgba(255,255,255,0.1)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              bgcolor: 'rgba(255,255,255,0.15)',
                              transform: 'translateY(-4px)',
                              boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                            },
                          }}
                        >
                          {/* Large Gradient Background Circle with Icon */}
                          <Box 
                            sx={{ 
                              width: 80,
                              height: 80,
                              borderRadius: '50%',
                              background: item.bgGradient,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              mx: 'auto',
                              mb: 2,
                              boxShadow: `0 8px 24px ${item.color}40`,
                            }}
                          >
                            <item.icon sx={{ fontSize: 40, color: item.color }} />
                          </Box>
                          
                          <Typography
                            variant="h3"
                            fontWeight={800}
                            sx={{
                              mb: 0.5,
                              background: 'linear-gradient(135deg, white 0%, rgba(255,255,255,0.8) 100%)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                            }}
                          >
                            <NumberTicker value={Math.round(item.value)} duration={1500} />
                          </Typography>
                          <Typography variant="body2" sx={{ opacity: 0.8, display: 'block', fontSize: '0.85rem', fontWeight: 500 }}>
                            {item.unit}
                          </Typography>
                          <Typography variant="h6" fontWeight={700} sx={{ opacity: 0.95, mt: 1 }}>
                            {item.label}
                          </Typography>
                        </Box>
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </BlurFade>
        </Grid>
      </Grid>

      {/* Food Details Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        {selectedFood && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="h2">{selectedFood.image}</Typography>
                <Box>
                  <Typography variant="h5" fontWeight={700}>
                    {selectedFood.name}
                  </Typography>
                  <Chip
                    size="small"
                    label={foodCategories[selectedFood.category]?.name}
                    sx={{ mt: 0.5 }}
                  />
                </Box>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom sx={{ mt: 2 }}>
                Nutrition Information
              </Typography>
              <Grid container spacing={2}>
                {[
                  { label: 'Calories', value: selectedFood.nutrition.calories, unit: 'kcal', color: chartColors.calories },
                  { label: 'Protein', value: selectedFood.nutrition.protein, unit: 'g', color: chartColors.protein },
                  { label: 'Carbs', value: selectedFood.nutrition.carbs, unit: 'g', color: chartColors.carbs },
                  { label: 'Fats', value: selectedFood.nutrition.fats, unit: 'g', color: chartColors.fats },
                  { label: 'Fiber', value: selectedFood.nutrition.fiber, unit: 'g', color: chartColors.fiber },
                  { label: 'Sugar', value: selectedFood.nutrition.sugar, unit: 'g', color: chartColors.sugar },
                ].map((item) => (
                  <Grid size={{ xs: 6 }} key={item.label}>
                    <Box sx={{ mb: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body2">{item.label}</Typography>
                        <Typography variant="body2" fontWeight={600}>{item.value} {item.unit}</Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={Math.min(item.value, 100)}
                        sx={{
                          height: 6,
                          borderRadius: 3,
                          bgcolor: 'grey.200',
                          '& .MuiLinearProgress-bar': {
                            bgcolor: item.color,
                            borderRadius: 3,
                          },
                        }}
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Health Impact
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip
                  label={`Blood Sugar: ${selectedFood.healthImpact.bloodSugar}`}
                  color={selectedFood.healthImpact.bloodSugar === 'low' ? 'success' : selectedFood.healthImpact.bloodSugar === 'medium' ? 'warning' : 'error'}
                  variant="outlined"
                />
                <Chip
                  label={`Blood Pressure: ${selectedFood.healthImpact.bloodPressure}`}
                  color={selectedFood.healthImpact.bloodPressure === 'low' ? 'success' : selectedFood.healthImpact.bloodPressure === 'medium' ? 'warning' : 'error'}
                  variant="outlined"
                />
                <Chip
                  label={`Risk: ${selectedFood.healthImpact.riskLevel}`}
                  color={selectedFood.healthImpact.riskLevel === 'low' ? 'success' : selectedFood.healthImpact.riskLevel === 'medium' ? 'warning' : 'error'}
                />
              </Box>

              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                <QuantityButton
                  count={mealCounts[selectedFood.id] || 0}
                  onAdd={() => handleAddMeal(selectedFood)}
                  onRemove={() => handleRemoveOneMeal(selectedFood.id)}
                  size="large"
                />
              </Box>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default TodaysMeals;
