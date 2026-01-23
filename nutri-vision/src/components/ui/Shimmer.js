import React from 'react';
import { Box, keyframes } from '@mui/material';

const shimmerAnimation = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

// Shimmer loading skeleton component
export const Shimmer = ({ 
  width = '100%', 
  height = 20, 
  borderRadius = 4,
  variant = 'rectangular',
  animation = true 
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'circular':
        return { borderRadius: '50%' };
      case 'rounded':
        return { borderRadius: 16 };
      case 'text':
        return { borderRadius: 4, height: height || 16 };
      default:
        return { borderRadius };
    }
  };

  return (
    <Box
      sx={{
        width,
        height,
        background: (theme) => 
          theme.palette.mode === 'dark'
            ? 'linear-gradient(90deg, #2d2d2d 25%, #3d3d3d 50%, #2d2d2d 75%)'
            : 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
        backgroundSize: '200% 100%',
        animation: animation ? `${shimmerAnimation} 1.5s infinite` : 'none',
        ...getVariantStyles(),
      }}
    />
  );
};

// Card shimmer for food items
export const FoodCardShimmer = () => (
  <Box
    sx={{
      borderRadius: 3,
      overflow: 'hidden',
      bgcolor: 'background.paper',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    }}
  >
    <Shimmer height={160} borderRadius={0} />
    <Box sx={{ p: 2 }}>
      <Shimmer height={24} width="70%" sx={{ mb: 1 }} />
      <Shimmer height={16} width="90%" sx={{ mb: 1 }} />
      <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
        <Shimmer height={24} width={60} borderRadius={12} />
        <Shimmer height={24} width={60} borderRadius={12} />
        <Shimmer height={24} width={60} borderRadius={12} />
      </Box>
    </Box>
  </Box>
);

// Stats card shimmer
export const StatsCardShimmer = () => (
  <Box
    sx={{
      borderRadius: 3,
      overflow: 'hidden',
      bgcolor: 'background.paper',
      p: 3,
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    }}
  >
    <Shimmer height={20} width="40%" sx={{ mb: 2 }} />
    <Shimmer height={40} width="60%" sx={{ mb: 1 }} />
    <Shimmer height={14} width="80%" />
  </Box>
);

// Category card shimmer
export const CategoryCardShimmer = () => (
  <Box
    sx={{
      borderRadius: 3,
      overflow: 'hidden',
      bgcolor: 'background.paper',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      height: 200,
    }}
  >
    <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Shimmer width={80} height={80} variant="circular" />
      <Box sx={{ mt: 2, width: '100%', textAlign: 'center' }}>
        <Shimmer height={24} width="60%" sx={{ mx: 'auto', mb: 1 }} />
        <Shimmer height={14} width="80%" sx={{ mx: 'auto' }} />
      </Box>
    </Box>
  </Box>
);

// Grid of shimmers
export const ShimmerGrid = ({ count = 8, columns = 4 }) => (
  <Box
    sx={{
      display: 'grid',
      gridTemplateColumns: {
        xs: 'repeat(1, 1fr)',
        sm: 'repeat(2, 1fr)',
        md: `repeat(${Math.min(columns, 3)}, 1fr)`,
        lg: `repeat(${columns}, 1fr)`,
      },
      gap: 3,
    }}
  >
    {Array.from({ length: count }).map((_, index) => (
      <FoodCardShimmer key={index} />
    ))}
  </Box>
);

export default Shimmer;
