import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid, 
  Typography,
  Card, 
  CardContent, 
  Chip,
  LinearProgress,
  useTheme,
  Avatar,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Divider,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, 
  LocalFireDepartment,
  FitnessCenter,
  Grain,
  WaterDrop,
  Restaurant,
  TrackChanges,
  BarChart,
  CameraAlt,
  EmojiEvents,
  Close,
  Celebration,
  LightbulbOutlined,
  ShowChart,
  DonutLarge,
  Explore,
  QrCodeScanner,
  EventNote,
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { foodCategories, getAllFoods } from '../../data/foodsData';
import { useMeals } from '../../context/MealsContext';
import { useAuth } from '../../context/AuthContext';
import { StatsCardShimmer } from '../../components/ui/Shimmer';
import { 
  BlurFade, 
  NumberTicker, 
  BorderBeam,
  AnimatedCircularProgressBar,
} from '../../components/ui/MagicUI';
import { calculateStreak, getAchievements, getMacroBalance, getBalanceRecommendation } from '../../utils/streakUtils';
import { getSmartSuggestions, getMotivationalQuote, getTimeBasedGreeting } from '../../utils/smartSuggestions';
import StreakBadge from '../../components/dashboard/StreakBadge';
import MealTimeline from '../../components/dashboard/MealTimeline';
import ActivityTimeline from '../../components/dashboard/ActivityTimeline';
import MacroBalanceWidget from '../../components/dashboard/MacroBalanceWidget';
import WaterTracker from '../../components/dashboard/WaterTracker';
import FavoriteFoods from '../../components/dashboard/FavoriteFoods';
import WeeklyReport from '../../components/dashboard/WeeklyReport';
import MealTemplates from '../../components/dashboard/MealTemplates';

// Multiple images per category for animated carousel
const categoryImageSets = {
  veg: [
    'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&h=400&fit=crop',
  ],
  nonVeg: [
    'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=600&h=400&fit=crop',
  ],
  juices: [
    'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=600&h=400&fit=crop',
  ],
  packed: [
    'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1571748982800-fa51082c2224?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
  ],
};

const Dashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { getTodaysTotals, todaysMeals } = useMeals();
  const { user } = useAuth();
  const totals = getTodaysTotals();
  const [isLoading, setIsLoading] = useState(true);
  const [fabOpen, setFabOpen] = useState(false);
  
  // Image carousel indices for each category
  const [imageIndices, setImageIndices] = useState({ veg: 0, nonVeg: 0, juices: 0, packed: 0 });

  const categories = Object.values(foodCategories);

  // Simulate loading for demo
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Image carousel effect - cycle through images for each category
  useEffect(() => {
    const intervals = [
      { key: 'veg', delay: 3000 },
      { key: 'nonVeg', delay: 3500 },
      { key: 'juices', delay: 4000 },
      { key: 'packed', delay: 4500 },
    ];

    const timers = intervals.map(({ key, delay }) => 
      setInterval(() => {
        setImageIndices(prev => ({
          ...prev,
          [key]: (prev[key] + 1) % 4, // 4 images per category
        }));
      }, delay)
    );

    return () => timers.forEach(clearInterval);
  }, []);

  // Daily goals (can be from user settings)
  const goals = {
    calories: user?.dailyGoal || 2000,
    protein: user?.proteinGoal || 120,
    carbs: user?.carbsGoal || 250,
    fats: user?.fatsGoal || 65,
  };

  const getProgress = (current, goal) => Math.min((current / goal) * 100, 100);
  const totalCaloriesProgress = getProgress(totals.calories, goals.calories);

  // Calculate streak and achievements
  const streak = calculateStreak(todaysMeals);
  const achievements = getAchievements(totals, goals, streak, todaysMeals);
  const macroBalance = getMacroBalance(totals);
  const balanceRecommendation = getBalanceRecommendation(macroBalance, totals, goals);

  // Smart suggestions
  const remainingCalories = goals.calories - totals.calories;
  const remainingProtein = goals.protein - totals.protein;
  const allFoods = getAllFoods();
  const suggestions = getSmartSuggestions(remainingCalories, remainingProtein, allFoods);
  const motivationalQuote = getMotivationalQuote();
  const greeting = getTimeBasedGreeting();

  // Mock activity data (in real app, would come from context)
  const activities = [
    { id: 1, type: 'meal', title: 'Chicken Breast Salad', calories: 350, timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) },
    { id: 2, type: 'water', title: 'Water', amount: '500ml', timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000) },
    { id: 3, type: 'exercise', title: 'Morning Run', duration: '30 min', timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000) },
  ];

  // Weekly comparison data (mock - would be calculated from historical meals)
  const weeklyData = [
    { day: 'Mon', calories: 1850, protein: 110 },
    { day: 'Tue', calories: 2100, protein: 125 },
    { day: 'Wed', calories: 1920, protein: 115 },
    { day: 'Thu', calories: 2050, protein: 130 },
    { day: 'Fri', calories: 1980, protein: 118 },
    { day: 'Sat', calories: 2200, protein: 135 },
    { day: 'Today', calories: totals.calories, protein: totals.protein },
  ];

  // FAB actions
  const fabActions = [
    { icon: <CameraAlt />, name: 'Scan Food', action: () => navigate('/scan-food') },
    { icon: <QrCodeScanner />, name: 'Scan Barcode', action: () => navigate('/barcode-scanner') },
    { icon: <Restaurant />, name: 'Add Meal', action: () => navigate('/todays-meals') },
    { icon: <EventNote />, name: 'Meal Planner', action: () => navigate('/meal-planner') },
    { icon: <BarChart />, name: 'View Analytics', action: () => navigate('/analytics') },
    { icon: <TrackChanges />, name: 'Set Goals', action: () => navigate('/goals') },
  ];

  // Meal handlers
  const handleAddMeal = (mealType) => {
    // Navigate to add meal page with meal type
    navigate('/todays-meals', { state: { mealType } });
  };

  const handleViewMeal = (meal) => {
    // Navigate to meal details or food details
    if (meal.foodId) {
      navigate(`/food/${meal.foodId}`);
    }
  };

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
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
            }}
          >
            <Celebration sx={{ fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' } }} />
            Welcome back, {user?.username || 'User'}!
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
              
              {/* Animated Circular Progress for overall calories */}
              <AnimatedCircularProgressBar
                value={totalCaloriesProgress}
                max={100}
                size={100}
                strokeWidth={10}
                gaugePrimaryColor="#fbbf24"
                gaugeSecondaryColor="rgba(255,255,255,0.2)"
                showValue={true}
                label="Calories"
              />
            </Box>

            {/* Overall Progress Details */}
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
            <Explore sx={{ fontSize: { xs: 24, sm: 28 }, color: isDark ? '#818cf8' : '#4f46e5' }} />
            <Typography 
              variant="h5" 
              fontWeight={700} 
              sx={{ 
                fontSize: { xs: '1.25rem', sm: '1.5rem' },
                color: isDark ? 'white' : 'grey.800',
              }}
            >
              Explore Categories
            </Typography>
          </Box>
          <Typography 
            variant="body2" 
            sx={{ color: isDark ? 'grey.400' : 'grey.600' }}
          >
            Discover healthy food options for every meal
          </Typography>
        </Box>
      </BlurFade>
      
      {/* Food Categories Section - Custom Bento Grid */}
      <BlurFade delay={0.35}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
            gridTemplateRows: { xs: 'repeat(2, 180px)', md: 'repeat(2, 220px)' },
            gap: { xs: 2, md: 3 },
            mt: 1,
          }}
        >
          {isLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <Box 
                key={`cat-shimmer-${index}`}
                sx={{ 
                  borderRadius: '20px',
                  bgcolor: isDark ? 'grey.800' : 'grey.200',
                  animation: 'pulse 1.5s ease-in-out infinite',
                }}
              />
            ))
          ) : (
            <>
              {/* Veg - Wide card */}
              <Box
                onClick={() => navigate(`/food-category/${categories[0]?.id}`)}
                sx={{ 
                  gridColumn: { xs: 'span 1', md: 'span 2' },
                  gridRow: 'span 1',
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  boxShadow: isDark ? '0 8px 32px rgba(0,0,0,0.4)' : '0 8px 32px rgba(0,0,0,0.12)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: isDark ? '0 24px 48px rgba(0,0,0,0.5)' : '0 24px 48px rgba(0,0,0,0.2)',
                    '& .category-image': {
                      transform: 'scale(1.1)',
                    },
                  },
                }}
              >
                {/* Animated cycling images */}
                {categoryImageSets.veg.map((src, idx) => (
                  <Box
                    key={`veg-img-${idx}`}
                    className="category-image"
                    component="img"
                    src={src}
                    alt={categories[0]?.name}
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: imageIndices.veg === idx ? 1 : 0,
                      transition: 'opacity 1s ease-in-out, transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  />
                ))}
                <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)', zIndex: 1 }} />
                <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: { xs: 2, md: 3 }, color: 'white', zIndex: 2 }}>
                  <Typography variant="h6" fontWeight={700} sx={{ fontSize: { xs: '1.1rem', md: '1.4rem' }, textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                    {categories[0]?.name}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9, display: { xs: 'none', sm: 'block' }, mt: 0.5 }}>
                    {categories[0]?.description}
                  </Typography>
                </Box>
              </Box>
              
              {/* Non-Veg - Tall card */}
              <Box
                onClick={() => navigate(`/food-category/${categories[1]?.id}`)}
                sx={{ 
                  gridColumn: 'span 1',
                  gridRow: { xs: 'span 1', md: 'span 2' },
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  boxShadow: isDark ? '0 8px 32px rgba(0,0,0,0.4)' : '0 8px 32px rgba(0,0,0,0.12)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: isDark ? '0 24px 48px rgba(0,0,0,0.5)' : '0 24px 48px rgba(0,0,0,0.2)',
                    '& .category-image': {
                      transform: 'scale(1.1)',
                    },
                  },
                }}
              >
                {/* Animated cycling images */}
                {categoryImageSets.nonVeg.map((src, idx) => (
                  <Box
                    key={`nonveg-img-${idx}`}
                    className="category-image"
                    component="img"
                    src={src}
                    alt={categories[1]?.name}
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: imageIndices.nonVeg === idx ? 1 : 0,
                      transition: 'opacity 1s ease-in-out, transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  />
                ))}
                <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)', zIndex: 1 }} />
                <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: { xs: 2, md: 3 }, color: 'white', zIndex: 2 }}>
                  <Typography variant="h6" fontWeight={700} sx={{ fontSize: { xs: '1.1rem', md: '1.4rem' }, textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                    {categories[1]?.name}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9, display: { xs: 'none', sm: 'block' }, mt: 0.5 }}>
                    {categories[1]?.description}
                  </Typography>
                </Box>
              </Box>
              
              {/* Juices */}
              <Box
                onClick={() => navigate(`/food-category/${categories[2]?.id}`)}
                sx={{ 
                  gridColumn: 'span 1',
                  gridRow: 'span 1',
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  boxShadow: isDark ? '0 8px 32px rgba(0,0,0,0.4)' : '0 8px 32px rgba(0,0,0,0.12)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: isDark ? '0 24px 48px rgba(0,0,0,0.5)' : '0 24px 48px rgba(0,0,0,0.2)',
                    '& .category-image': {
                      transform: 'scale(1.1)',
                    },
                  },
                }}
              >
                {/* Animated cycling images */}
                {categoryImageSets.juices.map((src, idx) => (
                  <Box
                    key={`juices-img-${idx}`}
                    className="category-image"
                    component="img"
                    src={src}
                    alt={categories[2]?.name}
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: imageIndices.juices === idx ? 1 : 0,
                      transition: 'opacity 1s ease-in-out, transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  />
                ))}
                <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)', zIndex: 1 }} />
                <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: { xs: 2, md: 3 }, color: 'white', zIndex: 2 }}>
                  <Typography variant="h6" fontWeight={700} sx={{ fontSize: { xs: '1.1rem', md: '1.4rem' }, textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                    {categories[2]?.name}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9, display: { xs: 'none', sm: 'block' }, mt: 0.5 }}>
                    {categories[2]?.description}
                  </Typography>
                </Box>
              </Box>
              
              {/* Packed */}
              <Box
                onClick={() => navigate(`/food-category/${categories[3]?.id}`)}
                sx={{ 
                  gridColumn: 'span 1',
                  gridRow: 'span 1',
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  boxShadow: isDark ? '0 8px 32px rgba(0,0,0,0.4)' : '0 8px 32px rgba(0,0,0,0.12)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: isDark ? '0 24px 48px rgba(0,0,0,0.5)' : '0 24px 48px rgba(0,0,0,0.2)',
                    '& .category-image': {
                      transform: 'scale(1.1)',
                    },
                  },
                }}
              >
                {/* Animated cycling images */}
                {categoryImageSets.packed.map((src, idx) => (
                  <Box
                    key={`packed-img-${idx}`}
                    className="category-image"
                    component="img"
                    src={src}
                    alt={categories[3]?.name}
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: imageIndices.packed === idx ? 1 : 0,
                      transition: 'opacity 1s ease-in-out, transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  />
                ))}
                <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)', zIndex: 1 }} />
                <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: { xs: 2, md: 3 }, color: 'white', zIndex: 2 }}>
                  <Typography variant="h6" fontWeight={700} sx={{ fontSize: { xs: '1.1rem', md: '1.4rem' }, textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                    {categories[3]?.name}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9, display: { xs: 'none', sm: 'block' }, mt: 0.5 }}>
                    {categories[3]?.description}
                  </Typography>
                </Box>
              </Box>
            </>
          )}
        </Box>
      </BlurFade>

      {/* NEW: Streak & Achievements Section */}
      <BlurFade delay={0.5}>
        <StreakBadge streak={streak} achievements={achievements} />
      </BlurFade>

      {/* NEW: Meal Timeline Section */}
      <BlurFade delay={0.6}>
        <MealTimeline 
          meals={todaysMeals} 
          onAddMeal={handleAddMeal}
          onViewMeal={handleViewMeal}
        />
      </BlurFade>

      {/* NEW: Smart Insights & Weekly Chart Row */}
      <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: 4 }}>
        {/* Smart Suggestions Card */}
        <Grid size={{ xs: 12, md: 6 }}>
          <BlurFade delay={0.65}>
            <Card
              sx={{
                borderRadius: 3,
                background: isDark
                  ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
                  : 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(34, 197, 94, 0.2)'}`,
                boxShadow: isDark 
                  ? '0 8px 32px rgba(0,0,0,0.3)'
                  : '0 8px 32px rgba(34, 197, 94, 0.15)',
                height: '100%',
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                  <Avatar sx={{ bgcolor: '#22c55e', width: 40, height: 40 }}>
                    <LightbulbOutlined />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" fontWeight={700}>
                      Smart Suggestions
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {greeting}
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ mb: 2 }} />

                {remainingCalories > 0 ? (
                  <>
                    <Typography variant="body2" sx={{ mb: 2, fontStyle: 'italic', color: 'text.secondary' }}>
                      "{motivationalQuote.text}"
                    </Typography>
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" fontWeight={600} gutterBottom>
                        Recommended meals for remaining {Math.round(remainingCalories)} kcal:
                      </Typography>
                      {suggestions.slice(0, 3).map((food, idx) => (
                        <Box
                          key={idx}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            py: 1,
                            px: 1.5,
                            mt: 1,
                            borderRadius: 2,
                            bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(34, 197, 94, 0.1)',
                          }}
                        >
                          <Typography variant="body2" fontWeight={500}>
                            {food.name}
                          </Typography>
                          <Chip
                            label={`${food.calories} kcal`}
                            size="small"
                            sx={{
                              bgcolor: '#22c55e',
                              color: 'white',
                              fontWeight: 600,
                              fontSize: '0.7rem',
                            }}
                          />
                        </Box>
                      ))}
                    </Box>
                  </>
                ) : (
                  <Box sx={{ textAlign: 'center', py: 2 }}>
                    <EmojiEvents sx={{ fontSize: 48, color: '#22c55e', mb: 1 }} />
                    <Typography variant="body1" fontWeight={600} gutterBottom>
                      Goal Achieved!
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      You've reached your calorie target for today!
                    </Typography>
                  </Box>
                )}

                {balanceRecommendation && (
                  <Box
                    sx={{
                      mt: 2,
                      p: 1.5,
                      borderRadius: 2,
                      bgcolor: 'rgba(59, 130, 246, 0.1)',
                      border: `1px solid ${isDark ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.3)'}`,
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <DonutLarge sx={{ fontSize: 16, color: '#3b82f6' }} />
                      <Typography variant="caption" fontWeight={600} display="block">
                        Balance Tip:
                      </Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      {balanceRecommendation}
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </BlurFade>
        </Grid>

        {/* Weekly Comparison Chart */}
        <Grid size={{ xs: 12, md: 6 }}>
          <BlurFade delay={0.7}>
            <Card
              sx={{
                borderRadius: 3,
                background: isDark
                  ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
                  : 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(59, 130, 246, 0.2)'}`,
                boxShadow: isDark 
                  ? '0 8px 32px rgba(0,0,0,0.3)'
                  : '0 8px 32px rgba(59, 130, 246, 0.15)',
                height: '100%',
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                  <Avatar sx={{ bgcolor: '#3b82f6', width: 40, height: 40 }}>
                    <ShowChart />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" fontWeight={700}>
                      Weekly Trend
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Your progress this week
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ mb: 2 }} />

                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={weeklyData}>
                    <XAxis 
                      dataKey="day" 
                      stroke={isDark ? '#9ca3af' : '#6b7280'}
                      style={{ fontSize: '0.75rem' }}
                    />
                    <YAxis 
                      stroke={isDark ? '#9ca3af' : '#6b7280'}
                      style={{ fontSize: '0.75rem' }}
                    />
                    <RechartsTooltip 
                      contentStyle={{
                        backgroundColor: isDark ? '#1f2937' : 'white',
                        border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                        borderRadius: '8px',
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="calories" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      dot={{ fill: '#3b82f6', r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="protein" 
                      stroke="#8b5cf6" 
                      strokeWidth={2}
                      dot={{ fill: '#8b5cf6', r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>

                <Box sx={{ display: 'flex', gap: 2, mt: 2, justifyContent: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Box sx={{ width: 12, height: 12, borderRadius: 1, bgcolor: '#3b82f6' }} />
                    <Typography variant="caption">Calories</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Box sx={{ width: 12, height: 12, borderRadius: 1, bgcolor: '#8b5cf6' }} />
                    <Typography variant="caption">Protein (g)</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </BlurFade>
        </Grid>
      </Grid>

      {/* NEW: Macro Balance, Water Tracker & Activity Feed Row */}
      <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <BlurFade delay={0.75}>
            <MacroBalanceWidget totals={totals} balance={macroBalance} recommendations={[balanceRecommendation]} />
          </BlurFade>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <BlurFade delay={0.78}>
            <WaterTracker goal={8} />
          </BlurFade>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <BlurFade delay={0.8}>
            <ActivityTimeline activities={activities} />
          </BlurFade>
        </Grid>
      </Grid>

      {/* Favorite Foods & Weekly Report Row */}
      <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, md: 5 }}>
          <BlurFade delay={0.85}>
            <FavoriteFoods />
          </BlurFade>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <BlurFade delay={0.88}>
            <MealTemplates />
          </BlurFade>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <BlurFade delay={0.9}>
            <WeeklyReport />
          </BlurFade>
        </Grid>
      </Grid>

      {/* Quick Actions Section with Bento Grid */}
      <BlurFade delay={0.8}>
        <Box sx={{ mt: { xs: 4, md: 6 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
            <LocalFireDepartment sx={{ fontSize: { xs: 24, sm: 28 }, color: '#f59e0b' }} />
            <Typography 
              variant="h5" 
              fontWeight={700} 
              sx={{ 
                fontSize: { xs: '1.25rem', sm: '1.5rem' },
                color: isDark ? 'white' : 'grey.800',
              }}
            >
              Quick Actions
            </Typography>
          </Box>
          <Grid container spacing={2}>
            {/* Today's Meals */}
            <Grid size={{ xs: 6, md: 3 }}>
              <Box
                component={motion.div}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/todays-meals')}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  cursor: 'pointer',
                  background: isDark 
                    ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.15) 100%)'
                    : 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
                  border: `1px solid ${isDark ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.3)'}`,
                  textAlign: 'center',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    boxShadow: '0 8px 24px rgba(16, 185, 129, 0.2)',
                  },
                }}
              >
                <Avatar sx={{ bgcolor: '#10b981', width: 48, height: 48, mx: 'auto', mb: 1.5 }}>
                  <Restaurant />
                </Avatar>
                <Typography variant="body1" fontWeight={600}>Today's Meals</Typography>
                <Typography variant="caption" color="text.secondary">{todaysMeals.length} logged</Typography>
              </Box>
            </Grid>

            {/* Set Goals */}
            <Grid size={{ xs: 6, md: 3 }}>
              <Box
                component={motion.div}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/goals')}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  cursor: 'pointer',
                  background: isDark 
                    ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(217, 119, 6, 0.15) 100%)'
                    : 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
                  border: `1px solid ${isDark ? 'rgba(245, 158, 11, 0.2)' : 'rgba(245, 158, 11, 0.3)'}`,
                  textAlign: 'center',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    boxShadow: '0 8px 24px rgba(245, 158, 11, 0.2)',
                  },
                }}
              >
                <Avatar sx={{ bgcolor: '#f59e0b', width: 48, height: 48, mx: 'auto', mb: 1.5 }}>
                  <TrackChanges />
                </Avatar>
                <Typography variant="body1" fontWeight={600}>Set Goals</Typography>
                <Typography variant="caption" color="text.secondary">Customize targets</Typography>
              </Box>
            </Grid>

            {/* Analytics */}
            <Grid size={{ xs: 6, md: 3 }}>
              <Box
                component={motion.div}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/analytics')}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  cursor: 'pointer',
                  background: isDark 
                    ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(79, 70, 229, 0.15) 100%)'
                    : 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)',
                  border: `1px solid ${isDark ? 'rgba(99, 102, 241, 0.2)' : 'rgba(99, 102, 241, 0.3)'}`,
                  textAlign: 'center',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    boxShadow: '0 8px 24px rgba(99, 102, 241, 0.2)',
                  },
                }}
              >
                <Avatar sx={{ bgcolor: '#6366f1', width: 48, height: 48, mx: 'auto', mb: 1.5 }}>
                  <BarChart />
                </Avatar>
                <Typography variant="body1" fontWeight={600}>Analytics</Typography>
                <Typography variant="caption" color="text.secondary">View insights</Typography>
              </Box>
            </Grid>

            {/* Scan Food */}
            <Grid size={{ xs: 6, md: 3 }}>
              <Box
                component={motion.div}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/scan-food')}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  cursor: 'pointer',
                  background: isDark 
                    ? 'linear-gradient(135deg, rgba(236, 72, 153, 0.15) 0%, rgba(219, 39, 119, 0.15) 100%)'
                    : 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)',
                  border: `1px solid ${isDark ? 'rgba(236, 72, 153, 0.2)' : 'rgba(236, 72, 153, 0.3)'}`,
                  textAlign: 'center',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    boxShadow: '0 8px 24px rgba(236, 72, 153, 0.2)',
                  },
                }}
              >
                <Avatar sx={{ bgcolor: '#ec4899', width: 48, height: 48, mx: 'auto', mb: 1.5 }}>
                  <CameraAlt />
                </Avatar>
                <Typography variant="body1" fontWeight={600}>Scan Food</Typography>
                <Typography variant="caption" color="text.secondary">AI powered</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </BlurFade>

      {/* NEW: Floating Action Button for Quick Access */}
      <SpeedDial
        ariaLabel="Quick actions speed dial"
        sx={{
          position: 'fixed', 
          bottom: { xs: 70, sm: 24 }, 
          right: { xs: 16, sm: 24 },
          '& .MuiFab-primary': {
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            boxShadow: '0 8px 32px rgba(99, 102, 241, 0.4)',
          },
        }}
        icon={<SpeedDialIcon openIcon={<Close />} />}
        onClose={() => setFabOpen(false)}
        onOpen={() => setFabOpen(true)}
        open={fabOpen}
      >
        {fabActions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            title={action.name}
            onClick={action.action}
            sx={{
              '& .MuiSpeedDialAction-fab': {
                bgcolor: isDark ? '#1f2937' : 'white',
                '&:hover': {
                  bgcolor: isDark ? '#374151' : '#f3f4f6',
                },
              },
            }}
          />
        ))}
      </SpeedDial>
    </Box>
  );
};

export default Dashboard;
