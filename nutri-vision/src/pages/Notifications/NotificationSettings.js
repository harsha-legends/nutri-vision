import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Switch,
  Stack,
  IconButton,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Alert,
  Snackbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import {
  ArrowBack,
  Notifications,
  NotificationsActive,
  WaterDrop,
  Restaurant,
  FitnessCenter,
  TrendingUp,
  EmojiEvents,
  Schedule,
  VolumeUp,
  Vibration,
  DarkMode,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const NotificationSettings = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isDark = theme.palette.mode === 'dark';

  const [settings, setSettings] = useState({
    enabled: true,
    sound: true,
    vibration: true,
    quietHours: false,
    quietStart: '22:00',
    quietEnd: '07:00',
    mealReminders: true,
    waterReminders: true,
    goalAlerts: true,
    streakReminders: true,
    weeklyReports: true,
    breakfastTime: '08:00',
    lunchTime: '13:00',
    dinnerTime: '19:00',
    waterInterval: 60, // minutes
  });

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('notificationSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }

    // Check notification permission
    if ('Notification' in window) {
      setPermissionGranted(Notification.permission === 'granted');
    }
  }, []);

  const saveSettings = (newSettings) => {
    setSettings(newSettings);
    localStorage.setItem('notificationSettings', JSON.stringify(newSettings));
    setSnackbar({ open: true, message: 'Settings saved!', severity: 'success' });
  };

  const handleToggle = (key) => {
    const newSettings = { ...settings, [key]: !settings[key] };
    saveSettings(newSettings);
  };

  const handleChange = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    saveSettings(newSettings);
  };

  const requestPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setPermissionGranted(true);
        setSnackbar({ open: true, message: 'Notifications enabled!', severity: 'success' });
        
        // Send test notification
        new Notification('NutriVision', {
          body: 'Notifications are now enabled! 🎉',
          icon: '/logo192.png',
        });
      } else {
        setSnackbar({ open: true, message: 'Notification permission denied', severity: 'error' });
      }
    }
  };

  const sendTestNotification = () => {
    if (permissionGranted) {
      new Notification('NutriVision Test', {
        body: 'This is a test notification! 🍎',
        icon: '/logo192.png',
        tag: 'test',
      });
      setSnackbar({ open: true, message: 'Test notification sent!', severity: 'info' });
    }
  };

  const notificationTypes = [
    {
      key: 'mealReminders',
      icon: <Restaurant />,
      title: 'Meal Reminders',
      description: 'Get reminded to log your meals',
      color: '#22c55e',
    },
    {
      key: 'waterReminders',
      icon: <WaterDrop />,
      title: 'Water Reminders',
      description: 'Stay hydrated with regular reminders',
      color: '#3b82f6',
    },
    {
      key: 'goalAlerts',
      icon: <TrendingUp />,
      title: 'Goal Progress Alerts',
      description: 'Get notified when approaching goals',
      color: '#f59e0b',
    },
    {
      key: 'streakReminders',
      icon: <EmojiEvents />,
      title: 'Streak Reminders',
      description: 'Don\'t break your streak!',
      color: '#ef4444',
    },
    {
      key: 'weeklyReports',
      icon: <FitnessCenter />,
      title: 'Weekly Reports',
      description: 'Receive weekly nutrition summaries',
      color: '#8b5cf6',
    },
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: isDark 
        ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' 
        : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      pb: 4,
    }}>
      {/* Header */}
      <Box
        sx={{
          p: 3,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <IconButton onClick={() => navigate(-1)} sx={{ color: 'white' }}>
            <ArrowBack />
          </IconButton>
          <Box>
            <Typography variant="h5" fontWeight={700}>
              Notifications
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Customize your reminder preferences
            </Typography>
          </Box>
        </Stack>
      </Box>

      <Box sx={{ p: 2 }}>
        {/* Permission Alert */}
        {!permissionGranted && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Alert
              severity="warning"
              sx={{ mb: 2, borderRadius: 2 }}
              action={
                <Button color="inherit" size="small" onClick={requestPermission}>
                  Enable
                </Button>
              }
            >
              Notifications are disabled. Enable them to receive reminders.
            </Alert>
          </motion.div>
        )}

        {/* Master Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card sx={{ mb: 2, borderRadius: 3 }}>
            <CardContent>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      background: settings.enabled
                        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                        : 'grey.300',
                    }}
                  >
                    {settings.enabled ? (
                      <NotificationsActive sx={{ color: 'white' }} />
                    ) : (
                      <Notifications sx={{ color: 'white' }} />
                    )}
                  </Box>
                  <Box>
                    <Typography variant="h6" fontWeight={600}>
                      Notifications
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {settings.enabled ? 'Enabled' : 'Disabled'}
                    </Typography>
                  </Box>
                </Stack>
                <Switch
                  checked={settings.enabled}
                  onChange={() => handleToggle('enabled')}
                  color="primary"
                />
              </Stack>
            </CardContent>
          </Card>
        </motion.div>

        {/* Notification Types */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card sx={{ mb: 2, borderRadius: 3, opacity: settings.enabled ? 1 : 0.5 }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Notification Types
              </Typography>
              <List disablePadding>
                {notificationTypes.map((type, index) => (
                  <React.Fragment key={type.key}>
                    {index > 0 && <Divider />}
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon>
                        <Box
                          sx={{
                            p: 1,
                            borderRadius: 2,
                            bgcolor: `${type.color}20`,
                            color: type.color,
                          }}
                        >
                          {type.icon}
                        </Box>
                      </ListItemIcon>
                      <ListItemText
                        primary={type.title}
                        secondary={type.description}
                      />
                      <ListItemSecondaryAction>
                        <Switch
                          checked={settings[type.key]}
                          onChange={() => handleToggle(type.key)}
                          disabled={!settings.enabled}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </motion.div>

        {/* Meal Reminder Times */}
        {settings.mealReminders && settings.enabled && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card sx={{ mb: 2, borderRadius: 3 }}>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                  <Schedule color="primary" />
                  <Typography variant="subtitle1" fontWeight={600}>
                    Meal Reminder Times
                  </Typography>
                </Stack>
                <Stack spacing={2}>
                  {[
                    { key: 'breakfastTime', label: 'Breakfast', emoji: '🌅' },
                    { key: 'lunchTime', label: 'Lunch', emoji: '☀️' },
                    { key: 'dinnerTime', label: 'Dinner', emoji: '🌙' },
                  ].map((meal) => (
                    <Stack key={meal.key} direction="row" alignItems="center" justifyContent="space-between">
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography fontSize={20}>{meal.emoji}</Typography>
                        <Typography>{meal.label}</Typography>
                      </Stack>
                      <FormControl size="small" sx={{ width: 120 }}>
                        <Select
                          value={settings[meal.key]}
                          onChange={(e) => handleChange(meal.key, e.target.value)}
                        >
                          {Array.from({ length: 24 }, (_, i) => {
                            const hour = i.toString().padStart(2, '0');
                            return (
                              <MenuItem key={hour} value={`${hour}:00`}>
                                {`${hour}:00`}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </Stack>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Water Reminder Interval */}
        {settings.waterReminders && settings.enabled && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card sx={{ mb: 2, borderRadius: 3 }}>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                  <WaterDrop color="primary" />
                  <Typography variant="subtitle1" fontWeight={600}>
                    Water Reminder Interval
                  </Typography>
                </Stack>
                <FormControl fullWidth size="small">
                  <InputLabel>Remind every</InputLabel>
                  <Select
                    value={settings.waterInterval}
                    label="Remind every"
                    onChange={(e) => handleChange('waterInterval', e.target.value)}
                  >
                    <MenuItem value={30}>30 minutes</MenuItem>
                    <MenuItem value={60}>1 hour</MenuItem>
                    <MenuItem value={90}>1.5 hours</MenuItem>
                    <MenuItem value={120}>2 hours</MenuItem>
                    <MenuItem value={180}>3 hours</MenuItem>
                  </Select>
                </FormControl>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Quiet Hours */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card sx={{ mb: 2, borderRadius: 3, opacity: settings.enabled ? 1 : 0.5 }}>
            <CardContent>
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <DarkMode color="primary" />
                  <Box>
                    <Typography variant="subtitle1" fontWeight={600}>
                      Quiet Hours
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Mute notifications during these hours
                    </Typography>
                  </Box>
                </Stack>
                <Switch
                  checked={settings.quietHours}
                  onChange={() => handleToggle('quietHours')}
                  disabled={!settings.enabled}
                />
              </Stack>
              {settings.quietHours && (
                <Stack direction="row" spacing={2} alignItems="center">
                  <FormControl size="small" sx={{ flex: 1 }}>
                    <InputLabel>From</InputLabel>
                    <Select
                      value={settings.quietStart}
                      label="From"
                      onChange={(e) => handleChange('quietStart', e.target.value)}
                    >
                      {Array.from({ length: 24 }, (_, i) => {
                        const hour = i.toString().padStart(2, '0');
                        return (
                          <MenuItem key={hour} value={`${hour}:00`}>
                            {`${hour}:00`}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                  <Typography>to</Typography>
                  <FormControl size="small" sx={{ flex: 1 }}>
                    <InputLabel>To</InputLabel>
                    <Select
                      value={settings.quietEnd}
                      label="To"
                      onChange={(e) => handleChange('quietEnd', e.target.value)}
                    >
                      {Array.from({ length: 24 }, (_, i) => {
                        const hour = i.toString().padStart(2, '0');
                        return (
                          <MenuItem key={hour} value={`${hour}:00`}>
                            {`${hour}:00`}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Stack>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Sound & Vibration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card sx={{ mb: 2, borderRadius: 3, opacity: settings.enabled ? 1 : 0.5 }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Notification Style
              </Typography>
              <List disablePadding>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon>
                    <VolumeUp color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Sound" secondary="Play notification sound" />
                  <ListItemSecondaryAction>
                    <Switch
                      checked={settings.sound}
                      onChange={() => handleToggle('sound')}
                      disabled={!settings.enabled}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon>
                    <Vibration color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Vibration" secondary="Vibrate on notification" />
                  <ListItemSecondaryAction>
                    <Switch
                      checked={settings.vibration}
                      onChange={() => handleToggle('vibration')}
                      disabled={!settings.enabled}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </motion.div>

        {/* Test Notification */}
        {permissionGranted && settings.enabled && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Button
              fullWidth
              variant="outlined"
              onClick={sendTestNotification}
              startIcon={<NotificationsActive />}
              sx={{
                borderRadius: 3,
                py: 1.5,
                textTransform: 'none',
              }}
            >
              Send Test Notification
            </Button>
          </motion.div>
        )}
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default NotificationSettings;
