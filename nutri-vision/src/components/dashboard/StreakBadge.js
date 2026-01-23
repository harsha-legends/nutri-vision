import React from 'react';
import { Box, Card, CardContent, Typography, Chip, Avatar, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { LocalFireDepartment, EmojiEvents } from '@mui/icons-material';
import { NumberTicker } from '../ui/MagicUI';

const StreakBadge = ({ streak, achievements = [] }) => {
  return (
    <Card
      sx={{
        background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        mt: 8,
        mb: 8
      }}
    >
      {/* Animated Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.15,
          backgroundImage: `radial-gradient(circle at 20% 50%, white 2px, transparent 2px),
                           radial-gradient(circle at 80% 50%, white 2px, transparent 2px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <CardContent sx={{ position: 'relative', zIndex: 1}}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Box>
            <Typography variant="overline" sx={{ opacity: 0.9, fontSize: '0.65rem' }}>
              Current Streak
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
              <Typography variant="h2" fontWeight={800}>
                <NumberTicker value={streak} />
              </Typography>
              <Typography variant="h5" fontWeight={600} sx={{ opacity: 0.9 }}>
                {streak === 1 ? 'day' : 'days'}
              </Typography>
            </Box>
          </Box>
          <motion.div
            animate={{
              rotate: [0, 10, -10, 10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
            }}
          >
            <LocalFireDepartment sx={{ fontSize: 60, opacity: 0.9 }} />
          </motion.div>
        </Box>

        {streak > 0 && (
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {streak >= 3 && (
              <Chip
                icon={<EmojiEvents sx={{ fontSize: 16, color: 'white !important' }} />}
                label="3 Day Streak"
                size="small"
                sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 600 }}
              />
            )}
            {streak >= 7 && (
              <Chip
                icon={<LocalFireDepartment sx={{ fontSize: 16, color: 'white !important' }} />}
                label="Week Warrior"
                size="small"
                sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 600 }}
              />
            )}
            {streak >= 30 && (
              <Chip
                icon={<EmojiEvents sx={{ fontSize: 16, color: 'white !important' }} />}
                label="Monthly Master"
                size="small"
                sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 600 }}
              />
            )}
          </Box>
        )}

        {/* Achievements Section */}
        {achievements.length > 0 && (
          <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid rgba(255,255,255,0.2)' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <EmojiEvents sx={{ fontSize: 20 }} />
              <Typography variant="subtitle2" fontWeight={700}>
                Today's Achievements
              </Typography>
            </Box>
            <Grid container spacing={1}>
              {achievements.slice(0, 4).map((achievement, index) => (
                <Grid item xs={6} key={achievement.id}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        p: 1,
                        bgcolor: 'rgba(255,255,255,0.15)',
                        borderRadius: 2,
                        backdropFilter: 'blur(10px)',
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          bgcolor: 'rgba(255,255,255,0.2)',
                          fontSize: '1rem',
                        }}
                      >
                        {achievement.icon}
                      </Avatar>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                          variant="caption"
                          fontWeight={700}
                          sx={{
                            display: 'block',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {achievement.title}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            opacity: 0.8,
                            fontSize: '0.65rem',
                            display: 'block',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {achievement.description}
                        </Typography>
                      </Box>
                    </Box>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default StreakBadge;
