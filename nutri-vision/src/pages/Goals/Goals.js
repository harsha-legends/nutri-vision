import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Slider,
  LinearProgress,
  Chip,
  Alert,
} from '@mui/material';
import { CheckCircle, LocalFireDepartment, FitnessCenter, Grain, WaterDrop } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useMeals } from '../../context/MealsContext';
import { gradients, chartColors } from '../../theme/theme';

const Goals = () => {
  const { user, updateUser } = useAuth();
  const { getTodaysTotals } = useMeals();
  const totals = getTodaysTotals();
  
  const [goals, setGoals] = useState({
    calories: user?.dailyGoal || 2000,
    protein: user?.proteinGoal || 50,
    carbs: user?.carbsGoal || 250,
    fats: user?.fatsGoal || 65,
  });
  const [saved, setSaved] = useState(false);

  const handleGoalChange = (name, value) => {
    setGoals(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateUser({
      dailyGoal: goals.calories,
      proteinGoal: goals.protein,
      carbsGoal: goals.carbs,
      fatsGoal: goals.fats,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const goalItems = [
    {
      key: 'calories',
      label: 'Daily Calories',
      icon: LocalFireDepartment,
      color: chartColors.calories,
      unit: 'kcal',
      min: 1000,
      max: 4000,
      step: 50,
    },
    {
      key: 'protein',
      label: 'Protein',
      icon: FitnessCenter,
      color: chartColors.protein,
      unit: 'g',
      min: 20,
      max: 200,
      step: 5,
    },
    {
      key: 'carbs',
      label: 'Carbohydrates',
      icon: Grain,
      color: chartColors.carbs,
      unit: 'g',
      min: 50,
      max: 500,
      step: 10,
    },
    {
      key: 'fats',
      label: 'Fats',
      icon: WaterDrop,
      color: chartColors.fats,
      unit: 'g',
      min: 20,
      max: 150,
      step: 5,
    },
  ];

  const getProgress = (current, goal) => {
    const progress = (current / goal) * 100;
    return Math.min(progress, 100);
  };

  const isGoalMet = (current, goal) => current >= goal;

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Typography variant="h4" fontWeight={700} gutterBottom>
          🎯 Daily Goals
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Set and track your nutrition goals
        </Typography>
      </motion.div>

      <AnimatePresence>
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Alert severity="success" sx={{ mb: 3 }}>
              Goals saved successfully!
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      <Grid container spacing={3}>
        {goalItems.map((item, index) => {
          const Icon = item.icon;
          const current = totals[item.key] || 0;
          const progress = getProgress(current, goals[item.key]);
          const goalMet = isGoalMet(current, goals[item.key]);

          return (
            <Grid item xs={12} md={6} key={item.key}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  sx={{
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                    border: goalMet ? `2px solid ${item.color}` : 'none',
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Icon sx={{ color: item.color, fontSize: 28 }} />
                        <Typography variant="h6" fontWeight={600}>
                          {item.label}
                        </Typography>
                      </Box>
                      {goalMet && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          <Chip
                            icon={<CheckCircle />}
                            label="Goal Met!"
                            color="success"
                            size="small"
                          />
                        </motion.div>
                      )}
                    </Box>

                    {/* Progress */}
                    <Box sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          Progress Today
                        </Typography>
                        <Typography variant="body2" fontWeight={600}>
                          {Math.round(current)} / {goals[item.key]} {item.unit}
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={progress}
                        sx={{
                          height: 12,
                          borderRadius: 6,
                          bgcolor: 'grey.200',
                          '& .MuiLinearProgress-bar': {
                            bgcolor: goalMet ? 'success.main' : item.color,
                            borderRadius: 6,
                            transition: 'transform 0.5s ease-in-out',
                          },
                        }}
                      />
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                        {Math.round(progress)}% completed
                      </Typography>
                    </Box>

                    {/* Goal Slider */}
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Set Daily Goal
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Slider
                          value={goals[item.key]}
                          onChange={(e, value) => handleGoalChange(item.key, value)}
                          min={item.min}
                          max={item.max}
                          step={item.step}
                          sx={{
                            color: item.color,
                            '& .MuiSlider-thumb': {
                              boxShadow: `0 0 10px ${item.color}`,
                            },
                          }}
                        />
                        <TextField
                          value={goals[item.key]}
                          onChange={(e) => handleGoalChange(item.key, Number(e.target.value))}
                          type="number"
                          size="small"
                          sx={{ width: 100 }}
                          InputProps={{
                            endAdornment: <Typography variant="caption">{item.unit}</Typography>,
                          }}
                        />
                      </Box>
                    </Box>

                    {goalMet && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.1 }}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: item.color,
                          pointerEvents: 'none',
                        }}
                      />
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          );
        })}
      </Grid>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleSave}
            sx={{
              px: 6,
              py: 1.5,
              background: gradients.primary,
              fontSize: '1rem',
            }}
          >
            Save Goals
          </Button>
        </Box>
      </motion.div>

      {/* Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card sx={{ mt: 4, background: gradients.cool, color: 'white' }}>
          <CardContent>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              📊 Today's Overview
            </Typography>
            <Grid container spacing={2}>
              {goalItems.map((item) => {
                const current = totals[item.key] || 0;
                const remaining = Math.max(goals[item.key] - current, 0);
                return (
                  <Grid item xs={6} sm={3} key={item.key}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" fontWeight={700}>
                        {Math.round(remaining)}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        {item.unit} {item.label} left
                      </Typography>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

export default Goals;
