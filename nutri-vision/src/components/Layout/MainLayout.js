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
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Analytics as AnalyticsIcon,
  Person as PersonIcon,
  Flag as GoalsIcon,
  Restaurant as MealsIcon,
  SmartToy as AIIcon,
  Logout as LogoutIcon,
  ChevronLeft as ChevronLeftIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  QrCode as QrCodeIcon,
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
  { text: 'AI Assistant', icon: <AIIcon />, path: '/ai-chat' },
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
    </Box>
  );
};

export default MainLayout;
