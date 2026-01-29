import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Button,
  Stack,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  TextField,
  InputAdornment,
  Divider,
  Badge,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  ChevronLeft,
  ChevronRight,
  Add as AddIcon,
  Delete as DeleteIcon,
  Restaurant,
  Search as SearchIcon,
  ContentCopy,
  Today,
  CalendarMonth,
  WbSunny,
  LunchDining,
  DinnerDining,
  Icecream,
  ShoppingCart,
  CheckCircle,
  LocalFireDepartment,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import { format, addDays, startOfWeek, isSameDay } from 'date-fns';
import { getAllFoods } from '../../data/foodsData';
import { useMeals } from '../../context/MealsContext';

const MealPlanner = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { addMeal } = useMeals();
  
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [mealPlan, setMealPlan] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedMealType, setSelectedMealType] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [allFoods, setAllFoods] = useState([]);
  const [shoppingListOpen, setShoppingListOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  const mealTypes = [
    { id: 'Breakfast', icon: <WbSunny />, color: '#fbbf24' },
    { id: 'Lunch', icon: <LunchDining />, color: '#22c55e' },
    { id: 'Dinner', icon: <DinnerDining />, color: '#8b5cf6' },
    { id: 'Snack', icon: <Icecream />, color: '#ec4899' },
  ];

  // Load foods and meal plan from localStorage
  useEffect(() => {
    const foods = getAllFoods();
    setAllFoods(foods);
    
    const savedPlan = localStorage.getItem('mealPlan');
    if (savedPlan) {
      setMealPlan(JSON.parse(savedPlan));
    }
  }, []);

  // Save meal plan to localStorage
  const saveMealPlan = useCallback((plan) => {
    setMealPlan(plan);
    localStorage.setItem('mealPlan', JSON.stringify(plan));
  }, []);

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i));

  const navigateWeek = (direction) => {
    setCurrentWeekStart(prev => addDays(prev, direction === 'next' ? 7 : -7));
  };

  const getDayKey = (date) => format(date, 'yyyy-MM-dd');

  const getMealsForDay = (date, mealType) => {
    const dayKey = getDayKey(date);
    return mealPlan[dayKey]?.[mealType] || [];
  };

  const openAddMealDialog = (date, mealType) => {
    setSelectedDay(date);
    setSelectedMealType(mealType);
    setDialogOpen(true);
    setSearchQuery('');
  };

  const addFoodToMealPlan = (food) => {
    const dayKey = getDayKey(selectedDay);
    const newPlan = { ...mealPlan };
    
    if (!newPlan[dayKey]) {
      newPlan[dayKey] = {};
    }
    if (!newPlan[dayKey][selectedMealType]) {
      newPlan[dayKey][selectedMealType] = [];
    }
    
    newPlan[dayKey][selectedMealType].push({
      id: Date.now(),
      food: food,
      servings: 1,
    });
    
    saveMealPlan(newPlan);
    setDialogOpen(false);
    setSnackbar({ open: true, message: `Added ${food.name} to ${selectedMealType}` });
  };

  const removeFoodFromMealPlan = (date, mealType, itemId) => {
    const dayKey = getDayKey(date);
    const newPlan = { ...mealPlan };
    
    if (newPlan[dayKey]?.[mealType]) {
      newPlan[dayKey][mealType] = newPlan[dayKey][mealType].filter(item => item.id !== itemId);
      saveMealPlan(newPlan);
    }
  };

  const copyDayToDays = (sourceDate, targetDates) => {
    const sourceKey = getDayKey(sourceDate);
    const sourceMeals = mealPlan[sourceKey];
    
    if (sourceMeals) {
      const newPlan = { ...mealPlan };
      targetDates.forEach(targetDate => {
        const targetKey = getDayKey(targetDate);
        newPlan[targetKey] = JSON.parse(JSON.stringify(sourceMeals));
      });
      saveMealPlan(newPlan);
      setSnackbar({ open: true, message: 'Meals copied successfully!' });
    }
  };

  const applyMealPlanToday = async () => {
    const todayKey = getDayKey(new Date());
    const todayMeals = mealPlan[todayKey];
    
    if (todayMeals) {
      for (const mealType of Object.keys(todayMeals)) {
        for (const item of todayMeals[mealType]) {
          await addMeal({
            mealType,
            foodId: item.food.id,
            foodData: item.food,
          });
        }
      }
      setSnackbar({ open: true, message: 'Meal plan applied to today\'s meals!' });
    }
  };

  const getDayTotals = (date) => {
    const dayKey = getDayKey(date);
    const dayMeals = mealPlan[dayKey];
    
    if (!dayMeals) return { calories: 0, protein: 0, carbs: 0, fats: 0 };
    
    let totals = { calories: 0, protein: 0, carbs: 0, fats: 0 };
    
    Object.values(dayMeals).forEach(meals => {
      meals.forEach(item => {
        totals.calories += item.food.nutrition?.calories || 0;
        totals.protein += item.food.nutrition?.protein || 0;
        totals.carbs += item.food.nutrition?.carbs || 0;
        totals.fats += item.food.nutrition?.fats || 0;
      });
    });
    
    return totals;
  };

  const getShoppingList = () => {
    const ingredients = {};
    
    weekDays.forEach(day => {
      const dayKey = getDayKey(day);
      const dayMeals = mealPlan[dayKey];
      
      if (dayMeals) {
        Object.values(dayMeals).forEach(meals => {
          meals.forEach(item => {
            const foodName = item.food.name;
            if (ingredients[foodName]) {
              ingredients[foodName].count += item.servings;
            } else {
              ingredients[foodName] = {
                name: foodName,
                count: item.servings,
                category: item.food.category || 'Other',
              };
            }
          });
        });
      }
    });
    
    return Object.values(ingredients);
  };

  const filteredFoods = allFoods.filter(food =>
    food.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isToday = (date) => isSameDay(date, new Date());

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: isDark 
        ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' 
        : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      pb: 10,
    }}>
      {/* Header */}
      <Box
        sx={{
          p: 3,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Box>
            <Typography variant="h5" fontWeight={700}>
              Meal Planner
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Plan your week for better nutrition
            </Typography>
          </Box>
          <Stack direction="row" spacing={1}>
            <IconButton 
              onClick={() => setShoppingListOpen(true)}
              sx={{ color: 'white' }}
            >
              <Badge badgeContent={getShoppingList().length} color="error">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </Stack>
        </Stack>

        {/* Week Navigation */}
        <Card sx={{ bgcolor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)' }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" p={1.5}>
            <IconButton onClick={() => navigateWeek('prev')} sx={{ color: 'white' }}>
              <ChevronLeft />
            </IconButton>
            <Stack direction="row" alignItems="center" spacing={1}>
              <CalendarMonth />
              <Typography fontWeight={600}>
                {format(currentWeekStart, 'MMM d')} - {format(addDays(currentWeekStart, 6), 'MMM d, yyyy')}
              </Typography>
            </Stack>
            <IconButton onClick={() => navigateWeek('next')} sx={{ color: 'white' }}>
              <ChevronRight />
            </IconButton>
          </Stack>
        </Card>
      </Box>

      {/* Quick Actions */}
      <Box sx={{ p: 2 }}>
        <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', pb: 1 }}>
          <Button
            variant="contained"
            size="small"
            startIcon={<Today />}
            onClick={applyMealPlanToday}
            sx={{
              background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
              flexShrink: 0,
              textTransform: 'none',
            }}
          >
            Apply Today's Plan
          </Button>
          <Button
            variant="outlined"
            size="small"
            startIcon={<ContentCopy />}
            onClick={() => {
              const todayMeals = mealPlan[getDayKey(new Date())];
              if (todayMeals) {
                copyDayToDays(new Date(), weekDays.filter(d => !isToday(d)));
              }
            }}
            sx={{ flexShrink: 0, textTransform: 'none' }}
          >
            Copy Today to Week
          </Button>
        </Stack>
      </Box>

      {/* Week View */}
      <Box sx={{ px: 2 }}>
        {weekDays.map((day, dayIndex) => {
          const totals = getDayTotals(day);
          const isCurrentDay = isToday(day);
          
          return (
            <motion.div
              key={day.toISOString()}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: dayIndex * 0.05 }}
            >
              <Card
                sx={{
                  mb: 2,
                  borderRadius: 3,
                  border: isCurrentDay ? '2px solid #667eea' : 'none',
                  overflow: 'hidden',
                }}
              >
                {/* Day Header */}
                <Box
                  sx={{
                    p: 2,
                    background: isCurrentDay
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                      : isDark
                        ? 'linear-gradient(135deg, #374151 0%, #1f2937 100%)'
                        : 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
                    color: isCurrentDay ? 'white' : 'inherit',
                  }}
                >
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Box>
                      <Typography variant="h6" fontWeight={700}>
                        {format(day, 'EEEE')}
                        {isCurrentDay && (
                          <Chip
                            label="Today"
                            size="small"
                            sx={{ ml: 1, bgcolor: 'rgba(255,255,255,0.2)', color: 'inherit' }}
                          />
                        )}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.7 }}>
                        {format(day, 'MMM d, yyyy')}
                      </Typography>
                    </Box>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="h6" fontWeight={700}>
                          {totals.calories}
                        </Typography>
                        <Typography variant="caption" sx={{ opacity: 0.7 }}>
                          calories
                        </Typography>
                      </Box>
                    </Stack>
                  </Stack>
                </Box>

                {/* Meal Types */}
                <CardContent sx={{ p: '0 !important' }}>
                  {mealTypes.map((mealType, idx) => {
                    const meals = getMealsForDay(day, mealType.id);
                    
                    return (
                      <Box key={mealType.id}>
                        {idx > 0 && <Divider />}
                        <Box sx={{ p: 2 }}>
                          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
                            <Stack direction="row" alignItems="center" spacing={1}>
                              <Avatar
                                sx={{
                                  width: 32,
                                  height: 32,
                                  bgcolor: `${mealType.color}20`,
                                  color: mealType.color,
                                }}
                              >
                                {mealType.icon}
                              </Avatar>
                              <Typography variant="subtitle2" fontWeight={600}>
                                {mealType.id}
                              </Typography>
                              {meals.length > 0 && (
                                <Chip
                                  label={`${meals.reduce((sum, m) => sum + (m.food.nutrition?.calories || 0), 0)} cal`}
                                  size="small"
                                  sx={{ height: 20, fontSize: 11 }}
                                />
                              )}
                            </Stack>
                            <IconButton
                              size="small"
                              onClick={() => openAddMealDialog(day, mealType.id)}
                              sx={{
                                bgcolor: `${mealType.color}20`,
                                color: mealType.color,
                                '&:hover': { bgcolor: `${mealType.color}30` },
                              }}
                            >
                              <AddIcon fontSize="small" />
                            </IconButton>
                          </Stack>

                          {/* Meal Items */}
                          {meals.length > 0 ? (
                            <Stack spacing={1}>
                              {meals.map((item) => (
                                <motion.div
                                  key={item.id}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                >
                                  <Box
                                    sx={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                      p: 1,
                                      borderRadius: 2,
                                      bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                                    }}
                                  >
                                    <Stack direction="row" alignItems="center" spacing={1}>
                                      <Typography variant="body2" fontSize={18}>
                                        {item.food.emoji || '🍽️'}
                                      </Typography>
                                      <Box>
                                        <Typography variant="body2" fontWeight={500}>
                                          {item.food.name}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                          {item.food.nutrition?.calories || 0} cal
                                        </Typography>
                                      </Box>
                                    </Stack>
                                    <IconButton
                                      size="small"
                                      onClick={() => removeFoodFromMealPlan(day, mealType.id, item.id)}
                                      sx={{ color: 'error.main' }}
                                    >
                                      <DeleteIcon fontSize="small" />
                                    </IconButton>
                                  </Box>
                                </motion.div>
                              ))}
                            </Stack>
                          ) : (
                            <Typography variant="body2" color="text.secondary" sx={{ pl: 5 }}>
                              No meals planned
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    );
                  })}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </Box>

      {/* Add Food Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: { borderRadius: 3 },
        }}
      >
        <DialogTitle>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Restaurant color="primary" />
            <Box>
              <Typography variant="h6">Add Food</Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedDay && format(selectedDay, 'EEEE, MMM d')} - {selectedMealType}
              </Typography>
            </Box>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            placeholder="Search foods..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ mb: 2, mt: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <List sx={{ maxHeight: 400, overflow: 'auto' }}>
            {filteredFoods.slice(0, 20).map((food) => (
              <ListItem
                key={food.id}
                onClick={() => addFoodToMealPlan(food)}
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                  },
                }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.light' }}>
                    {food.emoji || <Restaurant />}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={food.name}
                  secondary={
                    <Stack direction="row" spacing={1}>
                      <Typography variant="caption">
                        {food.nutrition?.calories || 0} cal
                      </Typography>
                      <Typography variant="caption">
                        P: {food.nutrition?.protein || 0}g
                      </Typography>
                      <Typography variant="caption">
                        C: {food.nutrition?.carbs || 0}g
                      </Typography>
                    </Stack>
                  }
                />
                <AddIcon color="primary" />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Shopping List Dialog */}
      <Dialog
        open={shoppingListOpen}
        onClose={() => setShoppingListOpen(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: { borderRadius: 3 },
        }}
      >
        <DialogTitle>
          <Stack direction="row" alignItems="center" spacing={1}>
            <ShoppingCart color="primary" />
            <Typography variant="h6">Shopping List</Typography>
          </Stack>
        </DialogTitle>
        <DialogContent>
          {getShoppingList().length > 0 ? (
            <List>
              {getShoppingList().map((item, idx) => (
                <ListItem key={idx}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'primary.light' }}>
                      <LocalFireDepartment />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.name}
                    secondary={`${item.count} serving${item.count > 1 ? 's' : ''}`}
                  />
                  <CheckCircle color="action" sx={{ cursor: 'pointer' }} />
                </ListItem>
              ))}
            </List>
          ) : (
            <Alert severity="info">
              No items in your shopping list. Add meals to your plan first!
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShoppingListOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </Box>
  );
};

export default MealPlanner;
