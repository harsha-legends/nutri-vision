import React, { useState, useEffect } from 'react';
import { Box, Skeleton } from '@mui/material';
import { motion } from 'framer-motion';

// Food image mapping to realistic Unsplash/Pexels images
const foodImageDatabase = {
  // VEGETABLES & VEG DISHES
  'samosa': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop',
  'paneer tikka': 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop',
  'palak paneer': 'https://images.unsplash.com/photo-1618449840665-9ed506d73a34?w=400&h=300&fit=crop',
  'dal': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
  'curry': 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop',
  'biryani': 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop',
  'rice': 'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=400&h=300&fit=crop',
  'naan': 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop',
  'roti': 'https://images.unsplash.com/photo-1585937421612-70a008356c36?w=400&h=300&fit=crop',
  'dosa': 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400&h=300&fit=crop',
  'idli': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=300&fit=crop',
  'pizza': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
  'pasta': 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop',
  'burger': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
  'salad': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
  'soup': 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop',
  
  // NON-VEG
  'chicken': 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop',
  'chicken tikka': 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop',
  'chicken 65': 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=400&h=300&fit=crop',
  'butter chicken': 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop',
  'tandoori chicken': 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop',
  'mutton': 'https://images.unsplash.com/photo-1545247181-516773cae754?w=400&h=300&fit=crop',
  'lamb': 'https://images.unsplash.com/photo-1514516345957-556ca7d90a29?w=400&h=300&fit=crop',
  'fish': 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=300&fit=crop',
  'prawn': 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&h=300&fit=crop',
  'shrimp': 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&h=300&fit=crop',
  'crab': 'https://images.unsplash.com/photo-1510130113145-f573bb66d3f5?w=400&h=300&fit=crop',
  'lobster': 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=400&h=300&fit=crop',
  'egg': 'https://images.unsplash.com/photo-1482049016530-d79f7d9ca7e0?w=400&h=300&fit=crop',
  'steak': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
  'kebab': 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400&h=300&fit=crop',
  'seekh kebab': 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400&h=300&fit=crop',
  
  // JUICES & BEVERAGES
  'juice': 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop',
  'orange juice': 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop',
  'apple juice': 'https://images.unsplash.com/photo-1576673442511-7e39b6545c87?w=400&h=300&fit=crop',
  'mango juice': 'https://images.unsplash.com/photo-1546173159-315724a31696?w=400&h=300&fit=crop',
  'smoothie': 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400&h=300&fit=crop',
  'green juice': 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400&h=300&fit=crop',
  'lassi': 'https://images.unsplash.com/photo-1626200419199-391ae4be7f4d?w=400&h=300&fit=crop',
  'milkshake': 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop',
  'coffee': 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop',
  'tea': 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop',
  
  // DESSERTS & SWEETS
  'ice cream': 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&h=300&fit=crop',
  'cake': 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
  'chocolate': 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=400&h=300&fit=crop',
  'cookies': 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=300&fit=crop',
  'brownie': 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=400&h=300&fit=crop',
  'gulab jamun': 'https://images.unsplash.com/photo-1666190020249-f9c04fa17527?w=400&h=300&fit=crop',
  'kheer': 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop',
  
  // SNACKS
  'chips': 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&h=300&fit=crop',
  'fries': 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop',
  'sandwich': 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop',
  'wrap': 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop',
  'spring roll': 'https://images.unsplash.com/photo-1606525437679-037aca74a3e9?w=400&h=300&fit=crop',
  'momos': 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop',
  
  // FRUITS & VEGETABLES
  'apple': 'https://images.unsplash.com/photo-1568702846914-96b305d2uj67?w=400&h=300&fit=crop',
  'banana': 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=300&fit=crop',
  'mango': 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=300&fit=crop',
  'orange': 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=400&h=300&fit=crop',
  'grapes': 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=400&h=300&fit=crop',
  'watermelon': 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=300&fit=crop',
  'strawberry': 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=300&fit=crop',
  'vegetable': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop',
  'spinach': 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=300&fit=crop',
  'carrot': 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=300&fit=crop',
  'tomato': 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400&h=300&fit=crop',
  
  // DEFAULT CATEGORY IMAGES
  'veg': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop',
  'nonveg': 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop',
  'beverages': 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop',
  'desserts': 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&h=300&fit=crop',
  'snacks': 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&h=300&fit=crop',
  
  // DEFAULT
  'default': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
};

// Get matching image URL based on food name
export const getFoodImageUrl = (foodName, category = '') => {
  const name = foodName?.toLowerCase() || '';
  const cat = category?.toLowerCase() || '';
  
  // Try exact match first
  for (const [key, url] of Object.entries(foodImageDatabase)) {
    if (name.includes(key) || key.includes(name)) {
      return url;
    }
  }
  
  // Try category match
  if (cat && foodImageDatabase[cat]) {
    return foodImageDatabase[cat];
  }
  
  // Return default
  return foodImageDatabase.default;
};

// Image component with loading state and fallback
const OptimizedImage = ({
  src,
  alt,
  foodName,
  category,
  width = '100%',
  height = 160,
  borderRadius = 0,
  objectFit = 'cover',
  showOverlay = false,
  overlayGradient = 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    // Get the appropriate image URL
    const imageUrl = src || getFoodImageUrl(foodName, category);
    setImageSrc(imageUrl);
    setIsLoaded(false);
    setHasError(false);
  }, [src, foodName, category]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
    // Fallback to default image
    setImageSrc(foodImageDatabase.default);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width,
        height,
        overflow: 'hidden',
        borderRadius,
        bgcolor: 'grey.100',
      }}
    >
      {/* Loading skeleton */}
      {!isLoaded && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          animation="wave"
          sx={{ position: 'absolute', top: 0, left: 0 }}
        />
      )}

      {/* Actual image */}
      <motion.img
        src={imageSrc}
        alt={alt || foodName}
        onLoad={handleLoad}
        onError={handleError}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ 
          opacity: isLoaded ? 1 : 0, 
          scale: isLoaded ? 1 : 1.1 
        }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        style={{
          width: '100%',
          height: '100%',
          objectFit,
          display: 'block',
        }}
        loading="lazy"
      />

      {/* Overlay gradient */}
      {showOverlay && isLoaded && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: overlayGradient,
            pointerEvents: 'none',
          }}
        />
      )}
    </Box>
  );
};

export default OptimizedImage;
