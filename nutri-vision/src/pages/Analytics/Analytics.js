import React, { useState, useMemo } from 'react';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Menu,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Search,
  TrendingUp,
  CalendarMonth,
  FilterList,
  LocalFireDepartment,
  FitnessCenter,
  Grain,
  WaterDrop,
  Spa,
  Cake,
  Download,
  TableChart,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
  ComposedChart,
} from 'recharts';
import { useMeals } from '../../context/MealsContext';
import { chartColors } from '../../theme/theme';

const nutritionComponents = [
  { key: 'calories', label: 'Calories', icon: LocalFireDepartment, color: chartColors.calories, unit: 'kcal' },
  { key: 'protein', label: 'Protein', icon: FitnessCenter, color: chartColors.protein, unit: 'g' },
  { key: 'carbs', label: 'Carbohydrates', icon: Grain, color: chartColors.carbs, unit: 'g' },
  { key: 'fats', label: 'Fats', icon: WaterDrop, color: chartColors.fats, unit: 'g' },
  { key: 'fiber', label: 'Fiber', icon: Spa, color: chartColors.fiber, unit: 'g' },
  { key: 'sugar', label: 'Sugar', icon: Cake, color: chartColors.sugar, unit: 'g' },
];

const Analytics = () => {
  const { getHistoricalData } = useMeals();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedComponents, setSelectedComponents] = useState(['calories', 'protein', 'carbs', 'fats']);
  const [timeRange, setTimeRange] = useState(7);
  const [chartType, setChartType] = useState('bar');
  const [exportMenuAnchor, setExportMenuAnchor] = useState(null);

  const historicalData = useMemo(() => getHistoricalData(timeRange), [getHistoricalData, timeRange]);

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Date', 'Calories', 'Protein (g)', 'Carbs (g)', 'Fats (g)', 'Fiber (g)', 'Sugar (g)'];
    const rows = historicalData.map(day => [
      day.fullDate,
      day.calories,
      day.protein,
      day.carbs,
      day.fats,
      day.fiber,
      day.sugar,
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `nutrition-data-${timeRange}days-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    setExportMenuAnchor(null);
  };

  // Export to JSON
  const exportToJSON = () => {
    const data = {
      exportDate: new Date().toISOString(),
      timeRange: `${timeRange} days`,
      summary: stats,
      dailyData: historicalData,
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `nutrition-data-${timeRange}days-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setExportMenuAnchor(null);
  };

  // Filter components based on search
  const filteredComponents = useMemo(() => {
    if (!searchQuery.trim()) {
      return nutritionComponents.filter(c => selectedComponents.includes(c.key));
    }
    
    const query = searchQuery.toLowerCase();
    return nutritionComponents.filter(c => 
      c.label.toLowerCase().includes(query) || c.key.toLowerCase().includes(query)
    );
  }, [searchQuery, selectedComponents]);

  // Calculate totals and averages
  const stats = useMemo(() => {
    const totals = {};
    const averages = {};
    
    nutritionComponents.forEach(({ key }) => {
      const values = historicalData.map(d => d[key] || 0);
      const sum = values.reduce((a, b) => a + b, 0);
      totals[key] = sum;
      averages[key] = values.length > 0 ? sum / values.length : 0;
    });
    
    return { totals, averages };
  }, [historicalData]);

  const handleComponentToggle = (componentKey) => {
    setSelectedComponents(prev => {
      if (prev.includes(componentKey)) {
        return prev.filter(k => k !== componentKey);
      }
      return [...prev, componentKey];
    });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Box>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              📊 Nutrition Analytics
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Track and analyze your nutrition intake over time
            </Typography>
          </Box>
          
          {/* Export Button */}
          <Box>
            <Button
              variant="outlined"
              startIcon={<Download />}
              onClick={(e) => setExportMenuAnchor(e.currentTarget)}
              sx={{ mr: 1 }}
            >
              Export
            </Button>
            <Menu
              anchorEl={exportMenuAnchor}
              open={Boolean(exportMenuAnchor)}
              onClose={() => setExportMenuAnchor(null)}
              PaperProps={{ sx: { borderRadius: 2, minWidth: 180 } }}
            >
              <MenuItem onClick={exportToCSV}>
                <ListItemIcon>
                  <TableChart fontSize="small" />
                </ListItemIcon>
                <ListItemText>Export as CSV</ListItemText>
              </MenuItem>
              <MenuItem onClick={exportToJSON}>
                <ListItemIcon>
                  <Download fontSize="small" />
                </ListItemIcon>
                <ListItemText>Export as JSON</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Grid container spacing={3} alignItems="center">
              <Grid size={{ xs: 12, md: 5 }}>
                <TextField
                  fullWidth
                  placeholder="Search nutrition component (e.g., protein, carbs, calories...)"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: 'background.paper',
                    },
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>Time Range</InputLabel>
                  <Select
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    label="Time Range"
                    startAdornment={
                      <InputAdornment position="start">
                        <CalendarMonth fontSize="small" />
                      </InputAdornment>
                    }
                  >
                    <MenuItem value={7}>Last 7 Days</MenuItem>
                    <MenuItem value={14}>Last 14 Days</MenuItem>
                    <MenuItem value={30}>Last 30 Days</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <ToggleButtonGroup
                  value={chartType}
                  exclusive
                  onChange={(e, value) => value && setChartType(value)}
                  size="small"
                  fullWidth
                >
                  <ToggleButton value="bar">Bar Chart</ToggleButton>
                  <ToggleButton value="line">Line Chart</ToggleButton>
                  <ToggleButton value="area">Area Chart</ToggleButton>
                </ToggleButtonGroup>
              </Grid>
            </Grid>

            {/* Component Filter Chips */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                <FilterList fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
                Select Components to Display:
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                {nutritionComponents.map((component) => {
                  const Icon = component.icon;
                  const isSelected = selectedComponents.includes(component.key);
                  const isSearchMatch = searchQuery && component.label.toLowerCase().includes(searchQuery.toLowerCase());
                  
                  return (
                    <motion.div
                      key={component.key}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Chip
                        icon={<Icon sx={{ color: isSelected ? 'white' : component.color }} />}
                        label={component.label}
                        onClick={() => handleComponentToggle(component.key)}
                        sx={{
                          bgcolor: isSelected ? component.color : 'transparent',
                          color: isSelected ? 'white' : 'text.primary',
                          border: `2px solid ${component.color}`,
                          fontWeight: 600,
                          transition: 'all 0.2s',
                          ...(isSearchMatch && !isSelected && {
                            animation: 'pulse 1s infinite',
                            boxShadow: `0 0 10px ${component.color}`,
                          }),
                          '&:hover': {
                            bgcolor: isSelected ? component.color : `${component.color}20`,
                          },
                        }}
                      />
                    </motion.div>
                  );
                })}
              </Box>
            </Box>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <AnimatePresence mode="popLayout">
            {filteredComponents.map((component, index) => {
              const Icon = component.icon;
              return (
                <Grid size={{ xs: 6, sm: 4, md: 2 }} key={component.key}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card
                      sx={{
                        background: `linear-gradient(135deg, ${component.color}20 0%, ${component.color}40 100%)`,
                        border: `1px solid ${component.color}50`,
                      }}
                    >
                      <CardContent sx={{ textAlign: 'center', py: 2 }}>
                        <Icon sx={{ color: component.color, fontSize: 32, mb: 1 }} />
                        <Typography variant="h5" fontWeight={700} sx={{ color: component.color }}>
                          {Math.round(stats.averages[component.key])}
                          <Typography component="span" variant="caption" sx={{ ml: 0.5 }}>
                            {component.unit}/day
                          </Typography>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {component.label}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              );
            })}
          </AnimatePresence>
        </Grid>
      </motion.div>

      {/* Main Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" fontWeight={600}>
                <TrendingUp sx={{ verticalAlign: 'middle', mr: 1 }} />
                {searchQuery ? `"${searchQuery}" - Nutrition Trends` : 'Daily Nutrition Trends'}
              </Typography>
              {filteredComponents.length === 0 && (
                <Chip label="No matching components" color="warning" size="small" />
              )}
            </Box>
            
            {filteredComponents.length > 0 ? (
              <ResponsiveContainer width="100%" height={400}>
                {chartType === 'bar' ? (
                  <BarChart data={historicalData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <RechartsTooltip
                      contentStyle={{
                        borderRadius: 12,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                      }}
                    />
                    <Legend />
                    {filteredComponents.map((component) => (
                      <Bar
                        key={component.key}
                        dataKey={component.key}
                        name={component.label}
                        fill={component.color}
                        radius={[4, 4, 0, 0]}
                      />
                    ))}
                  </BarChart>
                ) : chartType === 'line' ? (
                  <LineChart data={historicalData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <RechartsTooltip
                      contentStyle={{
                        borderRadius: 12,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                      }}
                    />
                    <Legend />
                    {filteredComponents.map((component) => (
                      <Line
                        key={component.key}
                        type="monotone"
                        dataKey={component.key}
                        name={component.label}
                        stroke={component.color}
                        strokeWidth={3}
                        dot={{ fill: component.color, strokeWidth: 2, r: 5 }}
                        activeDot={{ r: 8, strokeWidth: 2 }}
                      />
                    ))}
                  </LineChart>
                ) : (
                  <AreaChart data={historicalData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <RechartsTooltip
                      contentStyle={{
                        borderRadius: 12,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                      }}
                    />
                    <Legend />
                    {filteredComponents.map((component) => (
                      <Area
                        key={component.key}
                        type="monotone"
                        dataKey={component.key}
                        name={component.label}
                        stroke={component.color}
                        fill={`${component.color}40`}
                        strokeWidth={2}
                      />
                    ))}
                  </AreaChart>
                )}
              </ResponsiveContainer>
            ) : (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h6" color="text.secondary">
                  No components match your search
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Try searching for: protein, carbs, fats, fiber, sugar, or calories
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Macro Distribution Line Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              📈 Macro Trends Over Time
              {searchQuery && (
                <Chip
                  label={`Filtered: ${filteredComponents.map(c => c.label).join(', ')}`}
                  size="small"
                  sx={{ ml: 2 }}
                  color="primary"
                  variant="outlined"
                />
              )}
            </Typography>
            
            {filteredComponents.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <RechartsTooltip
                    contentStyle={{
                      borderRadius: 12,
                      boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                    }}
                  />
                  <Legend />
                  {filteredComponents.map((component, index) => (
                    <Line
                      key={component.key}
                      yAxisId={index % 2 === 0 ? 'left' : 'right'}
                      type="monotone"
                      dataKey={component.key}
                      name={component.label}
                      stroke={component.color}
                      strokeWidth={2}
                      dot={false}
                    />
                  ))}
                </ComposedChart>
              </ResponsiveContainer>
            ) : (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography color="text.secondary">Select components to view trends</Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* History Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardContent>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              📋 Historical Records
              {searchQuery && (
                <Typography component="span" variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                  Showing: {filteredComponents.map(c => c.label).join(', ')}
                </Typography>
              )}
            </Typography>
            <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: 'grey.50' }}>
                    <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                    {filteredComponents.map((component) => {
                      const Icon = component.icon;
                      return (
                        <TableCell key={component.key} align="right" sx={{ fontWeight: 600 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5 }}>
                            <Icon sx={{ fontSize: 18, color: component.color }} />
                            {component.label}
                          </Box>
                        </TableCell>
                      );
                    })}
                    <TableCell align="right" sx={{ fontWeight: 600 }}>Meals</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {historicalData.map((day, index) => (
                    <motion.tr
                      key={day.fullDate}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      component={TableRow}
                      sx={{
                        '&:hover': {
                          bgcolor: 'action.hover',
                        },
                      }}
                    >
                      <TableCell>
                        <Typography fontWeight={500}>{day.date}</Typography>
                      </TableCell>
                      {filteredComponents.map((component) => (
                        <TableCell key={component.key} align="right">
                          <Chip
                            label={`${Math.round(day[component.key])} ${component.unit}`}
                            size="small"
                            sx={{
                              bgcolor: `${component.color}15`,
                              color: component.color,
                              fontWeight: 600,
                            }}
                          />
                        </TableCell>
                      ))}
                      <TableCell align="right">
                        <Chip
                          label={day.meals?.length || 0}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      </TableCell>
                    </motion.tr>
                  ))}
                  {historicalData.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={filteredComponents.length + 2} align="center" sx={{ py: 4 }}>
                        <Typography color="text.secondary">
                          No data available. Start adding meals to track your nutrition!
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              📊 Period Summary
              {searchQuery && ` - "${searchQuery}"`}
            </Typography>
            <Grid container spacing={2}>
              {filteredComponents.map((component) => {
                const Icon = component.icon;
                return (
                  <Grid size={{ xs: 6, sm: 4, md: 2 }} key={component.key}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        bgcolor: `${component.color}10`,
                        border: `1px solid ${component.color}30`,
                        textAlign: 'center',
                      }}
                    >
                      <Icon sx={{ color: component.color, fontSize: 28, mb: 1 }} />
                      <Typography variant="h6" fontWeight={700} sx={{ color: component.color }}>
                        {Math.round(stats.totals[component.key])}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" display="block">
                        Total {component.label}
                      </Typography>
                      <Typography variant="body2" fontWeight={500} sx={{ mt: 0.5 }}>
                        Avg: {Math.round(stats.averages[component.key])} {component.unit}/day
                      </Typography>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </CardContent>
        </Card>
      </motion.div>

      <style>
        {`
          @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4); }
            70% { box-shadow: 0 0 0 10px rgba(99, 102, 241, 0); }
            100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
          }
        `}
      </style>
    </Box>
  );
};

export default Analytics;
