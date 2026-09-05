import React from 'react';
import {
  Box,
  Button,
  Drawer,
  IconButton,
  Typography,
  Stack,
  Chip,
  Paper,
  Switch,
  FormControlLabel,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FormatSizeIcon from '@mui/icons-material/FormatSize';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CheckIcon from '@mui/icons-material/Check';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectDarkMode,
  selectFontFamily,
  selectFontSize,
  selectPrimaryColor,
  setFontFamily,
  setFontSize,
  setPrimaryColor,
  toggleDarkMode,
  resetUiPreferences,
} from '../../app/theme/themeSlice';
import { COLOR_PALETTES } from '../../theme';

const FONT_OPTIONS = [
  {
    id: 'Inter',
    name: 'Inter',
    badge: 'Modern & Crisp',
    family: `'Inter', sans-serif`,
    description: 'Ultra-clean geometric sans-serif for high digital clarity.',
  },
  {
    id: 'Public Sans',
    name: 'Public Sans',
    badge: 'Contemporary',
    family: `'Public Sans', sans-serif`,
    description: 'Neutral, versatile, and high-readability contemporary typeface.',
  },
];

const SIZE_OPTIONS = [
  {
    id: 'small',
    name: 'Small',
    badge: 'Compact',
    description: 'Dense layout, fits more data & tables.',
  },
  {
    id: 'medium',
    name: 'Medium',
    badge: 'Default',
    description: 'Standard balanced spacing for optimal readability.',
  },
  {
    id: 'large',
    name: 'Large',
    badge: 'Comfortable',
    description: 'Spacious typography & relaxed viewing.',
  },
];

const COLOR_OPTIONS = [
  {
    id: 'emerald',
    name: 'Emerald (Original)',
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    tag: 'Original',
  },
  {
    id: 'blue',
    name: 'Sky Blue',
    color: '#0ea5e9',
    gradient: 'linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%)',
    tag: 'Sky',
  },
  {
    id: 'purple',
    name: 'Soft Lavender',
    color: '#818cf8',
    gradient: 'linear-gradient(135deg, #a5b4fc 0%, #818cf8 100%)',
    tag: 'Lavender',
  },
  {
    id: 'orange',
    name: 'Warm Peach',
    color: '#fb923c',
    gradient: 'linear-gradient(135deg, #fdba74 0%, #fb923c 100%)',
    tag: 'Peach',
  },
  {
    id: 'rose',
    name: 'Pastel Rose',
    color: '#fb7185',
    gradient: 'linear-gradient(135deg, #fda4af 0%, #fb7185 100%)',
    tag: 'Rose',
  },
];

const UiPreferenceModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(selectDarkMode);
  const currentFont = useSelector(selectFontFamily);
  const currentSize = useSelector(selectFontSize);
  const currentColor = useSelector(selectPrimaryColor);

  const activeColorPalette = COLOR_PALETTES[currentColor] || COLOR_PALETTES.emerald;

  const handleFontSelect = (fontId) => {
    dispatch(setFontFamily(fontId));
  };

  const handleSizeSelect = (sizeId) => {
    dispatch(setFontSize(sizeId));
  };

  const handleColorSelect = (colorId) => {
    dispatch(setPrimaryColor(colorId));
  };

  const handleReset = () => {
    dispatch(resetUiPreferences());
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 390 },
          maxWidth: '100vw',
          backgroundColor: isDarkMode ? '#111827' : '#ffffff',
          backgroundImage: 'none',
          borderLeft: (theme) => `1px solid ${theme.palette.divider}`,
          boxShadow: isDarkMode
            ? '-10px 0 30px rgba(0, 0, 0, 0.6)'
            : '-10px 0 30px rgba(0, 0, 0, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        },
      }}
    >
      {/* Drawer Header */}
      <Box
        sx={{
          p: 2,
          px: 2.5,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box display="flex" alignItems="center" gap={1.25}>
          <Box
            sx={{
              width: 34,
              height: 34,
              borderRadius: '9px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: activeColorPalette.gradient,
              color: '#ffffff',
              transition: 'background 0.3s ease',
            }}
          >
            <ColorLensOutlinedIcon sx={{ fontSize: 18 }} />
          </Box>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
              UI Preferences
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Theme colors, typography & scaling
            </Typography>
          </Box>
        </Box>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            color: 'text.secondary',
            '&:hover': { backgroundColor: isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Drawer Scrollable Content */}
      <Box sx={{ p: 2.5, flex: 1, overflowY: 'auto' }}>
        <Stack spacing={2.75}>
          {/* Section 1: Light Theme Colors */}
          <Box>
            <Box display="flex" alignItems="center" gap={0.75} mb={1.25}>
              <ColorLensOutlinedIcon sx={{ fontSize: 17, color: activeColorPalette.main }} />
              <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, color: 'text.secondary' }}>
                Theme Accent (5 Light Colors)
              </Typography>
            </Box>

            <Box display="grid" gridTemplateColumns="repeat(5, 1fr)" gap={1}>
              {COLOR_OPTIONS.map((c) => {
                const isSelected = currentColor === c.id;
                return (
                  <Paper
                    key={c.id}
                    onClick={() => handleColorSelect(c.id)}
                    elevation={0}
                    sx={{
                      p: 1,
                      cursor: 'pointer',
                      borderRadius: '10px',
                      border: '2px solid',
                      borderColor: isSelected ? c.color : isDarkMode ? '#1e293b' : '#e2e8f0',
                      backgroundColor: isSelected
                        ? isDarkMode ? 'rgba(255, 255, 255, 0.05)' : '#f8fafc'
                        : isDarkMode ? '#0f172a' : '#ffffff',
                      transition: 'all 0.2s ease',
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 0.5,
                      '&:hover': {
                        borderColor: c.color,
                        transform: 'translateY(-1px)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 26,
                        height: 26,
                        borderRadius: '50%',
                        background: c.gradient,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff',
                        boxShadow: `0 2px 6px ${c.color}35`,
                      }}
                    >
                      {isSelected && <CheckIcon sx={{ fontSize: 15 }} />}
                    </Box>

                    <Typography sx={{ fontWeight: 600, fontSize: '0.68rem', color: isSelected ? c.color : 'text.primary', lineHeight: 1.1 }}>
                      {c.tag}
                    </Typography>
                  </Paper>
                );
              })}
            </Box>
          </Box>

          {/* Section 2: Font Style */}
          <Box>
            <Box display="flex" alignItems="center" gap={0.75} mb={1.25}>
              <TextFieldsIcon sx={{ fontSize: 17, color: activeColorPalette.main }} />
              <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, color: 'text.secondary' }}>
                Font Style (Typography)
              </Typography>
            </Box>

            <Box display="grid" gridTemplateColumns="1fr 1fr" gap={1.25}>
              {FONT_OPTIONS.map((font) => {
                const isSelected = currentFont === font.id;
                return (
                  <Paper
                    key={font.id}
                    onClick={() => handleFontSelect(font.id)}
                    elevation={0}
                    sx={{
                      p: 1.5,
                      cursor: 'pointer',
                      borderRadius: '10px',
                      border: '2px solid',
                      borderColor: isSelected ? activeColorPalette.main : isDarkMode ? '#1e293b' : '#e2e8f0',
                      backgroundColor: isSelected
                        ? isDarkMode ? 'rgba(255, 255, 255, 0.04)' : activeColorPalette.subtleBg
                        : isDarkMode ? '#0f172a' : '#f8fafc',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        borderColor: activeColorPalette.main,
                      },
                    }}
                  >
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
                      <Typography
                        sx={{
                          fontFamily: font.family,
                          fontWeight: 700,
                          fontSize: '0.95rem',
                          color: isSelected ? activeColorPalette.main : 'text.primary',
                        }}
                      >
                        {font.name}
                      </Typography>
                      {isSelected ? (
                        <CheckCircleIcon sx={{ fontSize: 18, color: activeColorPalette.main }} />
                      ) : (
                        <Box
                          sx={{
                            width: 15,
                            height: 15,
                            borderRadius: '50%',
                            border: `1.5px solid ${isDarkMode ? '#334155' : '#cbd5e1'}`,
                          }}
                        />
                      )}
                    </Box>

                    <Chip
                      label={font.badge}
                      size="small"
                      sx={{
                        height: 18,
                        fontSize: '0.62rem',
                        fontWeight: 600,
                        backgroundColor: isSelected
                          ? isDarkMode ? 'rgba(255, 255, 255, 0.08)' : `${activeColorPalette.main}20`
                          : isDarkMode ? '#1e293b' : '#e2e8f0',
                        color: isSelected ? activeColorPalette.main : 'text.secondary',
                      }}
                    />
                  </Paper>
                );
              })}
            </Box>
          </Box>

          {/* Section 3: Font Size */}
          <Box>
            <Box display="flex" alignItems="center" gap={0.75} mb={1.25}>
              <FormatSizeIcon sx={{ fontSize: 17, color: activeColorPalette.main }} />
              <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, color: 'text.secondary' }}>
                Font Size Scaling
              </Typography>
            </Box>

            <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" gap={1}>
              {SIZE_OPTIONS.map((size) => {
                const isSelected = currentSize === size.id;
                return (
                  <Paper
                    key={size.id}
                    onClick={() => handleSizeSelect(size.id)}
                    elevation={0}
                    sx={{
                      p: 1.25,
                      cursor: 'pointer',
                      borderRadius: '10px',
                      border: '2px solid',
                      borderColor: isSelected ? activeColorPalette.main : isDarkMode ? '#1e293b' : '#e2e8f0',
                      backgroundColor: isSelected
                        ? isDarkMode ? 'rgba(255, 255, 255, 0.04)' : activeColorPalette.subtleBg
                        : isDarkMode ? '#0f172a' : '#f8fafc',
                      transition: 'all 0.2s ease',
                      textAlign: 'center',
                      '&:hover': {
                        borderColor: activeColorPalette.main,
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: size.id === 'small' ? '0.82rem' : size.id === 'medium' ? '0.92rem' : '1.05rem',
                        color: isSelected ? activeColorPalette.main : 'text.primary',
                        mb: 0.25,
                      }}
                    >
                      {size.name}
                    </Typography>

                    <Chip
                      label={size.badge}
                      size="small"
                      sx={{
                        height: 16,
                        fontSize: '0.58rem',
                        fontWeight: 600,
                        backgroundColor: isSelected
                          ? isDarkMode ? 'rgba(255, 255, 255, 0.08)' : `${activeColorPalette.main}20`
                          : isDarkMode ? '#1e293b' : '#e2e8f0',
                        color: isSelected ? activeColorPalette.main : 'text.secondary',
                      }}
                    />
                  </Paper>
                );
              })}
            </Box>
          </Box>

          {/* Section 4: Live Preview */}
          <Box>
            <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, color: 'text.secondary', mb: 1, display: 'block' }}>
              Live Workspace Preview
            </Typography>
            <Paper
              elevation={0}
              sx={{
                p: 1.75,
                borderRadius: '10px',
                border: (theme) => `1px solid ${theme.palette.divider}`,
                backgroundColor: isDarkMode ? '#0b0f19' : '#ffffff',
                borderLeft: `3px solid ${activeColorPalette.main}`,
              }}
            >
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.75}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary' }}>
                  Acme Deal ($32,500)
                </Typography>
                <Chip
                  label="QUALIFIED"
                  size="small"
                  sx={{
                    height: 20,
                    fontSize: '0.62rem',
                    fontWeight: 700,
                    backgroundColor: `${activeColorPalette.main}18`,
                    color: activeColorPalette.main,
                    border: `1px solid ${activeColorPalette.main}`,
                  }}
                />
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                Assigned: <strong>Sarah Jenkins</strong> • Follow-up: <strong>Tomorrow</strong>
              </Typography>
              <Box display="flex" gap={1}>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    background: activeColorPalette.gradient,
                    color: '#ffffff',
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    py: 0.4,
                    '&:hover': { opacity: 0.9 },
                  }}
                >
                  View Lead
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    borderColor: (theme) => theme.palette.divider,
                    color: 'text.primary',
                    fontSize: '0.75rem',
                    py: 0.4,
                    '&:hover': { borderColor: activeColorPalette.main },
                  }}
                >
                  Add Note
                </Button>
              </Box>
            </Paper>
          </Box>

          {/* Section 5: Theme Mode Switch */}
          <Divider sx={{ borderColor: 'divider' }} />
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="center" gap={1}>
              {isDarkMode ? (
                <LightModeOutlinedIcon sx={{ color: '#fbbf24', fontSize: 20 }} />
              ) : (
                <DarkModeOutlinedIcon sx={{ color: '#64748b', fontSize: 20 }} />
              )}
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '0.85rem' }}>
                  Dark Mode
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {isDarkMode ? 'Dark theme active' : 'Light theme active'}
                </Typography>
              </Box>
            </Box>
            <FormControlLabel
              control={
                <Switch
                  checked={isDarkMode}
                  onChange={() => dispatch(toggleDarkMode())}
                  color="primary"
                />
              }
              label=""
              sx={{ m: 0 }}
            />
          </Box>
        </Stack>
      </Box>

      {/* Drawer Sticky Footer */}
      <Box
        sx={{
          p: 2,
          px: 2.5,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          backgroundColor: isDarkMode ? '#111827' : '#ffffff',
        }}
      >
        <Button
          startIcon={<RestartAltIcon sx={{ fontSize: 16 }} />}
          onClick={handleReset}
          size="small"
          sx={{
            color: 'text.secondary',
            textTransform: 'none',
            fontSize: '0.8rem',
            fontWeight: 500,
            '&:hover': { color: 'text.primary' },
          }}
        >
          Reset
        </Button>
        <Button
          variant="contained"
          onClick={onClose}
          size="small"
          sx={{
            px: 2.5,
            py: 0.75,
            background: activeColorPalette.gradient,
            color: '#ffffff',
            fontWeight: 600,
            textTransform: 'none',
            borderRadius: '7px',
            fontSize: '0.825rem',
            '&:hover': { opacity: 0.9 },
          }}
        >
          Done
        </Button>
      </Box>
    </Drawer>
  );
};

export default UiPreferenceModal;
