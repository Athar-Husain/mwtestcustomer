import React from 'react';
import { Box, Typography, Chip, Avatar, Stack, Divider, Paper, Grid, Tooltip, IconButton, useTheme, alpha } from '@mui/material';
import {
  Router as RouterIcon,
  SettingsInputComponent as STBIcon,
  Badge as IDIcon,
  CellTower as ConnectionIcon,
  ContentCopy as CopyIcon,
  CallRounded as CallIcon,
  CallMade,
  LocationOnRounded as MapIcon
} from '@mui/icons-material';
import { toast } from 'react-toastify';

const PropRow = ({ icon: Icon, label, value }) => (
  <Box sx={{ mb: 2 }}>
    <Typography
      variant="caption"
      sx={{
        color: 'text.secondary',
        fontWeight: 700,
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
        mb: 0.5,
        textTransform: 'uppercase',
        letterSpacing: 0.5
      }}
    >
      <Icon sx={{ fontSize: 14 }} /> {label}
    </Typography>
    <Typography variant="body2" sx={{ fontWeight: 700, color: '#1E293B' }}>
      {value || 'N/A'}
    </Typography>
  </Box>
);

const TicketInfoPanel = ({ ticket, isClosedOrResolved }) => {
  const theme = useTheme();
  const conn = ticket?.connection || {};

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied', { autoClose: 500 });
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* CUSTOMER CARD */}
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
        <Avatar
          sx={{
            width: 48,
            height: 48,
            bgcolor: alpha(theme.palette.primary.main, 0.1),
            color: theme.palette.primary.main,
            fontWeight: 800
          }}
        >
          {ticket?.customer?.firstName?.[0]}
        </Avatar>
        <Box>
          <Typography variant="subtitle1" fontWeight={800}>
            {ticket?.customer?.firstName} {ticket?.customer?.lastName}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {ticket?.customer?.phone}
          </Typography>
        </Box>
      </Stack>

      <Divider sx={{ mb: 3, borderStyle: 'dashed' }} />

      {/* CONNECTION DETAILS GRID */}
      <Typography variant="caption" sx={{ fontWeight: 900, color: theme.palette.primary.main, display: 'block', mb: 2 }}>
        TECHNICAL SPECIFICATIONS
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 6 }}>
          <PropRow icon={IDIcon} label="User ID" value={conn?.userId} />
        </Grid>
        <Grid size={{ xs: 6 }}>
          <PropRow icon={RouterIcon} label="Box ID" value={conn?.boxId} />
        </Grid>
        <Grid size={{ xs: 6 }}>
          <PropRow icon={STBIcon} label="STB No" value={conn?.stbNumber} />
        </Grid>
        <Grid size={{ xs: 6 }}>
          <PropRow icon={ConnectionIcon} label="Area" value={conn?.serviceArea?.region} />
        </Grid>
        <Grid size={{ xs: 6 }}>
          <PropRow icon={CallMade} label="Contact" value={conn?.contactNo} />
        </Grid>
      </Grid>

      <Paper sx={{ p: 1.5, mb: 2 }}>
        <Typography variant="caption" fontWeight={800}>
          ISSUE DESCRIPTION
        </Typography>
        <Typography variant="body2">{ticket?.description}</Typography>
      </Paper>

      <Divider sx={{ my: 3, borderStyle: 'dashed' }} />

      {/* ASSIGNEE SECTION */}
      <Paper elevation={0} sx={{ p: 2, bgcolor: '#F8FAFC', borderRadius: 3, border: '1px solid #E2E8F0' }}>
        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, display: 'block', mb: 1 }}>
          ASSIGNED AGENT
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <Avatar sx={{ width: 24, height: 24, fontSize: '0.7rem' }}>{ticket?.assignedTo?.firstName?.[0]}</Avatar>
          <Typography variant="body2" fontWeight={700}>
            {ticket?.assignedTo?.firstName ? `${ticket.assignedTo.firstName} ${ticket.assignedTo.lastName}` : 'Unassigned'}
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
};

export default TicketInfoPanel;
