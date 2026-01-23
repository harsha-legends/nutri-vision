import React from 'react';
import { Box, Card, CardContent, Typography, LinearProgress, Avatar } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { DonutLarge } from '@mui/icons-material';
import { motion } from 'framer-motion';

const MacroBalanceWidget = ({ totals, balance, recommendations = [] }) => {
  // Safety check: if balance is undefined, calculate it from totals
  const safeBalance = balance || {
    protein: totals.protein > 0 ? Math.round((totals.protein * 4 / (totals.calories || 1)) * 100) : 0,
    carbs: totals.carbs > 0 ? Math.round((totals.carbs * 4 / (totals.calories || 1)) * 100) : 0,
    fats: totals.fats > 0 ? Math.round((totals.fats * 9 / (totals.calories || 1)) * 100) : 0,
  };

  const data = [
    { name: 'Protein', value: safeBalance.protein, color: '#3b82f6' },
    { name: 'Carbs', value: safeBalance.carbs, color: '#10b981' },
    { name: 'Fats', value: safeBalance.fats, color: '#f59e0b' },
  ];

  const idealBalance = { protein: 30, carbs: 40, fats: 30 };

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
          <Avatar sx={{ bgcolor: '#8b5cf6', width: 36, height: 36 }}>
            <DonutLarge sx={{ fontSize: 20 }} />
          </Avatar>
          <Typography variant="h6" fontWeight={600}>
            Macro Balance
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
          {/* Pie Chart */}
          <Box sx={{ width: 120, height: 120 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={50}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Box>

          {/* Legend */}
          <Box sx={{ flex: 1 }}>
            {data.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Box sx={{ mb: 1.5 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          bgcolor: item.color,
                        }}
                      />
                      <Typography variant="body2" fontWeight={600}>
                        {item.name}
                      </Typography>
                    </Box>
                    <Typography variant="body2" fontWeight={700} sx={{ color: item.color }}>
                      {item.value}%
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={(item.value / idealBalance[item.name.toLowerCase()]) * 100}
                      sx={{
                        flex: 1,
                        height: 6,
                        borderRadius: 3,
                        bgcolor: `${item.color}20`,
                        '& .MuiLinearProgress-bar': {
                          bgcolor: item.color,
                          borderRadius: 3,
                        },
                      }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {idealBalance[item.name.toLowerCase()]}%
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            ))}
          </Box>
        </Box>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <Box
            sx={{
              p: 2,
              bgcolor: 'action.hover',
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
              <DonutLarge sx={{ fontSize: 14, color: 'primary.main' }} />
              <Typography variant="caption" fontWeight={700} color="primary">
                Suggestions
              </Typography>
            </Box>
            {recommendations.map((rec, index) => (
              <Typography key={index} variant="caption" color="text.secondary" display="block">
                • {rec}
              </Typography>
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default MacroBalanceWidget;
