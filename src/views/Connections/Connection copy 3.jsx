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
  ListItemAvatar
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import WifiIcon from '@mui/icons-material/Wifi';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SettingsInputAntennaIcon from '@mui/icons-material/SettingsInputAntenna';
import SpeedIcon from '@mui/icons-material/Speed';
import DnsIcon from '@mui/icons-material/Dns';

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

  /** * Fetch Active Connection and All Connections on mount.
   */
  useEffect(() => {
    dispatch(getActiveConnection());
    dispatch(getConnectionsForUser());
  }, [dispatch]);

  /** Helper to determine the connection name and location */
  const getConnectionDisplayInfo = (item) => {
    const location = item.serviceArea?.description || item.serviceArea?.region || 'Location not specified';
    const connectionName = item.userName || item.aliasName || 'Unnamed Connection';
    return { location, connectionName };
  };

  /** Handle Switching Connection - FIX APPLIED HERE */
  const handleSelectConnection = (connectionId) => {
    const selected = connections.find((c) => c._id === connectionId);

    if (!selected) {
      console.warn('Selected connection not found in list.');
      return;
    }

    dispatch(switchConnection({ connectionId }))
      .unwrap()
      .then(() => {
        // --- FIX: RE-SYNC STATE AFTER SUCCESSFUL SWITCH ---
        dispatch(getActiveConnection());
        dispatch(getConnectionsForUser());
        // --------------------------------------------------

        callback?.(getConnectionDisplayInfo(selected).connectionName);
      })
      .catch((err) => console.error('Error switching:', err));
  };

  /** Helper to get placeholder connection details (Adjust based on your real API data) */
  const getPlaceholderDetails = (item) => ({
    // Use actual properties if available, otherwise placeholders
    type: item.type || 'Wi-Fi',
    speed: item.speed || '100 Mbps',
    ip: item.ip || '192.168.x.x',
    activated: item.activated || new Date().toISOString(),
    status: activeConnection?._id === item._id ? 'Active' : 'Inactive'
  });

  /** Connection Detail Row Component */
  const ConnectionDetailRow = ({ icon, label, value }) => (
    <Stack direction="row" alignItems="center" spacing={1}>
      {icon}
      <Typography variant="body2" color="text.secondary" fontWeight={500}>
        **{label}:** {value}
      </Typography>
    </Stack>
  );

  /** Active Connection Card Component (Memoized for performance) */
  const ActiveConnectionCard = useMemo(() => {
    if (!activeConnection) return null;

    const { location, connectionName } = getConnectionDisplayInfo(activeConnection);
    const details = getPlaceholderDetails(activeConnection);

    return (
      <Card
        variant="outlined"
        sx={{
          height: '100%',
          p: 3,
          borderRadius: 3,
          bgcolor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[100],
          border: `2px solid ${theme.palette.success.main}`,
          boxShadow: theme.shadows[8]
        }}
      >
        <CardContent sx={{ p: 0 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h5" fontWeight={600} color="text.primary">
              Active Connection
            </Typography>
            <Chip icon={<CheckCircleIcon />} label="Primary" color="success" variant="filled" sx={{ fontWeight: 'bold' }} />
          </Box>

          <Divider sx={{ my: 2 }} />

          <Stack direction="row" alignItems="center" spacing={2} mb={2}>
            <Avatar sx={{ bgcolor: theme.palette.success.main, width: 56, height: 56 }}>
              <WifiIcon />
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight={600} color="text.primary">
                {connectionName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {location}
              </Typography>
            </Box>
          </Stack>

          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <ConnectionDetailRow icon={<SpeedIcon color="primary" fontSize="small" />} label="Speed" value={details.speed} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <ConnectionDetailRow icon={<DnsIcon color="primary" fontSize="small" />} label="IP Address" value={details.ip} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <ConnectionDetailRow
                icon={<SettingsInputAntennaIcon color="primary" fontSize="small" />}
                label="Activated On"
                value={new Date(details.activated).toLocaleDateString()}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Chip label={details.status} size="small" color="success" sx={{ fontWeight: 'bold' }} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }, [activeConnection, theme]);

  /** Render Each Connection for the List */
  const renderItem = (item) => {
    const { location, connectionName } = getConnectionDisplayInfo(item);
    const details = getPlaceholderDetails(item);
    const isActive = activeConnection?._id === item._id;

    return (
      <ListItem
        key={item._id}
        secondaryAction={
          !isActive &&
          connections.length > 1 && (
            <Button
              variant="contained"
              size="small"
              color="secondary"
              onClick={() => handleSelectConnection(item._id)}
              sx={{ borderRadius: '20px', textTransform: 'none', px: 3 }}
            >
              Select
            </Button>
          )
        }
        sx={{
          mb: 2,
          p: 2,
          borderRadius: 2,
          bgcolor: isActive ? theme.palette.action.selected : theme.palette.background.default,
          border: `1px solid ${isActive ? theme.palette.success.main : theme.palette.divider}`,
          transition: 'all 0.3s ease-in-out'
        }}
      >
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: isActive ? theme.palette.success.main : theme.palette.primary.main, color: 'white' }}>
            <WifiIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography variant="body1" fontWeight={isActive ? 600 : 500}>
              {connectionName}
            </Typography>
          }
          secondary={
            <Stack direction="column" spacing={0.5}>
              <Typography variant="caption" color="text.secondary">
                {location}
              </Typography>
              <Chip
                label={details.status}
                size="small"
                color={isActive ? 'success' : 'default'}
                sx={{ mt: 0.5, fontWeight: 'bold', width: 'fit-content' }}
              />
            </Stack>
          }
          sx={{ ml: 2 }}
          // Prevents hydration error: <div> inside <p>
          secondaryTypographyProps={{ component: 'div' }}
        />
      </ListItem>
    );
  };

  // --- Render Logic ---
  if (isConnectionLoading) {
    return (
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ ml: 2 }}>
          Loading connections...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: '1200px', mx: 'auto' }}>
      {/* Header */}
      <Stack direction="row" alignItems="center" spacing={2} mb={3}>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" fontWeight={700}>
          Manage Connections 🌐
        </Typography>
      </Stack>

      <Divider sx={{ mb: 4 }} />

      {/* Error / Info Alerts */}
      {isConnectionError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {message || 'Something went wrong while fetching connections.'}
        </Alert>
      )}

      {connections.length === 0 && !isConnectionError && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          No connections found for your account.
        </Alert>
      )}

      {/* Main Content: Two-Column Layout */}
      {connections.length > 0 && (
        <Grid container spacing={4}>
          {/* Left Column: Active Connection Card */}
          <Grid size={{ xs: 12, md: 5 }}>{ActiveConnectionCard}</Grid>

          {/* Right Column: Available Connections List */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Paper
              variant="outlined"
              sx={{
                height: '100%',
                p: 3,
                borderRadius: 3,
                bgcolor: theme.palette.background.paper,
                boxShadow: theme.shadows[3],
                minHeight: { xs: 'auto', md: '400px' }
              }}
            >
              <Typography variant="h5" fontWeight={600} gutterBottom>
                Available Connections ({connections.length})
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                Select a connection to make it your primary active source.
              </Typography>

              <Divider sx={{ mb: 2 }} />

              <List sx={{ pt: 1, maxHeight: { xs: 'auto', md: 500 }, overflowY: 'auto' }}>
                {connections.map((item) => renderItem(item))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Connection;
