import React from 'react';
import { Box, keyframes } from '@mui/material';
import { motion } from 'framer-motion';

// Border Beam Animation - Magic UI inspired
const beamAnimation = keyframes`
  0% {
    offset-distance: 0%;
  }
  100% {
    offset-distance: 100%;
  }
`;

export const BorderBeam = ({
  children,
  size = 200,
  duration = 12,
  delay = 0,
  colorFrom = '#ffaa40',
  colorTo = '#9c40ff',
  borderWidth = 1.5,
  borderRadius = 16,
  ...props
}) => {
  return (
    <Box
      sx={{
        position: 'relative',
        borderRadius: `${borderRadius}px`,
        overflow: 'hidden',
        ...props.sx,
      }}
    >
      {children}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          borderRadius: `${borderRadius}px`,
          border: `${borderWidth}px solid transparent`,
          mask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
          maskComposite: 'xor',
          WebkitMaskComposite: 'xor',
          pointerEvents: 'none',
          '&::before': {
            content: '""',
            position: 'absolute',
            width: `${size}px`,
            height: `${size}px`,
            background: `linear-gradient(90deg, ${colorFrom}, ${colorTo}, transparent)`,
            borderRadius: '50%',
            filter: 'blur(20px)',
            animation: `${beamAnimation} ${duration}s linear infinite`,
            animationDelay: `${delay}s`,
            offsetPath: `rect(0 auto auto 0 round ${borderRadius}px)`,
          },
        }}
      />
    </Box>
  );
};

// Animated Gradient Text - Magic UI inspired
const gradientAnimation = keyframes`
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
`;

export const AnimatedGradientText = ({
  children,
  colors = ['#6366f1', '#8b5cf6', '#d946ef', '#6366f1'],
  animationDuration = 4,
  ...props
}) => {
  return (
    <Box
      component="span"
      sx={{
        background: `linear-gradient(90deg, ${colors.join(', ')})`,
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        animation: `${gradientAnimation} ${animationDuration}s ease infinite`,
        display: 'inline-block',
        ...props.sx,
      }}
    >
      {children}
    </Box>
  );
};

// Shiny Text Effect - Magic UI inspired
const shineAnimation = keyframes`
  0% {
    background-position: -200% 50%;
  }
  100% {
    background-position: 200% 50%;
  }
`;

export const ShinyText = ({
  children,
  shimmerWidth = 100,
  duration = 2,
  ...props
}) => {
  return (
    <Box
      component="span"
      sx={{
        position: 'relative',
        display: 'inline-block',
        background: (theme) => `linear-gradient(
          90deg,
          ${theme.palette.text.primary} 0%,
          ${theme.palette.text.primary} 40%,
          ${theme.palette.mode === 'dark' ? '#fff' : '#000'} 50%,
          ${theme.palette.text.primary} 60%,
          ${theme.palette.text.primary} 100%
        )`,
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        animation: `${shineAnimation} ${duration}s linear infinite`,
        ...props.sx,
      }}
    >
      {children}
    </Box>
  );
};

// Blur Fade Animation - Magic UI inspired
export const BlurFade = ({
  children,
  delay = 0,
  duration = 0.4,
  yOffset = 20,
  blur = 10,
  ...props
}) => {
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        y: yOffset, 
        filter: `blur(${blur}px)` 
      }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        filter: 'blur(0px)' 
      }}
      transition={{ 
        duration, 
        delay,
        ease: 'easeOut'
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Animated List - Magic UI inspired
export const AnimatedList = ({
  children,
  staggerDelay = 0.1,
  initialDelay = 0,
  ...props
}) => {
  const items = React.Children.toArray(children);
  
  return (
    <Box {...props}>
      {items.map((child, index) => (
        <BlurFade 
          key={index} 
          delay={initialDelay + (index * staggerDelay)}
          duration={0.4}
        >
          {child}
        </BlurFade>
      ))}
    </Box>
  );
};

// Dot Pattern Background - Magic UI inspired
export const DotPattern = ({
  width = 16,
  height = 16,
  cx = 1,
  cy = 1,
  cr = 1,
  ...props
}) => {
  const id = React.useId();
  
  return (
    <Box
      component="svg"
      sx={{
        position: 'absolute',
        inset: 0,
        height: '100%',
        width: '100%',
        pointerEvents: 'none',
        opacity: 0.3,
        ...props.sx,
      }}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
        >
          <circle cx={cx} cy={cy} r={cr} fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </Box>
  );
};

// Number Ticker Animation - Magic UI inspired
export const NumberTicker = ({
  value,
  duration = 1000,
  delay = 0,
  decimalPlaces = 0,
  ...props
}) => {
  const [displayValue, setDisplayValue] = React.useState(0);
  
  React.useEffect(() => {
    const timer = setTimeout(() => {
      const startTime = Date.now();
      const startValue = 0;
      const endValue = value;
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease out cubic
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = startValue + (endValue - startValue) * easeOut;
        
        setDisplayValue(currentValue);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [value, duration, delay]);
  
  return (
    <Box component="span" {...props}>
      {displayValue.toFixed(decimalPlaces)}
    </Box>
  );
};

// Sparkles Effect - Magic UI inspired
const sparkleAnimation = keyframes`
  0%, 100% {
    opacity: 0;
    transform: scale(0);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
`;

export const Sparkles = ({
  children,
  sparkleCount = 10,
  color = '#fbbf24',
  ...props
}) => {
  const sparkles = React.useMemo(() => {
    return Array.from({ length: sparkleCount }, (_, i) => ({
      id: i,
      size: Math.random() * 10 + 4,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 2}s`,
      animationDuration: `${Math.random() * 2 + 1}s`,
    }));
  }, [sparkleCount]);

  return (
    <Box sx={{ position: 'relative', display: 'inline-block', ...props.sx }}>
      {children}
      {sparkles.map((sparkle) => (
        <Box
          key={sparkle.id}
          component="svg"
          viewBox="0 0 160 160"
          sx={{
            position: 'absolute',
            top: sparkle.top,
            left: sparkle.left,
            width: sparkle.size,
            height: sparkle.size,
            pointerEvents: 'none',
            animation: `${sparkleAnimation} ${sparkle.animationDuration} ease-in-out infinite`,
            animationDelay: sparkle.animationDelay,
          }}
        >
          <path
            d="M80 0C80 0 84.2846 41.2925 101.496 58.504C118.707 75.7154 160 80 160 80C160 80 118.707 84.2846 101.496 101.496C84.2846 118.707 80 160 80 160C80 160 75.7154 118.707 58.504 101.496C41.2925 84.2846 0 80 0 80C0 80 41.2925 75.7154 58.504 58.504C75.7154 41.2925 80 0 80 0Z"
            fill={color}
          />
        </Box>
      ))}
    </Box>
  );
};

// Pulsating Button - Magic UI inspired
const pulseAnimation = keyframes`
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4);
  }
  50% {
    box-shadow: 0 0 0 15px rgba(99, 102, 241, 0);
  }
`;

export const PulsatingButton = ({
  children,
  pulseColor = 'rgba(99, 102, 241, 0.4)',
  duration = 2,
  ...props
}) => {
  return (
    <Box
      component={motion.button}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      sx={{
        position: 'relative',
        cursor: 'pointer',
        animation: `${pulseAnimation} ${duration}s ease-out infinite`,
        ...props.sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

// All components are already exported individually above
