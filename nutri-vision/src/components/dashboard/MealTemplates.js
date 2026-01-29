import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  IconButton,
  Chip,
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
} from '@mui/material';
import {
  Add,
  Delete,
  PlayArrow,
  Edit,
  MoreVert,
  Restaurant,
  Bookmark,
  BookmarkBorder,
  ContentCopy,
  FreeBreakfast,
  LunchDining,
  DinnerDining,
  Icecream,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useMeals } from '../../context/MealsContext';

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

const MealTemplates = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { addMeal, todaysMeals } = useMeals();
  
  const [templates, setTemplates] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [templateName, setTemplateName] = useState('');
  const [templateMealType, setTemplateMealType] = useState('breakfast');
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  // Load templates from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('nutriVisionMealTemplates') || '[]');
    setTemplates(stored);
  }, []);

  // Save templates to localStorage
  const saveTemplates = (newTemplates) => {
    localStorage.setItem('nutriVisionMealTemplates', JSON.stringify(newTemplates));
    setTemplates(newTemplates);
  };

  // Create template from today's meals for a specific meal type
  const createTemplateFromToday = (mealType) => {
    const mealsOfType = todaysMeals.filter(m => m.mealType === mealType);
    if (mealsOfType.length === 0) return;

    const template = {
      id: Date.now().toString(),
      name: templateName || `My ${mealType.charAt(0).toUpperCase() + mealType.slice(1)}`,
      mealType,
      foods: mealsOfType.map(m => ({
        id: m.id,
        name: m.name,
        image: m.image,
        nutrition: m.nutrition,
        quantity: m.quantity || 1,
      })),
      totalCalories: mealsOfType.reduce((sum, m) => sum + (m.nutrition?.calories || 0), 0),
      createdAt: new Date().toISOString(),
    };

    saveTemplates([...templates, template]);
    setDialogOpen(false);
    setTemplateName('');
  };

  // Apply a template - add all foods from template
  const applyTemplate = async (template) => {
    for (const food of template.foods) {
      await addMeal(food, template.mealType, food.quantity || 1);
    }
    handleCloseMenu();
  };

  const deleteTemplate = (templateId) => {
    saveTemplates(templates.filter(t => t.id !== templateId));
    handleCloseMenu();
  };

  const duplicateTemplate = (template) => {
    const newTemplate = {
      ...template,
      id: Date.now().toString(),
      name: `${template.name} (Copy)`,
      createdAt: new Date().toISOString(),
    };
    saveTemplates([...templates, newTemplate]);
    handleCloseMenu();
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
    setEditingTemplate(null);
    setTemplateName('');
    setDialogOpen(true);
  };

  // Group today's meals by type for template creation
  const mealsByType = ['breakfast', 'lunch', 'dinner', 'snack'].map(type => ({
    type,
    meals: todaysMeals.filter(m => m.mealType === type),
    count: todaysMeals.filter(m => m.mealType === type).length,
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
                          bgcolor: alpha(mealTypeColors[template.mealType], 0.1),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: mealTypeColors[template.mealType],
                        }}
                      >
                        {mealTypeIcons[template.mealType]}
                      </Box>

                      {/* Template Info */}
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="body2" fontWeight={600} noWrap>
                          {template.name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="caption" color="text.secondary">
                            {template.foods.length} items
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            •
                          </Typography>
                          <Typography variant="caption" color={mealTypeColors[template.mealType]}>
                            {template.totalCalories} kcal
                          </Typography>
                        </Box>
                      </Box>

                      {/* Food Avatars */}
                      <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { width: 24, height: 24, fontSize: 10 } }}>
                        {template.foods.map((food, i) => (
                          <Avatar key={i} src={food.image} alt={food.name}>
                            {food.name?.charAt(0)}
                          </Avatar>
                        ))}
                      </AvatarGroup>

                      {/* Actions */}
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
        onClose={() => setDialogOpen(false)}
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

          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Save today's meals as a template:
          </Typography>

          {mealsByType.length === 0 ? (
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
              No meals logged today. Add some meals first!
            </Typography>
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
                        setTemplateMealType(group.type);
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
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Context Menu */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleCloseMenu}
        PaperProps={{ sx: { borderRadius: 2, minWidth: 160 } }}
      >
        <MenuItem onClick={() => selectedTemplate && applyTemplate(selectedTemplate)}>
          <ListItemIcon>
            <PlayArrow fontSize="small" sx={{ color: '#22c55e' }} />
          </ListItemIcon>
          <ListItemText>Use Template</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => selectedTemplate && duplicateTemplate(selectedTemplate)}>
          <ListItemIcon>
            <ContentCopy fontSize="small" />
          </ListItemIcon>
          <ListItemText>Duplicate</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => selectedTemplate && deleteTemplate(selectedTemplate.id)}
          sx={{ color: 'error.main' }}
        >
          <ListItemIcon>
            <Delete fontSize="small" sx={{ color: 'error.main' }} />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default MealTemplates;
