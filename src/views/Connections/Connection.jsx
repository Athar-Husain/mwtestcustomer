import React, { useEffect, useMemo } from 'react';
import {
  Box,
  Typography,
  IconButton,
  CircularProgress,
  Button,
  Card,
  CardContent,
  Stack,
  Divider,
  Alert,
  Grid,
  Chip,
  Avatar,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Tooltip
} from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import WifiIcon from '@mui/icons-material/Wifi';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import PersonIcon from '@mui/icons-material/Person';
import RouterIcon from '@mui/icons-material/Router';
import InfoIcon from '@mui/icons-material/Info';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import { useDispatch, useSelector } from 'react-redux';
import { getConnectionsForUser, getActiveConnection } from '../../redux/features/Connection/ConnectionSlice';
import { switchConnection } from '../../redux/features/Customers/CustomerSlice';
import { useNavigate, useLocation } from 'react-router-dom';

const Connection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const callback = location.state?.onConnectionSelected;

  const {
    connections,
    connection: activeConnection,
    isConnectionLoading,
    isConnectionError,
    message
  } = useSelector((state) => state.connection);

  useEffect(() => {
    dispatch(getActiveConnection());
    dispatch(getConnectionsForUser());
  }, [dispatch]);

  // Helper to determine color based on Network Status
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'good': return theme.palette.success.main;
      case 'moderate': return theme.palette.warning.main;
      case 'slow': return theme.palette.error.main;
      default: return theme.palette.grey[500];
    }
  };

  const handleSelectConnection = (connectionId) => {
    dispatch(switchConnection({ connectionId }))
      .unwrap()
      .then(() => {
        dispatch(getActiveConnection());
        dispatch(getConnectionsForUser());
        callback?.('Connection Switched');
      })
      .catch((err) => console.error('Error switching:', err));
  };

  /** Active Connection Component */
  const ActiveConnectionCard = useMemo(() => {
    if (!activeConnection) return null;

    const netStatus = activeConnection.serviceArea?.networkStatus || 'Unknown';
    const statusColor = getStatusColor(netStatus);

    return (
      <Card
        elevation={0}
        sx={{
          borderRadius: 5,
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          background: `linear-gradient(145deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, #ffffff 100%)`,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box sx={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', bgcolor: 'success.main' }} />
        
        <CardContent sx={{ p: 4 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={3}>
            <Box>
              <Chip 
                label="ACTIVE SOURCE" 
                size="small" 
                sx={{ fontWeight: 900, bgcolor: 'success.main', color: 'white', mb: 1 }} 
              />
              <Typography variant="h4" fontWeight={800} color="text.primary">
                {activeConnection.aliasName || activeConnection.userName}
              </Typography>
            </Box>
            <Avatar sx={{ bgcolor: 'success.main', width: 56, height: 56, boxShadow: 3 }}>
              <WifiIcon fontSize="large" />
            </Avatar>
          </Stack>

          <Grid container spacing={3}>
            {/* User & Box Info */}
            <Grid size={{ xs: 6 }}>
              <Stack spacing={0.5}>
                <Typography variant="caption" color="text.secondary" fontWeight={700}>USER NAME</Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <PersonIcon fontSize="small" color="action" />
                  <Typography variant="body1" fontWeight={600}>{activeConnection.userName}</Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Stack spacing={0.5}>
                <Typography variant="caption" color="text.secondary" fontWeight={700}>BOX ID</Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <RouterIcon fontSize="small" color="action" />
                  <Typography variant="body1" fontWeight={600}>{activeConnection.boxId}</Typography>
                </Stack>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12 }}><Divider sx={{ my: 1 }} /></Grid>

            {/* Network Health Section */}
            <Grid size={{ xs: 12 }}>
              <Paper variant="outlined" sx={{ p: 2, borderRadius: 3, bgcolor: alpha(statusColor, 0.03), borderColor: alpha(statusColor, 0.2) }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <SignalCellularAltIcon sx={{ color: statusColor }} />
                    <Box>
                      <Typography variant="body2" fontWeight={700}>Network: {netStatus}</Typography>
                      <Typography variant="caption" color="text.secondary">Region: {activeConnection.serviceArea?.region}</Typography>
                    </Box>
                  </Stack>
                  <Tooltip title={activeConnection.serviceArea?.description}>
                    <IconButton size="small"><InfoIcon fontSize="small" /></IconButton>
                  </Tooltip>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }, [activeConnection, theme]);

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: '1200px', mx: 'auto', bgcolor: '#f8fafc', minHeight: '100vh' }}>
      {/* Header */}
      <Stack direction="row" alignItems="center" spacing={2} mb={4}>
        <IconButton onClick={() => navigate(-1)} sx={{ bgcolor: 'white', boxShadow: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" fontWeight={900} letterSpacing={-0.5}>
          My Connections
        </Typography>
      </Stack>

      {isConnectionLoading ? (
        <Stack alignItems="center" sx={{ mt: 10 }} spacing={2}>
          <CircularProgress size={60} thickness={4} />
          <Typography fontWeight={600} color="text.secondary">Fetching your network profile...</Typography>
        </Stack>
      ) : (
        <Grid container spacing={4}>
          {/* Left: Active Connection Card */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Typography variant="overline" fontWeight={800} color="text.secondary" sx={{ mb: 2, display: 'block' }}>
              Currently Connected
            </Typography>
            {ActiveConnectionCard}
          </Grid>

          {/* Right: Connection List */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Typography variant="overline" fontWeight={800} color="text.secondary" sx={{ mb: 2, display: 'block' }}>
              All Available Nodes ({connections.length})
            </Typography>
            <Paper elevation={0} sx={{ borderRadius: 5, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
              <List sx={{ p: 0 }}>
                {connections.map((item, index) => {
                  const isActive = activeConnection?._id === item._id;
                  const statusColor = getStatusColor(item.serviceArea?.networkStatus);
                  
                  return (
                    <React.Fragment key={item._id}>
                      <ListItem
                        sx={{
                          p: 3,
                          transition: '0.2s',
                          '&:hover': { bgcolor: '#f1f5f9' },
                          bgcolor: isActive ? alpha(theme.palette.success.main, 0.02) : 'transparent'
                        }}
                        secondaryAction={
                          !isActive && (
                            <Button
                              variant="outlined"
                              onClick={() => handleSelectConnection(item._id)}
                              sx={{ borderRadius: 3, fontWeight: 700, textTransform: 'none' }}
                            >
                              Switch
                            </Button>
                          )
                        }
                      >
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: isActive ? 'success.main' : 'primary.main', fontWeight: 'bold' }}>
                            {index + 1}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Stack direction="row" spacing={1} alignItems="center">
                              <Typography variant="subtitle1" fontWeight={800}>{item.aliasName || item.userName}</Typography>
                              {isActive && <Chip label="Primary" size="small" color="success" sx={{ height: 20, fontSize: '10px', fontWeight: 900 }} />}
                            </Stack>
                          }
                          secondary={
                            <Stack spacing={1} sx={{ mt: 1 }}>
                              <Stack direction="row" spacing={2}>
                                <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                  <LocationOnIcon sx={{ fontSize: 14 }} /> {item.serviceArea?.region}
                                </Typography>
                                <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                  <RouterIcon sx={{ fontSize: 14 }} /> {item.boxId}
                                </Typography>
                              </Stack>
                              <Stack direction="row" spacing={1} alignItems="center">
                                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: statusColor }} />
                                <Typography variant="caption" fontWeight={700} sx={{ color: statusColor }}>
                                  Network {item.serviceArea?.networkStatus}
                                </Typography>
                              </Stack>
                            </Stack>
                          }
                          secondaryTypographyProps={{ component: 'div' }}
                        />
                      </ListItem>
                      {index < connections.length - 1 && <Divider />}
                    </React.Fragment>
                  );
                })}
              </List>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Connection;