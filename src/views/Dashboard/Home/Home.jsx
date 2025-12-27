import React, { useState, useMemo, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Avatar,
  IconButton,
  Grid,
  Paper,
  Button,
  Modal,
  Divider,
  Stack,
  Card,
  CardContent,
  Chip,
  Tooltip,
  alpha,
  useTheme,
  LinearProgress,
  List,
  ListItem,
  ListItemText
} from '@mui/material';

// Icons
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import WifiIcon from '@mui/icons-material/Wifi';
import BarChartIcon from '@mui/icons-material/BarChart';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import PaymentIcon from '@mui/icons-material/Payment';
import PersonIcon from '@mui/icons-material/Person';
import RouterIcon from '@mui/icons-material/Router';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import InfoIcon from '@mui/icons-material/Info';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SecurityIcon from '@mui/icons-material/Security';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import StarIcon from '@mui/icons-material/Star';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveConnection } from '../../../redux/features/Connection/ConnectionSlice';
import { DashboardPlanCard } from './DashboardPlanCard';
// import { CurrentPlanCard } from '../../../views/Plans/PlanComponents';

const dashboardData = {
  user: {
    name: 'John Doe',
    subscriptionPlan: 'Premium 300 Mbps',
    activeConnectionsCount: 2,
    referralPoints: 49.99,
    referralEarnings: 49.99,
    outstandingBalance: 15.75,
    activeComplaints: 1,
    lastPaymentDate: '7/10/2025',
    dataUsedGB: 185,
    dataLimitGB: 300,
    loyaltyTier: 'Silver Ambassador'
  },

  activeConnection: {
    userName: 'customer14',
    boxId: 'BOX-7782-IND',
    aliasName: 'Main Fiber - Living Room',
    serviceArea: {
      networkStatus: 'Moderate', // Try 'Good' or 'Moderate'
      region: 'North Sector',
      description: 'Line quality is currently under maintenance in your area.'
    }
  },
  planDetails: {
    name: 'Premium plan',
    price: '₹999',
    validity: '30 Days',
    expiry: 'Oct 24, 2025',
    speed: '300 Mbps',
    dataLeft: '115 GB'
  }
};

// --- Dummy Sub-component for Current Plan ---
const CurrentPlanCard = ({ plan }) => {
  const theme = useTheme();

  return (
    <Card
      elevation={0}
      sx={{ borderRadius: 4, height: '100%', border: `1px solid ${alpha(theme.palette.divider, 0.1)}`, background: '#fff' }}
    >
      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Box>
            <Chip
              label="CURRENT PLAN"
              size="small"
              sx={{ fontWeight: 900, bgcolor: 'primary.main', color: 'white', mb: 1, height: 20, fontSize: 10 }}
            />
            <Typography variant="h5" fontWeight={800} color="primary.main">
              {plan.price}
            </Typography>
            <Typography variant="h6" fontWeight={600} color="primary.main">
              {plan.name}
            </Typography>
          </Box>
          <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: 'primary.main', width: 48, height: 48 }}>
            <BarChartIcon />
          </Avatar>
        </Stack>
        <Grid container spacing={2}>
          <Grid size={{ xs: 6 }}>
            <Typography variant="caption" color="text.secondary" fontWeight={700}>
              SPEED
            </Typography>
            <Typography variant="body2" fontWeight={700}>
              {plan.speed}
            </Typography>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Typography variant="caption" color="text.secondary" fontWeight={700}>
              VALIDITY
            </Typography>
            <Typography variant="body2" fontWeight={700}>
              {plan.validity}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.02) }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <DateRangeIcon fontSize="small" color="primary" />
                <Typography variant="caption" fontWeight={700}>
                  Expires on: {plan.expiry}
                </Typography>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const Home = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { user, planDetails } = dashboardData;

  const {
    connections,
    connection: activeConnection,
    isConnectionLoading,
    isConnectionError,
    message
  } = useSelector((state) => state.connection);

  useEffect(() => {
    dispatch(getActiveConnection());
  }, [dispatch]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'good':
        return theme.palette.success.main;
      case 'moderate':
        return theme.palette.warning.main;
      case 'slow':
        return theme.palette.error.main;
      default:
        return theme.palette.grey[500];
    }
  };

  const statusColor = getStatusColor(activeConnection?.serviceArea?.networkStatus);

  const kpiCards = [
    { icon: <WifiIcon />, label: 'Connections', value: user.activeConnectionsCount, color: '#3f51b5' },
    { icon: <MonetizationOnIcon />, label: 'Referral Pts', value: `₹${user.referralPoints}`, color: '#ffb300' },
    { icon: <AccountBalanceWalletIcon />, label: 'Balance', value: `₹${user.outstandingBalance}`, color: '#00bcd4' },
    { icon: <ReportProblemIcon />, label: 'Open Tickets', value: user.activeComplaints, color: '#f44336' }
    // { icon: <NotificationsActiveIcon />, label: 'Notifications', value: 3, color: '#f44336' },
    // { icon: <BarChartIcon />, label: 'Current Plan', value: user.subscriptionPlan, color: '#4caf50' },
    // { icon: <MonetizationOnIcon />, label: 'Total Earnings', value: `₹${user.referralEarnings}`, color: '#ffb300' },
    // { icon: <PaymentIcon />, label: 'Last Paid', value: user.lastPaymentDate, color: '#009688' }
  ];

  const ActiveConnectionCard = useMemo(() => {
    if (!activeConnection) return null;
    return (
      <Card
        elevation={0}
        sx={{
          borderRadius: 4,
          height: '100%',
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          background: `linear-gradient(145deg, #ffffff 0%, ${alpha(statusColor, 0.02)} 100%)`,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box sx={{ position: 'absolute', top: 0, left: 0, width: '6px', height: '100%', bgcolor: statusColor }} />
        <CardContent sx={{ p: 3 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
            <Box>
              <Chip
                label="ACTIVE SOURCE"
                size="small"
                sx={{ fontWeight: 900, bgcolor: statusColor, color: 'white', mb: 1, height: 20, fontSize: 10 }}
              />
              <Typography variant="h5" fontWeight={800}>
                {activeConnection.aliasName}
              </Typography>
            </Box>
            <Avatar sx={{ bgcolor: statusColor, width: 48, height: 48, boxShadow: `0 4px 12px ${alpha(statusColor, 0.3)}` }}>
              <WifiIcon />
            </Avatar>
          </Stack>
          <Grid container spacing={2}>
            <Grid size={{ xs: 6 }}>
              <Typography variant="caption" color="text.secondary" fontWeight={700}>
                USER / ID
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <PersonIcon fontSize="small" color="disabled" />
                <Typography variant="body2" fontWeight={600} noWrap>
                  {activeConnection.userName}
                </Typography>
              </Stack>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Typography variant="caption" color="text.secondary" fontWeight={700}>
                BOX ID
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <RouterIcon fontSize="small" color="disabled" />
                <Typography variant="body2" fontWeight={600} noWrap>
                  {activeConnection.boxId}
                </Typography>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Paper
                variant="outlined"
                sx={{ p: 1.5, borderRadius: 2, bgcolor: alpha(statusColor, 0.05), borderColor: alpha(statusColor, 0.2) }}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <SignalCellularAltIcon sx={{ color: statusColor, fontSize: 20 }} />
                    <Box>
                      <Typography variant="caption" fontWeight={800} sx={{ display: 'block', lineHeight: 1 }}>
                        {activeConnection.serviceArea.networkStatus} Connection
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {activeConnection.serviceArea.region}
                      </Typography>
                    </Box>
                  </Stack>
                  <Tooltip title={activeConnection.serviceArea.description}>
                    <IconButton size="small">
                      <InfoIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }, [activeConnection, statusColor]);

  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', pb: 8 }}>
      <Container maxWidth="lg" sx={{ pt: 4 }}>
        {/* HEADER */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
          <Box>
            <Typography variant="h5" color="text.secondary">
              Welcome back, <i>{user.name}</i>
            </Typography>
          </Box>
          <Avatar sx={{ width: 52, height: 52, bgcolor: 'primary.main', border: '4px solid white', boxShadow: theme.shadows[2] }}>
            JD
          </Avatar>
        </Stack>

        {/* TOP SECTION: ACTIVE STATUS & PLAN */}
        <Grid container spacing={3} mb={6}>
          <Grid size={{ xs: 12, md: 6 }}>{ActiveConnectionCard}</Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            {/* <CurrentPlanCard plan={planDetails} /> */}
            <DashboardPlanCard />
            {/* <CurrentPlanCard /> */}
          </Grid>
        </Grid>

        {/* ACCOUNT SUMMARY */}
        <Typography variant="overline" fontWeight={800} color="text.secondary" sx={{ mb: 2, display: 'block', letterSpacing: 1.5 }}>
          Account Summary
        </Typography>
        <Grid container spacing={2} mb={6}>
          {kpiCards.map((card, i) => (
            <Grid key={i} size={{ xs: 12, sm: 6, md: 3 }}>
              <Paper
                elevation={3}
                sx={{
                  p: 2.5,
                  borderRadius: 3,
                  border: '1px solid #eef0f2',
                  display: 'flex',
                  alignItems: 'center',
                  bgcolor: '#fff',
                  transition: '0.2s',
                  '&:hover': { boxShadow: theme.shadows[4], borderColor: card.color }
                }}
              >
                <Avatar sx={{ bgcolor: alpha(card.color, 0.1), color: card.color, mr: 2 }}>{card.icon}</Avatar>
                <Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: 'block', fontWeight: 700, textTransform: 'uppercase', fontSize: 10 }}
                  >
                    {card.label}
                  </Typography>
                  <Typography variant="h6" fontWeight={800} sx={{ lineHeight: 1 }}>
                    {card.value}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* SECONDARY CARDS */}
        {/* <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 3, borderRadius: 4, height: '100%' }}>
              <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                <VpnKeyIcon color="primary" />
                <Typography variant="h6" fontWeight={800}>
                  WiFi Settings
                </Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary" mb={3}>
                Update your SSID or Password instantly without router access.
              </Typography>
              <Button fullWidth variant="contained" disableElevation sx={{ borderRadius: 2, py: 1 }}>
                Manage Router
              </Button>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 4,
                bgcolor: alpha(theme.palette.warning.main, 0.03),
                border: `1px solid ${alpha(theme.palette.warning.main, 0.1)}`,
                height: '100%'
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                <StarIcon sx={{ color: '#ffb300' }} />
                <Typography variant="h6" fontWeight={800}>
                  {user.loyaltyTier}
                </Typography>
              </Stack>
              <Typography variant="body2" mb={2}>
                Complete <b>3 more referrals</b> to unlock a free month of high-speed data!
              </Typography>
              <LinearProgress variant="determinate" value={60} color="warning" sx={{ height: 8, borderRadius: 4 }} />
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 3, borderRadius: 4, height: '100%' }}>
              <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                <SecurityIcon color="error" />
                <Typography variant="h6" fontWeight={800}>
                  Family Safety
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" fontWeight={600}>
                  Safe Browsing
                </Typography>
                <Chip label="ACTIVE" size="small" color="success" sx={{ fontWeight: 800 }} />
              </Stack>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Paper sx={{ p: 3, borderRadius: 4 }}>
              <Stack direction="row" spacing={2} alignItems="center" mb={3}>
                <ReceiptLongIcon color="action" />
                <Typography variant="h6" fontWeight={800}>
                  Billing Statements
                </Typography>
              </Stack>
              <List disablePadding>
                {['October 2025', 'September 2025'].map((month, idx) => (
                  <ListItem key={idx} divider={idx === 0} sx={{ px: 0, py: 2 }}>
                    <ListItemText
                      primary={`Invoice for ${month}`}
                      secondary="Status: Paid via NetBanking"
                      primaryTypographyProps={{ fontWeight: 700 }}
                    />
                    <Button variant="outlined" size="small" sx={{ borderRadius: 2 }}>
                      Download PDF
                    </Button>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid> */}

        {/* Recent Invoices */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3, borderRadius: 4 }}>
            <Stack direction="row" spacing={2} alignItems="center" mb={2}>
              <ReceiptLongIcon />
              <Typography variant="h6" fontWeight={800}>
                Recent Billing Statements
              </Typography>
            </Stack>
            <List disablePadding>
              {['Oct 2025', 'Sept 2025', 'Aug 2025'].map((month, idx) => (
                <ListItem key={idx} divider={idx !== 2} sx={{ px: 0 }}>
                  <ListItemText primary={`Invoice for ${month}`} secondary="Paid via UPI" />
                  <Button size="small">Download PDF</Button>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* FLOATING ACTION */}
        <Box sx={{ position: 'fixed', bottom: 32, right: 32 }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<HelpOutlineIcon />}
            sx={{ borderRadius: 10, px: 4, py: 1.5, boxShadow: theme.shadows[10], textTransform: 'none', fontWeight: 700 }}
          >
            Live Support
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
