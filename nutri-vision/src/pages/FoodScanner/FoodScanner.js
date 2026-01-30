import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Paper,
  Chip,
  Button,
  Stack,
  useTheme,
  alpha,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Snackbar,
  Alert,
  Grid,
  LinearProgress,
  useMediaQuery,
} from '@mui/material';
import {
  CameraAlt,
  PhotoLibrary,
  FlipCameraIos,
  Close,
  LocalFireDepartment,
  FitnessCenter,
  Opacity,
  Grain,
  Add,
  Restaurant,
  CheckCircle,
  TipsAndUpdates,
  ArrowBack,
  Refresh,
  FreeBreakfast,
  LunchDining,
  DinnerDining,
  Icecream,
  Edit,
  Category,
  Favorite,
  Science,
  WaterDrop,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { aiService, scanHistoryService } from '../../services';
import { useMeals } from '../../context/MealsContext';

const FoodScanner = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const { addMeal } = useMeals();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const streamRef = useRef(null);

  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [facingMode, setFacingMode] = useState('environment');
  const [error, setError] = useState(null);
  const [showPanel, setShowPanel] = useState(false);
  
  // New states for improvements
  const [reanalyzeHint, setReanalyzeHint] = useState('');
  const [mealTypeDialog, setMealTypeDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Meal type options
  const mealTypes = [
    { type: 'breakfast', label: 'Breakfast', icon: <FreeBreakfast />, color: '#f59e0b' },
    { type: 'lunch', label: 'Lunch', icon: <LunchDining />, color: '#22c55e' },
    { type: 'dinner', label: 'Dinner', icon: <DinnerDining />, color: '#8b5cf6' },
    { type: 'snack', label: 'Snack', icon: <Icecream />, color: '#ec4899' },
  ];

  // Cleanup camera on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Show panel after analysis
  useEffect(() => {
    if (analysisResult) {
      setTimeout(() => setShowPanel(true), 100);
    }
  }, [analysisResult]);

  const startCamera = useCallback(async () => {
    try {
      setError(null);
      const constraints = {
        video: {
          facingMode: facingMode,
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setIsCameraActive(true);
    } catch (err) {
      console.error('Camera error:', err);
      setError('Unable to access camera. Please check permissions.');
    }
  }, [facingMode]);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  }, []);

  const captureImage = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL('image/jpeg', 0.9);
      setCapturedImage(imageData);
      stopCamera();
      analyzeFood(imageData);
    }
  }, [stopCamera]);

  const handleFileUpload = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCapturedImage(e.target.result);
        analyzeFood(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const analyzeFood = async (imageData, hint = '') => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    setShowPanel(false);

    try {
      const response = await aiService.analyzeImage(imageData, hint);
      setAnalysisResult(response);
      
      // Save to scan history
      try {
        await scanHistoryService.saveScan({
          image: imageData,
          analysis: response,
          hint: hint || undefined,
        });
      } catch (saveErr) {
        console.error('Failed to save scan to history:', saveErr);
        // Don't show error to user - saving to history is not critical
      }
    } catch (err) {
      console.error('Analysis error:', err);
      // Fallback demo data
      setAnalysisResult({
        name: 'Detected Food Item',
        calories: 350,
        protein: 15,
        carbs: 45,
        fat: 12,
        fiber: 5,
        confidence: 0.85,
        servingSize: '1 serving (250g)',
        suggestions: [
          'Rich in protein and fiber',
          'Good source of energy',
          'Consider portion control',
        ],
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Re-analyze with optional hint
  const handleReanalyze = useCallback(() => {
    if (capturedImage) {
      analyzeFood(capturedImage, reanalyzeHint);
    }
  }, [capturedImage, reanalyzeHint]);

  const flipCamera = useCallback(() => {
    setFacingMode(prev => prev === 'environment' ? 'user' : 'environment');
    if (isCameraActive) {
      stopCamera();
      setTimeout(startCamera, 100);
    }
  }, [isCameraActive, stopCamera, startCamera]);

  const resetScanner = useCallback(() => {
    setCapturedImage(null);
    setAnalysisResult(null);
    setShowPanel(false);
    setError(null);
    setReanalyzeHint('');
  }, []);

  // Open meal type selection dialog
  const addToMeal = () => {
    if (analysisResult) {
      setMealTypeDialog(true);
    }
  };

  // Handle meal type selection
  const handleMealTypeSelect = async (mealType) => {
    if (analysisResult) {
      try {
        // Format food data as expected by MealsContext
        const foodData = {
          id: `scanned-${Date.now()}`,
          name: analysisResult.name,
          category: analysisResult.foodCategory || 'Scanned Food',
          servingSize: analysisResult.servingSize || '1 serving',
          nutrition: {
            calories: analysisResult.calories || 0,
            protein: analysisResult.protein || 0,
            carbohydrates: analysisResult.carbs || 0,
            fat: analysisResult.fat || 0,
            fiber: analysisResult.fiber || 0,
            sugar: analysisResult.sugar || 0,
          },
        };
        
        const result = await addMeal(foodData, mealType, 1);
        setMealTypeDialog(false);
        
        if (result.success) {
          setSnackbar({
            open: true,
            message: `${analysisResult.name} added to ${mealType}!`,
            severity: 'success',
          });
        } else {
          throw new Error(result.error || 'Failed to add meal');
        }
      } catch (err) {
        console.error('Error adding to meal:', err);
        setSnackbar({
          open: true,
          message: err.message || 'Failed to add food to meal',
          severity: 'error',
        });
      }
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: capturedImage
          ? 'transparent'
          : 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
      }}
    >
      {/* Hidden elements */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        style={{ display: 'none' }}
      />

      {/* Back button - always visible */}
      <IconButton
        onClick={() => navigate(-1)}
        sx={{
          position: 'fixed',
          top: 20,
          left: 20,
          zIndex: 1000,
          backgroundColor: 'rgba(0,0,0,0.5)',
          color: 'white',
          backdropFilter: 'blur(10px)',
          '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.7)',
          },
        }}
      >
        <ArrowBack />
      </IconButton>

      {/* Captured Image - Full Screen Background */}
      <AnimatePresence>
        {capturedImage && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1,
            }}
          >
            <Box
              component="img"
              src={capturedImage}
              alt="Captured food"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Camera View - Full Screen */}
      <AnimatePresence>
        {isCameraActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 2,
            }}
          >
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            
            {/* Camera overlay with scan guide */}
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '280px',
                height: '280px',
                border: '3px solid rgba(255,255,255,0.6)',
                borderRadius: 4,
                boxShadow: '0 0 0 9999px rgba(0,0,0,0.4)',
              }}
            >
              {/* Animated corners */}
              {[
                { top: -3, left: -3, borderTop: '4px solid #00E676', borderLeft: '4px solid #00E676' },
                { top: -3, right: -3, borderTop: '4px solid #00E676', borderRight: '4px solid #00E676' },
                { bottom: -3, left: -3, borderBottom: '4px solid #00E676', borderLeft: '4px solid #00E676' },
                { bottom: -3, right: -3, borderBottom: '4px solid #00E676', borderRight: '4px solid #00E676' },
              ].map((style, i) => (
                <Box
                  key={i}
                  component={motion.div}
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  sx={{
                    position: 'absolute',
                    width: 40,
                    height: 40,
                    ...style,
                  }}
                />
              ))}
              
              {/* Scanning line */}
              <Box
                component={motion.div}
                animate={{ y: [0, 260, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                sx={{
                  position: 'absolute',
                  top: 10,
                  left: 10,
                  right: 10,
                  height: 2,
                  background: 'linear-gradient(90deg, transparent, #00E676, transparent)',
                  boxShadow: '0 0 10px #00E676',
                }}
              />
            </Box>

            <Typography
              sx={{
                position: 'absolute',
                bottom: 140,
                left: '50%',
                transform: 'translateX(-50%)',
                color: 'white',
                textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                fontWeight: 500,
              }}
            >
              Position food in frame
            </Typography>

            {/* Camera controls */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 40,
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: 3,
                alignItems: 'center',
              }}
            >
              <IconButton
                onClick={() => {
                  stopCamera();
                  fileInputRef.current?.click();
                }}
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  backdropFilter: 'blur(10px)',
                  width: 50,
                  height: 50,
                }}
              >
                <PhotoLibrary />
              </IconButton>

              <IconButton
                onClick={captureImage}
                sx={{
                  width: 80,
                  height: 80,
                  background: 'linear-gradient(135deg, #00E676, #00C853)',
                  color: 'white',
                  boxShadow: '0 4px 20px rgba(0,230,118,0.4)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #00C853, #00BFA5)',
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <CameraAlt sx={{ fontSize: 36 }} />
              </IconButton>

              <IconButton
                onClick={flipCamera}
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  backdropFilter: 'blur(10px)',
                  width: 50,
                  height: 50,
                }}
              >
                <FlipCameraIos />
              </IconButton>
            </Box>

            {/* Close camera button */}
            <IconButton
              onClick={stopCamera}
              sx={{
                position: 'absolute',
                top: 20,
                right: 20,
                backgroundColor: 'rgba(0,0,0,0.5)',
                color: 'white',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Close />
            </IconButton>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Initial Placeholder - Full Screen */}
      <AnimatePresence>
        {!isCameraActive && !capturedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1,
            }}
          >
            {/* Decorative background elements */}
            <Box
              sx={{
                position: 'absolute',
                width: 400,
                height: 400,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(0,230,118,0.15) 0%, transparent 70%)',
                filter: 'blur(40px)',
              }}
            />
            
            <Box
              component={motion.div}
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 4, repeat: Infinity }}
              sx={{
                width: 200,
                height: 200,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(0,230,118,0.2), rgba(0,200,83,0.1))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 4,
                border: '2px dashed rgba(0,230,118,0.4)',
              }}
            >
              <Restaurant sx={{ fontSize: 80, color: 'rgba(255,255,255,0.6)' }} />
            </Box>

            <Typography
              variant="h4"
              sx={{
                color: 'white',
                fontWeight: 700,
                mb: 1,
                textAlign: 'center',
              }}
            >
              Scan Your Food
            </Typography>
            
            <Typography
              variant="body1"
              sx={{
                color: 'rgba(255,255,255,0.6)',
                mb: 5,
                textAlign: 'center',
                maxWidth: 300,
              }}
            >
              Take a photo or upload an image to get instant nutrition analysis
            </Typography>

            <Stack direction="row" spacing={3}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<CameraAlt />}
                  onClick={startCamera}
                  sx={{
                    px: 4,
                    py: 2,
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #00E676, #00C853)',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    boxShadow: '0 8px 32px rgba(0,230,118,0.3)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #00C853, #00BFA5)',
                    },
                  }}
                >
                  Open Camera
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<PhotoLibrary />}
                  onClick={() => fileInputRef.current?.click()}
                  sx={{
                    px: 4,
                    py: 2,
                    borderRadius: 3,
                    borderColor: 'rgba(255,255,255,0.3)',
                    color: 'white',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    backdropFilter: 'blur(10px)',
                    '&:hover': {
                      borderColor: 'rgba(255,255,255,0.5)',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                    },
                  }}
                >
                  Upload Image
                </Button>
              </motion.div>
            </Stack>

            {error && (
              <Typography
                sx={{
                  mt: 3,
                  color: '#ff5252',
                  backgroundColor: 'rgba(255,82,82,0.1)',
                  px: 3,
                  py: 1,
                  borderRadius: 2,
                }}
              >
                {error}
              </Typography>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Analyzing Overlay */}
      <AnimatePresence>
        {isAnalyzing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0,0,0,0.7)',
              backdropFilter: 'blur(10px)',
              zIndex: 100,
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <Box
                sx={{
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  border: '4px solid transparent',
                  borderTopColor: '#00E676',
                  borderRightColor: '#00E676',
                }}
              />
            </motion.div>
            <Typography
              variant="h6"
              sx={{ color: 'white', mt: 3, fontWeight: 500 }}
            >
              Analyzing your food...
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: 'rgba(255,255,255,0.6)', mt: 1 }}
            >
              AI is identifying nutrients
            </Typography>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dark Overlay - appears when results show */}
      <AnimatePresence>
        {showPanel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={resetScanner}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.6)',
              zIndex: 9998,
            }}
          />
        )}
      </AnimatePresence>

      {/* Results Panel - Modern Responsive Bottom Sheet */}
      <AnimatePresence>
        {showPanel && analysisResult && (
          <Box
            component={motion.div}
            initial={{ y: '100%', opacity: 0.8 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0.8 }}
            transition={{ 
              type: 'spring', 
              damping: 28, 
              stiffness: 300,
              mass: 0.8,
            }}
            sx={{
              position: 'fixed',
              left: 0,
              right: 0,
              bottom: 0,
              height: { xs: '90vh', sm: '85vh', md: '80vh' },
              maxHeight: '850px',
              zIndex: 9999,
              display: 'flex',
              flexDirection: 'column',
              borderTopLeftRadius: { xs: '24px', md: '32px' },
              borderTopRightRadius: { xs: '24px', md: '32px' },
              overflow: 'hidden',
              background: isDark ? '#1a1a2e' : '#ffffff',
              boxShadow: '0 -10px 60px rgba(0,0,0,0.4)',
            }}
          >
            {/* Drag handle indicator */}
            <Box
              sx={{
                position: 'absolute',
                top: 10,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 48,
                height: 5,
                borderRadius: 3,
                backgroundColor: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.15)',
                zIndex: 101,
              }}
            />
            <Box
              sx={{
                height: '100%',
                overflowY: 'auto',
                overflowX: 'hidden',
                background: isDark 
                  ? `linear-gradient(180deg, ${alpha(theme.palette.background.paper, 0.98)} 0%, ${theme.palette.background.default} 100%)`
                  : 'linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)',
                backdropFilter: 'blur(20px)',
                borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
                boxShadow: isDark ? '0 -10px 60px rgba(0,0,0,0.5)' : '0 -10px 60px rgba(0,0,0,0.2)',
                px: isMobile ? 2 : 3,
                py: 3,
                pt: 4,
              }}
            >
              {/* Close button */}
              <IconButton
                onClick={resetScanner}
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                  color: isDark ? 'white' : '#333',
                  zIndex: 102,
                  '&:hover': {
                    backgroundColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
                  },
                }}
              >
                <Close />
              </IconButton>

              {/* Header Section - Food Name & Quick Info */}
              <Box sx={{ mb: 3, pr: 5 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, flexWrap: 'wrap' }}>
                  <Box sx={{ flex: 1, minWidth: 200 }}>
                    <Typography
                      variant={isMobile ? 'h5' : 'h4'}
                      sx={{
                        color: isDark ? 'white' : '#1a1a2e',
                        fontWeight: 700,
                        mb: 1,
                        lineHeight: 1.2,
                      }}
                    >
                      {analysisResult.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                      <Chip
                        icon={<CheckCircle sx={{ fontSize: 14 }} />}
                        label={`${Math.round(analysisResult.confidence * 100)}% confident`}
                        size="small"
                        sx={{
                          backgroundColor: alpha('#00C853', 0.15),
                          color: '#00C853',
                          fontWeight: 600,
                          '& .MuiChip-icon': { color: '#00C853' },
                        }}
                      />
                      {analysisResult.servingSize && (
                        <Chip
                          icon={<Restaurant sx={{ fontSize: 14 }} />}
                          label={analysisResult.servingSize}
                          size="small"
                          sx={{
                            backgroundColor: isDark ? alpha('#fff', 0.1) : '#f0f0f0',
                            color: isDark ? 'rgba(255,255,255,0.8)' : '#555',
                            fontWeight: 500,
                          }}
                        />
                      )}
                      {analysisResult.foodCategory && (
                        <Chip
                          icon={<Category sx={{ fontSize: 14 }} />}
                          label={analysisResult.foodCategory}
                          size="small"
                          sx={{
                            backgroundColor: alpha('#2196F3', 0.15),
                            color: '#2196F3',
                            fontWeight: 500,
                            '& .MuiChip-icon': { color: '#2196F3' },
                          }}
                        />
                      )}
                    </Box>
                  </Box>
                  
                  {/* Health Score Badge */}
                  {analysisResult.healthScore && (
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        p: 1.5,
                        borderRadius: 3,
                        background: analysisResult.isHealthy 
                          ? 'linear-gradient(135deg, #00C853 0%, #00E676 100%)'
                          : 'linear-gradient(135deg, #FF9800 0%, #FFB74D 100%)',
                        minWidth: 70,
                      }}
                    >
                      <Favorite sx={{ color: 'white', fontSize: 20, mb: 0.5 }} />
                      <Typography sx={{ color: 'white', fontWeight: 700, fontSize: 18, lineHeight: 1 }}>
                        {analysisResult.healthScore}/10
                      </Typography>
                      <Typography sx={{ color: 'rgba(255,255,255,0.9)', fontSize: 10, fontWeight: 500 }}>
                        Health Score
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>

              {/* Calories Hero Card */}
              <Paper
                elevation={0}
                sx={{
                  p: isMobile ? 2 : 3,
                  mb: 2,
                  borderRadius: 4,
                  background: isDark 
                    ? 'linear-gradient(135deg, #D32F2F 0%, #F57C00 100%)'
                    : 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
                  boxShadow: '0 8px 32px rgba(255,107,107,0.3)',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        width: isMobile ? 48 : 56,
                        height: isMobile ? 48 : 56,
                        borderRadius: 3,
                        backgroundColor: 'rgba(255,255,255,0.25)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <LocalFireDepartment sx={{ color: 'white', fontSize: isMobile ? 26 : 32 }} />
                    </Box>
                    <Box>
                      <Typography sx={{ color: 'rgba(255,255,255,0.85)', fontSize: isMobile ? 12 : 14, fontWeight: 500 }}>
                        Total Calories
                      </Typography>
                      <Typography
                        variant={isMobile ? 'h4' : 'h3'}
                        sx={{ color: 'white', fontWeight: 700, lineHeight: 1 }}
                      >
                        {analysisResult.calories}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: isMobile ? 18 : 24, fontWeight: 500 }}>
                    kcal
                  </Typography>
                </Box>
              </Paper>

              {/* Macronutrients Grid - Responsive */}
              <Grid container spacing={1.5} sx={{ mb: 2 }}>
                {/* Protein */}
                <Grid item xs={6} sm={3}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: 3,
                      background: isDark ? alpha('#2196F3', 0.15) : alpha('#2196F3', 0.1),
                      border: `1px solid ${alpha('#2196F3', 0.2)}`,
                      textAlign: 'center',
                    }}
                  >
                    <FitnessCenter sx={{ color: '#2196F3', fontSize: 24, mb: 0.5 }} />
                    <Typography sx={{ color: isDark ? 'white' : '#333', fontWeight: 700, fontSize: 20 }}>
                      {analysisResult.protein}g
                    </Typography>
                    <Typography sx={{ color: isDark ? 'rgba(255,255,255,0.6)' : '#666', fontSize: 12, fontWeight: 500 }}>
                      Protein
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={Math.min((analysisResult.protein / 50) * 100, 100)}
                      sx={{
                        mt: 1,
                        height: 4,
                        borderRadius: 2,
                        backgroundColor: alpha('#2196F3', 0.2),
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: '#2196F3',
                          borderRadius: 2,
                        },
                      }}
                    />
                  </Paper>
                </Grid>
                
                {/* Carbs */}
                <Grid item xs={6} sm={3}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: 3,
                      background: isDark ? alpha('#FF9800', 0.15) : alpha('#FF9800', 0.1),
                      border: `1px solid ${alpha('#FF9800', 0.2)}`,
                      textAlign: 'center',
                    }}
                  >
                    <Grain sx={{ color: '#FF9800', fontSize: 24, mb: 0.5 }} />
                    <Typography sx={{ color: isDark ? 'white' : '#333', fontWeight: 700, fontSize: 20 }}>
                      {analysisResult.carbs}g
                    </Typography>
                    <Typography sx={{ color: isDark ? 'rgba(255,255,255,0.6)' : '#666', fontSize: 12, fontWeight: 500 }}>
                      Carbs
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={Math.min((analysisResult.carbs / 100) * 100, 100)}
                      sx={{
                        mt: 1,
                        height: 4,
                        borderRadius: 2,
                        backgroundColor: alpha('#FF9800', 0.2),
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: '#FF9800',
                          borderRadius: 2,
                        },
                      }}
                    />
                  </Paper>
                </Grid>
                
                {/* Fat */}
                <Grid item xs={6} sm={3}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: 3,
                      background: isDark ? alpha('#9C27B0', 0.15) : alpha('#9C27B0', 0.1),
                      border: `1px solid ${alpha('#9C27B0', 0.2)}`,
                      textAlign: 'center',
                    }}
                  >
                    <Opacity sx={{ color: '#9C27B0', fontSize: 24, mb: 0.5 }} />
                    <Typography sx={{ color: isDark ? 'white' : '#333', fontWeight: 700, fontSize: 20 }}>
                      {analysisResult.fat}g
                    </Typography>
                    <Typography sx={{ color: isDark ? 'rgba(255,255,255,0.6)' : '#666', fontSize: 12, fontWeight: 500 }}>
                      Fat
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={Math.min((analysisResult.fat / 50) * 100, 100)}
                      sx={{
                        mt: 1,
                        height: 4,
                        borderRadius: 2,
                        backgroundColor: alpha('#9C27B0', 0.2),
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: '#9C27B0',
                          borderRadius: 2,
                        },
                      }}
                    />
                  </Paper>
                </Grid>
                
                {/* Fiber */}
                <Grid item xs={6} sm={3}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: 3,
                      background: isDark ? alpha('#4CAF50', 0.15) : alpha('#4CAF50', 0.1),
                      border: `1px solid ${alpha('#4CAF50', 0.2)}`,
                      textAlign: 'center',
                    }}
                  >
                    <Grain sx={{ color: '#4CAF50', fontSize: 24, mb: 0.5 }} />
                    <Typography sx={{ color: isDark ? 'white' : '#333', fontWeight: 700, fontSize: 20 }}>
                      {analysisResult.fiber || 0}g
                    </Typography>
                    <Typography sx={{ color: isDark ? 'rgba(255,255,255,0.6)' : '#666', fontSize: 12, fontWeight: 500 }}>
                      Fiber
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={Math.min(((analysisResult.fiber || 0) / 25) * 100, 100)}
                      sx={{
                        mt: 1,
                        height: 4,
                        borderRadius: 2,
                        backgroundColor: alpha('#4CAF50', 0.2),
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: '#4CAF50',
                          borderRadius: 2,
                        },
                      }}
                    />
                  </Paper>
                </Grid>
              </Grid>

              {/* Additional Nutrients - Sugar & Sodium */}
              {(analysisResult.sugar > 0 || analysisResult.sodium > 0) && (
                <Grid container spacing={1.5} sx={{ mb: 2 }}>
                  {analysisResult.sugar > 0 && (
                    <Grid item xs={6}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          borderRadius: 3,
                          background: isDark ? alpha('#E91E63', 0.1) : alpha('#E91E63', 0.08),
                          border: `1px solid ${alpha('#E91E63', 0.15)}`,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                        }}
                      >
                        <WaterDrop sx={{ color: '#E91E63', fontSize: 28 }} />
                        <Box>
                          <Typography sx={{ color: isDark ? 'white' : '#333', fontWeight: 700, fontSize: 18 }}>
                            {analysisResult.sugar}g
                          </Typography>
                          <Typography sx={{ color: isDark ? 'rgba(255,255,255,0.6)' : '#666', fontSize: 12 }}>
                            Sugar
                          </Typography>
                        </Box>
                      </Paper>
                    </Grid>
                  )}
                  {analysisResult.sodium > 0 && (
                    <Grid item xs={6}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          borderRadius: 3,
                          background: isDark ? alpha('#607D8B', 0.1) : alpha('#607D8B', 0.08),
                          border: `1px solid ${alpha('#607D8B', 0.15)}`,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                        }}
                      >
                        <Science sx={{ color: '#607D8B', fontSize: 28 }} />
                        <Box>
                          <Typography sx={{ color: isDark ? 'white' : '#333', fontWeight: 700, fontSize: 18 }}>
                            {analysisResult.sodium}mg
                          </Typography>
                          <Typography sx={{ color: isDark ? 'rgba(255,255,255,0.6)' : '#666', fontSize: 12 }}>
                            Sodium
                          </Typography>
                        </Box>
                      </Paper>
                    </Grid>
                  )}
                </Grid>
              )}

              {/* Ingredients Section */}
              {analysisResult.ingredients && analysisResult.ingredients.length > 0 && (
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    mb: 2,
                    borderRadius: 3,
                    backgroundColor: isDark ? alpha('#fff', 0.05) : '#f8f9fa',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#e8e8e8'}`,
                  }}
                >
                  <Typography
                    sx={{ 
                      color: isDark ? 'rgba(255,255,255,0.5)' : '#888', 
                      mb: 1.5, 
                      textTransform: 'uppercase', 
                      letterSpacing: 1, 
                      fontSize: 11,
                      fontWeight: 600,
                    }}
                  >
                    Detected Ingredients
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                    {analysisResult.ingredients.map((ingredient, idx) => (
                      <Chip
                        key={`ingredient-${idx}`}
                        label={ingredient}
                        size="small"
                        sx={{
                          backgroundColor: isDark ? alpha('#fff', 0.1) : '#e8e8e8',
                          color: isDark ? 'rgba(255,255,255,0.9)' : '#444',
                          fontSize: 12,
                          fontWeight: 500,
                        }}
                      />
                    ))}
                  </Box>
                </Paper>
              )}

              {/* AI Suggestions/Insights */}
              {analysisResult.suggestions && analysisResult.suggestions.length > 0 && (
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    mb: 2,
                    borderRadius: 3,
                    background: isDark 
                      ? alpha('#4CAF50', 0.12)
                      : 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)',
                    border: `1px solid ${isDark ? alpha('#4CAF50', 0.25) : '#A5D6A7'}`,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                    <TipsAndUpdates sx={{ color: '#2E7D32', fontSize: 18 }} />
                    <Typography
                      sx={{ color: '#2E7D32', textTransform: 'uppercase', letterSpacing: 1, fontSize: 11, fontWeight: 600 }}
                    >
                      AI Health Insights
                    </Typography>
                  </Box>
                  <Stack spacing={1}>
                    {analysisResult.suggestions.map((suggestion, index) => (
                      <Box
                        key={`suggestion-${index}`}
                        sx={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 1,
                        }}
                      >
                        <Box
                          sx={{
                            width: 5,
                            height: 5,
                            borderRadius: '50%',
                            backgroundColor: '#2E7D32',
                            mt: 0.8,
                            flexShrink: 0,
                          }}
                        />
                        <Typography
                          variant="body2"
                          sx={{ color: isDark ? '#81C784' : '#1B5E20', fontWeight: 500, fontSize: 13 }}
                        >
                          {suggestion}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Paper>
              )}

              {/* Re-analyze Section */}
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  mb: 2,
                  borderRadius: 3,
                  backgroundColor: isDark ? alpha('#fff', 0.05) : '#f8f9fa',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
                }}
              >
                <Typography
                  sx={{ 
                    color: isDark ? 'rgba(255,255,255,0.7)' : '#666',
                    mb: 1.5,
                    fontWeight: 500,
                    fontSize: 13,
                  }}
                >
                  Not accurate? Re-analyze with a hint
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    size="small"
                    placeholder="e.g., 'This is biryani' or 'smaller portion'"
                    value={reanalyzeHint}
                    onChange={(e) => setReanalyzeHint(e.target.value)}
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : '#fff',
                        fontSize: 13,
                        '& fieldset': {
                          borderColor: isDark ? 'rgba(255,255,255,0.15)' : '#ddd',
                        },
                        '&:hover fieldset': {
                          borderColor: isDark ? 'rgba(255,255,255,0.3)' : '#bbb',
                        },
                      },
                      '& .MuiInputBase-input': {
                        color: isDark ? 'white' : '#333',
                      },
                      '& .MuiInputBase-input::placeholder': {
                        color: isDark ? 'rgba(255,255,255,0.4)' : '#999',
                        opacity: 1,
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <Edit sx={{ color: isDark ? 'rgba(255,255,255,0.4)' : '#999', fontSize: 16, mr: 1 }} />
                      ),
                    }}
                  />
                  <Button
                    variant="contained"
                    onClick={handleReanalyze}
                    disabled={isAnalyzing}
                    sx={{
                      minWidth: 'auto',
                      px: 2,
                      borderRadius: 2,
                      backgroundColor: isDark ? 'rgba(255,255,255,0.15)' : '#e0e0e0',
                      color: isDark ? 'white' : '#333',
                      '&:hover': {
                        backgroundColor: isDark ? 'rgba(255,255,255,0.25)' : '#d0d0d0',
                      },
                    }}
                  >
                    <Refresh sx={{ fontSize: 18 }} />
                  </Button>
                </Box>
              </Paper>

              {/* Action Buttons - Sticky at Bottom */}
              <Box
                sx={{
                  display: 'flex',
                  gap: 1.5,
                  flexDirection: isMobile ? 'column' : 'row',
                  mt: 2,
                  pb: 2,
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<Add />}
                  onClick={addToMeal}
                  fullWidth
                  sx={{
                    py: 1.5,
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #00C853, #00E676)',
                    fontWeight: 600,
                    fontSize: isMobile ? '0.9rem' : '1rem',
                    boxShadow: '0 6px 24px rgba(0,200,83,0.35)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #00BFA5, #00C853)',
                      boxShadow: '0 8px 28px rgba(0,200,83,0.45)',
                    },
                  }}
                >
                  Add to Meal
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<CameraAlt />}
                  onClick={resetScanner}
                  fullWidth={isMobile}
                  sx={{
                    py: 1.5,
                    px: 3,
                    borderRadius: 3,
                    borderColor: isDark ? 'rgba(255,255,255,0.3)' : '#ddd',
                    borderWidth: 2,
                    color: isDark ? 'rgba(255,255,255,0.8)' : '#555',
                    fontWeight: 600,
                    fontSize: isMobile ? '0.9rem' : '1rem',
                    minWidth: isMobile ? 'auto' : 160,
                    '&:hover': {
                      borderColor: isDark ? 'rgba(255,255,255,0.5)' : '#bbb',
                      borderWidth: 2,
                      backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : '#f5f5f5',
                    },
                  }}
                >
                  Scan Another
                </Button>
              </Box>
            </Box>
          </Box>
        )}
      </AnimatePresence>

      {/* Meal Type Selection Dialog */}
      <Dialog
        open={mealTypeDialog}
        onClose={() => setMealTypeDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: 4,
            minWidth: 320,
            background: isDark 
              ? 'linear-gradient(180deg, #1e1e2e 0%, #12121a 100%)'
              : 'linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)',
          },
        }}
      >
        <DialogTitle
          sx={{
            textAlign: 'center',
            color: isDark ? 'white' : '#333',
            fontWeight: 700,
            pb: 1,
          }}
        >
          Add to which meal?
        </DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          <Typography
            variant="body2"
            sx={{ 
              textAlign: 'center', 
              color: isDark ? 'rgba(255,255,255,0.6)' : '#666',
              mb: 2,
            }}
          >
            {analysisResult?.name} • {analysisResult?.calories} cal
          </Typography>
          <List sx={{ pt: 0 }}>
            {mealTypes.map((meal) => (
              <ListItem key={meal.type} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  onClick={() => handleMealTypeSelect(meal.type)}
                  sx={{
                    borderRadius: 3,
                    py: 1.5,
                    px: 2,
                    backgroundColor: isDark ? alpha(meal.color, 0.15) : alpha(meal.color, 0.1),
                    border: `1px solid ${alpha(meal.color, 0.3)}`,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: isDark ? alpha(meal.color, 0.25) : alpha(meal.color, 0.2),
                      transform: 'scale(1.02)',
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 44 }}>
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: 2,
                        backgroundColor: alpha(meal.color, 0.2),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: meal.color,
                      }}
                    >
                      {meal.icon}
                    </Box>
                  </ListItemIcon>
                  <ListItemText
                    primary={meal.label}
                    primaryTypographyProps={{
                      fontWeight: 600,
                      color: isDark ? 'white' : '#333',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={() => setMealTypeDialog(false)}
            sx={{
              color: isDark ? 'rgba(255,255,255,0.6)' : '#666',
              fontWeight: 500,
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success/Error Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ 
            width: '100%',
            borderRadius: 3,
            fontWeight: 600,
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default FoodScanner;
