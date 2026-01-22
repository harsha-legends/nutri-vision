import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid, 
  Typography,
  Card, 
  CardContent, 
  CardActionArea,
  Chip,
  LinearProgress,
  useTheme,
  Avatar,
  Skeleton,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, 
  LocalFireDepartment,
  FitnessCenter,
  Grain,
  WaterDrop,
  ArrowForward,
  Restaurant,
  TrackChanges,
  BarChart,
  CameraAlt,
  EmojiEvents,
} from '@mui/icons-material';
import { foodCategories } from '../../data/foodsData';
import { useMeals } from '../../context/MealsContext';
import { useAuth } from '../../context/AuthContext';
import { CategoryCardShimmer, StatsCardShimmer } from '../../components/ui/Shimmer';
import { 
  BlurFade, 
  NumberTicker, 
  BorderBeam,
} from '../../components/ui/MagicUI';

// Category images mapping for realistic photos
const categoryImages = {
  veg: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&h=400&fit=crop',
  nonVeg: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=600&h=400&fit=crop',
  juices: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&h=400&fit=crop',
  packed: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=600&h=400&fit=crop',
};

// Category icon components (fallback for when images fail)
const categoryIcons = {
  veg: '🥗',
  nonVeg: '🍖',
  juices: '🧃',
  packed: '📦',
};

const Dashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { getTodaysTotals } = useMeals();
  const { user } = useAuth();
  const totals = getTodaysTotals();
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState({});

  const categories = Object.values(foodCategories);

  // Simulate loading for demo
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Daily goals (can be from user settings)
  const goals = {
    calories: 2000,
    protein: 120,
    carbs: 250,
    fats: 65,
  };

  const getProgress = (current, goal) => Math.min((current / goal) * 100, 100);
  const totalCaloriesProgress = getProgress(totals.calories, goals.calories);

  const statsCards = [
    {
      title: 'Calories',
      value: totals.calories,
      goal: goals.calories,
      unit: 'kcal',
      icon: <LocalFireDepartment sx={{ fontSize: 28 }} />,
      color: '#ef4444',
      lightBg: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
      darkBg: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(249, 115, 22, 0.2) 100%)',
      gradient: 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)',
    },
    {
      title: 'Protein',
      value: totals.protein,
      goal: goals.protein,
      unit: 'g',
      icon: <FitnessCenter sx={{ fontSize: 28 }} />,
      color: '#8b5cf6',
      lightBg: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)',
      darkBg: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(99, 102, 241, 0.2) 100%)',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
    },
    {
      title: 'Carbs',
      value: totals.carbs,
      goal: goals.carbs,
      unit: 'g',
      icon: <Grain sx={{ fontSize: 28 }} />,
      color: '#f59e0b',
      lightBg: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
      darkBg: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(251, 191, 36, 0.2) 100%)',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
    },
    {
      title: 'Fats',
      value: totals.fats,
      goal: goals.fats,
      unit: 'g',
      icon: <WaterDrop sx={{ fontSize: 28 }} />,
      color: '#22c55e',
      lightBg: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
      darkBg: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(16, 185, 129, 0.2) 100%)',
      gradient: 'linear-gradient(135deg, #22c55e 0%, #10b981 100%)',
    },
  ];

  const handleImageLoad = (categoryId) => {
    setImageLoaded(prev => ({ ...prev, [categoryId]: true }));
  };

  return (
    <Box sx={{ 
      p: { xs: 2, sm: 3, md: 4 }, 
      minHeight: '100vh',
      background: isDark 
        ? 'linear-gradient(180deg, #0f0f1a 0%, #1a1a2e 100%)'
        : 'linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)',
    }}>
      {/* Header Section */}
      <BlurFade delay={0}>
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h4" 
            fontWeight={800} 
            sx={{ 
              mb: 1,
              fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
              background: isDark 
                ? 'linear-gradient(135deg, #818cf8 0%, #a78bfa 50%, #f472b6 100%)'
                : 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #c026d3 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Welcome back, {user?.username || 'User'}! 👋
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
              color: isDark ? 'grey.400' : 'grey.600',
            }}
          >
            Track your nutrition journey and achieve your health goals
          </Typography>
        </Box>
      </BlurFade>

      {/* Today's Progress - Enhanced Hero Card */}
      <BlurFade delay={0.1}>
        <Card
          sx={{
            mb: 4,
            borderRadius: { xs: 3, md: 4 },
            overflow: 'hidden',
            position: 'relative',
            background: isDark
              ? 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%)'
              : 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #9333ea 100%)',
            boxShadow: isDark 
              ? '0 20px 60px rgba(99, 102, 241, 0.3)'
              : '0 20px 60px rgba(79, 70, 229, 0.4)',
          }}
        >
          {/* Animated border */}
          <BorderBeam 
            colorFrom="#818cf8" 
            colorTo="#f472b6" 
            duration={8}
            size={300}
          />
          
          {/* Background pattern */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              opacity: 0.1,
              backgroundImage: `radial-gradient(circle at 20% 80%, white 1px, transparent 1px),
                               radial-gradient(circle at 80% 20%, white 1px, transparent 1px),
                               radial-gradient(circle at 40% 40%, white 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />
          
          <CardContent sx={{ py: { xs: 3, md: 4 }, px: { xs: 2, md: 4 }, position: 'relative', zIndex: 1 }}>
            {/* Header Row */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 2,
              mb: 3 
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Avatar
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <TrendingUp sx={{ color: 'white' }} />
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight={700} sx={{ color: 'white' }}>
                    Today's Progress
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Chip 
                  icon={<EmojiEvents sx={{ color: '#fbbf24 !important', fontSize: 16 }} />}
                  label={`${Math.round(totalCaloriesProgress)}% Complete`}
                  size="small" 
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.15)', 
                    color: 'white',
                    backdropFilter: 'blur(10px)',
                    fontWeight: 600,
                    '& .MuiChip-icon': { color: '#fbbf24' },
                  }} 
                />
              </Box>
            </Box>

            {/* Overall Progress Bar */}
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  Daily Calories Goal
                </Typography>
                <Typography variant="body2" sx={{ color: 'white', fontWeight: 600 }}>
                  {totals.calories} / {goals.calories} kcal
                </Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={totalCaloriesProgress}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  bgcolor: 'rgba(255,255,255,0.2)',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 5,
                    background: 'linear-gradient(90deg, #fbbf24 0%, #f59e0b 100%)',
                  },
                }}
              />
            </Box>
            
            {/* Stats Grid */}
            <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
              {isLoading ? (
                Array.from({ length: 4 }).map((_, index) => (
                  <Grid size={{ xs: 6, sm: 3 }} key={`shimmer-${index}`}>
                    <StatsCardShimmer />
                  </Grid>
                ))
              ) : (
                statsCards.map((stat, index) => (
                  <Grid size={{ xs: 6, sm: 3 }} key={stat.title}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      <Box 
                        sx={{ 
                          textAlign: 'center',
                          p: { xs: 1.5, sm: 2 },
                          borderRadius: 3,
                          bgcolor: 'rgba(255,255,255,0.1)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            bgcolor: 'rgba(255,255,255,0.15)',
                            transform: 'translateY(-2px)',
                          },
                        }}
                      >
                        <Box 
                          sx={{ 
                            display: 'inline-flex',
                            p: 1,
                            borderRadius: 2,
                            bgcolor: 'rgba(255,255,255,0.15)',
                            color: 'white',
                            mb: 1,
                          }}
                        >
                          {stat.icon}
                        </Box>
                        <Typography 
                          variant="h5" 
                          fontWeight={700}
                          sx={{ 
                            color: 'white',
                            display: 'flex', 
                            alignItems: 'baseline', 
                            justifyContent: 'center',
                            gap: 0.5,
                            fontSize: { xs: '1.25rem', sm: '1.5rem' },
                          }}
                        >
                          <NumberTicker 
                            value={Math.round(stat.value)} 
                            duration={1500}
                            delay={300 + index * 100}
                          />
                          <Typography 
                            component="span" 
                            variant="caption" 
                            sx={{ color: 'rgba(255,255,255,0.7)', fontSize: { xs: '0.65rem', sm: '0.75rem' } }}
                          >
                            {stat.unit}
                          </Typography>
                        </Typography>
                        <Typography 
                          variant="body2" 
                          sx={{ color: 'rgba(255,255,255,0.8)', mb: 1, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                        >
                          {stat.title}
                        </Typography>
                        <LinearProgress 
                          variant="determinate" 
                          value={getProgress(stat.value, stat.goal)}
                          sx={{
                            height: 4,
                            borderRadius: 2,
                            bgcolor: 'rgba(255,255,255,0.2)',
                            '& .MuiLinearProgress-bar': {
                              bgcolor: stat.color,
                              borderRadius: 2,
                            },
                          }}
                        />
                        <Typography 
                          variant="caption" 
                          sx={{ color: 'rgba(255,255,255,0.6)', mt: 0.5, display: 'block', fontSize: { xs: '0.6rem', sm: '0.7rem' } }}
                        >
                          {Math.round(getProgress(stat.value, stat.goal))}% of {stat.goal}{stat.unit}
                        </Typography>
                      </Box>
                    </motion.div>
                  </Grid>
                ))
              )}
            </Grid>
          </CardContent>
        </Card>
      </BlurFade>

      {/* Food Categories Section */}
      <BlurFade delay={0.3}>
        <Box sx={{ mb: 3 }}>
          <Typography 
            variant="h5" 
            fontWeight={700} 
            sx={{ 
              mb: 0.5,
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
              color: isDark ? 'white' : 'grey.800',
            }}
          >
            🍽️ Explore Categories
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ color: isDark ? 'grey.400' : 'grey.600' }}
          >
            Discover healthy food options for every meal
          </Typography>
        </Box>
      </BlurFade>
      
      <Grid container spacing={{ xs: 2, md: 3 }}>
        <AnimatePresence>
          {isLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <Grid size={{ xs: 6, sm: 6, md: 3 }} key={`cat-shimmer-${index}`}>
                <CategoryCardShimmer />
              </Grid>
            ))
          ) : (
            categories.map((category, index) => (
              <Grid size={{ xs: 6, sm: 6, md: 3 }} key={category.id}>
                <BlurFade delay={0.4 + index * 0.1}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    <Card
                      sx={{
                        height: { xs: 200, sm: 240, md: 280 },
                        borderRadius: { xs: 3, md: 4 },
                        overflow: 'hidden',
                        position: 'relative',
                        cursor: 'pointer',
                        boxShadow: isDark 
                          ? '0 10px 40px rgba(0,0,0,0.4)'
                          : '0 10px 40px rgba(0,0,0,0.12)',
                        transition: 'box-shadow 0.3s ease',
                        '&:hover': {
                          boxShadow: isDark
                            ? '0 20px 60px rgba(0,0,0,0.6)'
                            : '0 20px 60px rgba(0,0,0,0.2)',
                        },
                      }}
                    >
                      <CardActionArea
                        onClick={() => navigate(`/food-category/${category.id}`)}
                        sx={{ height: '100%', position: 'relative' }}
                      >
                        {/* Background Image with Skeleton */}
                        <Box sx={{ position: 'absolute', inset: 0 }}>
                          {!imageLoaded[category.id] && (
                            <Skeleton 
                              variant="rectangular" 
                              width="100%" 
                              height="100%" 
                              animation="wave"
                              sx={{ position: 'absolute', inset: 0 }}
                            />
                          )}
                          <Box
                            component="img"
                            src={categoryImages[category.id]}
                            alt={category.name}
                            onLoad={() => handleImageLoad(category.id)}
                            onError={(e) => {
                              e.target.style.display = 'none';
                              handleImageLoad(category.id);
                            }}
                            sx={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              opacity: imageLoaded[category.id] ? 1 : 0,
                              transition: 'opacity 0.3s ease',
                            }}
                          />
                          {/* Gradient Overlay */}
                          <Box
                            sx={{
                              position: 'absolute',
                              inset: 0,
                              background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.2) 100%)',
                            }}
                          />
                        </Box>
                        
                        {/* Content Overlay */}
                        <Box
                          sx={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            p: { xs: 2, md: 3 },
                            color: 'white',
                          }}
                        >
                          <Typography 
                            variant="h6" 
                            fontWeight={700} 
                            gutterBottom
                            sx={{ 
                              textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                              fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                            }}
                          >
                            {categoryIcons[category.id]} {category.name}
                          </Typography>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              opacity: 0.9, 
                              mb: 1.5,
                              textShadow: '0 1px 5px rgba(0,0,0,0.5)',
                              fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.875rem' },
                              display: { xs: 'none', sm: 'block' },
                            }}
                          >
                            {category.description}
                          </Typography>
                          <Box 
                            sx={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: 0.5,
                              color: 'rgba(255,255,255,0.9)',
                            }}
                          >
                            <Typography 
                              variant="button" 
                              fontWeight={600}
                              sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.875rem' } }}
                            >
                              Explore
                            </Typography>
                            <ArrowForward sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }} />
                          </Box>
                        </Box>
                      </CardActionArea>
                    </Card>
                  </motion.div>
                </BlurFade>
              </Grid>
            ))
          )}
        </AnimatePresence>
      </Grid>

      {/* Quick Actions Section */}
      <BlurFade delay={0.8}>
        <Box sx={{ mt: { xs: 4, md: 6 } }}>
          <Typography 
            variant="h5" 
            fontWeight={700} 
            sx={{ 
              mb: 2,
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
              color: isDark ? 'white' : 'grey.800',
            }}
          >
            ⚡ Quick Actions
          </Typography>
          <Grid container spacing={{ xs: 1.5, sm: 2 }}>
            {[
              { 
                label: "Today's Meals", 
                path: '/todays-meals', 
                gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                icon: <Restaurant sx={{ fontSize: { xs: 32, sm: 40 } }} />,
              },
              { 
                label: 'Set Goals', 
                path: '/goals', 
                gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                icon: <TrackChanges sx={{ fontSize: { xs: 32, sm: 40 } }} />,
              },
              { 
                label: 'Analytics', 
                path: '/analytics', 
                gradient: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                icon: <BarChart sx={{ fontSize: { xs: 32, sm: 40 } }} />,
              },
              { 
                label: 'Scan Food', 
                path: '/scan-food', 
                gradient: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
                icon: <CameraAlt sx={{ fontSize: { xs: 32, sm: 40 } }} />,
              },
            ].map((action, index) => (
              <Grid size={{ xs: 6, sm: 3 }} key={action.label}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card
                    onClick={() => navigate(action.path)}
                    sx={{
                      background: action.gradient,
                      color: 'white',
                      borderRadius: { xs: 2, md: 3 },
                      cursor: 'pointer',
                      transition: 'box-shadow 0.3s ease',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                      '&:hover': {
                        boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
                      },
                    }}
                  >
                    <CardContent sx={{ textAlign: 'center', py: { xs: 2, sm: 3 }, px: { xs: 1, sm: 2 } }}>
                      <Box sx={{ mb: 1 }}>
                        {action.icon}
                      </Box>
                      <Typography 
                        variant="body2" 
                        fontWeight={600}
                        sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' } }}
                      >
                        {action.label}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </BlurFade>
    </Box>
  );
};

export default Dashboard;
