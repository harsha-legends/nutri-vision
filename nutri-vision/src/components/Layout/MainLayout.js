import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  useMediaQuery,
  Tooltip,
  Divider,
  Fab,
  Dialog,
  DialogContent,
  TextField,
  Paper,
  Stack,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Analytics as AnalyticsIcon,
  Person as PersonIcon,
  Flag as GoalsIcon,
  Restaurant as MealsIcon,
  Logout as LogoutIcon,
  ChevronLeft as ChevronLeftIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  QrCode as QrCodeIcon,
  CameraAlt as CameraIcon,
  SmartToy as AIIcon,
  Send as SendIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useThemeMode } from '../../context/ThemeContext';

const drawerWidthExpanded = 260;
const drawerWidthCollapsed = 72;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: "Today's Meals", icon: <MealsIcon />, path: '/todays-meals' },
  { text: 'Goals', icon: <GoalsIcon />, path: '/goals' },
  { text: 'Analytics', icon: <AnalyticsIcon />, path: '/analytics' },
  { text: 'QR Code', icon: <QrCodeIcon />, path: '/qr-code' },
  { text: 'Profile', icon: <PersonIcon />, path: '/profile' },
];

const MainLayout = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { mode, toggleTheme } = useThemeMode();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { role: 'assistant', content: "Hi! I'm your AI nutrition assistant. How can I help you today? 🥗" }
  ]);

  const currentDrawerWidth = sidebarExpanded ? drawerWidthExpanded : drawerWidthCollapsed;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleCameraClick = () => {
    navigate('/scan-food');
  };

  const handleChatSend = () => {
    if (!chatMessage.trim()) return;
    
    setChatHistory(prev => [...prev, { role: 'user', content: chatMessage }]);
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "That's a great question! Based on your goals, I'd recommend focusing on protein-rich foods.",
        "Here's a tip: Try to eat more leafy greens to boost your fiber intake! 🥬",
        "Remember to stay hydrated! Aim for 8 glasses of water daily. 💧",
        "Your calorie intake looks good today! Keep up the great work! 💪",
      ];
      setChatHistory(prev => [...prev, { 
        role: 'assistant', 
        content: responses[Math.floor(Math.random() * responses.length)]
      }]);
    }, 1000);
    
    setChatMessage('');
  };

  const sidebarVariants = {
    expanded: { width: drawerWidthExpanded },
    collapsed: { width: drawerWidthCollapsed },
  };

  const drawerContent = (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)'
          : 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        overflow: 'hidden',
      }}
    >
      {/* Logo Section */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: sidebarExpanded ? 'space-between' : 'center',
          minHeight: 64,
        }}
      >
        <AnimatePresence mode="wait">
          {sidebarExpanded && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  background: 'linear-gradient(45deg, #fff 30%, #f0f0f0 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: 1,
                }}
              >
                🥗 NutriVision
              </Typography>
            </motion.div>
          )}
        </AnimatePresence>
        
        {!isMobile && (
          <IconButton
            onClick={toggleSidebar}
            sx={{
              color: 'white',
              backgroundColor: 'rgba(255,255,255,0.1)',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.2)',
              },
            }}
          >
            <motion.div
              animate={{ rotate: sidebarExpanded ? 0 : 180 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronLeftIcon />
            </motion.div>
          </IconButton>
        )}
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

      {/* User Profile Section */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          justifyContent: sidebarExpanded ? 'flex-start' : 'center',
        }}
      >
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Avatar
            sx={{
              width: 44,
              height: 44,
              bgcolor: 'rgba(255,255,255,0.2)',
              border: '2px solid rgba(255,255,255,0.3)',
              fontSize: '1.2rem',
            }}
          >
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </Avatar>
        </motion.div>
        
        <AnimatePresence mode="wait">
          {sidebarExpanded && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'white' }}>
                {user?.name || 'User'}
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                {user?.email || 'user@example.com'}
              </Typography>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

      {/* Navigation Items */}
      <List sx={{ flexGrow: 1, px: 1, py: 2 }}>
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          
          return (
            <motion.div
              key={item.text}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Tooltip
                title={!sidebarExpanded ? item.text : ''}
                placement="right"
                arrow
              >
                <ListItem disablePadding sx={{ mb: 0.5 }}>
                  <ListItemButton
                    onClick={() => handleNavigation(item.path)}
                    sx={{
                      borderRadius: 2,
                      mx: 0.5,
                      minHeight: 48,
                      justifyContent: sidebarExpanded ? 'flex-start' : 'center',
                      px: sidebarExpanded ? 2 : 1,
                      backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : 'transparent',
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.15)',
                        transform: 'translateX(5px)',
                      },
                      transition: 'all 0.2s ease-in-out',
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: 'white',
                        minWidth: sidebarExpanded ? 40 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {item.icon}
                      </motion.div>
                    </ListItemIcon>
                    
                    <AnimatePresence mode="wait">
                      {sidebarExpanded && (
                        <motion.div
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: 'auto' }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ListItemText
                            primary={item.text}
                            sx={{
                              '& .MuiTypography-root': {
                                fontWeight: isActive ? 600 : 400,
                                whiteSpace: 'nowrap',
                              },
                            }}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </ListItemButton>
                </ListItem>
              </Tooltip>
            </motion.div>
          );
        })}
      </List>

      {/* Theme Toggle & Logout */}
      <Box sx={{ p: 1 }}>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mb: 1 }} />
        
        {/* Theme Toggle */}
        <Tooltip title={!sidebarExpanded ? (mode === 'dark' ? 'Light Mode' : 'Dark Mode') : ''} placement="right" arrow>
          <ListItemButton
            onClick={toggleTheme}
            sx={{
              borderRadius: 2,
              mx: 0.5,
              minHeight: 48,
              justifyContent: sidebarExpanded ? 'flex-start' : 'center',
              px: sidebarExpanded ? 2 : 1,
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.15)',
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: 'white',
                minWidth: sidebarExpanded ? 40 : 'auto',
                justifyContent: 'center',
              }}
            >
              <motion.div
                whileHover={{ scale: 1.2, rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
              </motion.div>
            </ListItemIcon>
            
            <AnimatePresence mode="wait">
              {sidebarExpanded && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ListItemText
                    primary={mode === 'dark' ? 'Light Mode' : 'Dark Mode'}
                    sx={{ '& .MuiTypography-root': { whiteSpace: 'nowrap' } }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </ListItemButton>
        </Tooltip>

        {/* Logout */}
        <Tooltip title={!sidebarExpanded ? 'Logout' : ''} placement="right" arrow>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              borderRadius: 2,
              mx: 0.5,
              minHeight: 48,
              justifyContent: sidebarExpanded ? 'flex-start' : 'center',
              px: sidebarExpanded ? 2 : 1,
              '&:hover': {
                backgroundColor: 'rgba(255,100,100,0.3)',
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: '#ff6b6b',
                minWidth: sidebarExpanded ? 40 : 'auto',
                justifyContent: 'center',
              }}
            >
              <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                <LogoutIcon />
              </motion.div>
            </ListItemIcon>
            
            <AnimatePresence mode="wait">
              {sidebarExpanded && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ListItemText
                    primary="Logout"
                    sx={{
                      '& .MuiTypography-root': {
                        color: '#ff6b6b',
                        whiteSpace: 'nowrap',
                      },
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </ListItemButton>
        </Tooltip>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* App Bar for Mobile */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          display: { md: 'none' },
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(90deg, #1a1a2e 0%, #16213e 100%)'
            : 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ fontWeight: 700 }}>
            🥗 NutriVision
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: drawerWidthExpanded,
            boxSizing: 'border-box',
            border: 'none',
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop Drawer */}
      <motion.div
        initial={false}
        animate={sidebarExpanded ? 'expanded' : 'collapsed'}
        variants={sidebarVariants}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        style={{
          display: isMobile ? 'none' : 'block',
          position: 'fixed',
          height: '100vh',
          zIndex: 1200,
        }}
      >
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              width: currentDrawerWidth,
              boxSizing: 'border-box',
              border: 'none',
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            },
          }}
        >
          {drawerContent}
        </Drawer>
      </motion.div>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { xs: '100%', md: `calc(100% - ${currentDrawerWidth}px)` },
          ml: { xs: 0, md: `${currentDrawerWidth}px` },
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          backgroundColor: theme.palette.background.default,
          minHeight: '100vh',
          overflow: 'auto',
          pb: { xs: 12, md: 4 },
        }}
      >
        {/* Spacer for mobile app bar */}
        <Toolbar sx={{ display: { md: 'none' } }} />
        
        {/* Page Content with Animation */}
        <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: '100%', overflow: 'hidden' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </Box>
      </Box>

      {/* Bottom Dock with Camera FAB */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: { xs: 0, md: currentDrawerWidth },
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          pb: { xs: 2, md: 3 },
          pointerEvents: 'none',
          transition: theme.transitions.create('left', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        {/* Camera Dock */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
          style={{ pointerEvents: 'auto' }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              px: 3,
              py: 1.5,
              borderRadius: 6,
              backdropFilter: 'blur(20px)',
              background: theme.palette.mode === 'dark'
                ? 'rgba(30, 30, 50, 0.9)'
                : 'rgba(255, 255, 255, 0.9)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
              border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontWeight: 500,
                color: theme.palette.text.secondary,
                display: { xs: 'none', sm: 'block' },
              }}
            >
              Scan your meal
            </Typography>
            
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Fab
                onClick={handleCameraClick}
                sx={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  width: 64,
                  height: 64,
                  boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5a6fd6 0%, #6a4190 100%)',
                  },
                }}
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                >
                  <CameraIcon sx={{ fontSize: 30 }} />
                </motion.div>
              </Fab>
            </motion.div>
            
            <Typography
              variant="caption"
              sx={{
                fontWeight: 500,
                color: theme.palette.primary.main,
                display: { xs: 'none', sm: 'block' },
              }}
            >
              AI-Powered
            </Typography>
          </Box>
        </motion.div>
      </Box>

      {/* AI Chat FAB */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.7, type: 'spring', stiffness: 200 }}
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1300,
        }}
      >
        <Tooltip title="AI Nutrition Assistant" placement="left" arrow>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Fab
              onClick={() => setChatOpen(true)}
              sx={{
                background: theme.palette.mode === 'dark'
                  ? 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)'
                  : 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                color: 'white',
                width: 56,
                height: 56,
                boxShadow: '0 4px 20px rgba(17, 153, 142, 0.4)',
                '&:hover': {
                  boxShadow: '0 6px 25px rgba(17, 153, 142, 0.5)',
                },
              }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <AIIcon sx={{ fontSize: 28 }} />
              </motion.div>
            </Fab>
          </motion.div>
        </Tooltip>
      </motion.div>

      {/* Chat Dialog */}
      <Dialog
        open={chatOpen}
        onClose={() => setChatOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            maxHeight: '80vh',
            m: 2,
          },
        }}
      >
        {/* Chat Header */}
        <Box
          sx={{
            p: 2,
            background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)' }}>
                <AIIcon />
              </Avatar>
            </motion.div>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                AI Nutrition Assistant
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.9 }}>
                Always here to help 🌟
              </Typography>
            </Box>
          </Stack>
          <IconButton onClick={() => setChatOpen(false)} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Chat Messages */}
        <DialogContent sx={{ p: 0, display: 'flex', flexDirection: 'column' }}>
          <Box
            sx={{
              flexGrow: 1,
              overflowY: 'auto',
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              minHeight: 300,
            }}
          >
            <AnimatePresence>
              {chatHistory.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    }}
                  >
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        maxWidth: '80%',
                        borderRadius: 3,
                        background: msg.role === 'user'
                          ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                          : theme.palette.mode === 'dark'
                            ? 'rgba(255,255,255,0.05)'
                            : 'rgba(0,0,0,0.04)',
                        color: msg.role === 'user' ? 'white' : 'inherit',
                      }}
                    >
                      <Typography variant="body2">{msg.content}</Typography>
                    </Paper>
                  </Box>
                </motion.div>
              ))}
            </AnimatePresence>
          </Box>

          {/* Chat Input */}
          <Box
            sx={{
              p: 2,
              borderTop: `1px solid ${theme.palette.divider}`,
              display: 'flex',
              gap: 1,
            }}
          >
            <TextField
              fullWidth
              size="small"
              placeholder="Ask about nutrition, recipes, or health tips..."
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleChatSend()}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                },
              }}
            />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <IconButton
                onClick={handleChatSend}
                sx={{
                  background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                  color: 'white',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #0f8a80 0%, #32d970 100%)',
                  },
                }}
              >
                <SendIcon />
              </IconButton>
            </motion.div>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default MainLayout;
