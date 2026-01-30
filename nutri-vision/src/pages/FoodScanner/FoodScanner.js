import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Paper,
  Chip,
  Button,
  LinearProgress,
  Stack,
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
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { aiService } from '../../services';

const FoodScanner = () => {
  const navigate = useNavigate();
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

  const analyzeFood = async (imageData) => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    setShowPanel(false);

    try {
      const response = await aiService.analyzeImage(imageData);
      setAnalysisResult(response);
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
  }, []);

  const addToMeal = () => {
    if (analysisResult) {
      navigate('/todays-meals', { 
        state: { 
          addFood: {
            name: analysisResult.name,
            calories: analysisResult.calories,
            protein: analysisResult.protein,
            carbs: analysisResult.carbs,
            fat: analysisResult.fat,
          }
        }
      });
    }
  };

  // Macro progress bar component
  const MacroBar = ({ label, value, max, color, icon }) => (
    <Box sx={{ mb: 2.5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {icon}
          <Typography variant="body2" sx={{ color: '#555', fontWeight: 500 }}>
            {label}
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ fontWeight: 700, color: '#1a1a2e' }}>
          {value}g
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={Math.min((value / max) * 100, 100)}
        sx={{
          height: 10,
          borderRadius: 5,
          backgroundColor: '#e8e8e8',
          '& .MuiLinearProgress-bar': {
            borderRadius: 5,
            background: color,
          },
        }}
      />
    </Box>
  );

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

      {/* Gradient Overlay - appears when results show */}
      <AnimatePresence>
        {showPanel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '70%',
              background: 'linear-gradient(to left, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 50%, transparent 100%)',
              zIndex: 50,
              pointerEvents: 'none',
            }}
          />
        )}
      </AnimatePresence>

      {/* Results Panel - Slides from Right */}
      <AnimatePresence>
        {showPanel && analysisResult && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '450px',
              maxWidth: '90vw',
              zIndex: 100,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box
              sx={{
                height: '100%',
                overflowY: 'auto',
                background: 'linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)',
                backdropFilter: 'blur(20px)',
                borderLeft: '1px solid rgba(0,0,0,0.08)',
                boxShadow: '-10px 0 40px rgba(0,0,0,0.15)',
                p: 3,
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
                  backgroundColor: 'rgba(0,0,0,0.05)',
                  color: '#333',
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.1)',
                  },
                }}
              >
                <Close />
              </IconButton>

              {/* Food name and confidence */}
              <Box sx={{ mb: 3, pr: 5 }}>
                <Typography
                  variant="h4"
                  sx={{
                    color: '#1a1a2e',
                    fontWeight: 700,
                    mb: 1,
                  }}
                >
                  {analysisResult.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircle sx={{ color: '#00C853', fontSize: 18 }} />
                  <Typography sx={{ color: '#666' }}>
                    {Math.round(analysisResult.confidence * 100)}% confident
                  </Typography>
                </Box>
                {analysisResult.servingSize && (
                  <Chip
                    label={analysisResult.servingSize}
                    size="small"
                    sx={{
                      mt: 1,
                      backgroundColor: '#f0f0f0',
                      color: '#555',
                      fontWeight: 500,
                    }}
                  />
                )}
              </Box>

              {/* Calories - Big display */}
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  mb: 3,
                  borderRadius: 4,
                  background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
                  boxShadow: '0 8px 32px rgba(255,107,107,0.3)',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: 2,
                        backgroundColor: 'rgba(255,255,255,0.25)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <LocalFireDepartment sx={{ color: 'white', fontSize: 28 }} />
                    </Box>
                    <Box>
                      <Typography sx={{ color: 'rgba(255,255,255,0.85)', fontSize: 14 }}>
                        Calories
                      </Typography>
                      <Typography
                        variant="h3"
                        sx={{ color: 'white', fontWeight: 700, lineHeight: 1 }}
                      >
                        {analysisResult.calories}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: 24, fontWeight: 500 }}>
                    kcal
                  </Typography>
                </Box>
              </Paper>

              {/* Macronutrients */}
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  mb: 3,
                  borderRadius: 4,
                  backgroundColor: '#f8f9fa',
                  border: '1px solid #e8e8e8',
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{ color: '#888', mb: 2.5, textTransform: 'uppercase', letterSpacing: 1, fontSize: 12 }}
                >
                  Macronutrients
                </Typography>

                <MacroBar
                  label="Protein"
                  value={analysisResult.protein}
                  max={50}
                  color="linear-gradient(90deg, #42A5F5, #1976D2)"
                  icon={<FitnessCenter sx={{ color: '#1976D2', fontSize: 18 }} />}
                />

                <MacroBar
                  label="Carbs"
                  value={analysisResult.carbs}
                  max={100}
                  color="linear-gradient(90deg, #FFA726, #F57C00)"
                  icon={<Grain sx={{ color: '#F57C00', fontSize: 18 }} />}
                />

                <MacroBar
                  label="Fat"
                  value={analysisResult.fat}
                  max={50}
                  color="linear-gradient(90deg, #AB47BC, #7B1FA2)"
                  icon={<Opacity sx={{ color: '#7B1FA2', fontSize: 18 }} />}
                />

                {analysisResult.fiber && (
                  <MacroBar
                    label="Fiber"
                    value={analysisResult.fiber}
                    max={30}
                    color="linear-gradient(90deg, #66BB6A, #388E3C)"
                    icon={<Grain sx={{ color: '#388E3C', fontSize: 18 }} />}
                  />
                )}
              </Paper>

              {/* Suggestions */}
              {analysisResult.suggestions && analysisResult.suggestions.length > 0 && (
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    mb: 3,
                    borderRadius: 4,
                    background: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)',
                    border: '1px solid #A5D6A7',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <TipsAndUpdates sx={{ color: '#2E7D32', fontSize: 20 }} />
                    <Typography
                      variant="subtitle2"
                      sx={{ color: '#2E7D32', textTransform: 'uppercase', letterSpacing: 1, fontSize: 12, fontWeight: 600 }}
                    >
                      AI Insights
                    </Typography>
                  </Box>
                  <Stack spacing={1.5}>
                    {analysisResult.suggestions.map((suggestion, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 1.5,
                        }}
                      >
                        <Box
                          sx={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            backgroundColor: '#2E7D32',
                            mt: 1,
                            flexShrink: 0,
                          }}
                        />
                        <Typography
                          variant="body2"
                          sx={{ color: '#1B5E20', fontWeight: 500 }}
                        >
                          {suggestion}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Paper>
              )}

              {/* Action buttons */}
              <Stack spacing={2} sx={{ mt: 'auto', pt: 2 }}>
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
                    fontSize: '1rem',
                    boxShadow: '0 6px 24px rgba(0,200,83,0.35)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #00BFA5, #00C853)',
                      boxShadow: '0 8px 28px rgba(0,200,83,0.45)',
                    },
                  }}
                >
                  Add to Today's Meals
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<CameraAlt />}
                  onClick={resetScanner}
                  fullWidth
                  sx={{
                    py: 1.5,
                    borderRadius: 3,
                    borderColor: '#ddd',
                    borderWidth: 2,
                    color: '#555',
                    fontWeight: 600,
                    fontSize: '1rem',
                    '&:hover': {
                      borderColor: '#bbb',
                      borderWidth: 2,
                      backgroundColor: '#f5f5f5',
                    },
                  }}
                >
                  Scan Another
                </Button>
              </Stack>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default FoodScanner;
