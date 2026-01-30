import React, { useState, useRef, useCallback, useEffect } from 'react';
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
  TextField,
  Alert,
  Divider,
  LinearProgress,
} from '@mui/material';
import {
  QrCodeScanner as ScanIcon,
  Close as CloseIcon,
  Refresh as RetryIcon,
  Add as AddIcon,
  Search as SearchIcon,
  FlipCameraIos as FlipIcon,
  CheckCircle as SuccessIcon,
  LocalDining as FoodIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import { BrowserMultiFormatReader } from '@zxing/library';
import { useMeals } from '../../context/MealsContext';
import { useNavigate } from 'react-router-dom';

const BarcodeScanner = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const { addMeal } = useMeals();
  
  const [cameraActive, setCameraActive] = useState(false);
  const [facingMode, setFacingMode] = useState('environment');
  const [stream, setStream] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [scannedBarcode, setScannedBarcode] = useState('');
  const [manualBarcode, setManualBarcode] = useState('');
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [addedToMeal, setAddedToMeal] = useState(false);
  const [codeReader, setCodeReader] = useState(null);

  // Initialize barcode reader
  useEffect(() => {
    const reader = new BrowserMultiFormatReader();
    setCodeReader(reader);
    
    return () => {
      if (reader) {
        reader.reset();
      }
    };
  }, []);

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setCameraActive(true);
        setScanning(true);
        
        // Start continuous barcode scanning
        if (codeReader) {
          codeReader.decodeFromVideoDevice(null, videoRef.current, (result, error) => {
            if (result) {
              const barcode = result.getText();
              setScannedBarcode(barcode);
              stopCamera();
              fetchProductData(barcode);
            }
          });
        }
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('Unable to access camera. Please check permissions or enter barcode manually.');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facingMode, codeReader]);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    if (codeReader) {
      codeReader.reset();
    }
    setCameraActive(false);
    setScanning(false);
  }, [stream, codeReader]);

  const flipCamera = async () => {
    stopCamera();
    setFacingMode(prev => prev === 'environment' ? 'user' : 'environment');
    setTimeout(() => startCamera(), 100);
  };

  const fetchProductData = async (barcode) => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch from Open Food Facts API
      const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
      const data = await response.json();
      
      if (data.status === 1 && data.product) {
        const product = data.product;
        const nutriments = product.nutriments || {};
        
        setProductData({
          name: product.product_name || 'Unknown Product',
          brand: product.brands || 'Unknown Brand',
          image: product.image_url || product.image_front_url,
          barcode: barcode,
          servingSize: product.serving_size || '100g',
          nutrition: {
            calories: Math.round(nutriments['energy-kcal_100g'] || nutriments['energy-kcal'] || 0),
            protein: Math.round((nutriments.proteins_100g || nutriments.proteins || 0) * 10) / 10,
            carbs: Math.round((nutriments.carbohydrates_100g || nutriments.carbohydrates || 0) * 10) / 10,
            fat: Math.round((nutriments.fat_100g || nutriments.fat || 0) * 10) / 10,
            fiber: Math.round((nutriments.fiber_100g || nutriments.fiber || 0) * 10) / 10,
            sugar: Math.round((nutriments.sugars_100g || nutriments.sugars || 0) * 10) / 10,
            sodium: Math.round((nutriments.sodium_100g || nutriments.sodium || 0) * 1000) / 10, // Convert to mg
          },
          nutriscore: product.nutriscore_grade?.toUpperCase(),
          ingredients: product.ingredients_text || 'Ingredients not available',
          allergens: product.allergens_from_ingredients || 'None listed',
          categories: product.categories_tags?.slice(0, 3).map(c => c.replace('en:', '').replace(/-/g, ' ')) || [],
        });
      } else {
        setError(`Product not found for barcode: ${barcode}. Try entering details manually.`);
        setProductData(null);
      }
    } catch (err) {
      console.error('Error fetching product:', err);
      setError('Failed to fetch product data. Please try again.');
      setProductData(null);
    }
    
    setLoading(false);
  };

  const handleManualSearch = () => {
    if (manualBarcode.trim()) {
      setScannedBarcode(manualBarcode.trim());
      fetchProductData(manualBarcode.trim());
    }
  };

  const handleAddToMeal = async (mealType) => {
    if (!productData) return;
    
    try {
      await addMeal({
        mealType,
        foodData: {
          name: productData.name,
          nutrition: {
            calories: productData.nutrition.calories,
            protein: productData.nutrition.protein,
            carbs: productData.nutrition.carbs,
            fats: productData.nutrition.fat,
            fiber: productData.nutrition.fiber,
          },
          servingSize: productData.servingSize,
          isFromBarcode: true,
          barcode: productData.barcode,
          brand: productData.brand,
        },
      });
      
      setAddedToMeal(true);
      setTimeout(() => {
        navigate('/todays-meals');
      }, 1500);
    } catch (error) {
      console.error('Error adding to meal:', error);
      setError('Failed to add to meal. Please try again.');
    }
  };

  const handleRetry = () => {
    setScannedBarcode('');
    setProductData(null);
    setError(null);
    setAddedToMeal(false);
    startCamera();
  };

  const getNutriscoreColor = (grade) => {
    const colors = {
      'A': '#038141',
      'B': '#85BB2F',
      'C': '#FECB02',
      'D': '#EE8100',
      'E': '#E63E11',
    };
    return colors[grade] || '#666';
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: theme.palette.mode === 'dark' 
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
            <CloseIcon />
          </IconButton>
          <Box>
            <Typography variant="h5" fontWeight={700}>
              Barcode Scanner
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Scan product barcodes for instant nutrition info
            </Typography>
          </Box>
        </Stack>
      </Box>

      <Box sx={{ p: 2 }}>
        {/* Camera View */}
        {cameraActive && (
          <Card
            sx={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: 4,
              mb: 2,
              aspectRatio: '4/3',
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
            
            {/* Scanning overlay */}
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '80%',
                height: 120,
                border: '2px solid rgba(255,255,255,0.8)',
                borderRadius: 2,
                boxShadow: '0 0 0 9999px rgba(0,0,0,0.5)',
              }}
            >
              {/* Scanning line animation */}
              <motion.div
                animate={{ y: [0, 100, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  width: '100%',
                  height: 2,
                  background: 'linear-gradient(90deg, transparent, #667eea, transparent)',
                }}
              />
            </Box>

            {/* Camera controls */}
            <Stack
              direction="row"
              spacing={2}
              sx={{
                position: 'absolute',
                bottom: 16,
                left: '50%',
                transform: 'translateX(-50%)',
              }}
            >
              <IconButton
                onClick={flipCamera}
                sx={{
                  bgcolor: 'rgba(0,0,0,0.5)',
                  color: 'white',
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
                }}
              >
                <FlipIcon />
              </IconButton>
              <IconButton
                onClick={stopCamera}
                sx={{
                  bgcolor: 'rgba(255,0,0,0.5)',
                  color: 'white',
                  '&:hover': { bgcolor: 'rgba(255,0,0,0.7)' },
                }}
              >
                <CloseIcon />
              </IconButton>
            </Stack>

            {scanning && (
              <Typography
                variant="body2"
                sx={{
                  position: 'absolute',
                  top: 16,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  color: 'white',
                  bgcolor: 'rgba(0,0,0,0.5)',
                  px: 2,
                  py: 0.5,
                  borderRadius: 2,
                }}
              >
                Point camera at barcode
              </Typography>
            )}
          </Card>
        )}

        {/* Start scanning button */}
        {!cameraActive && !productData && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card
              sx={{
                textAlign: 'center',
                p: 4,
                borderRadius: 4,
                mb: 2,
                background: theme.palette.mode === 'dark'
                  ? 'linear-gradient(135deg, #2d2d44 0%, #1f1f35 100%)'
                  : 'white',
              }}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <IconButton
                  onClick={startCamera}
                  sx={{
                    width: 100,
                    height: 100,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    mb: 2,
                    '&:hover': {
                      background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                    },
                  }}
                >
                  <ScanIcon sx={{ fontSize: 48 }} />
                </IconButton>
              </motion.div>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Scan Product Barcode
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Get instant nutrition information from millions of products
              </Typography>
            </Card>

            {/* Manual barcode entry */}
            <Card sx={{ p: 3, borderRadius: 4, mb: 2 }}>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Or enter barcode manually
              </Typography>
              <Stack direction="row" spacing={2}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Enter barcode number"
                  value={manualBarcode}
                  onChange={(e) => setManualBarcode(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleManualSearch()}
                />
                <Button
                  variant="contained"
                  onClick={handleManualSearch}
                  disabled={!manualBarcode.trim()}
                  sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  }}
                >
                  <SearchIcon />
                </Button>
              </Stack>
            </Card>

            {/* Example barcodes */}
            <Card sx={{ p: 3, borderRadius: 4 }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Try these example barcodes:
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                {['3017620422003', '5449000000996', '7622210449283'].map(code => (
                  <Chip
                    key={code}
                    label={code}
                    size="small"
                    onClick={() => {
                      setManualBarcode(code);
                      setScannedBarcode(code);
                      fetchProductData(code);
                    }}
                    sx={{ cursor: 'pointer' }}
                  />
                ))}
              </Stack>
            </Card>
          </motion.div>
        )}

        {/* Loading state */}
        {loading && (
          <Card sx={{ p: 4, borderRadius: 4, textAlign: 'center' }}>
            <CircularProgress sx={{ mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Looking up product...
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Barcode: {scannedBarcode}
            </Typography>
          </Card>
        )}

        {/* Error state */}
        {error && (
          <Alert 
            severity="error" 
            sx={{ mb: 2, borderRadius: 2 }}
            action={
              <Button color="inherit" size="small" onClick={handleRetry}>
                Retry
              </Button>
            }
          >
            {error}
          </Alert>
        )}

        {/* Product result */}
        <AnimatePresence>
          {productData && !addedToMeal && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <Card sx={{ borderRadius: 4, overflow: 'hidden', mb: 2 }}>
                {/* Product image and header */}
                <Box sx={{ 
                  p: 3, 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    {productData.image ? (
                      <Box
                        component="img"
                        src={productData.image}
                        alt={productData.name}
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: 2,
                          objectFit: 'contain',
                          bgcolor: 'white',
                        }}
                      />
                    ) : (
                      <Box
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: 2,
                          bgcolor: 'rgba(255,255,255,0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <FoodIcon sx={{ fontSize: 40 }} />
                      </Box>
                    )}
                    <Box flex={1}>
                      <Typography variant="h6" fontWeight={700}>
                        {productData.name}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        {productData.brand}
                      </Typography>
                      {productData.nutriscore && (
                        <Chip
                          label={`Nutri-Score ${productData.nutriscore}`}
                          size="small"
                          sx={{
                            mt: 1,
                            bgcolor: getNutriscoreColor(productData.nutriscore),
                            color: 'white',
                            fontWeight: 700,
                          }}
                        />
                      )}
                    </Box>
                  </Stack>
                </Box>

                <CardContent>
                  {/* Nutrition facts */}
                  <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                    Nutrition Facts (per 100g)
                  </Typography>
                  
                  <Box sx={{ mb: 3 }}>
                    {[
                      { label: 'Calories', value: productData.nutrition.calories, unit: 'kcal', color: '#ff6b6b' },
                      { label: 'Protein', value: productData.nutrition.protein, unit: 'g', color: '#4ecdc4' },
                      { label: 'Carbs', value: productData.nutrition.carbs, unit: 'g', color: '#ffe66d' },
                      { label: 'Fat', value: productData.nutrition.fat, unit: 'g', color: '#ff8a5b' },
                      { label: 'Fiber', value: productData.nutrition.fiber, unit: 'g', color: '#6bcb77' },
                      { label: 'Sugar', value: productData.nutrition.sugar, unit: 'g', color: '#ffd93d' },
                    ].map((item, index) => (
                      <Box key={item.label} sx={{ mb: 1.5 }}>
                        <Stack direction="row" justifyContent="space-between" mb={0.5}>
                          <Typography variant="body2">{item.label}</Typography>
                          <Typography variant="body2" fontWeight={600}>
                            {item.value} {item.unit}
                          </Typography>
                        </Stack>
                        <LinearProgress
                          variant="determinate"
                          value={Math.min((item.value / (item.label === 'Calories' ? 500 : 50)) * 100, 100)}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            bgcolor: 'rgba(0,0,0,0.1)',
                            '& .MuiLinearProgress-bar': {
                              borderRadius: 3,
                              bgcolor: item.color,
                            },
                          }}
                        />
                      </Box>
                    ))}
                  </Box>

                  {/* Categories */}
                  {productData.categories.length > 0 && (
                    <>
                      <Divider sx={{ my: 2 }} />
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Categories
                      </Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                        {productData.categories.map((cat, idx) => (
                          <Chip key={idx} label={cat} size="small" variant="outlined" />
                        ))}
                      </Stack>
                    </>
                  )}

                  {/* Add to meal buttons */}
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                    Add to Meal
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                    {['Breakfast', 'Lunch', 'Dinner', 'Snack'].map((meal) => (
                      <Button
                        key={meal}
                        variant="outlined"
                        size="small"
                        startIcon={<AddIcon />}
                        onClick={() => handleAddToMeal(meal)}
                        sx={{
                          borderRadius: 2,
                          textTransform: 'none',
                        }}
                      >
                        {meal}
                      </Button>
                    ))}
                  </Stack>
                </CardContent>
              </Card>

              <Button
                fullWidth
                variant="text"
                startIcon={<RetryIcon />}
                onClick={handleRetry}
                sx={{ textTransform: 'none' }}
              >
                Scan Another Product
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success state */}
        <AnimatePresence>
          {addedToMeal && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <Card sx={{ p: 4, borderRadius: 4, textAlign: 'center' }}>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5 }}
                >
                  <SuccessIcon sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
                </motion.div>
                <Typography variant="h5" fontWeight={700} gutterBottom>
                  Added to Meal!
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Redirecting to today's meals...
                </Typography>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default BarcodeScanner;
