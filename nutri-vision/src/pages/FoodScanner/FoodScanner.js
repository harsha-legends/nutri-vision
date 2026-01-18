import React, { useState, useRef, useCallback } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Button,
  Stack,
  Chip,
  CircularProgress,
} from '@mui/material';
import {
  CameraAlt as CameraIcon,
  FlipCameraIos as FlipIcon,
  Close as CloseIcon,
  Refresh as RetakeIcon,
  Check as ConfirmIcon,
  FlashOn as FlashOnIcon,
  FlashOff as FlashOffIcon,
  PhotoLibrary as GalleryIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@mui/material/styles';

const FoodScanner = () => {
  const theme = useTheme();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  
  const [cameraActive, setCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [facingMode, setFacingMode] = useState('environment');
  const [flashOn, setFlashOn] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [stream, setStream] = useState(null);

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setCameraActive(true);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      alert('Unable to access camera. Please check permissions.');
    }
  }, [facingMode]);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setCameraActive(false);
  }, [stream]);

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0);
      
      const imageData = canvas.toDataURL('image/jpeg', 0.9);
      setCapturedImage(imageData);
      stopCamera();
    }
  };

  const flipCamera = async () => {
    stopCamera();
    setFacingMode(prev => prev === 'environment' ? 'user' : 'environment');
    setTimeout(() => startCamera(), 100);
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    setAnalysisResult(null);
    startCamera();
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCapturedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeFood = async () => {
    setAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Mock analysis result
    setAnalysisResult({
      foodName: 'Grilled Chicken Salad',
      confidence: 94,
      calories: 320,
      protein: 35,
      carbs: 12,
      fat: 15,
      fiber: 6,
      ingredients: ['Chicken Breast', 'Mixed Greens', 'Cherry Tomatoes', 'Cucumber', 'Olive Oil Dressing'],
    });
    
    setAnalyzing(false);
  };

  const scannerOverlay = (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '70%',
        maxWidth: 300,
        aspectRatio: '1',
        border: '3px solid rgba(255,255,255,0.8)',
        borderRadius: 4,
        boxShadow: '0 0 0 9999px rgba(0,0,0,0.5)',
        '&::before, &::after': {
          content: '""',
          position: 'absolute',
          width: 30,
          height: 30,
          border: '4px solid #667eea',
        },
        '&::before': {
          top: -4,
          left: -4,
          borderRight: 'none',
          borderBottom: 'none',
          borderRadius: '12px 0 0 0',
        },
        '&::after': {
          top: -4,
          right: -4,
          borderLeft: 'none',
          borderBottom: 'none',
          borderRadius: '0 12px 0 0',
        },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          bottom: -4,
          left: -4,
          width: 30,
          height: 30,
          border: '4px solid #667eea',
          borderRight: 'none',
          borderTop: 'none',
          borderRadius: '0 0 0 12px',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -4,
          right: -4,
          width: 30,
          height: 30,
          border: '4px solid #667eea',
          borderLeft: 'none',
          borderTop: 'none',
          borderRadius: '0 0 12px 0',
        }}
      />
      {/* Scanning line animation */}
      <motion.div
        animate={{ y: [0, 250, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          height: 2,
          background: 'linear-gradient(90deg, transparent, #667eea, transparent)',
        }}
      />
    </Box>
  );

  return (
    <Box>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 1,
            background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Scan Your Food
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Take a photo of your meal to instantly analyze its nutritional content
        </Typography>
      </motion.div>

      {/* Camera / Image Preview Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card
          elevation={0}
          sx={{
            borderRadius: 4,
            overflow: 'hidden',
            bgcolor: '#000',
            position: 'relative',
            aspectRatio: '4/3',
            maxHeight: 500,
          }}
        >
          <AnimatePresence mode="wait">
            {!cameraActive && !capturedImage && (
              <motion.div
                key="start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ height: '100%' }}
              >
                <Box
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: theme.palette.mode === 'dark'
                      ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
                      : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    gap: 3,
                  }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Box
                      sx={{
                        width: 120,
                        height: 120,
                        borderRadius: '50%',
                        bgcolor: 'rgba(255,255,255,0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <CameraIcon sx={{ fontSize: 60, color: 'white' }} />
                    </Box>
                  </motion.div>
                  
                  <Stack direction="row" spacing={2}>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="contained"
                        size="large"
                        startIcon={<CameraIcon />}
                        onClick={startCamera}
                        sx={{
                          bgcolor: 'white',
                          color: '#667eea',
                          fontWeight: 600,
                          px: 4,
                          py: 1.5,
                          borderRadius: 3,
                          '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
                        }}
                      >
                        Open Camera
                      </Button>
                    </motion.div>
                    
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="outlined"
                        size="large"
                        startIcon={<GalleryIcon />}
                        onClick={() => fileInputRef.current?.click()}
                        sx={{
                          borderColor: 'white',
                          color: 'white',
                          fontWeight: 600,
                          px: 4,
                          py: 1.5,
                          borderRadius: 3,
                          '&:hover': { 
                            bgcolor: 'rgba(255,255,255,0.1)',
                            borderColor: 'white',
                          },
                        }}
                      >
                        Gallery
                      </Button>
                    </motion.div>
                  </Stack>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleFileSelect}
                  />
                </Box>
              </motion.div>
            )}

            {cameraActive && (
              <motion.div
                key="camera"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ height: '100%', position: 'relative' }}
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
                {scannerOverlay}
                
                {/* Camera Controls */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                  }}
                >
                  <IconButton
                    onClick={() => setFlashOn(!flashOn)}
                    sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.2)' }}
                  >
                    {flashOn ? <FlashOnIcon /> : <FlashOffIcon />}
                  </IconButton>
                  
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <IconButton
                      onClick={captureImage}
                      sx={{
                        width: 70,
                        height: 70,
                        bgcolor: 'white',
                        border: '4px solid rgba(255,255,255,0.5)',
                        '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
                      }}
                    >
                      <CameraIcon sx={{ fontSize: 35, color: '#667eea' }} />
                    </IconButton>
                  </motion.div>
                  
                  <IconButton
                    onClick={flipCamera}
                    sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.2)' }}
                  >
                    <FlipIcon />
                  </IconButton>
                </Box>
                
                {/* Close Button */}
                <IconButton
                  onClick={stopCamera}
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    color: 'white',
                    bgcolor: 'rgba(0,0,0,0.5)',
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </motion.div>
            )}

            {capturedImage && (
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                style={{ height: '100%', position: 'relative' }}
              >
                <img
                  src={capturedImage}
                  alt="Captured food"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                
                {analyzing && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      bgcolor: 'rgba(0,0,0,0.7)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 2,
                    }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      <CircularProgress size={60} sx={{ color: '#667eea' }} />
                    </motion.div>
                    <Typography variant="h6" sx={{ color: 'white' }}>
                      Analyzing your food...
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                      AI is identifying nutritional content
                    </Typography>
                  </Box>
                )}
                
                {!analyzing && !analysisResult && (
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      p: 3,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 2,
                      background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                    }}
                  >
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="outlined"
                        startIcon={<RetakeIcon />}
                        onClick={retakePhoto}
                        sx={{
                          borderColor: 'white',
                          color: 'white',
                          px: 3,
                          borderRadius: 3,
                        }}
                      >
                        Retake
                      </Button>
                    </motion.div>
                    
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="contained"
                        startIcon={<ConfirmIcon />}
                        onClick={analyzeFood}
                        sx={{
                          background: 'linear-gradient(45deg, #667eea, #764ba2)',
                          px: 3,
                          borderRadius: 3,
                        }}
                      >
                        Analyze Food
                      </Button>
                    </motion.div>
                  </Box>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </Card>
      </motion.div>

      {/* Analysis Result */}
      <AnimatePresence>
        {analysisResult && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5 }}
          >
            <Card
              elevation={0}
              sx={{
                mt: 3,
                borderRadius: 4,
                bgcolor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  p: 2,
                  background: 'linear-gradient(45deg, #667eea, #764ba2)',
                  color: 'white',
                }}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {analysisResult.foodName}
                  </Typography>
                  <Chip
                    label={`${analysisResult.confidence}% match`}
                    size="small"
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      fontWeight: 600,
                    }}
                  />
                </Stack>
              </Box>
              
              <CardContent sx={{ p: 3 }}>
                {/* Nutrition Grid */}
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: 2,
                    mb: 3,
                  }}
                >
                  {[
                    { label: 'Calories', value: analysisResult.calories, unit: 'kcal', color: '#ff6b6b' },
                    { label: 'Protein', value: analysisResult.protein, unit: 'g', color: '#4ecdc4' },
                    { label: 'Carbs', value: analysisResult.carbs, unit: 'g', color: '#ffe66d' },
                    { label: 'Fat', value: analysisResult.fat, unit: 'g', color: '#ff8c42' },
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Box
                        sx={{
                          textAlign: 'center',
                          p: 2,
                          borderRadius: 3,
                          bgcolor: theme.palette.mode === 'dark'
                            ? 'rgba(255,255,255,0.05)'
                            : 'rgba(0,0,0,0.02)',
                        }}
                      >
                        <Typography
                          variant="h5"
                          sx={{ fontWeight: 700, color: item.color }}
                        >
                          {item.value}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {item.unit}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 500, mt: 0.5 }}
                        >
                          {item.label}
                        </Typography>
                      </Box>
                    </motion.div>
                  ))}
                </Box>
                
                {/* Ingredients */}
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                  Detected Ingredients
                </Typography>
                <Stack direction="row" flexWrap="wrap" gap={1}>
                  {analysisResult.ingredients.map((ingredient, index) => (
                    <motion.div
                      key={ingredient}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.05 }}
                    >
                      <Chip
                        label={ingredient}
                        size="small"
                        sx={{
                          bgcolor: theme.palette.mode === 'dark'
                            ? 'rgba(102, 126, 234, 0.2)'
                            : 'rgba(102, 126, 234, 0.1)',
                          color: theme.palette.primary.main,
                        }}
                      />
                    </motion.div>
                  ))}
                </Stack>
                
                {/* Action Buttons */}
                <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      background: 'linear-gradient(45deg, #667eea, #764ba2)',
                      py: 1.5,
                      borderRadius: 3,
                    }}
                  >
                    Add to Today's Meals
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={retakePhoto}
                    sx={{ borderRadius: 3, px: 4 }}
                  >
                    Scan Again
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default FoodScanner;
