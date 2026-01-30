import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  IconButton,
  Chip,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Skeleton,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Delete,
  Visibility,
  LocalFireDepartment,
  FitnessCenter,
  Grain,
  Opacity,
  Close,
  Restaurant,
  CheckCircle,
  TipsAndUpdates,
  History,
  Favorite,
  Category,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { scanHistoryService } from '../../services';

const ScanHistory = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedScan, setSelectedScan] = useState(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [scanToDelete, setScanToDelete] = useState(null);
  const [stats, setStats] = useState(null);

  const loadScans = useCallback(async () => {
    try {
      setLoading(true);
      const response = await scanHistoryService.getHistory(1, 50);
      if (response.success) {
        setScans(response.data);
      }
    } catch (error) {
      console.error('Error loading scan history:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadStats = useCallback(async () => {
    try {
      const response = await scanHistoryService.getStats();
      if (response.success) {
        setStats(response.data);
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  }, []);

  useEffect(() => {
    loadScans();
    loadStats();
  }, [loadScans, loadStats]);

  const handleViewDetails = async (scan) => {
    setDetailDialogOpen(true);
    setDetailLoading(true);
    try {
      const response = await scanHistoryService.getScanById(scan._id);
      if (response.success) {
        setSelectedScan(response.data);
      }
    } catch (error) {
      console.error('Error loading scan details:', error);
    } finally {
      setDetailLoading(false);
    }
  };

  const handleDeleteClick = (scan) => {
    setScanToDelete(scan);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!scanToDelete) return;
    try {
      await scanHistoryService.deleteScan(scanToDelete._id);
      setScans((prev) => prev.filter((s) => s._id !== scanToDelete._id));
      setDeleteConfirmOpen(false);
      setScanToDelete(null);
    } catch (error) {
      console.error('Error deleting scan:', error);
    }
  };

  const closeDetailDialog = () => {
    setDetailDialogOpen(false);
    setSelectedScan(null);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: isDark ? 'white' : '#1a1a2e',
            mb: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          <History sx={{ fontSize: 32, color: theme.palette.primary.main }} />
          Scan History
        </Typography>
        <Typography sx={{ color: isDark ? 'rgba(255,255,255,0.6)' : '#666' }}>
          View your previously scanned food items and their nutritional analysis
        </Typography>
      </Box>

      {/* Stats Overview */}
      {stats && (
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={6} sm={3}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 3,
                background: isDark
                  ? alpha('#667eea', 0.15)
                  : 'linear-gradient(135deg, #667eea15 0%, #764ba215 100%)',
                border: `1px solid ${alpha('#667eea', 0.2)}`,
                textAlign: 'center',
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#667eea' }}>
                {stats.overview.totalScans}
              </Typography>
              <Typography variant="body2" sx={{ color: isDark ? 'rgba(255,255,255,0.6)' : '#666' }}>
                Total Scans
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 3,
                background: isDark
                  ? alpha('#FF6B6B', 0.15)
                  : 'linear-gradient(135deg, #FF6B6B15 0%, #FF8E5315 100%)',
                border: `1px solid ${alpha('#FF6B6B', 0.2)}`,
                textAlign: 'center',
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#FF6B6B' }}>
                {Math.round(stats.overview.avgCalories || 0)}
              </Typography>
              <Typography variant="body2" sx={{ color: isDark ? 'rgba(255,255,255,0.6)' : '#666' }}>
                Avg Calories
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 3,
                background: isDark
                  ? alpha('#00C853', 0.15)
                  : 'linear-gradient(135deg, #00C85315 0%, #00E67615 100%)',
                border: `1px solid ${alpha('#00C853', 0.2)}`,
                textAlign: 'center',
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#00C853' }}>
                {stats.overview.healthyCount}
              </Typography>
              <Typography variant="body2" sx={{ color: isDark ? 'rgba(255,255,255,0.6)' : '#666' }}>
                Healthy Foods
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 3,
                background: isDark
                  ? alpha('#2196F3', 0.15)
                  : 'linear-gradient(135deg, #2196F315 0%, #21CBF315 100%)',
                border: `1px solid ${alpha('#2196F3', 0.2)}`,
                textAlign: 'center',
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#2196F3' }}>
                {Math.round(stats.overview.avgProtein || 0)}g
              </Typography>
              <Typography variant="body2" sx={{ color: isDark ? 'rgba(255,255,255,0.6)' : '#666' }}>
                Avg Protein
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* Scans Grid */}
      {loading ? (
        <Grid container spacing={2}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Skeleton variant="rounded" height={280} sx={{ borderRadius: 3 }} />
            </Grid>
          ))}
        </Grid>
      ) : scans.length === 0 ? (
        <Paper
          elevation={0}
          sx={{
            p: 6,
            borderRadius: 4,
            textAlign: 'center',
            backgroundColor: isDark ? alpha('#fff', 0.05) : '#f8f9fa',
          }}
        >
          <History sx={{ fontSize: 64, color: isDark ? 'rgba(255,255,255,0.2)' : '#ddd', mb: 2 }} />
          <Typography variant="h6" sx={{ color: isDark ? 'rgba(255,255,255,0.6)' : '#666', mb: 1 }}>
            No scans yet
          </Typography>
          <Typography variant="body2" sx={{ color: isDark ? 'rgba(255,255,255,0.4)' : '#999' }}>
            Start scanning food items to see them here
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={2}>
          <AnimatePresence>
            {scans.map((scan, index) => (
              <Grid item xs={12} sm={6} md={4} key={scan._id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card
                    sx={{
                      borderRadius: 3,
                      overflow: 'hidden',
                      backgroundColor: isDark ? alpha('#fff', 0.05) : '#fff',
                      border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#eee'}`,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: isDark
                          ? '0 12px 40px rgba(0,0,0,0.4)'
                          : '0 12px 40px rgba(0,0,0,0.15)',
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="160"
                      image={scan.thumbnail}
                      alt={scan.analysis?.name}
                      sx={{ objectFit: 'cover' }}
                    />
                    <CardContent sx={{ pb: 1 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          color: isDark ? 'white' : '#333',
                          mb: 0.5,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {scan.analysis?.name || 'Unknown Food'}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: isDark ? 'rgba(255,255,255,0.5)' : '#999' }}
                      >
                        {format(new Date(scan.scannedAt), 'MMM d, yyyy • h:mm a')}
                      </Typography>

                      <Box sx={{ display: 'flex', gap: 1, mt: 1.5, flexWrap: 'wrap' }}>
                        <Chip
                          icon={<LocalFireDepartment sx={{ fontSize: 14 }} />}
                          label={`${scan.analysis?.calories || 0} cal`}
                          size="small"
                          sx={{
                            backgroundColor: alpha('#FF6B6B', 0.15),
                            color: '#FF6B6B',
                            fontWeight: 600,
                            '& .MuiChip-icon': { color: '#FF6B6B' },
                          }}
                        />
                        <Chip
                          icon={<FitnessCenter sx={{ fontSize: 14 }} />}
                          label={`${scan.analysis?.protein || 0}g`}
                          size="small"
                          sx={{
                            backgroundColor: alpha('#2196F3', 0.15),
                            color: '#2196F3',
                            fontWeight: 600,
                            '& .MuiChip-icon': { color: '#2196F3' },
                          }}
                        />
                        {scan.analysis?.isHealthy && (
                          <Chip
                            icon={<Favorite sx={{ fontSize: 14 }} />}
                            label="Healthy"
                            size="small"
                            sx={{
                              backgroundColor: alpha('#00C853', 0.15),
                              color: '#00C853',
                              fontWeight: 600,
                              '& .MuiChip-icon': { color: '#00C853' },
                            }}
                          />
                        )}
                      </Box>
                    </CardContent>
                    <CardActions sx={{ px: 2, pb: 2, pt: 0 }}>
                      <Button
                        size="small"
                        startIcon={<Visibility />}
                        onClick={() => handleViewDetails(scan)}
                        sx={{ fontWeight: 600 }}
                      >
                        View Details
                      </Button>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteClick(scan)}
                        sx={{ ml: 'auto', color: '#f44336' }}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </CardActions>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </AnimatePresence>
        </Grid>
      )}

      {/* Detail Dialog */}
      <Dialog
        open={detailDialogOpen}
        onClose={closeDetailDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            backgroundColor: isDark ? '#1a1a2e' : '#fff',
            maxHeight: '90vh',
          },
        }}
      >
        {detailLoading ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <CircularProgress />
            <Typography sx={{ mt: 2, color: isDark ? 'rgba(255,255,255,0.6)' : '#666' }}>
              Loading details...
            </Typography>
          </Box>
        ) : selectedScan ? (
          <>
            <DialogTitle sx={{ pb: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: isDark ? 'white' : '#333' }}>
                    {selectedScan.analysis?.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: isDark ? 'rgba(255,255,255,0.5)' : '#999' }}>
                    Scanned on {format(new Date(selectedScan.scannedAt), 'MMMM d, yyyy • h:mm a')}
                  </Typography>
                </Box>
                <IconButton onClick={closeDetailDialog}>
                  <Close />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent>
              {/* Image */}
              <Box
                component="img"
                src={selectedScan.image}
                alt={selectedScan.analysis?.name}
                sx={{
                  width: '100%',
                  height: 200,
                  objectFit: 'cover',
                  borderRadius: 3,
                  mb: 3,
                }}
              />

              {/* Quick Stats */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                <Chip
                  icon={<CheckCircle sx={{ fontSize: 14 }} />}
                  label={`${Math.round(selectedScan.analysis?.confidence * 100)}% confident`}
                  size="small"
                  sx={{
                    backgroundColor: alpha('#00C853', 0.15),
                    color: '#00C853',
                    fontWeight: 600,
                  }}
                />
                {selectedScan.analysis?.servingSize && (
                  <Chip
                    icon={<Restaurant sx={{ fontSize: 14 }} />}
                    label={selectedScan.analysis.servingSize}
                    size="small"
                    sx={{
                      backgroundColor: isDark ? alpha('#fff', 0.1) : '#f0f0f0',
                      color: isDark ? 'rgba(255,255,255,0.8)' : '#555',
                    }}
                  />
                )}
                {selectedScan.analysis?.foodCategory && (
                  <Chip
                    icon={<Category sx={{ fontSize: 14 }} />}
                    label={selectedScan.analysis.foodCategory}
                    size="small"
                    sx={{
                      backgroundColor: alpha('#2196F3', 0.15),
                      color: '#2196F3',
                    }}
                  />
                )}
              </Box>

              {/* Calories */}
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  mb: 2,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <LocalFireDepartment sx={{ color: 'white', fontSize: 32 }} />
                  <Box>
                    <Typography sx={{ color: 'rgba(255,255,255,0.85)', fontSize: 12 }}>
                      Total Calories
                    </Typography>
                    <Typography variant="h4" sx={{ color: 'white', fontWeight: 700 }}>
                      {selectedScan.analysis?.calories} kcal
                    </Typography>
                  </Box>
                </Box>
              </Paper>

              {/* Macros */}
              <Grid container spacing={1.5} sx={{ mb: 2 }}>
                <Grid item xs={4}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      background: alpha('#2196F3', 0.1),
                      textAlign: 'center',
                    }}
                  >
                    <FitnessCenter sx={{ color: '#2196F3', fontSize: 20 }} />
                    <Typography sx={{ fontWeight: 700, color: isDark ? 'white' : '#333' }}>
                      {selectedScan.analysis?.protein}g
                    </Typography>
                    <Typography variant="caption" sx={{ color: isDark ? 'rgba(255,255,255,0.6)' : '#666' }}>
                      Protein
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      background: alpha('#FF9800', 0.1),
                      textAlign: 'center',
                    }}
                  >
                    <Grain sx={{ color: '#FF9800', fontSize: 20 }} />
                    <Typography sx={{ fontWeight: 700, color: isDark ? 'white' : '#333' }}>
                      {selectedScan.analysis?.carbs}g
                    </Typography>
                    <Typography variant="caption" sx={{ color: isDark ? 'rgba(255,255,255,0.6)' : '#666' }}>
                      Carbs
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      background: alpha('#9C27B0', 0.1),
                      textAlign: 'center',
                    }}
                  >
                    <Opacity sx={{ color: '#9C27B0', fontSize: 20 }} />
                    <Typography sx={{ fontWeight: 700, color: isDark ? 'white' : '#333' }}>
                      {selectedScan.analysis?.fat}g
                    </Typography>
                    <Typography variant="caption" sx={{ color: isDark ? 'rgba(255,255,255,0.6)' : '#666' }}>
                      Fat
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>

              {/* Ingredients */}
              {selectedScan.analysis?.ingredients?.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: isDark ? 'rgba(255,255,255,0.5)' : '#888',
                      mb: 1,
                      textTransform: 'uppercase',
                      letterSpacing: 1,
                      fontSize: 11,
                    }}
                  >
                    Ingredients
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selectedScan.analysis.ingredients.map((ing, i) => (
                      <Chip
                        key={i}
                        label={ing}
                        size="small"
                        sx={{
                          backgroundColor: isDark ? alpha('#fff', 0.1) : '#e8e8e8',
                          color: isDark ? 'rgba(255,255,255,0.9)' : '#444',
                          fontSize: 11,
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              )}

              {/* Suggestions */}
              {selectedScan.analysis?.suggestions?.length > 0 && (
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    background: isDark ? alpha('#4CAF50', 0.12) : alpha('#4CAF50', 0.08),
                    border: `1px solid ${alpha('#4CAF50', 0.2)}`,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <TipsAndUpdates sx={{ color: '#2E7D32', fontSize: 18 }} />
                    <Typography
                      sx={{
                        color: '#2E7D32',
                        textTransform: 'uppercase',
                        letterSpacing: 1,
                        fontSize: 11,
                        fontWeight: 600,
                      }}
                    >
                      AI Insights
                    </Typography>
                  </Box>
                  <Stack spacing={0.5}>
                    {selectedScan.analysis.suggestions.map((sug, i) => (
                      <Typography
                        key={i}
                        variant="body2"
                        sx={{ color: isDark ? '#81C784' : '#1B5E20', fontSize: 13 }}
                      >
                        • {sug}
                      </Typography>
                    ))}
                  </Stack>
                </Paper>
              )}
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
              <Button onClick={closeDetailDialog} sx={{ fontWeight: 600 }}>
                Close
              </Button>
            </DialogActions>
          </>
        ) : null}
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: 3,
            backgroundColor: isDark ? '#1a1a2e' : '#fff',
          },
        }}
      >
        <DialogTitle sx={{ color: isDark ? 'white' : '#333' }}>Delete Scan?</DialogTitle>
        <DialogContent>
          <Typography sx={{ color: isDark ? 'rgba(255,255,255,0.7)' : '#666' }}>
            Are you sure you want to delete this scan? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ScanHistory;
