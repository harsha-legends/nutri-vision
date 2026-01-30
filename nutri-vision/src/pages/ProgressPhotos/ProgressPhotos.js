import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  TextField,
  Fab,
  Chip,
  Menu,
  MenuItem,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  ArrowBack,
  Add as AddIcon,
  CameraAlt,
  PhotoLibrary,
  Delete as DeleteIcon,
  Visibility,
  Close,
  Compare,
  CalendarToday,
  TrendingUp,
  MoreVert,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { format, parseISO, differenceInDays } from 'date-fns';

const ProgressPhotos = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isDark = theme.palette.mode === 'dark';
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const [photos, setPhotos] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const [comparePhotos, setComparePhotos] = useState([]);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [activePhotoId, setActivePhotoId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  
  const [newPhoto, setNewPhoto] = useState({
    image: null,
    note: '',
    weight: '',
  });

  useEffect(() => {
    // Load photos from localStorage
    const savedPhotos = localStorage.getItem('progressPhotos');
    if (savedPhotos) {
      setPhotos(JSON.parse(savedPhotos));
    }
  }, []);

  const savePhotos = (updatedPhotos) => {
    setPhotos(updatedPhotos);
    localStorage.setItem('progressPhotos', JSON.stringify(updatedPhotos));
  };

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewPhoto(prev => ({ ...prev, image: e.target.result }));
        setDialogOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSavePhoto = () => {
    if (!newPhoto.image) return;

    const photo = {
      id: Date.now(),
      image: newPhoto.image,
      date: new Date().toISOString(),
      note: newPhoto.note,
      weight: newPhoto.weight ? parseFloat(newPhoto.weight) : null,
    };

    savePhotos([photo, ...photos]);
    setNewPhoto({ image: null, note: '', weight: '' });
    setDialogOpen(false);
    setSnackbar({ open: true, message: 'Progress photo saved!' });
  };

  const handleDeletePhoto = (photoId) => {
    const updatedPhotos = photos.filter(p => p.id !== photoId);
    savePhotos(updatedPhotos);
    setMenuAnchor(null);
    setSnackbar({ open: true, message: 'Photo deleted' });
  };

  const handleCompareToggle = (photo) => {
    if (comparePhotos.find(p => p.id === photo.id)) {
      setComparePhotos(comparePhotos.filter(p => p.id !== photo.id));
    } else if (comparePhotos.length < 2) {
      setComparePhotos([...comparePhotos, photo]);
    }
  };

  const getWeightChange = () => {
    if (photos.length < 2) return null;
    
    const latestWithWeight = photos.find(p => p.weight);
    const earliestWithWeight = [...photos].reverse().find(p => p.weight);
    
    if (latestWithWeight && earliestWithWeight && latestWithWeight.id !== earliestWithWeight.id) {
      return (latestWithWeight.weight - earliestWithWeight.weight).toFixed(1);
    }
    return null;
  };

  const getDaysTracking = () => {
    if (photos.length < 1) return 0;
    const oldest = photos[photos.length - 1];
    return differenceInDays(new Date(), parseISO(oldest.date));
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: isDark 
        ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' 
        : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      pb: 10,
    }}>
      {/* Header */}
      <Box
        sx={{
          p: 3,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <IconButton onClick={() => navigate(-1)} sx={{ color: 'white' }}>
            <ArrowBack />
          </IconButton>
          <Box flex={1}>
            <Typography variant="h5" fontWeight={700}>
              Progress Photos
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Track your transformation journey
            </Typography>
          </Box>
          {photos.length >= 2 && (
            <Button
              variant="contained"
              size="small"
              startIcon={<Compare />}
              onClick={() => setCompareMode(!compareMode)}
              sx={{
                bgcolor: compareMode ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.2)',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' },
              }}
            >
              Compare
            </Button>
          )}
        </Stack>
      </Box>

      {/* Stats */}
      {photos.length > 0 && (
        <Box sx={{ p: 2 }}>
          <Stack direction="row" spacing={2}>
            <Card sx={{ flex: 1, borderRadius: 3 }}>
              <CardContent sx={{ textAlign: 'center', py: 2 }}>
                <Typography variant="h4" fontWeight={700} color="primary">
                  {photos.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Photos
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ flex: 1, borderRadius: 3 }}>
              <CardContent sx={{ textAlign: 'center', py: 2 }}>
                <Typography variant="h4" fontWeight={700} color="primary">
                  {getDaysTracking()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Days
                </Typography>
              </CardContent>
            </Card>
            {getWeightChange() !== null && (
              <Card sx={{ flex: 1, borderRadius: 3 }}>
                <CardContent sx={{ textAlign: 'center', py: 2 }}>
                  <Typography 
                    variant="h4" 
                    fontWeight={700} 
                    color={parseFloat(getWeightChange()) < 0 ? 'success.main' : 'warning.main'}
                  >
                    {getWeightChange() > 0 ? '+' : ''}{getWeightChange()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    kg Change
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Stack>
        </Box>
      )}

      {/* Compare Mode Instructions */}
      {compareMode && (
        <Box sx={{ px: 2, pb: 2 }}>
          <Alert severity="info" sx={{ borderRadius: 2 }}>
            Select 2 photos to compare side by side ({comparePhotos.length}/2 selected)
            {comparePhotos.length === 2 && (
              <Button 
                size="small" 
                onClick={() => setViewerOpen(true)}
                sx={{ ml: 2 }}
              >
                View Comparison
              </Button>
            )}
          </Alert>
        </Box>
      )}

      {/* Photo Grid */}
      <Box sx={{ px: 2 }}>
        {photos.length > 0 ? (
          <ImageList cols={2} gap={12}>
            {photos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <ImageListItem
                  sx={{
                    borderRadius: 3,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: comparePhotos.find(p => p.id === photo.id) 
                      ? '3px solid #667eea' 
                      : 'none',
                  }}
                  onClick={() => {
                    if (compareMode) {
                      handleCompareToggle(photo);
                    } else {
                      setSelectedPhoto(photo);
                      setViewerOpen(true);
                    }
                  }}
                >
                  <img
                    src={photo.image}
                    alt={`Progress ${format(parseISO(photo.date), 'MMM d, yyyy')}`}
                    loading="lazy"
                    style={{ 
                      aspectRatio: '3/4', 
                      objectFit: 'cover',
                    }}
                  />
                  <ImageListItemBar
                    title={format(parseISO(photo.date), 'MMM d, yyyy')}
                    subtitle={photo.weight ? `${photo.weight} kg` : photo.note || ''}
                    actionIcon={
                      !compareMode && (
                        <IconButton
                          sx={{ color: 'white' }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActivePhotoId(photo.id);
                            setMenuAnchor(e.currentTarget);
                          }}
                        >
                          <MoreVert />
                        </IconButton>
                      )
                    }
                  />
                  {comparePhotos.find(p => p.id === photo.id) && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                        bgcolor: '#667eea',
                        color: 'white',
                        borderRadius: '50%',
                        width: 28,
                        height: 28,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                      }}
                    >
                      {comparePhotos.findIndex(p => p.id === photo.id) + 1}
                    </Box>
                  )}
                </ImageListItem>
              </motion.div>
            ))}
          </ImageList>
        ) : (
          <Card sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
            <PhotoLibrary sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              No Progress Photos Yet
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
              Start documenting your fitness journey by adding your first photo
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => fileInputRef.current?.click()}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              }}
            >
              Add First Photo
            </Button>
          </Card>
        )}
      </Box>

      {/* Photo Menu */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
      >
        <MenuItem onClick={() => {
          const photo = photos.find(p => p.id === activePhotoId);
          if (photo) {
            setSelectedPhoto(photo);
            setViewerOpen(true);
          }
          setMenuAnchor(null);
        }}>
          <Visibility sx={{ mr: 1 }} /> View
        </MenuItem>
        <MenuItem 
          onClick={() => handleDeletePhoto(activePhotoId)}
          sx={{ color: 'error.main' }}
        >
          <DeleteIcon sx={{ mr: 1 }} /> Delete
        </MenuItem>
      </Menu>

      {/* Add Photo FAB */}
      <Fab
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 80,
          right: 24,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
        onClick={() => fileInputRef.current?.click()}
      >
        <CameraAlt />
      </Fab>

      {/* Hidden File Inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleFileSelect}
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        hidden
        onChange={handleFileSelect}
      />

      {/* Add Photo Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle>Add Progress Photo</DialogTitle>
        <DialogContent>
          {newPhoto.image && (
            <Box
              component="img"
              src={newPhoto.image}
              alt="Preview"
              sx={{
                width: '100%',
                maxHeight: 300,
                objectFit: 'contain',
                borderRadius: 2,
                mb: 2,
              }}
            />
          )}
          <TextField
            fullWidth
            label="Current Weight (kg)"
            type="number"
            value={newPhoto.weight}
            onChange={(e) => setNewPhoto(prev => ({ ...prev, weight: e.target.value }))}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Note (optional)"
            multiline
            rows={2}
            value={newPhoto.note}
            onChange={(e) => setNewPhoto(prev => ({ ...prev, note: e.target.value }))}
            placeholder="How are you feeling today?"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleSavePhoto}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
          >
            Save Photo
          </Button>
        </DialogActions>
      </Dialog>

      {/* Photo Viewer / Compare Dialog */}
      <Dialog
        open={viewerOpen}
        onClose={() => {
          setViewerOpen(false);
          setSelectedPhoto(null);
        }}
        fullScreen
        PaperProps={{ 
          sx: { 
            bgcolor: 'black',
          } 
        }}
      >
        <IconButton
          onClick={() => {
            setViewerOpen(false);
            setSelectedPhoto(null);
          }}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            color: 'white',
            zIndex: 10,
          }}
        >
          <Close />
        </IconButton>
        
        {comparePhotos.length === 2 ? (
          // Compare View
          <Box sx={{ 
            display: 'flex', 
            height: '100%',
            flexDirection: { xs: 'column', sm: 'row' },
          }}>
            {comparePhotos.map((photo, idx) => (
              <Box
                key={photo.id}
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: 2,
                }}
              >
                <img
                  src={photo.image}
                  alt={`Compare ${idx + 1}`}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '70vh',
                    objectFit: 'contain',
                  }}
                />
                <Stack 
                  direction="row" 
                  spacing={2} 
                  sx={{ mt: 2, color: 'white' }}
                  alignItems="center"
                >
                  <CalendarToday fontSize="small" />
                  <Typography>
                    {format(parseISO(photo.date), 'MMM d, yyyy')}
                  </Typography>
                  {photo.weight && (
                    <>
                      <TrendingUp fontSize="small" />
                      <Typography>{photo.weight} kg</Typography>
                    </>
                  )}
                </Stack>
              </Box>
            ))}
          </Box>
        ) : selectedPhoto ? (
          // Single Photo View
          <Box sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
          }}>
            <img
              src={selectedPhoto.image}
              alt="Progress"
              style={{
                maxWidth: '100%',
                maxHeight: '80vh',
                objectFit: 'contain',
              }}
            />
            <Stack spacing={1} sx={{ mt: 2, color: 'white', textAlign: 'center' }}>
              <Typography variant="h6">
                {format(parseISO(selectedPhoto.date), 'MMMM d, yyyy')}
              </Typography>
              {selectedPhoto.weight && (
                <Chip 
                  label={`${selectedPhoto.weight} kg`} 
                  sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
                />
              )}
              {selectedPhoto.note && (
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  {selectedPhoto.note}
                </Typography>
              )}
            </Stack>
          </Box>
        ) : null}
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </Box>
  );
};

export default ProgressPhotos;
