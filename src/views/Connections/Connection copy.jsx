import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Paper,
  Stack,
  Chip,
  Grid
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import WifiIcon from '@mui/icons-material/Wifi';
import LanIcon from '@mui/icons-material/Lan';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SettingsInputAntennaIcon from '@mui/icons-material/SettingsInputAntenna';
import SpeedIcon from '@mui/icons-material/Speed';
import DnsIcon from '@mui/icons-material/Dns';
import { useSelector } from 'react-redux';

const connectionsData = [
  { id: 1, name: 'Main-Office-WiFi', type: 'Wi-Fi', status: 'Active', speed: '100 Mbps', ip: '192.168.1.1', activated: '2025-01-01' },
  { id: 2, name: 'Backup-WiFi-Guest', type: 'Wi-Fi', status: 'Inactive', speed: '50 Mbps', ip: '192.168.1.2', activated: '2025-02-01' },
  { id: 3, name: 'Ethernet-Server', type: 'Ethernet', status: 'Inactive', speed: '500 Mbps', ip: '192.168.1.3', activated: '2025-03-01' }
];

const Connection = () => {
  const theme = useTheme();
  const [primaryConnection, setPrimaryConnection] = useState(connectionsData[0]);

  const handleSetPrimary = (connection) => {
    setPrimaryConnection(connection);
  };

  const { connections, connection, isConnectionLoading, isConnectionError, message } = useSelector((state) => state.connection);

  const { customer } = useSelector((state) => state.customer);

  console.log("connections", connections)
  console.log("customer", customer)

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return theme.palette.success.main;
      case 'Inactive':
        return theme.palette.error.main;
      default:
        return theme.palette.grey[500];
    }
  };

  const getIconForType = (type) => {
    return type === 'Wi-Fi' ? <WifiIcon /> : <LanIcon />;
  };

  const ConnectionDetails = ({ connection }) => (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      <Grid item xs={12} sm={6}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <SpeedIcon color="primary" fontSize="small" />
          <Typography variant="body2" color="text.secondary" fontWeight={500}>
            **Speed:** {connection.speed}
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <DnsIcon color="primary" fontSize="small" />
          <Typography variant="body2" color="text.secondary" fontWeight={500}>
            **IP Address:** {connection.ip}
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <SettingsInputAntennaIcon color="primary" fontSize="small" />
          <Typography variant="body2" color="text.secondary" fontWeight={500}>
            **Activated On:** {new Date(connection.activated).toLocaleDateString()}
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );

  return (
    <Box sx={{ p: { xs: 2, md: 6 }, maxWidth: '1100px', mx: 'auto', minHeight: '100vh' }}>
      <Typography variant="h4" component="h1" align="center" fontWeight={700} gutterBottom>
        Network Connections
      </Typography>
      <Typography variant="subtitle1" align="center" color="text.secondary" mb={5}>
        Manage your network connections and set a primary source for your services.
      </Typography>

      <Grid container spacing={4}>
        {/* Primary Connection Card */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Card
            variant="outlined"
            sx={{
              height: '100%',
              p: 3,
              borderRadius: 3,
              bgcolor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[100],
              border: `2px solid ${theme.palette.success.main}`,
              boxShadow: theme.shadows[8],
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.02)'
              }
            }}
          >
            <CardContent sx={{ p: 0 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5" fontWeight={600} color="text.primary">
                  Active Connection
                </Typography>
                <Chip icon={<CheckCircleOutlineIcon />} label="Primary" color="success" variant="filled" sx={{ fontWeight: 'bold' }} />
              </Box>

              <Divider sx={{ my: 2 }} />

              <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                <Avatar sx={{ bgcolor: theme.palette.success.main, width: 56, height: 56 }}>
                  {getIconForType(primaryConnection.type)}
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight={600} color="text.primary">
                    {primaryConnection.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {primaryConnection.type} |{' '}
                    <span style={{ color: getStatusColor(primaryConnection.status), fontWeight: 600 }}>{primaryConnection.status}</span>
                  </Typography>
                </Box>
              </Stack>

              <ConnectionDetails connection={primaryConnection} />
            </CardContent>
          </Card>
        </Grid>

        {/* Available Connections List */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Paper
            variant="outlined"
            sx={{
              height: '100%',
              p: 3,
              borderRadius: 3,
              bgcolor: theme.palette.background.paper,
              boxShadow: theme.shadows[3]
            }}
          >
            <Typography variant="h5" fontWeight={600} gutterBottom>
              Available Connections
            </Typography>
            <List sx={{ pt: 1, maxHeight: { xs: 'auto', md: 500 }, overflowY: 'auto' }}>
              {connectionsData.map((connection) => (
                <ListItem
                  key={connection.id}
                  secondaryAction={
                    connection.id !== primaryConnection.id && (
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleSetPrimary(connection)}
                        sx={{ borderRadius: '20px', textTransform: 'none', px: 3 }}
                      >
                        Set as Primary
                      </Button>
                    )
                  }
                  sx={{
                    mb: 2,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: connection.id === primaryConnection.id ? theme.palette.action.selected : theme.palette.background.default,
                    border: `1px solid ${connection.id === primaryConnection.id ? theme.palette.success.main : theme.palette.divider}`,
                    '&:hover': {
                      bgcolor: 'action.hover',
                      transform: 'translateY(-2px)',
                      boxShadow: theme.shadows[2]
                    },
                    transition: 'all 0.3s ease-in-out'
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        bgcolor: getStatusColor(connection.status),
                        color: 'white'
                      }}
                    >
                      {getIconForType(connection.type)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="body1" fontWeight={connection.id === primaryConnection.id ? 600 : 500}>
                        {connection.name}
                      </Typography>
                    }
                    secondary={
                      <Chip
                        label={connection.status}
                        size="small"
                        sx={{
                          mt: 0.5,
                          color: 'white',
                          bgcolor: getStatusColor(connection.status),
                          fontWeight: 'bold'
                        }}
                      />
                    }
                    sx={{ ml: 2 }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Connection;
