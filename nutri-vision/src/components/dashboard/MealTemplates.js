import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Avatar,
  AvatarGroup,
  useTheme,
  alpha,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  FormControl,
  InputLabel,
  Select,
  Autocomplete,
  Chip,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Add,
  Delete,
  PlayArrow,
  MoreVert,
  Bookmark,
  BookmarkBorder,
  ContentCopy,
  FreeBreakfast,
  LunchDining,
  DinnerDining,
  Icecream,
  Search,
  Star,
  StarBorder,
  Restaurant,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useMeals } from '../../context/MealsContext';
import { getAllFoods } from '../../data/foodsData';
import { templateService } from '../../services';

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

// Helper function to safely get meal type color
const getMealTypeColor = (mealType) => {
  const key = mealType?.toLowerCase();
  return mealTypeColors[key] || '#6366f1'; // Default to purple if not found
};

// Helper function to safely get meal type icon
const getMealTypeIcon = (mealType) => {
  const key = mealType?.toLowerCase();
  return mealTypeIcons[key] || <Restaurant fontSize="small" />;
};

const MealTemplates = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { addMeal, todaysMeals } = useMeals();
  
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [templateName, setTemplateName] = useState('');
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  
  // New states for creating template from scratch
  const [createMode, setCreateMode] = useState('today'); // 'today' or 'scratch'
  const [selectedMealType, setSelectedMealType] = useState('breakfast');
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [allFoods, setAllFoods] = useState([]);

  // Load templates from API
  const loadTemplates = useCallback(async () => {
    try {
      setLoading(true);
      const response = await templateService.getTemplates();
      if (response.success) {
        setTemplates(response.templates);
      }
    } catch (error) {
      console.error('Error loading templates:', error);
      // Fallback to localStorage if API fails
      const stored = JSON.parse(localStorage.getItem('nutriVisionMealTemplates') || '[]');
      setTemplates(stored);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTemplates();
    // Load all foods for search
    setAllFoods(getAllFoods());
  }, [loadTemplates]);

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const closeSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Create template from today's meals for a specific meal type
  const createTemplateFromToday = async (mealType) => {
    // Match meal type case-insensitively
    const mealsOfType = todaysMeals.filter(m => 
      m.mealType?.toLowerCase() === mealType.toLowerCase()
    );
    
    console.log('Creating template for:', mealType, 'Found meals:', mealsOfType);
    
    if (mealsOfType.length === 0) {
      console.log('No meals found for type:', mealType);
      showSnackbar('No meals found for this meal type', 'warning');
      return;
    }

    const templateData = {
      name: templateName || `My ${mealType.charAt(0).toUpperCase() + mealType.slice(1)}`,
      mealType: mealType.toLowerCase(),
      foods: mealsOfType.map(m => ({
        foodId: m.id || m._id,
        name: m.name,
        image: m.image,
        nutrition: m.nutrition,
        quantity: m.quantity || 1,
      })),
    };

    setLoading(true);
    try {
      console.log('Saving template:', templateData);
      const newTemplate = await templateService.createTemplate(templateData);
      setTemplates(prev => [...prev, newTemplate]);
      setDialogOpen(false);
      setTemplateName('');
      showSnackbar('Template created successfully!', 'success');
    } catch (error) {
      console.error('Error creating template:', error);
      showSnackbar('Failed to create template', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Create template from scratch with selected foods
  const createTemplateFromScratch = async () => {
    if (selectedFoods.length === 0 || !templateName.trim()) {
      showSnackbar('Please enter a template name and select at least one food', 'warning');
      return;
    }

    const templateData = {
      name: templateName.trim(),
      mealType: selectedMealType,
      foods: selectedFoods.map(food => ({
        foodId: food.id || food._id,
        name: food.name,
        image: food.image,
        nutrition: food.nutrition,
        quantity: 1,
      })),
    };

    setLoading(true);
    try {
      const newTemplate = await templateService.createTemplate(templateData);
      setTemplates(prev => [...prev, newTemplate]);
      resetDialog();
      showSnackbar('Template created successfully!', 'success');
    } catch (error) {
      console.error('Error creating template:', error);
      showSnackbar('Failed to create template', 'error');
    } finally {
      setLoading(false);
    }
  };

  const resetDialog = () => {
    setDialogOpen(false);
    setTemplateName('');
    setCreateMode('today');
    setSelectedMealType('breakfast');
    setSelectedFoods([]);
  };

  const addFoodToSelection = (food) => {
    if (food && !selectedFoods.some(f => f.id === food.id)) {
      setSelectedFoods(prev => [...prev, food]);
    }
  };

  const removeFoodFromSelection = (foodId) => {
    setSelectedFoods(prev => prev.filter(f => f.id !== foodId));
  };

  // Apply a template - add all foods from template and track usage
  const applyTemplate = async (template) => {
    setLoading(true);
    try {
      for (const food of template.foods) {
        await addMeal(food, template.mealType, food.quantity || 1);
      }
      // Track template usage in backend
      await templateService.useTemplate(template._id || template.id);
      // Update local state with incremented usage count
      setTemplates(prev => prev.map(t => 
        (t._id || t.id) === (template._id || template.id) 
          ? { ...t, usageCount: (t.usageCount || 0) + 1 }
          : t
      ));
      showSnackbar('Template applied successfully!', 'success');
    } catch (error) {
      console.error('Error applying template:', error);
      showSnackbar('Failed to apply template', 'error');
    } finally {
      setLoading(false);
      handleCloseMenu();
    }
  };

  const deleteTemplate = async (templateId) => {
    setLoading(true);
    try {
      await templateService.deleteTemplate(templateId);
      setTemplates(prev => prev.filter(t => (t._id || t.id) !== templateId));
      showSnackbar('Template deleted successfully!', 'success');
    } catch (error) {
      console.error('Error deleting template:', error);
      showSnackbar('Failed to delete template', 'error');
    } finally {
      setLoading(false);
      handleCloseMenu();
    }
  };

  const duplicateTemplate = async (template) => {
    setLoading(true);
    try {
      const duplicatedTemplate = await templateService.duplicateTemplate(template._id || template.id);
      setTemplates(prev => [...prev, duplicatedTemplate]);
      showSnackbar('Template duplicated successfully!', 'success');
    } catch (error) {
      console.error('Error duplicating template:', error);
      showSnackbar('Failed to duplicate template', 'error');
    } finally {
      setLoading(false);
      handleCloseMenu();
    }
  };

  const toggleFavorite = async (template) => {
    try {
      const updatedTemplate = await templateService.toggleFavorite(template._id || template.id);
      setTemplates(prev => prev.map(t => 
        (t._id || t.id) === (updatedTemplate._id || updatedTemplate.id) 
          ? updatedTemplate 
          : t
      ));
    } catch (error) {
      console.error('Error toggling favorite:', error);
      showSnackbar('Failed to update favorite', 'error');
    }
  };

  const handleOpenMenu = (event, template) => {
    setMenuAnchor(event.currentTarget);
    setSelectedTemplate(template);
  };

  const handleCloseMenu = () => {
    setMenuAnchor(null);
    setSelectedTemplate(null);
  };

  const openCreateDialog = () => {
    setTemplateName('');
    setCreateMode('today');
    setSelectedMealType('breakfast');
    setSelectedFoods([]);
    setDialogOpen(true);
  };

  // Group today's meals by type for template creation
  const mealsByType = ['breakfast', 'lunch', 'dinner', 'snack'].map(type => ({
    type,
    meals: todaysMeals.filter(m => m.mealType?.toLowerCase() === type),
    count: todaysMeals.filter(m => m.mealType?.toLowerCase() === type).length,
  })).filter(g => g.count > 0);

  return (
    <>
      <Card
        sx={{
          background: isDark
            ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(79, 70, 229, 0.1) 100%)'
            : 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)',
          border: `1px solid ${alpha('#6366f1', 0.2)}`,
          borderRadius: 3,
        }}
      >
        <CardContent>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Bookmark sx={{ color: '#6366f1', fontSize: 24 }} />
              <Typography variant="h6" fontWeight={700}>
                Meal Templates
              </Typography>
            </Box>
            <Button
              size="small"
              startIcon={<Add />}
              onClick={openCreateDialog}
              sx={{
                bgcolor: alpha('#6366f1', 0.1),
                color: '#6366f1',
                '&:hover': { bgcolor: alpha('#6366f1', 0.2) },
              }}
            >
              Create
            </Button>
          </Box>

          {templates.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 3 }}>
              <BookmarkBorder sx={{ fontSize: 48, color: alpha('#6366f1', 0.3), mb: 1 }} />
              <Typography variant="body2" color="text.secondary">
                Save your favorite meal combos as templates for quick logging!
              </Typography>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <AnimatePresence>
                {templates.slice(0, 5).map((template, index) => (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card
                      sx={{
                        p: 1.5,
                        bgcolor: isDark ? alpha('#fff', 0.05) : 'white',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                      }}
                    >
                      {/* Meal Type Icon */}
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: 2,
                          bgcolor: alpha(getMealTypeColor(template.mealType), 0.1),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: getMealTypeColor(template.mealType),
                        }}
                      >
                        {getMealTypeIcon(template.mealType)}
                      </Box>

                      {/* Template Info */}
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="body2" fontWeight={600} noWrap>
                          {template.name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="caption" color="text.secondary">
                            {template.foods?.length || 0} items
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            •
                          </Typography>
                          <Typography variant="caption" color={getMealTypeColor(template.mealType)}>
                            {template.totalCalories || 0} kcal
                          </Typography>
                        </Box>
                      </Box>

                      {/* Food Avatars */}
                      <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { width: 24, height: 24, fontSize: 10 } }}>
                        {(template.foods || []).map((food, i) => (
                          <Avatar key={food.foodId || food.id || i} src={food.image} alt={food.name}>
                            {food.name?.charAt(0)}
                          </Avatar>
                        ))}
                      </AvatarGroup>

                      {/* Actions */}
                      <Tooltip title={template.isFavorite ? "Remove from favorites" : "Add to favorites"}>
                        <IconButton
                          size="small"
                          onClick={() => toggleFavorite(template)}
                          sx={{
                            color: template.isFavorite ? '#f59e0b' : 'text.secondary',
                          }}
                        >
                          {template.isFavorite ? <Star fontSize="small" /> : <StarBorder fontSize="small" />}
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Use this template">
                        <IconButton
                          size="small"
                          onClick={() => applyTemplate(template)}
                          sx={{
                            bgcolor: alpha('#22c55e', 0.1),
                            color: '#22c55e',
                            '&:hover': { bgcolor: alpha('#22c55e', 0.2) },
                          }}
                        >
                          <PlayArrow fontSize="small" />
                        </IconButton>
                      </Tooltip>

                      <IconButton size="small" onClick={(e) => handleOpenMenu(e, template)}>
                        <MoreVert fontSize="small" />
                      </IconButton>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>

              {templates.length > 5 && (
                <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center' }}>
                  +{templates.length - 5} more templates
                </Typography>
              )}
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Create Template Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={resetDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Bookmark sx={{ color: '#6366f1' }} />
            Create Meal Template
          </Box>
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Template Name"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            sx={{ mb: 3, mt: 1 }}
            placeholder="e.g., My Power Breakfast"
          />

          {/* Mode Toggle */}
          <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
            <Button
              variant={createMode === 'today' ? 'contained' : 'outlined'}
              onClick={() => setCreateMode('today')}
              sx={{
                flex: 1,
                bgcolor: createMode === 'today' ? '#6366f1' : 'transparent',
                borderColor: '#6366f1',
                color: createMode === 'today' ? 'white' : '#6366f1',
                '&:hover': {
                  bgcolor: createMode === 'today' ? '#5558e6' : alpha('#6366f1', 0.1),
                },
              }}
            >
              From Today's Meals
            </Button>
            <Button
              variant={createMode === 'scratch' ? 'contained' : 'outlined'}
              onClick={() => setCreateMode('scratch')}
              sx={{
                flex: 1,
                bgcolor: createMode === 'scratch' ? '#6366f1' : 'transparent',
                borderColor: '#6366f1',
                color: createMode === 'scratch' ? 'white' : '#6366f1',
                '&:hover': {
                  bgcolor: createMode === 'scratch' ? '#5558e6' : alpha('#6366f1', 0.1),
                },
              }}
            >
              Create New
            </Button>
          </Box>

          {createMode === 'today' ? (
            <>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Save today's meals as a template:
              </Typography>

              {mealsByType.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 3, bgcolor: alpha('#6366f1', 0.05), borderRadius: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    No meals logged today. Add some meals first, or create a new template from scratch!
                  </Typography>
                </Box>
              ) : (
                <List>
                  {mealsByType.map((group) => (
                    <ListItem
                      key={group.type}
                      sx={{
                        bgcolor: alpha(mealTypeColors[group.type], 0.05),
                        borderRadius: 2,
                        mb: 1,
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 2 }}>
                        <Box sx={{ color: mealTypeColors[group.type] }}>
                          {mealTypeIcons[group.type]}
                        </Box>
                      </Box>
                      <ListItemText
                        primary={group.type.charAt(0).toUpperCase() + group.type.slice(1)}
                        secondary={`${group.count} items`}
                      />
                      <ListItemSecondaryAction>
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() => {
                            createTemplateFromToday(group.type);
                          }}
                          sx={{
                            bgcolor: mealTypeColors[group.type],
                            '&:hover': { bgcolor: alpha(mealTypeColors[group.type], 0.8) },
                          }}
                        >
                          Save
                        </Button>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              )}
            </>
          ) : (
            <>
              {/* Meal Type Selection */}
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Meal Type</InputLabel>
                <Select
                  value={selectedMealType}
                  label="Meal Type"
                  onChange={(e) => setSelectedMealType(e.target.value)}
                >
                  {['breakfast', 'lunch', 'dinner', 'snack'].map((type) => (
                    <MenuItem key={type} value={type}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ color: mealTypeColors[type] }}>{mealTypeIcons[type]}</Box>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Food Search */}
              <Autocomplete
                options={allFoods}
                getOptionLabel={(option) => option?.name || ''}
                onChange={(event, value, reason) => {
                  if (value && reason === 'selectOption') {
                    addFoodToSelection(value);
                  }
                }}
                filterOptions={(options, { inputValue }) => {
                  if (inputValue.length < 2) return [];
                  return options.filter(option =>
                    option.name.toLowerCase().includes(inputValue.toLowerCase())
                  ).slice(0, 10);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search Foods"
                    placeholder="Type at least 2 characters to search..."
                  />
                )}
                renderOption={(props, option) => {
                  const { key, ...otherProps } = props;
                  return (
                    <Box component="li" key={option.id} {...otherProps} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar src={option.image} sx={{ width: 32, height: 32 }}>
                        {option.name?.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="body2">{option.name}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {option.nutrition?.calories} kcal
                        </Typography>
                      </Box>
                    </Box>
                  );
                }}
                isOptionEqualToValue={(option, value) => option?.id === value?.id}
                sx={{ mb: 2 }}
                clearOnBlur={false}
                selectOnFocus
                handleHomeEndKeys
              />

              {/* Selected Foods */}
              {selectedFoods.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Selected Foods ({selectedFoods.length})
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {selectedFoods.map((food) => (
                      <Chip
                        key={food.id}
                        avatar={<Avatar src={food.image}>{food.name?.charAt(0)}</Avatar>}
                        label={`${food.name} (${food.nutrition?.calories} kcal)`}
                        onDelete={() => removeFoodFromSelection(food.id)}
                        sx={{ 
                          bgcolor: alpha(mealTypeColors[selectedMealType], 0.1),
                          '& .MuiChip-deleteIcon': { color: 'text.secondary' },
                        }}
                      />
                    ))}
                  </Box>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                    Total: {selectedFoods.reduce((sum, f) => sum + (f.nutrition?.calories || 0), 0)} kcal
                  </Typography>
                </Box>
              )}

              {selectedFoods.length === 0 && (
                <Box sx={{ textAlign: 'center', py: 2, bgcolor: alpha('#6366f1', 0.05), borderRadius: 2 }}>
                  <Search sx={{ fontSize: 32, color: alpha('#6366f1', 0.4), mb: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    Search and add foods to create your template
                  </Typography>
                </Box>
              )}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={resetDialog}>Cancel</Button>
          {createMode === 'scratch' && (
            <Button
              variant="contained"
              onClick={createTemplateFromScratch}
              disabled={!templateName.trim() || selectedFoods.length === 0}
              sx={{
                bgcolor: '#6366f1',
                '&:hover': { bgcolor: '#5558e6' },
              }}
            >
              Create Template
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Context Menu */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleCloseMenu}
        PaperProps={{ sx: { borderRadius: 2, minWidth: 160 } }}
      >
        <MenuItem onClick={() => selectedTemplate && applyTemplate(selectedTemplate)} disabled={loading}>
          <ListItemIcon>
            <PlayArrow fontSize="small" sx={{ color: '#22c55e' }} />
          </ListItemIcon>
          <ListItemText>Use Template</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => selectedTemplate && duplicateTemplate(selectedTemplate)} disabled={loading}>
          <ListItemIcon>
            <ContentCopy fontSize="small" />
          </ListItemIcon>
          <ListItemText>Duplicate</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => selectedTemplate && deleteTemplate(selectedTemplate._id || selectedTemplate.id)}
          sx={{ color: 'error.main' }}
          disabled={loading}
        >
          <ListItemIcon>
            <Delete fontSize="small" sx={{ color: 'error.main' }} />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>

      {/* Loading Overlay */}
      {loading && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'rgba(0,0,0,0.3)',
            zIndex: 9999,
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={closeSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default MealTemplates;
