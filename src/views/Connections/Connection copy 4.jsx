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
  Grid, // Updated to Grid2 for compatibility
  Chip,
  Avatar,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import WifiIcon from '@mui/icons-material/Wifi';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RouterIcon from '@mui/icons-material/Router';
import SpeedIcon from '@mui/icons-material/Speed';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

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

  /** Helper to determine display info from API */
  const getConnectionDisplayInfo = (item) => {
    const location = item.serviceArea?.region || 'General Area';
    const connectionName = item.aliasName || item.userName || `ID: ${item.boxId}`;
    return { location, connectionName };
  };

  /** Map Real API Data to UI */
  const getConnectionDetails = (item) => ({
    type: item.connectionType || 'Fiber',
    speed: item.activePlan?.plan?.speed || 'Standard', // Adjust based on plan object nesting
    stb: item.stbNumber || 'N/A',
    activated: item.installedAt || new Date().toISOString(),
    status: item.connectionStatus === 'active' ? 'Active' : 'Inactive',
    isActive: activeConnection?._id === item._id
  });

  const handleSelectConnection = (connectionId) => {
    const selected = connections.find((c) => c._id === connectionId);
    if (!selected) return;

    dispatch(switchConnection({ connectionId }))
      .unwrap()
      .then(() => {
        dispatch(getActiveConnection());
        dispatch(getConnectionsForUser());
        callback?.(getConnectionDisplayInfo(selected).connectionName);
      })
      .catch((err) => console.error('Error switching:', err));
  };

  const ConnectionDetailRow = ({ icon, label, value }) => (
    <Stack direction="row" alignItems="center" spacing={1}>
      {icon}
      <Typography variant="body2" color="text.secondary" fontWeight={500}>
        <Box component="span" sx={{ color: 'text.primary', fontWeight: 700 }}>
          {label}:
        </Box>{' '}
        {value}
      </Typography>
    </Stack>
  );

  const ActiveConnectionCard = useMemo(() => {
    if (!activeConnection) return null;

    const { location, connectionName } = getConnectionDisplayInfo(activeConnection);
    const details = getConnectionDetails(activeConnection);

    return (
      <Card
        variant="outlined"
        sx={{
          height: '100%',
          p: 3,
          borderRadius: 5,
          bgcolor: theme.palette.mode === 'dark' ? '#1e293b' : '#ffffff',
          border: `2px solid ${theme.palette.success.main}`,
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
        }}
      >
        <CardContent sx={{ p: 0 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight={800}>
              Active Source
            </Typography>
            <Chip icon={<CheckCircleIcon />} label="Connected" color="success" sx={{ fontWeight: 800 }} />
          </Box>

          <Stack direction="row" alignItems="center" spacing={2} mb={3}>
            <Avatar sx={{ bgcolor: theme.palette.success.main, width: 50, height: 50 }}>
              <WifiIcon />
            </Avatar>
            <Box>
              <Typography variant="h5" fontWeight={700}>
                {connectionName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {location}
              </Typography>
            </Box>
          </Stack>

          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <ConnectionDetailRow icon={<SpeedIcon color="primary" />} label="Type" value={details.type} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <ConnectionDetailRow icon={<RouterIcon color="primary" />} label="Box ID" value={details.stb} />
            </Grid>
            <Grid size={{ xs: 12, sm: 12 }}>
              <ConnectionDetailRow
                icon={<EventAvailableIcon color="primary" />}
                label="Installed"
                value={new Date(details.activated).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }, [activeConnection, theme]);

  const renderItem = (item) => {
    const { location, connectionName } = getConnectionDisplayInfo(item);
    const details = getConnectionDetails(item);
    const isActive = details.isActive;

    return (
      <ListItem
        key={item._id}
        secondaryAction={
          !isActive && (
            <Button
              variant="contained"
              size="small"
              disableElevation
              onClick={() => handleSelectConnection(item._id)}
              sx={{ borderRadius: 2, textTransform: 'none', px: 3, bgcolor: '#1e3a8a' }}
            >
              Switch
            </Button>
          )
        }
        sx={{
          mb: 2,
          p: 2,
          borderRadius: 4,
          bgcolor: isActive ? 'rgba(34, 197, 94, 0.05)' : '#f8fafc',
          border: isActive ? `1px solid ${theme.palette.success.main}` : '1px solid #e2e8f0'
        }}
      >
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: isActive ? 'success.main' : 'primary.main' }}>
            <WifiIcon fontSize="small" />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography variant="subtitle1" fontWeight={700}>
              {connectionName}
            </Typography>
          }
          secondary={
            <Box component="div">
              <Typography variant="caption" display="block" color="text.secondary">
                {location} • {details.type}
              </Typography>
              {isActive && (
                <Chip label="Active Now" size="small" color="success" sx={{ height: 20, fontSize: '10px', mt: 0.5, fontWeight: 800 }} />
              )}
            </Box>
          }
        />
      </ListItem>
    );
  };

  if (isConnectionLoading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress thickness={5} />
        <Typography variant="body1" sx={{ mt: 2, fontWeight: 600 }}>
          Syncing Connections...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: '1200px', mx: 'auto' }}>
      <Stack direction="row" alignItems="center" spacing={2} mb={4}>
        <IconButton onClick={() => navigate(-1)} sx={{ border: '1px solid #e2e8f0' }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" fontWeight={800}>
          Manage Connections
        </Typography>
      </Stack>

      {isConnectionError && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 3 }}>
          {message}
        </Alert>
      )}

      {connections.length > 0 ? (
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 5 }}>{ActiveConnectionCard}</Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 5, border: '1px solid #e2e8f0' }}>
              <Typography variant="h6" fontWeight={800} gutterBottom>
                All Connections
              </Typography>
              <List sx={{ pt: 1 }}>{connections.map((item) => renderItem(item))}</List>
            </Paper>
          </Grid>
        </Grid>
      ) : (
        <Alert severity="info">No connections associated with this account.</Alert>
      )}
    </Box>
  );
};

export default Connection;
