import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  LinearProgress,
  useTheme,
  alpha,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Divider,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  TrendingFlat,
  CalendarMonth,
  LocalFireDepartment,
  FitnessCenter,
  Grain,
  WaterDrop,
  Close,
  Download,
  Share,
  EmojiEvents,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { useMeals } from '../../context/MealsContext';
import { useAuth } from '../../context/AuthContext';

const WeeklyReport = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { getHistoricalData } = useMeals();
  const { user } = useAuth();
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const weekData = useMemo(() => getHistoricalData(7), [getHistoricalData]);
  
  // Calculate weekly stats
  const weeklyStats = useMemo(() => {
    const totals = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fats: 0,
      daysLogged: 0,
    };
    
    weekData.forEach(day => {
      if (day.calories > 0) {
        totals.daysLogged++;
        totals.calories += day.calories;
        totals.protein += day.protein;
        totals.carbs += day.carbs;
        totals.fats += day.fats;
      }
    });
    
    const avgCalories = totals.daysLogged > 0 ? Math.round(totals.calories / totals.daysLogged) : 0;
    const avgProtein = totals.daysLogged > 0 ? Math.round(totals.protein / totals.daysLogged) : 0;
    
    // Goals
    const calorieGoal = user?.dailyGoal || 2000;
    const proteinGoal = user?.proteinGoal || 50;
    
    // Compare to previous week (mock for now)
    const calorieChange = Math.random() > 0.5 ? Math.round(Math.random() * 15) : -Math.round(Math.random() * 15);
    const proteinChange = Math.random() > 0.5 ? Math.round(Math.random() * 10) : -Math.round(Math.random() * 10);
    
    return {
      ...totals,
      avgCalories,
      avgProtein,
      calorieGoal,
      proteinGoal,
      calorieChange,
      proteinChange,
      consistency: Math.round((totals.daysLogged / 7) * 100),
    };
  }, [weekData, user]);

  // Achievements for the week
  const achievements = useMemo(() => {
    const list = [];
    
    if (weeklyStats.consistency >= 100) {
      list.push({ icon: '🏆', text: 'Perfect Week!', color: '#f59e0b' });
    } else if (weeklyStats.consistency >= 70) {
      list.push({ icon: '⭐', text: 'Great Consistency', color: '#22c55e' });
    }
    
    if (weeklyStats.avgProtein >= weeklyStats.proteinGoal) {
      list.push({ icon: '💪', text: 'Protein Champion', color: '#8b5cf6' });
    }
    
    if (weeklyStats.avgCalories <= weeklyStats.calorieGoal && weeklyStats.avgCalories > 0) {
      list.push({ icon: '🎯', text: 'Calorie Goal Met', color: '#22c55e' });
    }
    
    return list;
  }, [weeklyStats]);

  const getTrendIcon = (value) => {
    if (value > 0) return <TrendingUp sx={{ color: '#22c55e', fontSize: 18 }} />;
    if (value < 0) return <TrendingDown sx={{ color: '#ef4444', fontSize: 18 }} />;
    return <TrendingFlat sx={{ color: '#6b7280', fontSize: 18 }} />;
  };

  const exportReport = () => {
    const reportData = {
      weekOf: new Date().toISOString().split('T')[0],
      stats: weeklyStats,
      dailyData: weekData,
      achievements,
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nutrivision-weekly-report-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Card
        component={motion.div}
        whileHover={{ y: -4 }}
        onClick={() => setDialogOpen(true)}
        sx={{
          cursor: 'pointer',
          background: isDark
            ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(22, 163, 74, 0.1) 100%)'
            : 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
          border: `1px solid ${alpha('#22c55e', 0.2)}`,
          borderRadius: 3,
        }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CalendarMonth sx={{ color: '#22c55e', fontSize: 24 }} />
              <Typography variant="h6" fontWeight={700}>
                Weekly Report
              </Typography>
            </Box>
            <Chip
              label={`${weeklyStats.daysLogged}/7 days`}
              size="small"
              sx={{
                bgcolor: alpha('#22c55e', 0.2),
                color: '#22c55e',
                fontWeight: 600,
              }}
            />
          </Box>

          {/* Mini Chart */}
          <Box sx={{ height: 80, mb: 2 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weekData}>
                <defs>
                  <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="calories"
                  stroke="#22c55e"
                  strokeWidth={2}
                  fill="url(#colorCalories)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Box>

          {/* Quick Stats */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Avg Calories
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Typography variant="body1" fontWeight={700}>
                  {weeklyStats.avgCalories}
                </Typography>
                {getTrendIcon(weeklyStats.calorieChange)}
              </Box>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Consistency
              </Typography>
              <Typography variant="body1" fontWeight={700}>
                {weeklyStats.consistency}%
              </Typography>
            </Box>
          </Box>

          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            Tap for detailed report →
          </Typography>
        </CardContent>
      </Card>

      {/* Detailed Report Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: isDark
              ? 'linear-gradient(180deg, #1a1a2e 0%, #16162a 100%)'
              : 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
          },
        }}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CalendarMonth sx={{ color: '#22c55e' }} />
            <Typography variant="h6" fontWeight={700}>
              Weekly Nutrition Report
            </Typography>
          </Box>
          <IconButton onClick={() => setDialogOpen(false)}>
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          {/* Achievements */}
          {achievements.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                This Week's Achievements
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {achievements.map((achievement, i) => (
                  <Chip
                    key={i}
                    icon={<span style={{ fontSize: 18 }}>{achievement.icon}</span>}
                    label={achievement.text}
                    sx={{
                      bgcolor: alpha(achievement.color, 0.1),
                      color: achievement.color,
                      fontWeight: 600,
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}

          <Divider sx={{ my: 2 }} />

          {/* Stats Grid */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={6} md={3}>
              <Card sx={{ p: 2, bgcolor: alpha('#ef4444', 0.1), borderRadius: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <LocalFireDepartment sx={{ color: '#ef4444', fontSize: 20 }} />
                  <Typography variant="caption" color="text.secondary">Total Calories</Typography>
                </Box>
                <Typography variant="h5" fontWeight={700} color="#ef4444">
                  {weeklyStats.calories.toLocaleString()}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Avg: {weeklyStats.avgCalories}/day
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={6} md={3}>
              <Card sx={{ p: 2, bgcolor: alpha('#8b5cf6', 0.1), borderRadius: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <FitnessCenter sx={{ color: '#8b5cf6', fontSize: 20 }} />
                  <Typography variant="caption" color="text.secondary">Total Protein</Typography>
                </Box>
                <Typography variant="h5" fontWeight={700} color="#8b5cf6">
                  {weeklyStats.protein}g
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Avg: {weeklyStats.avgProtein}g/day
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={6} md={3}>
              <Card sx={{ p: 2, bgcolor: alpha('#f59e0b', 0.1), borderRadius: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Grain sx={{ color: '#f59e0b', fontSize: 20 }} />
                  <Typography variant="caption" color="text.secondary">Total Carbs</Typography>
                </Box>
                <Typography variant="h5" fontWeight={700} color="#f59e0b">
                  {weeklyStats.carbs}g
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={6} md={3}>
              <Card sx={{ p: 2, bgcolor: alpha('#22c55e', 0.1), borderRadius: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <EmojiEvents sx={{ color: '#22c55e', fontSize: 20 }} />
                  <Typography variant="caption" color="text.secondary">Consistency</Typography>
                </Box>
                <Typography variant="h5" fontWeight={700} color="#22c55e">
                  {weeklyStats.consistency}%
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {weeklyStats.daysLogged} days logged
                </Typography>
              </Card>
            </Grid>
          </Grid>

          {/* Daily Breakdown Chart */}
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Daily Calorie Breakdown
          </Typography>
          <Box sx={{ height: 200, mb: 2 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weekData}>
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? '#1a1a2e' : '#fff',
                    border: 'none',
                    borderRadius: 8,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  }}
                />
                <Bar dataKey="calories" fill="#22c55e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Box>

          {/* Protein Trend */}
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Protein Trend
          </Typography>
          <Box sx={{ height: 150 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weekData}>
                <defs>
                  <linearGradient id="colorProtein" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? '#1a1a2e' : '#fff',
                    border: 'none',
                    borderRadius: 8,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="protein"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  fill="url(#colorProtein)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button
            startIcon={<Download />}
            onClick={exportReport}
            variant="outlined"
          >
            Export Report
          </Button>
          <Button
            startIcon={<Share />}
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
            }}
          >
            Share
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default WeeklyReport;
