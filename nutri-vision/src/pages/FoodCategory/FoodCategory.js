import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  IconButton,
  Chip,
  Button,
  TextField,
  InputAdornment,
  Paper,
  Collapse,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { ArrowBack, Add, Search, FilterList, ExpandMore, ExpandLess } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { foods, foodCategories } from '../../data/foodsData';
import { vegFoodsDatabase, vegSubCategories } from '../../data/vegFoodsDatabase';
import { nonVegFoodsDatabase, nonVegSubCategories } from '../../data/nonVegFoodsDatabase';
import { useMeals } from '../../context/MealsContext';

const FoodCategory = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { addMeal } = useMeals();

  // State for search and filtering
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);
  
  const category = foodCategories[categoryId];
  const categoryFoods = useMemo(() => {
    // Use the new comprehensive databases for specific categories
    if (categoryId === 'veg') {
      console.log(`Loading foods for veg category: ${vegFoodsDatabase.length} items from vegFoodsDatabase`);
      return vegFoodsDatabase;
    }
    
    if (categoryId === 'nonVeg') {
      console.log(`Loading foods for non-veg category: ${nonVegFoodsDatabase.length} items from nonVegFoodsDatabase`);
      return nonVegFoodsDatabase;
    }
    
    const foodData = foods[categoryId] || [];
    console.log(`Loading foods for category '${categoryId}':`, foodData.length, 'items');
    
    return foodData;
  }, [categoryId]);
  const isVegCategory = categoryId === 'veg';
  const isNonVegCategory = categoryId === 'nonVeg';

  // Filter foods based on search and subcategory
  const filteredFoods = useMemo(() => {
    console.log('Filtering foods...', { 
      totalFoods: categoryFoods.length, 
      searchQuery, 
      selectedSubCategory 
    });
    
    let result = [...categoryFoods]; // Create a copy to avoid mutations
    
    // Filter by subcategory first (faster)
    if ((isVegCategory || isNonVegCategory) && selectedSubCategory !== 'all') {
      result = result.filter(food => {
        const hasSubCategory = food.subCategory === selectedSubCategory;
        return hasSubCategory;
      });
      console.log(`After subcategory filter (${selectedSubCategory}):`, result.length);
    }
    
    // Then filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(food => {
        const nameMatch = food.name.toLowerCase().includes(query);
        const descMatch = food.description?.toLowerCase().includes(query);
        const ingredientsMatch = food.ingredients?.some(ing => 
          ing.toLowerCase().includes(query)
        );
        const subCatMatch = food.subCategory?.toLowerCase().includes(query);
        
        return nameMatch || descMatch || ingredientsMatch || subCatMatch;
      });
      console.log(`After search filter ("${query}"):`, result.length);
    }
    
    return result;
  }, [categoryFoods, selectedSubCategory, searchQuery, isVegCategory, isNonVegCategory]);

  // Get available subcategories for this category
  const availableSubCategories = useMemo(() => {
    if (!isVegCategory && !isNonVegCategory) return [];
    const subCats = [...new Set(categoryFoods.map(food => food.subCategory).filter(Boolean))];
    console.log('Available subcategories:', subCats);
    return subCats;
  }, [categoryFoods, isVegCategory, isNonVegCategory]);

  // Get subcategories data based on category
  const subCategoriesData = useMemo(() => {
    if (isVegCategory) {
      return vegSubCategories || {};
    }
    if (isNonVegCategory) {
      return nonVegSubCategories || {};
    }
    return {};
  }, [isVegCategory, isNonVegCategory]);

  // Handle subcategory change with immediate feedback
  const handleSubCategoryChange = (event, newValue) => {
    if (newValue !== null) {
      console.log('Changing subcategory from', selectedSubCategory, 'to', newValue);
      setIsFiltering(true);
      setSelectedSubCategory(newValue);
      // Reset filtering state after a short delay
      setTimeout(() => setIsFiltering(false), 100);
    }
  };

  // Handle search with immediate response
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setIsFiltering(true);
    setSearchQuery(value);
    console.log('Search query changed:', value);
    // Reset filtering state after a short delay
    setTimeout(() => setIsFiltering(false), 150);
  };

  const handleAddMeal = (food, event) => {
    event.stopPropagation();
    addMeal(food);
  };

  const getRiskColor = (riskLevel) => {
    switch (riskLevel?.toLowerCase()) {
      case 'low': return 'success';
      case 'medium': return 'warning';
      case 'high': return 'error';
      default: return 'default';
    }
  };

  if (!category) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" color="error">
          Category not found
        </Typography>
        <Button onClick={() => navigate('/dashboard')} startIcon={<ArrowBack />}>
          Back to Dashboard
        </Button>
      </Box>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton onClick={() => navigate('/dashboard')}>
              <ArrowBack />
            </IconButton>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="h2">{category.icon}</Typography>
              <Typography variant="h4" fontWeight={600}>
                {category.name}
              </Typography>
            </Box>
          </Box>

          {/* Interactive Category Legend - Show for Veg and Non-Veg Categories */}
          {(isVegCategory || isNonVegCategory) && (
            <Paper 
              elevation={3}
              sx={{ 
                p: 2, 
                borderRadius: 3, 
                background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                border: '2px solid rgba(34, 197, 94, 0.2)',
                maxWidth: 400,
                boxShadow: '0 8px 32px rgba(34, 197, 94, 0.1)'
              }}
            >
              <Typography 
                variant="subtitle2" 
                fontWeight={700} 
                sx={{ 
                  mb: 1.5, 
                  color: isVegCategory ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)',
                  textAlign: 'center'
                }}
              >
                🎨 Click to Filter by Category
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                {Object.entries(subCategoriesData).map(([key, data]) => (
                  <Chip
                    key={key}
                    icon={<span style={{ fontSize: '16px' }}>{data.icon}</span>}
                    label={data.name}
                    size="small"
                    clickable
                    onClick={() => {
                      setSelectedSubCategory(key);
                      setIsFiltering(true);
                      setTimeout(() => setIsFiltering(false), 100);
                    }}
                    sx={{
                      backgroundColor: selectedSubCategory === key ? data.color : `${data.color}80`,
                      color: data.textColor,
                      fontWeight: selectedSubCategory === key ? 700 : 600,
                      border: selectedSubCategory === key ? `2px solid ${data.textColor}` : `1px solid ${data.textColor}`,
                      '& .MuiChip-icon': { color: data.textColor },
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        backgroundColor: data.color,
                        transform: 'scale(1.05)',
                        boxShadow: `0 2px 8px ${data.textColor}40`
                      }
                    }}
                  />
                ))}
              </Box>
              {/* Clear Filter Button */}
              {selectedSubCategory !== 'all' && (
                <Box sx={{ textAlign: 'center', mt: 1.5 }}>
                  <Chip
                    icon={<span style={{ fontSize: '16px' }}>🍽️</span>}
                    label="Show All"
                    size="small"
                    clickable
                    onClick={() => {
                      setSelectedSubCategory('all');
                      setIsFiltering(true);
                      setTimeout(() => setIsFiltering(false), 100);
                    }}
                    sx={{
                      backgroundColor: '#e0f2fe',
                      color: '#0277bd',
                      fontWeight: 600,
                      border: '1px solid #0277bd',
                      '& .MuiChip-icon': { color: '#0277bd' },
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        backgroundColor: '#b3e5fc',
                        transform: 'scale(1.05)',
                        boxShadow: '0 2px 8px rgba(2, 119, 189, 0.3)'
                      }
                    }}
                  />
                </Box>
              )}
            </Paper>
          )}
        </Box>
      </motion.div>

      {/* Search and Filter Section - Show for Veg and Non-Veg Categories */}
      {(isVegCategory || isNonVegCategory) && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Paper elevation={2} sx={{ mb: 3, overflow: 'hidden' }}>
            {/* Debug Info */}
            {process.env.NODE_ENV === 'development' && (
              <Box sx={{ p: 2, bgcolor: 'info.main', color: 'white' }}>
                <Typography variant="caption">
                  Debug: Category={categoryId} | Total Foods: {categoryFoods.length} | 
                  Filtered: {filteredFoods.length} | Search: "{searchQuery}" | SubCategory: {selectedSubCategory}
                </Typography>
              </Box>
            )}
            {/* Search Bar */}
            <Box sx={{ p: 3, pb: showFilters ? 2 : 3 }}>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder={`Search for ${isVegCategory ? 'vegetarian' : 'non-vegetarian'} foods...`}
                  value={searchQuery}
                  onChange={handleSearchChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search color="action" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                    }
                  }}
                />
                <Button
                  variant="outlined"
                  startIcon={showFilters ? <ExpandLess /> : <ExpandMore />}
                  onClick={() => setShowFilters(!showFilters)}
                  sx={{ 
                    borderRadius: 3,
                    minWidth: 'auto',
                    px: 2
                  }}
                >
                  <FilterList />
                </Button>
              </Box>
            </Box>

            {/* Category Filters */}
            <Collapse in={showFilters}>
              <Box sx={{ px: 3, pb: 3 }}>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
                  Filter by Category:
                </Typography>
                <ToggleButtonGroup
                  value={selectedSubCategory}
                  exclusive
                  onChange={handleSubCategoryChange}
                  sx={{ 
                    flexWrap: 'wrap',
                    gap: 1,
                    '& .MuiToggleButton-root': {
                      margin: 0.5,
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                      '&.Mui-selected': {
                        backgroundColor: 'rgba(34, 197, 94, 0.2)',
                        color: 'rgb(34, 197, 94)',
                        fontWeight: 700,
                      }
                    }
                  }}
                >
                  <ToggleButton 
                    value="all" 
                    sx={{ 
                      borderRadius: 3,
                      px: 2,
                      textTransform: 'none',
                      fontWeight: 600,
                    }}
                  >
                    🍽️ All ({categoryFoods.length})
                  </ToggleButton>
                  {availableSubCategories.map((subCat) => {
                    const subCatInfo = subCategoriesData[subCat];
                    const count = categoryFoods.filter(f => f.subCategory === subCat).length;
                    const isSelected = selectedSubCategory === subCat;
                    return (
                      <ToggleButton
                        key={subCat}
                        value={subCat}
                        sx={{
                          borderRadius: 3,
                          px: 2,
                          textTransform: 'none',
                          fontWeight: 600,
                          backgroundColor: isSelected 
                            ? subCatInfo?.color || 'rgba(34, 197, 94, 0.2)' 
                            : 'transparent',
                          color: isSelected 
                            ? subCatInfo?.textColor || 'rgb(34, 197, 94)' 
                            : 'text.primary',
                          border: `1px solid ${subCatInfo?.textColor || 'rgba(34, 197, 94, 0.5)'}`,
                          '&:hover': {
                            backgroundColor: subCatInfo?.color || 'rgba(34, 197, 94, 0.1)',
                            color: subCatInfo?.textColor || 'rgb(34, 197, 94)',
                            transform: 'scale(1.05)',
                          },
                          '&.Mui-selected': {
                            backgroundColor: subCatInfo?.color || 'rgba(34, 197, 94, 0.2)',
                            color: subCatInfo?.textColor || 'rgb(34, 197, 94)',
                            fontWeight: 700,
                          }
                        }}
                      >
                        {subCatInfo?.icon || '🍴'} {subCatInfo?.name || subCat} ({count})
                      </ToggleButton>
                    );
                  })}
                </ToggleButtonGroup>
              </Box>
            </Collapse>

            {/* Results Summary */}
            {(searchQuery || selectedSubCategory !== 'all') && (
              <Box sx={{ mt: 2, p: 2, backgroundColor: 'rgba(34, 197, 94, 0.1)', borderRadius: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Showing {filteredFoods.length} of {categoryFoods.length} items
                  {searchQuery && ` for "${searchQuery}"`}
                  {selectedSubCategory !== 'all' && ` in ${subCategoriesData[selectedSubCategory]?.name || selectedSubCategory}`}
                  <Button 
                    size="small" 
                    sx={{ ml: 2 }}
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedSubCategory('all');
                      setIsFiltering(true);
                      setTimeout(() => setIsFiltering(false), 100);
                    }}
                  >
                    Clear All Filters
                  </Button>
                </Typography>
              </Box>
            )}
          </Paper>
        </motion.div>
      )}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        key={`${selectedSubCategory}-${searchQuery}`} // Force re-animation on filter change
      >
        {/* Loading indicator */}
        {isFiltering && (
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Filtering foods...
            </Typography>
          </Box>
        )}

        <Grid container spacing={3}>
          {filteredFoods.map((food, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={`${food.id}-${index}`}>
              <motion.div 
                variants={cardVariants}
                transition={{ delay: index * 0.05 }} // Staggered animation
              >
                <Card
                  sx={{
                    height: '100%',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 3,
                    },
                    cursor: 'pointer',
                  }}
                >
                  <CardActionArea onClick={() => navigate(`/food/${food.id}`)}>
                    <CardContent>
                      <Box sx={{ textAlign: 'center', mb: 2 }}>
                        <Typography variant="h2">{food.image}</Typography>
                      </Box>
                      <Typography variant="h6" fontWeight={600} gutterBottom>
                        {food.name}
                      </Typography>
                      
                      {/* Subcategory Chip */}
                      {food.subCategory && (
                        <Box sx={{ mb: 2 }}>
                          <Chip
                            size="small"
                            label={`${subCategoriesData[food.subCategory]?.icon || '🍴'} ${subCategoriesData[food.subCategory]?.name || food.subCategory}`}
                            sx={{ 
                              backgroundColor: subCategoriesData[food.subCategory]?.color || 'rgba(34, 197, 94, 0.1)',
                              color: subCategoriesData[food.subCategory]?.textColor || 'rgb(34, 197, 94)',
                              fontWeight: 600,
                              border: `1px solid ${subCategoriesData[food.subCategory]?.textColor || 'rgb(34, 197, 94)'}40`,
                            }}
                          />
                        </Box>
                      )}

                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                        <Chip
                          size="small"
                          label={`${food.nutrition.calories} kcal`}
                          color="primary"
                          variant="outlined"
                        />
                        <Chip
                          size="small"
                          label={`${food.nutrition.protein}g protein`}
                          color="secondary"
                          variant="outlined"
                        />
                      </Box>
                      <Chip
                        size="small"
                        label={`Risk: ${food.healthImpact.riskLevel}`}
                        color={getRiskColor(food.healthImpact.riskLevel)}
                      />
                    </CardContent>
                  </CardActionArea>
                  <Box sx={{ px: 2, pb: 2 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<Add />}
                      onClick={(e) => handleAddMeal(food, e)}
                      sx={{
                        background: category.gradient,
                        '&:hover': {
                          background: category.gradient,
                          filter: 'brightness(1.1)',
                        },
                      }}
                    >
                      Add to Meals
                    </Button>
                  </Box>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>

      {/* No Results Message */}
      {filteredFoods.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Paper sx={{ p: 4, textAlign: 'center', mt: 3 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No foods found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {searchQuery 
                ? `No results for "${searchQuery}". Try a different search term.`
                : 'No foods available in this category.'
              }
            </Typography>
            {(searchQuery || selectedSubCategory !== 'all') && (
              <Button 
                variant="outlined" 
                sx={{ mt: 2 }}
                onClick={() => {
                  setSearchQuery('');
                  setSelectedSubCategory('all');
                  setIsFiltering(true);
                  setTimeout(() => setIsFiltering(false), 100);
                }}
              >
                Clear All Filters
              </Button>
            )}
          </Paper>
        </motion.div>
      )}
    </Box>
  );
};

export default FoodCategory;
