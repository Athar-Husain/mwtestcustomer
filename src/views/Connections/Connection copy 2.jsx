import React, { useEffect } from 'react';
import { Box, Typography, IconButton, CircularProgress, Button, Card, CardContent, Stack, Divider, Alert } from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import WifiIcon from '@mui/icons-material/Wifi';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { useDispatch, useSelector } from 'react-redux';
import { getConnectionsForUser, getActiveConnection } from '../../redux/features/Connection/ConnectionSlice';
import { switchConnection } from '../../redux/features/Customers/CustomerSlice';

import { useNavigate, useLocation } from 'react-router-dom';

const Connection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const callback = location.state?.onConnectionSelected;

  const {
    connections,
    connection: activeConnection,
    isConnectionLoading,
    isConnectionError,
    message
  } = useSelector((state) => state.connection);

  const { customer } = useSelector((state) => state.customer);

  console.log('Active Connection:', activeConnection);
  console.log('Customer:', customer);

  /** Fetch Active Connection - Only Once */
  useEffect(() => {
    dispatch(getActiveConnection());
  }, [dispatch]);

  /** Fetch All Connections */
  useEffect(() => {
    dispatch(getConnectionsForUser());
  }, [dispatch]);

  /** Handle Switching Connection */
  const handleSelectConnection = (connectionId) => {
    const selected = connections.find((c) => c._id === connectionId);

    console.log('Selected connectionId:', connectionId);

    if (!selected) {
      console.warn('Selected connection not found in list.');
      return;
    }

    dispatch(switchConnection({ connectionId }))
      .unwrap()
      .then(() => {
        callback?.(selected.userName || selected.aliasName || 'Connection');
      })
      .catch((err) => console.error('Error switching:', err));
  };

  /** Render Each Connection */
  const renderItem = (item) => {
    const location = item.serviceArea?.description || item.serviceArea?.region || 'Location not specified';

    const connectionName = item.userName || item.aliasName || 'Unnamed Connection';

    const isActive = activeConnection?._id === item._id;

    return (
      <Card
        key={item._id}
        sx={{
          mb: 2,
          borderWidth: 2,
          borderColor: isActive ? 'success.main' : 'grey.300',
          borderStyle: 'solid',
          borderRadius: 2
        }}
      >
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            {/* Connection Info */}
            <Stack direction="row" spacing={2} alignItems="center">
              <WifiIcon sx={{ fontSize: 28 }} />
              <Box>
                <Typography variant="subtitle1" fontWeight={700}>
                  {connectionName}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {location}
                </Typography>
              </Box>
            </Stack>

            {/* Status / Action */}
            {isActive ? (
              <Stack direction="row" alignItems="center" spacing={1}>
                <CheckCircleIcon color="success" />
                <Typography color="success.main" fontWeight={600}>
                  Active
                </Typography>
              </Stack>
            ) : (
              connections.length > 1 && (
                <Button variant="contained" size="small" onClick={() => handleSelectConnection(item._id)}>
                  Select
                </Button>
              )
            )}
          </Stack>
        </CardContent>
      </Card>
    );
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Header */}
      <Stack direction="row" alignItems="center" spacing={2} mb={2}>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" fontWeight={700}>
          Manage Connections
        </Typography>
      </Stack>

      <Divider sx={{ mb: 2 }} />

      {/* Loading */}
      {isConnectionLoading && (
        <Stack justifyContent="center" alignItems="center" sx={{ mt: 4 }}>
          <CircularProgress />
        </Stack>
      )}

      {/* Error */}
      {!isConnectionLoading && isConnectionError && (
        <Alert severity="error" sx={{ mt: 3 }}>
          {message || 'Something went wrong'}
        </Alert>
      )}

      {/* No Connections */}
      {!isConnectionLoading && !isConnectionError && connections.length === 0 && (
        <Typography textAlign="center" sx={{ mt: 3 }}>
          No connections found.
        </Typography>
      )}

      {/* Only One Connection */}
      {!isConnectionLoading && connections.length === 1 && (
        <Alert severity="info" sx={{ mt: 2 }}>
          You only have one connection. No need to switch!
        </Alert>
      )}

      {/* Connections List */}
      {!isConnectionLoading && connections.length > 0 && <Box sx={{ mt: 2 }}>{connections.map((item) => renderItem(item))}</Box>}
    </Box>
  );
};

export default Connection;
