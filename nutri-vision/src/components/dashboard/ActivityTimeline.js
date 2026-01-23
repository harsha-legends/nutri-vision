import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  Chip,
} from '@mui/material';
import {
  Restaurant,
  WaterDrop,
  FitnessCenter,
  Delete,
  AccessTime,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';

const ActivityTimeline = ({ activities = [], onDelete }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'meal':
        return <Restaurant />;
      case 'water':
        return <WaterDrop />;
      case 'exercise':
        return <FitnessCenter />;
      default:
        return <Restaurant />;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'meal':
        return '#10b981';
      case 'water':
        return '#3b82f6';
      case 'exercise':
        return '#f59e0b';
      default:
        return '#6b7280';
    }
  };

  if (activities.length === 0) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            📝 Recent Activity
          </Typography>
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <Typography variant="body2" color="text.secondary">
              No activities yet. Start logging your meals!
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Restaurant sx={{ fontSize: 20 }} />
            <Typography variant="h6" fontWeight={600}>
              Recent Activity
            </Typography>
          </Box>
          <Chip 
            icon={<AccessTime sx={{ fontSize: 16 }} />}
            label="Last 24 hours" 
            size="small" 
            variant="outlined"
          />
        </Box>

        <List sx={{ py: 0 }}>
          <AnimatePresence>
            {activities.slice(0, 7).map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
              >
                <ListItem
                  sx={{
                    borderRadius: 2,
                    mb: 1,
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                  }}
                  secondaryAction={
                    onDelete && (
                      <IconButton
                        edge="end"
                        onClick={() => onDelete(activity.id)}
                        size="small"
                        sx={{ opacity: 0.6, '&:hover': { opacity: 1 } }}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    )
                  }
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        bgcolor: getActivityColor(activity.type),
                        width: 40,
                        height: 40,
                      }}
                    >
                      {getActivityIcon(activity.type)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="body2" fontWeight={600}>
                        {activity.title}
                      </Typography>
                    }
                    secondary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                        <Typography variant="caption" color="text.secondary">
                          {activity.calories && `${activity.calories} kcal`}
                          {activity.amount && ` • ${activity.amount}`}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          •
                        </Typography>
                        <Typography variant="caption" color="primary.main">
                          {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
              </motion.div>
            ))}
          </AnimatePresence>
        </List>

        {activities.length > 7 && (
          <Typography
            variant="caption"
            color="primary"
            sx={{ display: 'block', textAlign: 'center', mt: 1, cursor: 'pointer' }}
          >
            View all activities →
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default ActivityTimeline;
