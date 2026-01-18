import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Stack,
} from '@mui/material';
import {
  Apple as AppleIcon,
  Android as AndroidIcon,
  PhoneIphone as PhoneIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';

const QRCodePage = () => {
  const theme = useTheme();

  const features = [
    'Track nutrition on-the-go',
    'Offline mode support',
    'Push notifications for meal reminders',
    'Widget for quick logging',
    'Apple Watch & Wear OS support',
  ];

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
            background: theme.palette.mode === 'dark'
              ? 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)'
              : 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Get the Mobile App
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Take NutriVision everywhere with our native mobile apps
        </Typography>
      </motion.div>

      <Grid container spacing={4}>
        {/* QR Code Card */}
        <Grid size={{ xs: 12, md: 6 }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card
              elevation={0}
              sx={{
                borderRadius: 4,
                background: theme.palette.mode === 'dark'
                  ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
                  : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              {/* Background decoration */}
              <Box
                sx={{
                  position: 'absolute',
                  top: -50,
                  right: -50,
                  width: 200,
                  height: 200,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.1)',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: -30,
                  left: -30,
                  width: 150,
                  height: 150,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.05)',
                }}
              />

              <CardContent sx={{ p: 4, position: 'relative', zIndex: 1 }}>
                <Stack spacing={3} alignItems="center">
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Scan to Download
                  </Typography>

                  {/* QR Code Placeholder */}
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Box
                      sx={{
                        width: 220,
                        height: 220,
                        bgcolor: 'white',
                        borderRadius: 3,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      {/* Placeholder QR pattern */}
                      <Box
                        sx={{
                          width: 180,
                          height: 180,
                          display: 'grid',
                          gridTemplateColumns: 'repeat(7, 1fr)',
                          gridTemplateRows: 'repeat(7, 1fr)',
                          gap: '4px',
                          p: 2,
                        }}
                      >
                        {Array.from({ length: 49 }).map((_, i) => {
                          const isCorner = 
                            (i < 3 || (i >= 4 && i < 7)) ||
                            (i >= 14 && i < 21 && (i % 7 < 3 || i % 7 >= 4)) ||
                            (i >= 42 && i < 45) ||
                            (i >= 46 && i < 49);
                          const isCenter = i === 24;
                          const random = Math.random() > 0.5;
                          
                          return (
                            <Box
                              key={i}
                              sx={{
                                bgcolor: isCenter 
                                  ? '#667eea' 
                                  : isCorner || random 
                                    ? '#333' 
                                    : 'transparent',
                                borderRadius: isCenter ? 1 : 0.5,
                              }}
                            />
                          );
                        })}
                      </Box>
                      
                      {/* Center logo */}
                      <Box
                        sx={{
                          position: 'absolute',
                          width: 50,
                          height: 50,
                          bgcolor: 'white',
                          borderRadius: 2,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                        }}
                      >
                        <Typography sx={{ fontSize: 28 }}>🥗</Typography>
                      </Box>
                    </Box>
                  </motion.div>

                  <Typography
                    variant="body2"
                    sx={{ opacity: 0.9, textAlign: 'center' }}
                  >
                    Point your camera at the QR code to download
                  </Typography>

                  <Chip
                    icon={<StarIcon sx={{ color: '#ffd700 !important' }} />}
                    label="4.9 Rating • 50K+ Downloads"
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      fontWeight: 500,
                      '& .MuiChip-icon': { color: '#ffd700' },
                    }}
                  />
                </Stack>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Download Options */}
        <Grid size={{ xs: 12, md: 6 }}>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Stack spacing={3}>
              {/* App Store Button */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Card
                  elevation={0}
                  sx={{
                    borderRadius: 3,
                    bgcolor: theme.palette.mode === 'dark' ? '#1c1c1e' : '#000',
                    color: 'white',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <AppleIcon sx={{ fontSize: 48 }} />
                      <Box>
                        <Typography variant="caption" sx={{ opacity: 0.8 }}>
                          Download on the
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          App Store
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Play Store Button */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Card
                  elevation={0}
                  sx={{
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #00c853 0%, #64dd17 100%)',
                    color: 'white',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 10px 30px rgba(0,200,83,0.3)',
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <AndroidIcon sx={{ fontSize: 48 }} />
                      <Box>
                        <Typography variant="caption" sx={{ opacity: 0.9 }}>
                          Get it on
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          Google Play
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Features List */}
              <Card
                elevation={0}
                sx={{
                  borderRadius: 3,
                  bgcolor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                    <PhoneIcon color="primary" />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Mobile App Features
                    </Typography>
                  </Stack>

                  <Stack spacing={1.5}>
                    {features.map((feature, index) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        <Stack direction="row" spacing={1.5} alignItems="center">
                          <Box
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              background: 'linear-gradient(45deg, #667eea, #764ba2)',
                            }}
                          />
                          <Typography variant="body2" color="text.secondary">
                            {feature}
                          </Typography>
                        </Stack>
                      </motion.div>
                    ))}
                  </Stack>
                </CardContent>
              </Card>

              {/* Coming Soon Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    background: theme.palette.mode === 'dark'
                      ? 'rgba(102, 126, 234, 0.1)'
                      : 'rgba(102, 126, 234, 0.05)',
                    border: `1px dashed ${theme.palette.primary.main}`,
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="body2" color="primary" sx={{ fontWeight: 500 }}>
                    📱 Mobile apps coming soon! Stay tuned for updates.
                  </Typography>
                </Box>
              </motion.div>
            </Stack>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default QRCodePage;
