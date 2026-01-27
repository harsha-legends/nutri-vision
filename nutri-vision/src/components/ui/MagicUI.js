import React from 'react';
import { Box, keyframes, Typography } from '@mui/material';
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

// Animated Circular Progress Bar - Magic UI inspired
export const AnimatedCircularProgressBar = ({
  value = 0,
  max = 100,
  min = 0,
  size = 120,
  strokeWidth = 10,
  gaugePrimaryColor = '#6366f1',
  gaugeSecondaryColor = 'rgba(99, 102, 241, 0.2)',
  showValue = true,
  label,
  ...props
}) => {
  const [animatedValue, setAnimatedValue] = React.useState(0);
  const normalizedValue = Math.min(Math.max(value, min), max);
  const percentage = ((normalizedValue - min) / (max - min)) * 100;
  
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedValue / 100) * circumference;

  React.useEffect(() => {
    const startValue = 0;
    const endValue = percentage;
    const duration = 1000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValue + (endValue - startValue) * easeOut;
      
      setAnimatedValue(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [percentage]);

  return (
    <Box
      sx={{
        position: 'relative',
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...props.sx,
      }}
    >
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={gaugeSecondaryColor}
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={gaugePrimaryColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </svg>
      
      {/* Center content */}
      <Box
        sx={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {showValue && (
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{ color: gaugePrimaryColor, lineHeight: 1 }}
          >
            {Math.round(animatedValue)}%
          </Typography>
        )}
        {label && (
          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
            {label}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

// Animated Theme Toggler - Magic UI inspired
export const AnimatedThemeToggler = ({
  isDark,
  onToggle,
  size = 40,
  duration = 400,
  ...props
}) => {
  const sunColor = '#fbbf24';
  const moonColor = '#818cf8';

  return (
    <Box
      component={motion.button}
      onClick={onToggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      sx={{
        width: size,
        height: size,
        borderRadius: '50%',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: isDark
          ? 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)'
          : 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
        boxShadow: isDark
          ? '0 4px 20px rgba(129, 140, 248, 0.3)'
          : '0 4px 20px rgba(251, 191, 36, 0.3)',
        transition: `all ${duration}ms ease`,
        position: 'relative',
        overflow: 'hidden',
        ...props.sx,
      }}
      {...props}
    >
      <motion.div
        initial={false}
        animate={{
          rotate: isDark ? 0 : 180,
          scale: 1,
        }}
        transition={{ duration: duration / 1000, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isDark ? (
          <Box
            component="svg"
            viewBox="0 0 24 24"
            sx={{ width: size * 0.5, height: size * 0.5 }}
          >
            <motion.path
              d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
              fill={moonColor}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5 }}
            />
          </Box>
        ) : (
          <Box
            component="svg"
            viewBox="0 0 24 24"
            sx={{ width: size * 0.5, height: size * 0.5 }}
          >
            <motion.circle
              cx="12"
              cy="12"
              r="5"
              fill={sunColor}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <motion.line
                key={angle}
                x1={12 + 7 * Math.cos((angle * Math.PI) / 180)}
                y1={12 + 7 * Math.sin((angle * Math.PI) / 180)}
                x2={12 + 9 * Math.cos((angle * Math.PI) / 180)}
                y2={12 + 9 * Math.sin((angle * Math.PI) / 180)}
                stroke={sunColor}
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
              />
            ))}
          </Box>
        )}
      </motion.div>
    </Box>
  );
};

// Animated Beam - Magic UI inspired
export const AnimatedBeam = ({
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  duration = 5,
  delay = 0,
  pathColor = 'rgba(128, 128, 128, 0.2)',
  pathWidth = 2,
  gradientStartColor = '#6366f1',
  gradientStopColor = '#8b5cf6',
  ...props
}) => {
  const id = React.useId();
  const [path, setPath] = React.useState('');
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    const updatePath = () => {
      if (!containerRef?.current || !fromRef?.current || !toRef?.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const fromRect = fromRef.current.getBoundingClientRect();
      const toRect = toRef.current.getBoundingClientRect();

      const fromX = fromRect.left - containerRect.left + fromRect.width / 2;
      const fromY = fromRect.top - containerRect.top + fromRect.height / 2;
      const toX = toRect.left - containerRect.left + toRect.width / 2;
      const toY = toRect.top - containerRect.top + toRect.height / 2;

      const midX = (fromX + toX) / 2;
      const midY = (fromY + toY) / 2 + curvature;

      setPath(`M ${fromX} ${fromY} Q ${midX} ${midY} ${toX} ${toY}`);
      setDimensions({
        width: containerRect.width,
        height: containerRect.height,
      });
    };

    updatePath();
    window.addEventListener('resize', updatePath);
    return () => window.removeEventListener('resize', updatePath);
  }, [containerRef, fromRef, toRef, curvature]);

  const beamKeyframes = keyframes`
    0% { stroke-dashoffset: ${reverse ? 0 : 100}%; }
    100% { stroke-dashoffset: ${reverse ? 100 : 0}%; }
  `;

  return (
    <Box
      component="svg"
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: dimensions.width,
        height: dimensions.height,
        pointerEvents: 'none',
        ...props.sx,
      }}
    >
      <defs>
        <linearGradient id={`beam-gradient-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={gradientStartColor} />
          <stop offset="100%" stopColor={gradientStopColor} />
        </linearGradient>
      </defs>
      
      {/* Background path */}
      <path
        d={path}
        fill="none"
        stroke={pathColor}
        strokeWidth={pathWidth}
      />
      
      {/* Animated beam */}
      <path
        d={path}
        fill="none"
        stroke={`url(#beam-gradient-${id})`}
        strokeWidth={pathWidth}
        strokeDasharray="20 80"
        sx={{
          animation: `${beamKeyframes} ${duration}s linear infinite`,
          animationDelay: `${delay}s`,
        }}
      />
    </Box>
  );
};

// Bento Grid - Magic UI inspired
export const BentoGrid = ({ children, columns = 3, className, ...props }) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: `repeat(${columns}, 1fr)`,
        },
        gridAutoRows: 'minmax(180px, auto)',
        gap: { xs: 2, sm: 2.5, md: 3 },
        ...props.sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export const BentoCard = ({
  children,
  name,
  description,
  icon,
  background,
  href,
  cta,
  colSpan = 1,
  rowSpan = 1,
  ...props
}) => {
  const Icon = icon;

  return (
    <Box
      component={motion.div}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      sx={{
        gridColumn: { xs: 'span 1', sm: `span ${Math.min(colSpan, 2)}`, md: `span ${colSpan}` },
        gridRow: `span ${rowSpan}`,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 4,
        p: { xs: 2.5, sm: 3 },
        minHeight: { xs: 160, sm: 180 },
        background: (theme) =>
          theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, rgba(30, 27, 75, 0.8) 0%, rgba(49, 46, 129, 0.8) 100%)'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)',
        backdropFilter: 'blur(12px)',
        border: (theme) =>
          `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.06)'}`,
        boxShadow: (theme) =>
          theme.palette.mode === 'dark'
            ? '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)'
            : '0 4px 24px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8)',
        cursor: href || props.onClick ? 'pointer' : 'default',
        display: 'flex',
        flexDirection: 'column',
        ...props.sx,
      }}
      {...props}
    >
      {background}
      
      <Box sx={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
        {Icon && (
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 2.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              color: 'white',
              mb: 2,
              boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
            }}
          >
            <Icon sx={{ fontSize: 22 }} />
          </Box>
        )}
        
        {name && (
          <Typography 
            variant="h6" 
            fontWeight={700} 
            sx={{ 
              mb: 0.5,
              fontSize: { xs: '1rem', sm: '1.1rem' },
              lineHeight: 1.3,
            }}
          >
            {name}
          </Typography>
        )}
        
        {description && (
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              mb: 2,
              fontSize: { xs: '0.8rem', sm: '0.85rem' },
              lineHeight: 1.5,
              opacity: 0.8,
            }}
          >
            {description}
          </Typography>
        )}
        
        <Box sx={{ flex: 1 }}>{children}</Box>
        
        {cta && (
          <Typography
            variant="body2"
            sx={{
              mt: 'auto',
              pt: 2,
              color: 'primary.main',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              fontSize: '0.85rem',
            }}
          >
            {cta} →
          </Typography>
        )}
      </Box>
    </Box>
  );
};

// All components are already exported individually above
