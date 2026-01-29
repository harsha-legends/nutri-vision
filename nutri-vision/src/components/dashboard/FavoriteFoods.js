import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Avatar,
  Tooltip,
  useTheme,
  alpha,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Favorite,
  Delete,
  FreeBreakfast,
  LunchDining,
  DinnerDining,
  Icecream,
  MoreVert,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useMeals } from '../../context/MealsContext';
import { getAllFoods } from '../../data/foodsData';

const mealTypeIcons = {
  breakfast: <FreeBreakfast fontSize="small" />,
  lunch: <LunchDining fontSize="small" />,
  dinner: <DinnerDining fontSize="small" />,
  snack: <Icecream fontSize="small" />,
};

const mealTypeColors = {
  breakfast: '#f59e0b',
  lunch: '#22c55e',
  dinner: '#8b5cf6',
  snack: '#ec4899',
};

const FavoriteFoods = ({ onAddMeal }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { addMeal } = useMeals();
  const [favorites, setFavorites] = useState([]);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedFood, setSelectedFood] = useState(null);

  // Load favorites from localStorage or set defaults
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('nutriVisionFavorites') || '[]');
    
    // If no favorites, add some popular defaults
    if (storedFavorites.length === 0) {
      const allFoods = getAllFoods();
      const defaultFavorites = allFoods.slice(0, 6).map(food => ({
        id: food.id,
        name: food.name,
        nutrition: food.nutrition,
        image: food.image,
        category: food.category,
      }));
      saveFavorites(defaultFavorites);
    } else {
      setFavorites(storedFavorites);
    }
  }, []);

  // Save favorites to localStorage
  const saveFavorites = (newFavorites) => {
    localStorage.setItem('nutriVisionFavorites', JSON.stringify(newFavorites));
    setFavorites(newFavorites);
  };

  const handleRemoveFavorite = (foodId) => {
    saveFavorites(favorites.filter(f => f.id !== foodId));
    handleCloseMenu();
  };

  const handleQuickAdd = async (food, mealType) => {
    await addMeal(food, mealType);
    handleCloseMenu();
    if (onAddMeal) onAddMeal(food);
  };

  const handleOpenMenu = (event, food) => {
    event.stopPropagation();
    setMenuAnchor(event.currentTarget);
    setSelectedFood(food);
  };

  const handleCloseMenu = () => {
    setMenuAnchor(null);
    setSelectedFood(null);
  };

  if (favorites.length === 0) {
    return (
      <Card
        sx={{
          background: isDark
            ? 'linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(219, 39, 119, 0.05) 100%)'
            : 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)',
          border: `1px solid ${alpha('#ec4899', 0.2)}`,
          borderRadius: 3,
        }}
      >
        <CardContent sx={{ textAlign: 'center', py: 4 }}>
          <Favorite sx={{ fontSize: 48, color: alpha('#ec4899', 0.3), mb: 2 }} />
          <Typography variant="h6" fontWeight={600} gutterBottom>
            No Favorites Yet
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Add foods to your favorites for quick access!
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        background: isDark
          ? 'linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(219, 39, 119, 0.05) 100%)'
          : 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)',
        border: `1px solid ${alpha('#ec4899', 0.2)}`,
        borderRadius: 3,
      }}
    >
      <CardContent>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Favorite sx={{ color: '#ec4899', fontSize: 24 }} />
          <Typography variant="h6" fontWeight={700}>
            Quick Add Favorites
          </Typography>
          <Chip
            label={favorites.length}
            size="small"
            sx={{
              bgcolor: alpha('#ec4899', 0.2),
              color: '#ec4899',
              fontWeight: 600,
            }}
          />
        </Box>

        {/* Favorites Grid */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          <AnimatePresence>
            {favorites.slice(0, 8).map((food, index) => (
              <motion.div
                key={food.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Tooltip title={`${food.name} - ${food.nutrition?.calories || 0} kcal`}>
                  <Chip
                    avatar={
                      food.image ? (
                        <Avatar src={food.image} alt={food.name} />
                      ) : (
                        <Avatar sx={{ bgcolor: '#ec4899' }}>
                          {food.name?.charAt(0)}
                        </Avatar>
                      )
                    }
                    label={food.name?.length > 12 ? `${food.name.slice(0, 12)}...` : food.name}
                    onClick={(e) => handleOpenMenu(e, food)}
                    onDelete={(e) => handleOpenMenu(e, food)}
                    deleteIcon={<MoreVert fontSize="small" />}
                    sx={{
                      bgcolor: isDark ? alpha('#fff', 0.1) : 'white',
                      '&:hover': {
                        bgcolor: isDark ? alpha('#fff', 0.15) : alpha('#ec4899', 0.1),
                      },
                      transition: 'all 0.2s ease',
                    }}
                  />
                </Tooltip>
              </motion.div>
            ))}
          </AnimatePresence>
        </Box>

        {favorites.length > 8 && (
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            +{favorites.length - 8} more favorites
          </Typography>
        )}
      </CardContent>

      {/* Context Menu */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleCloseMenu}
        PaperProps={{
          sx: {
            borderRadius: 2,
            minWidth: 180,
          },
        }}
      >
        <Typography variant="caption" color="text.secondary" sx={{ px: 2, py: 1, display: 'block' }}>
          Add to meal:
        </Typography>
        {['breakfast', 'lunch', 'dinner', 'snack'].map((mealType) => (
          <MenuItem
            key={mealType}
            onClick={() => handleQuickAdd(selectedFood, mealType)}
            sx={{
              '&:hover': {
                bgcolor: alpha(mealTypeColors[mealType], 0.1),
              },
            }}
          >
            <ListItemIcon sx={{ color: mealTypeColors[mealType] }}>
              {mealTypeIcons[mealType]}
            </ListItemIcon>
            <ListItemText
              primary={mealType.charAt(0).toUpperCase() + mealType.slice(1)}
              sx={{ textTransform: 'capitalize' }}
            />
          </MenuItem>
        ))}
        <MenuItem
          onClick={() => handleRemoveFavorite(selectedFood?.id)}
          sx={{
            color: 'error.main',
            '&:hover': { bgcolor: alpha('#ef4444', 0.1) },
          }}
        >
          <ListItemIcon sx={{ color: 'error.main' }}>
            <Delete fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Remove" />
        </MenuItem>
      </Menu>
    </Card>
  );
};

// Helper function to add food to favorites (export for use in other components)
export const addToFavorites = (food) => {
  const favorites = JSON.parse(localStorage.getItem('nutriVisionFavorites') || '[]');
  const exists = favorites.find(f => f.id === food.id);
  if (!exists) {
    favorites.push(food);
    localStorage.setItem('nutriVisionFavorites', JSON.stringify(favorites));
    return true;
  }
  return false;
};

export const removeFromFavorites = (foodId) => {
  const favorites = JSON.parse(localStorage.getItem('nutriVisionFavorites') || '[]');
  const newFavorites = favorites.filter(f => f.id !== foodId);
  localStorage.setItem('nutriVisionFavorites', JSON.stringify(newFavorites));
};

export const isFavorite = (foodId) => {
  const favorites = JSON.parse(localStorage.getItem('nutriVisionFavorites') || '[]');
  return favorites.some(f => f.id === foodId);
};

export default FavoriteFoods;
