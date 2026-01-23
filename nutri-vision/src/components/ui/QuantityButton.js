import React from 'react';
import { Box, IconButton, Button, Typography } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Reusable Quantity Button Component
 * Shows "Add" button when count is 0, or +/- controls with quantity when count > 0
 * 
 * @param {number} count - Current quantity
 * @param {function} onAdd - Called when adding an item
 * @param {function} onRemove - Called when removing an item
 * @param {string} size - 'small' | 'medium' | 'large'
 */
const QuantityButton = ({ count = 0, onAdd, onRemove, size = 'medium' }) => {
  const sizes = {
    small: {
      height: 32,
      iconSize: 16,
      fontSize: '0.75rem',
      minWidth: 28,
      padding: '0 8px',
    },
    medium: {
      height: 36,
      iconSize: 18,
      fontSize: '0.875rem',
      minWidth: 32,
      padding: '0 12px',
    },
    large: {
      height: 42,
      iconSize: 22,
      fontSize: '1rem',
      minWidth: 40,
      padding: '0 16px',
    },
  };

  const s = sizes[size] || sizes.medium;

  if (count === 0) {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <Button
          variant="contained"
          size={size}
          startIcon={<Add sx={{ fontSize: s.iconSize }} />}
          onClick={(e) => {
            e.stopPropagation();
            onAdd?.();
          }}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            height: s.height,
            fontSize: s.fontSize,
            boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)',
            '&:hover': {
              boxShadow: '0 6px 16px rgba(79, 70, 229, 0.4)',
            },
          }}
        >
          Add
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          bgcolor: 'primary.main',
          borderRadius: 2,
          overflow: 'hidden',
          height: s.height,
          boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          sx={{
            color: 'white',
            borderRadius: 0,
            height: '100%',
            width: s.minWidth,
            '&:hover': {
              bgcolor: 'primary.dark',
            },
          }}
        >
          <Remove sx={{ fontSize: s.iconSize }} />
        </IconButton>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={count}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Typography
              sx={{
                px: 2,
                py: 0.5,
                bgcolor: 'rgba(0,0,0,0.2)',
                color: 'white',
                fontWeight: 700,
                minWidth: s.minWidth,
                textAlign: 'center',
                fontSize: s.fontSize,
                height: s.height,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {count}
            </Typography>
          </motion.div>
        </AnimatePresence>
        
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            onAdd?.();
          }}
          sx={{
            color: 'white',
            borderRadius: 0,
            height: '100%',
            width: s.minWidth,
            '&:hover': {
              bgcolor: 'primary.dark',
            },
          }}
        >
          <Add sx={{ fontSize: s.iconSize }} />
        </IconButton>
      </Box>
    </motion.div>
  );
};

export default QuantityButton;
