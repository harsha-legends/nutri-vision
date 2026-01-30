import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
  LinearProgress,
  Tooltip,
  useTheme,
  alpha,
} from '@mui/material';
import {
  WaterDrop,
  Add,
  Remove,
  LocalDrink,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import waterService from '../../services/waterService';

const WaterTracker = ({ goal = 8 }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [glasses, setGlasses] = useState(0);
  const [loading, setLoading] = useState(false);
  const [animatingGlass, setAnimatingGlass] = useState(null);

  const fetchWaterIntake = useCallback(async () => {
    try {
      const result = await waterService.getTodayWater();
      if (result.success && result.data && result.data.length > 0) {
        setGlasses(result.data[0].glasses || 0);
      }
    } catch (error) {
      console.error('Error fetching water intake:', error);
    }
  }, []);

  useEffect(() => {
    fetchWaterIntake();
  }, [fetchWaterIntake]);

  const handleAddWater = async () => {
    if (loading) return;
    setLoading(true);
    setAnimatingGlass('add');
    
    try {
      const result = await waterService.addGlass();
      if (result.success) {
        setGlasses(prev => prev + 1);
      }
    } catch (error) {
      console.error('Error adding water:', error);
    } finally {
      setLoading(false);
      setTimeout(() => setAnimatingGlass(null), 300);
    }
  };

  const handleRemoveWater = async () => {
    if (loading || glasses <= 0) return;
    setLoading(true);
    setAnimatingGlass('remove');
    
    try {
      const result = await waterService.removeGlass();
      if (result.success) {
        setGlasses(prev => Math.max(0, prev - 1));
      }
    } catch (error) {
      console.error('Error removing water:', error);
    } finally {
      setLoading(false);
      setTimeout(() => setAnimatingGlass(null), 300);
    }
  };

  const progress = Math.min((glasses / goal) * 100, 100);
  const isGoalMet = glasses >= goal;

  // Generate water drop icons
  const waterDrops = Array.from({ length: goal }, (_, i) => i < glasses);

  return (
    <Card
      component={motion.div}
      whileHover={{ y: -4 }}
      sx={{
        background: isDark
          ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(37, 99, 235, 0.1) 100%)'
          : 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
        border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
        borderRadius: 3,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Water wave animation at bottom */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: `${progress}%`,
          maxHeight: '100%',
          background: `linear-gradient(180deg, ${alpha('#3b82f6', 0.3)} 0%, ${alpha('#2563eb', 0.5)} 100%)`,
          transition: 'height 0.5s ease-out',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: -10,
            left: 0,
            right: 0,
            height: 20,
            background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z' fill='%233b82f6' opacity='0.3'/%3E%3C/svg%3E")`,
            backgroundSize: '1200px 20px',
            animation: 'wave 3s linear infinite',
          },
          '@keyframes wave': {
            '0%': { backgroundPositionX: '0px' },
            '100%': { backgroundPositionX: '1200px' },
          },
        }}
      />

      <CardContent sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocalDrink sx={{ color: '#3b82f6', fontSize: 28 }} />
            <Typography variant="h6" fontWeight={700}>
              Water Intake
            </Typography>
          </Box>
          {isGoalMet && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500 }}
            >
              <Typography
                variant="caption"
                sx={{
                  bgcolor: '#22c55e',
                  color: 'white',
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 2,
                  fontWeight: 600,
                }}
              >
                🎉 Goal Met!
              </Typography>
            </motion.div>
          )}
        </Box>

        {/* Progress Display */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 2 }}>
          <Tooltip title="Remove glass">
            <IconButton
              onClick={handleRemoveWater}
              disabled={glasses <= 0 || loading}
              sx={{
                bgcolor: alpha('#ef4444', isDark ? 0.2 : 0.1),
                '&:hover': { bgcolor: alpha('#ef4444', 0.3) },
                '&:disabled': { opacity: 0.3 },
              }}
            >
              <Remove sx={{ color: '#ef4444' }} />
            </IconButton>
          </Tooltip>

          <motion.div
            animate={animatingGlass === 'add' ? { scale: [1, 1.2, 1] } : animatingGlass === 'remove' ? { scale: [1, 0.8, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" fontWeight={800} color="#3b82f6">
                {glasses}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                of {goal} glasses
              </Typography>
            </Box>
          </motion.div>

          <Tooltip title="Add glass (250ml)">
            <IconButton
              onClick={handleAddWater}
              disabled={loading}
              sx={{
                bgcolor: alpha('#3b82f6', isDark ? 0.2 : 0.1),
                '&:hover': { bgcolor: alpha('#3b82f6', 0.3) },
              }}
            >
              <Add sx={{ color: '#3b82f6' }} />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Water Drops Visualization */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5, mb: 2, flexWrap: 'wrap' }}>
          <AnimatePresence>
            {waterDrops.map((filled, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <WaterDrop
                  sx={{
                    fontSize: 24,
                    color: filled ? '#3b82f6' : alpha('#3b82f6', 0.2),
                    transition: 'color 0.3s ease',
                  }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </Box>

        {/* Progress Bar */}
        <Box sx={{ mb: 1 }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 8,
              borderRadius: 4,
              bgcolor: alpha('#3b82f6', 0.1),
              '& .MuiLinearProgress-bar': {
                borderRadius: 4,
                background: isGoalMet
                  ? 'linear-gradient(90deg, #22c55e 0%, #16a34a 100%)'
                  : 'linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)',
              },
            }}
          />
        </Box>

        {/* Stats */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="caption" color="text.secondary">
            {glasses * 250}ml consumed
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {Math.max(0, (goal - glasses) * 250)}ml remaining
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default WaterTracker;
