import React, { useState } from 'react';
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
  ListItemSecondaryAction,
  IconButton,
  Button,
  Chip,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  LinearProgress,
} from '@mui/material';
import { Search, Add, Delete, Restaurant, Info } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useMeals } from '../../context/MealsContext';
import { searchFoods, foodCategories } from '../../data/foodsData';
import { chartColors, gradients } from '../../theme/theme';

const TodaysMeals = () => {
  const { todaysMeals, addMeal, removeMeal, getTodaysTotals } = useMeals();
  const totals = getTodaysTotals();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim()) {
      const results = searchFoods(query);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleAddMeal = (food) => {
    addMeal(food);
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
        <Typography variant="h4" fontWeight={700} gutterBottom>
          🍽️ Today's Meals
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Track what you eat today
        </Typography>
      </motion.div>

      <Grid container spacing={3}>
        {/* Search and Add Section */}
        <Grid size={{ xs: 12, md: 6 }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  <Search sx={{ verticalAlign: 'middle', mr: 1 }} />
                  Search & Add Food
                </Typography>
                
                <TextField
                  fullWidth
                  placeholder="Search for food items..."
                  value={searchQuery}
                  onChange={handleSearch}
                  sx={{ mb: 2 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />

                <AnimatePresence>
                  {searchResults.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <List sx={{ maxHeight: 400, overflow: 'auto' }}>
                        {searchResults.map((food, index) => {
                          const category = foodCategories[food.category];
                          return (
                            <motion.div
                              key={food.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                            >
                              <ListItem
                                sx={{
                                  bgcolor: 'grey.50',
                                  borderRadius: 2,
                                  mb: 1,
                                  '&:hover': {
                                    bgcolor: 'grey.100',
                                  },
                                }}
                              >
                                <Box sx={{ mr: 2, fontSize: '1.5rem' }}>{food.image}</Box>
                                <ListItemText
                                  primary={food.name}
                                  secondary={
                                    <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                                      <Chip size="small" label={`${food.nutrition.calories} kcal`} />
                                      <Chip size="small" label={category?.name} variant="outlined" />
                                    </Box>
                                  }
                                />
                                <ListItemSecondaryAction>
                                  <IconButton
                                    color="info"
                                    onClick={() => handleFoodClick(food)}
                                    sx={{ mr: 1 }}
                                  >
                                    <Info />
                                  </IconButton>
                                  <IconButton
                                    color="primary"
                                    onClick={() => handleAddMeal(food)}
                                    sx={{
                                      bgcolor: 'primary.main',
                                      color: 'white',
                                      '&:hover': {
                                        bgcolor: 'primary.dark',
                                      },
                                    }}
                                  >
                                    <Add />
                                  </IconButton>
                                </ListItemSecondaryAction>
                              </ListItem>
                            </motion.div>
                          );
                        })}
                      </List>
                    </motion.div>
                  )}
                </AnimatePresence>

                {searchQuery && searchResults.length === 0 && (
                  <Typography color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                    No foods found matching "{searchQuery}"
                  </Typography>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Today's Meals List */}
        <Grid size={{ xs: 12, md: 6 }}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  <Restaurant sx={{ verticalAlign: 'middle', mr: 1 }} />
                  Meals Added Today ({todaysMeals.length})
                </Typography>

                {todaysMeals.length === 0 ? (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="h1" sx={{ mb: 2 }}>🍽️</Typography>
                    <Typography color="text.secondary">
                      No meals added yet. Start searching to add food!
                    </Typography>
                  </Box>
                ) : (
                  <List sx={{ maxHeight: 400, overflow: 'auto' }}>
                    <AnimatePresence>
                      {todaysMeals.map((meal, index) => (
                        <motion.div
                          key={meal.mealId}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9, x: 100 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <ListItem
                            sx={{
                              bgcolor: 'grey.50',
                              borderRadius: 2,
                              mb: 1,
                              cursor: 'pointer',
                              '&:hover': {
                                bgcolor: 'grey.100',
                              },
                            }}
                            onClick={() => handleFoodClick(meal)}
                          >
                            <Box sx={{ mr: 2, fontSize: '1.5rem' }}>{meal.image}</Box>
                            <ListItemText
                              primary={meal.name}
                              secondary={`${meal.nutrition.calories} kcal • ${meal.nutrition.protein}g protein`}
                            />
                            <ListItemSecondaryAction>
                              <IconButton
                                edge="end"
                                color="error"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeMeal(meal.mealId);
                                }}
                              >
                                <Delete />
                              </IconButton>
                            </ListItemSecondaryAction>
                          </ListItem>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </List>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Summary Card */}
        <Grid size={{ xs: 12 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card sx={{ background: gradients.primary, color: 'white' }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  📊 Today's Nutrition Summary
                </Typography>
                <Grid container spacing={3}>
                  {[
                    { label: 'Calories', value: totals.calories, unit: 'kcal', color: chartColors.calories },
                    { label: 'Protein', value: totals.protein, unit: 'g', color: chartColors.protein },
                    { label: 'Carbs', value: totals.carbs, unit: 'g', color: chartColors.carbs },
                    { label: 'Fats', value: totals.fats, unit: 'g', color: chartColors.fats },
                    { label: 'Fiber', value: totals.fiber, unit: 'g', color: chartColors.fiber },
                    { label: 'Sugar', value: totals.sugar, unit: 'g', color: chartColors.sugar },
                  ].map((item) => (
                    <Grid size={{ xs: 6, sm: 4, md: 2 }} key={item.label}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" fontWeight={700}>
                          {Math.round(item.value)}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                          {item.unit} {item.label}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </motion.div>
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

              <Box sx={{ mt: 3 }}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<Add />}
                  onClick={() => {
                    addMeal(selectedFood);
                    setDialogOpen(false);
                  }}
                  sx={{ background: gradients.primary }}
                >
                  Add to Today's Meals
                </Button>
              </Box>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default TodaysMeals;
