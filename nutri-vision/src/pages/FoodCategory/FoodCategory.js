import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Typography,
  Card,
  IconButton,
  Chip,
  Button,
  useTheme,
  alpha,
} from '@mui/material';
import { ArrowBack, Search, Close, LocalFireDepartment, FitnessCenter, ChevronLeft, ChevronRight } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { foods, foodCategories } from '../../data/foodsData';
import { vegFoodsDatabase, vegSubCategories } from '../../data/vegFoodsDatabase';
import { nonVegFoodsDatabase, nonVegSubCategories } from '../../data/nonVegFoodsDatabase';
import { useMeals } from '../../context/MealsContext';
import { ShimmerGrid } from '../../components/ui/Shimmer';
import QuantityButton from '../../components/ui/QuantityButton';
import foodService from '../../services/foodService';

// Category hero images
const categoryHeroImages = {
  veg: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1200&h=400&fit=crop',
  nonVeg: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=1200&h=400&fit=crop',
  juices: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=1200&h=400&fit=crop',
  packed: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=1200&h=400&fit=crop',
};

// Food image database for realistic images
const foodImageDatabase = {
  'samosa': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&h=200&fit=crop',
  'pakora': 'https://images.unsplash.com/photo-1626074353765-517a681e40be?w=300&h=200&fit=crop',
  'paneer': 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=300&h=200&fit=crop',
  'tikka': 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=300&h=200&fit=crop',
  'biryani': 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300&h=200&fit=crop',
  'curry': 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&h=200&fit=crop',
  'dal': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&h=200&fit=crop',
  'rice': 'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=300&h=200&fit=crop',
  'chicken': 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=300&h=200&fit=crop',
  'mutton': 'https://images.unsplash.com/photo-1545247181-516773cae754?w=300&h=200&fit=crop',
  'fish': 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=300&h=200&fit=crop',
  'prawn': 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=300&h=200&fit=crop',
  'egg': 'https://images.unsplash.com/photo-1482049016530-d79f7d9ca7e0?w=300&h=200&fit=crop',
  'kebab': 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=300&h=200&fit=crop',
  'juice': 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=300&h=200&fit=crop',
  'lassi': 'https://images.unsplash.com/photo-1626200419199-391ae4be7f4d?w=300&h=200&fit=crop',
  'smoothie': 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=300&h=200&fit=crop',
  'milkshake': 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=300&h=200&fit=crop',
  'tea': 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300&h=200&fit=crop',
  'coffee': 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=200&fit=crop',
  'default': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop',
};

// Get food image URL
const getFoodImage = (foodName) => {
  const name = foodName.toLowerCase();
  for (const [key, url] of Object.entries(foodImageDatabase)) {
    if (name.includes(key)) {
      return url;
    }
  }
  return foodImageDatabase.default;
};

const FoodCategory = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { addMeal, todaysMeals, removeMeal } = useMeals();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [apiFoods, setApiFoods] = useState(null); // Foods from API
  const filterScrollRef = useRef(null);
  
  const category = foodCategories[categoryId];
  const isVegCategory = categoryId === 'veg';
  const isNonVegCategory = categoryId === 'nonVeg';

  // Handle filter scroll arrows
  const handleFilterScroll = () => {
    if (filterScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = filterScrollRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollFilters = (direction) => {
    if (filterScrollRef.current) {
      const scrollAmount = 150;
      filterScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Fetch foods from API
  const fetchFoodsFromAPI = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await foodService.getFoods({ category: categoryId });
      if (result.success && result.data.length > 0) {
        setApiFoods(result.data);
      }
    } catch (error) {
      console.error('Error fetching foods from API:', error);
      // Fall back to local data
    } finally {
      setIsLoading(false);
    }
  }, [categoryId]);

  useEffect(() => {
    fetchFoodsFromAPI();
  }, [fetchFoodsFromAPI]);
  
  // Use API foods if available, otherwise fall back to local data
  const categoryFoods = useMemo(() => {
    if (apiFoods && apiFoods.length > 0) return apiFoods;
    if (categoryId === 'veg') return vegFoodsDatabase;
    if (categoryId === 'nonVeg') return nonVegFoodsDatabase;
    return foods[categoryId] || [];
  }, [categoryId, apiFoods]);

  const subCategoriesData = useMemo(() => {
    if (isVegCategory) return vegSubCategories || {};
    if (isNonVegCategory) return nonVegSubCategories || {};
    return {};
  }, [isVegCategory, isNonVegCategory]);

  const availableSubCategories = useMemo(() => {
    if (!isVegCategory && !isNonVegCategory) return [];
    return [...new Set(categoryFoods.map(food => food.subCategory).filter(Boolean))];
  }, [categoryFoods, isVegCategory, isNonVegCategory]);

  const filteredFoods = useMemo(() => {
    let result = [...categoryFoods];
    
    if ((isVegCategory || isNonVegCategory) && selectedSubCategory !== 'all') {
      result = result.filter(food => food.subCategory === selectedSubCategory);
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(food => {
        const nameMatch = food.name.toLowerCase().includes(query);
        const descMatch = food.description?.toLowerCase().includes(query);
        return nameMatch || descMatch;
      });
    }
    
    return result;
  }, [categoryFoods, selectedSubCategory, searchQuery, isVegCategory, isNonVegCategory]);

  const mealCounts = useMemo(() => {
    const counts = {};
    todaysMeals.forEach(meal => {
      counts[meal.id] = (counts[meal.id] || 0) + 1;
    });
    return counts;
  }, [todaysMeals]);

  const handleAddMeal = (food, event) => {
    if (event) event.stopPropagation();
    addMeal(food);
  };

  const handleRemoveOneMeal = (foodId, event) => {
    if (event) event.stopPropagation();
    const mealToRemove = todaysMeals.find(m => m.id === foodId);
    if (mealToRemove) {
      removeMeal(mealToRemove.mealId);
    }
  };

  const getRiskColor = (riskLevel) => {
    switch (riskLevel?.toLowerCase()) {
      case 'low': return { bg: '#dcfce7', text: '#166534' };
      case 'medium': return { bg: '#fef3c7', text: '#92400e' };
      case 'high': return { bg: '#fee2e2', text: '#991b1b' };
      default: return { bg: '#f3f4f6', text: '#374151' };
    }
  };

  // Category theme colors
  const getCategoryTheme = () => {
    switch (categoryId) {
      case 'veg':
        return {
          primary: '#22c55e',
          secondary: '#16a34a',
          gradient: 'linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #15803d 100%)',
          lightBg: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
          darkBg: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(22, 163, 74, 0.1) 100%)',
        };
      case 'nonVeg':
        return {
          primary: '#ef4444',
          secondary: '#dc2626',
          gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)',
          lightBg: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
          darkBg: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(220, 38, 38, 0.1) 100%)',
        };
      case 'juices':
        return {
          primary: '#f59e0b',
          secondary: '#d97706',
          gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%)',
          lightBg: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
          darkBg: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(217, 119, 6, 0.1) 100%)',
        };
      default:
        return {
          primary: '#6366f1',
          secondary: '#4f46e5',
          gradient: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 50%, #4338ca 100%)',
          lightBg: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)',
          darkBg: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(79, 70, 229, 0.1) 100%)',
        };
    }
  };

  const categoryTheme = getCategoryTheme();

  if (!category) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="error" gutterBottom>
          Category not found
        </Typography>
        <Button onClick={() => navigate('/dashboard')} startIcon={<ArrowBack />} variant="contained">
          Back to Dashboard
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: isDark 
        ? 'linear-gradient(180deg, #0f0f1a 0%, #1a1a2e 100%)'
        : 'linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)',
    }}>
      {/* Hero Header */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: 200, md: 280 },
          overflow: 'hidden',
          mb: 3,
        }}
      >
        {/* Background Image */}
        <Box
          component="img"
          src={categoryHeroImages[categoryId] || categoryHeroImages.veg}
          alt={category.name}
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.6)',
          }}
        />
        
        {/* Gradient Overlay */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(180deg, transparent 0%, ${alpha(categoryTheme.primary, 0.7)} 100%)`,
          }}
        />

        {/* Content */}
        <Box
          sx={{
            position: 'relative',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            p: { xs: 2, md: 4 },
          }}
        >
          {/* Back Button */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <IconButton 
              onClick={() => navigate('/dashboard')}
              sx={{ 
                bgcolor: 'rgba(255,255,255,0.2)', 
                backdropFilter: 'blur(10px)',
                color: 'white',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' },
              }}
            >
              <ArrowBack />
            </IconButton>
          </motion.div>

          {/* Title & Stats */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
              <Typography 
                sx={{ 
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
                }}
              >
                {category.icon}
              </Typography>
              <Box>
                <Typography 
                  variant="h3" 
                  fontWeight={800} 
                  sx={{ 
                    color: 'white',
                    textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                    fontSize: { xs: '1.75rem', md: '2.5rem' },
                  }}
                >
                  {category.name}
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: 'rgba(255,255,255,0.9)',
                    fontWeight: 500,
                  }}
                >
                  {categoryFoods.length} delicious items
                </Typography>
              </Box>
            </Box>
          </motion.div>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ px: { xs: 2, md: 4 }, pb: 4 }}>
        {/* Clean Search & Filters */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* Minimal Search Bar */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              mb: 2,
              p: 1,
              pl: 2,
              borderRadius: 50,
              bgcolor: isDark ? alpha('#fff', 0.08) : alpha('#000', 0.04),
              border: '1px solid',
              borderColor: isDark ? alpha('#fff', 0.1) : alpha('#000', 0.08),
              transition: 'all 0.2s ease',
              '&:focus-within': {
                borderColor: categoryTheme.primary,
                bgcolor: isDark ? alpha('#fff', 0.1) : 'white',
                boxShadow: `0 0 0 3px ${alpha(categoryTheme.primary, 0.15)}`,
              },
            }}
          >
            <Search sx={{ color: 'text.secondary', fontSize: 20 }} />
            <input
              type="text"
              placeholder={`Search ${category.name.toLowerCase()}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                background: 'transparent',
                fontSize: '0.95rem',
                color: 'inherit',
                fontFamily: 'inherit',
              }}
            />
            {searchQuery && (
              <IconButton 
                size="small" 
                onClick={() => setSearchQuery('')}
                sx={{ mr: 0.5 }}
              >
                <Close fontSize="small" />
              </IconButton>
            )}
          </Box>

          {/* Horizontal Scroll Filter Chips with Arrows */}
          {(isVegCategory || isNonVegCategory) && availableSubCategories.length > 0 && (
            <Box sx={{ position: 'relative', mb: 2 }}>
              {/* Left Arrow */}
              {showLeftArrow && (
                <IconButton
                  onClick={() => scrollFilters('left')}
                  size="small"
                  sx={{
                    position: 'absolute',
                    left: -4,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 2,
                    bgcolor: isDark ? alpha('#000', 0.7) : alpha('#fff', 0.9),
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    width: 28,
                    height: 28,
                    '&:hover': {
                      bgcolor: isDark ? alpha('#000', 0.85) : 'white',
                    },
                  }}
                >
                  <ChevronLeft fontSize="small" />
                </IconButton>
              )}

              {/* Right Arrow */}
              {showRightArrow && (
                <IconButton
                  onClick={() => scrollFilters('right')}
                  size="small"
                  sx={{
                    position: 'absolute',
                    right: -4,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 2,
                    bgcolor: isDark ? alpha('#000', 0.7) : alpha('#fff', 0.9),
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    width: 28,
                    height: 28,
                    '&:hover': {
                      bgcolor: isDark ? alpha('#000', 0.85) : 'white',
                    },
                  }}
                >
                  <ChevronRight fontSize="small" />
                </IconButton>
              )}

              {/* Scrollable Chips */}
              <Box 
                ref={filterScrollRef}
                onScroll={handleFilterScroll}
                sx={{ 
                  display: 'flex', 
                  gap: 1, 
                  overflowX: 'auto',
                  py: 0.5,
                  px: 0.5,
                  scrollbarWidth: 'none',
                  '&::-webkit-scrollbar': { display: 'none' },
                }}
              >
                <Chip
                  label="All"
                  size="small"
                  onClick={() => setSelectedSubCategory('all')}
                  sx={{
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    height: 32,
                    px: 0.5,
                    flexShrink: 0,
                    bgcolor: selectedSubCategory === 'all' 
                      ? categoryTheme.primary 
                      : 'transparent',
                    color: selectedSubCategory === 'all' 
                      ? 'white' 
                      : 'text.secondary',
                    border: '1.5px solid',
                    borderColor: selectedSubCategory === 'all' 
                      ? categoryTheme.primary 
                      : isDark ? alpha('#fff', 0.2) : alpha('#000', 0.15),
                    '&:hover': {
                      bgcolor: selectedSubCategory === 'all' 
                        ? categoryTheme.secondary 
                        : isDark ? alpha('#fff', 0.1) : alpha('#000', 0.05),
                    },
                  }}
                />
                {availableSubCategories.map((subCat) => {
                  const subCatInfo = subCategoriesData[subCat];
                  const isSelected = selectedSubCategory === subCat;
                  
                  return (
                    <Chip
                      key={subCat}
                      label={subCatInfo?.name || subCat}
                      size="small"
                      onClick={() => setSelectedSubCategory(subCat)}
                      sx={{
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        height: 32,
                        px: 0.5,
                        flexShrink: 0,
                        bgcolor: isSelected 
                          ? categoryTheme.primary
                          : 'transparent',
                        color: isSelected 
                          ? 'white'
                          : 'text.secondary',
                        border: '1.5px solid',
                        borderColor: isSelected 
                          ? categoryTheme.primary
                          : isDark ? alpha('#fff', 0.2) : alpha('#000', 0.15),
                        '&:hover': {
                          bgcolor: isSelected 
                            ? categoryTheme.secondary
                            : isDark ? alpha('#fff', 0.1) : alpha('#000', 0.05),
                        },
                      }}
                    />
                  );
                })}
              </Box>
            </Box>
          )}

          {/* Results Count - Subtle */}
          {(searchQuery || selectedSubCategory !== 'all') && (
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
              }}
            >
              <Typography variant="caption" color="text.secondary">
                {filteredFoods.length} results
              </Typography>
              <Button 
                size="small" 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedSubCategory('all');
                }}
                sx={{ 
                  color: categoryTheme.primary,
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  minWidth: 'auto',
                  p: 0.5,
                }}
              >
                Clear
              </Button>
            </Box>
          )}
        </motion.div>

        {/* Food Grid */}
        {isLoading ? (
          <ShimmerGrid count={8} columns={4} />
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedSubCategory}-${searchQuery}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {filteredFoods.length === 0 ? (
                <Box 
                  sx={{ 
                    textAlign: 'center', 
                    py: 8,
                    px: 3,
                  }}
                >
                  <Typography 
                    sx={{ 
                      fontSize: '4rem', 
                      mb: 2,
                      filter: 'grayscale(50%)',
                    }}
                  >
                    🍽️
                  </Typography>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    No foods found
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {searchQuery 
                      ? `No results for "${searchQuery}"`
                      : 'Try selecting a different category'
                    }
                  </Typography>
                  <Button 
                    variant="contained"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedSubCategory('all');
                    }}
                    sx={{
                      background: categoryTheme.gradient,
                      borderRadius: 3,
                    }}
                  >
                    Show All
                  </Button>
                </Box>
              ) : (
                <Grid container spacing={2}>
                  {filteredFoods.map((food, index) => {
                    const riskColors = getRiskColor(food.healthImpact?.riskLevel);
                    const count = mealCounts[food.id] || 0;

                    return (
                      <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2.4 }} key={food.id}>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: Math.min(index * 0.03, 0.3) }}
                          whileHover={{ y: -6 }}
                        >
                          <Card
                            onClick={() => navigate(`/food/${food.id}`)}
                            sx={{
                              height: '100%',
                              borderRadius: 3,
                              overflow: 'hidden',
                              cursor: 'pointer',
                              position: 'relative',
                              background: isDark 
                                ? alpha(theme.palette.background.paper, 0.6)
                                : 'white',
                              backdropFilter: 'blur(10px)',
                              border: '1px solid',
                              borderColor: count > 0 
                                ? categoryTheme.primary 
                                : isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)',
                              boxShadow: count > 0
                                ? `0 8px 32px ${alpha(categoryTheme.primary, 0.25)}`
                                : isDark 
                                  ? '0 4px 20px rgba(0,0,0,0.3)'
                                  : '0 4px 20px rgba(0,0,0,0.08)',
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                borderColor: categoryTheme.primary,
                                boxShadow: `0 12px 40px ${alpha(categoryTheme.primary, 0.2)}`,
                              },
                            }}
                          >
                            {/* Quantity Badge */}
                            {count > 0 && (
                              <Box
                                sx={{
                                  position: 'absolute',
                                  top: 8,
                                  left: 8,
                                  zIndex: 10,
                                  width: 28,
                                  height: 28,
                                  borderRadius: '50%',
                                  bgcolor: categoryTheme.primary,
                                  color: 'white',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontWeight: 700,
                                  fontSize: '0.85rem',
                                  boxShadow: `0 4px 12px ${alpha(categoryTheme.primary, 0.5)}`,
                                }}
                              >
                                {count}
                              </Box>
                            )}

                            {/* Food Image */}
                            <Box 
                              sx={{ 
                                height: { xs: 100, sm: 120, md: 130 },
                                position: 'relative',
                                overflow: 'hidden',
                              }}
                            >
                              <Box
                                component="img"
                                src={getFoodImage(food.name)}
                                alt={food.name}
                                sx={{
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover',
                                  transition: 'transform 0.4s ease',
                                }}
                                onError={(e) => {
                                  e.target.src = foodImageDatabase.default;
                                }}
                              />
                              
                              {/* Gradient Overlay */}
                              <Box
                                sx={{
                                  position: 'absolute',
                                  bottom: 0,
                                  left: 0,
                                  right: 0,
                                  height: '50%',
                                  background: 'linear-gradient(transparent, rgba(0,0,0,0.5))',
                                }}
                              />

                              {/* Risk Badge */}
                              <Chip
                                size="small"
                                label={food.healthImpact?.riskLevel || 'Low'}
                                sx={{
                                  position: 'absolute',
                                  bottom: 8,
                                  right: 8,
                                  height: 22,
                                  bgcolor: riskColors.bg,
                                  color: riskColors.text,
                                  fontWeight: 700,
                                  fontSize: '0.65rem',
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.5px',
                                }}
                              />
                            </Box>

                            {/* Food Info */}
                            <Box sx={{ p: 1.5 }}>
                              <Typography 
                                variant="subtitle2" 
                                fontWeight={700} 
                                noWrap
                                sx={{ 
                                  mb: 0.5,
                                  fontSize: { xs: '0.8rem', sm: '0.85rem' },
                                }}
                              >
                                {food.name}
                              </Typography>

                              {/* Subcategory */}
                              {food.subCategory && subCategoriesData[food.subCategory] && (
                                <Typography 
                                  variant="caption" 
                                  sx={{ 
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 0.5,
                                    color: subCategoriesData[food.subCategory].textColor,
                                    fontWeight: 600,
                                    mb: 1,
                                  }}
                                >
                                  {subCategoriesData[food.subCategory].icon} {subCategoriesData[food.subCategory].name}
                                </Typography>
                              )}

                              {/* Nutrition Stats */}
                              <Box sx={{ display: 'flex', gap: 0.5, mb: 1.5 }}>
                                <Chip
                                  icon={<LocalFireDepartment sx={{ fontSize: '12px !important' }} />}
                                  size="small"
                                  label={`${food.nutrition.calories}`}
                                  sx={{ 
                                    height: 24,
                                    bgcolor: alpha('#ef4444', 0.1),
                                    color: '#ef4444',
                                    fontWeight: 700,
                                    fontSize: '0.7rem',
                                    '& .MuiChip-icon': { 
                                      color: '#ef4444',
                                      ml: 0.5,
                                    },
                                  }}
                                />
                                <Chip
                                  icon={<FitnessCenter sx={{ fontSize: '12px !important' }} />}
                                  size="small"
                                  label={`${food.nutrition.protein}g`}
                                  sx={{ 
                                    height: 24,
                                    bgcolor: alpha('#8b5cf6', 0.1),
                                    color: '#8b5cf6',
                                    fontWeight: 700,
                                    fontSize: '0.7rem',
                                    '& .MuiChip-icon': { 
                                      color: '#8b5cf6',
                                      ml: 0.5,
                                    },
                                  }}
                                />
                              </Box>

                              {/* Add Button */}
                              <Box 
                                onClick={(e) => e.stopPropagation()}
                                sx={{ display: 'flex', justifyContent: 'center' }}
                              >
                                <QuantityButton
                                  count={count}
                                  onAdd={(e) => handleAddMeal(food, e)}
                                  onRemove={(e) => handleRemoveOneMeal(food.id, e)}
                                  size="small"
                                />
                              </Box>
                            </Box>
                          </Card>
                        </motion.div>
                      </Grid>
                    );
                  })}
                </Grid>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </Box>
    </Box>
  );
};

export default FoodCategory;
