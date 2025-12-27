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
  TextField,
  ListItemText,
  InputAdornment,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress
} from '@mui/material';

import {
  ReceiptLong,
  Download,
  AccountBalanceWallet,
  EventNote,
  HistoryEdu,
  ErrorOutline,
  CheckCircleOutline,
  Search,
  FilterList,
  ArrowForwardIos
} from '@mui/icons-material';
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
import { fetchPayments, selectPayments, selectStatus } from '../../../redux/features/Payments/PaymentSlice';

import { DashboardPlanCard } from './DashboardPlanCard';

const dashboardData = {
  user: {
    activeConnectionsCount: 2,
    referralPoints: 1200,
    referralEarnings: 49.99,
    outstandingBalance: 15.75,
    activeComplaints: 1,
    lastPaymentDate: '7/10/2025',
    loyaltyTier: 'Silver Ambassador'
  }
};

const DashboardDefault = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState('');

  const payments = useSelector(selectPayments);
  const status = useSelector(selectStatus);
  const { user, planDetails } = dashboardData;

  useEffect(() => {
    dispatch(fetchPayments());
  }, [dispatch]);

  const getStatusConfig = (status) => {
    const configs = {
      Success: { color: '#10b981', bg: '#ecfdf5', icon: <CheckCircleOutline sx={{ fontSize: 14 }} /> },
      Failed: { color: '#ef4444', bg: '#fef2f2', icon: <ErrorOutline sx={{ fontSize: 14 }} /> },
      Pending: { color: '#f59e0b', bg: '#fffbeb', icon: <HistoryEdu sx={{ fontSize: 14 }} /> }
    };
    return configs[status] || { color: '#6b7280', bg: '#f3f4f6' };
  };

  const {
    connections,
    connection: activeConnection,
    isConnectionLoading,
    isConnectionError,
    message
  } = useSelector((state) => state.connection);
  const { customer } = useSelector((state) => state.customer);

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
    { icon: <MonetizationOnIcon />, label: 'Referral Pts', value: user.referralPoints, color: '#ffb300' },
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
              Welcome back, <i>{customer?.firstName}</i>
            </Typography>
          </Box>
          {/* <Avatar sx={{ width: 52, height: 52, bgcolor: 'primary.main', border: '4px solid white', boxShadow: theme.shadows[2] }}>
            JD
          </Avatar> */}
        </Stack>

        {/* TOP SECTION: ACTIVE STATUS & PLAN */}
        <Grid container spacing={3} mb={6}>
          <Grid size={{ xs: 12, md: 6 }}>{ActiveConnectionCard}</Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <DashboardPlanCard />
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

        

        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems={{ md: 'center' }}
          sx={{ mb: 3 }}
          spacing={2}
        >
          <Stack direction="row" spacing={2} alignItems="center" mb={2}>
            <ReceiptLongIcon />
            <Typography variant="h6" fontWeight={800}>
              Recent Billing
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2}>
            <TextField
              size="small"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ fontSize: 18 }} />
                  </InputAdornment>
                ),
                sx: { borderRadius: 2.5, bgcolor: '#fff', fontSize: '0.875rem' }
              }}
            />
            <IconButton sx={{ border: '1px solid #e5e7eb', borderRadius: 2.5, bgcolor: '#fff' }}>
              <FilterList fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>

        {/* 3. The Table */}
        {status === 'loading' ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <CircularProgress thickness={5} size={40} sx={{ color: '#111827' }} />
          </Box>
        ) : (
          <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 5, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
            <Table>
              <TableHead sx={{ bgcolor: '#f9fafb' }}>
                <TableRow>
                  <TableCell sx={{ color: '#4b5563', fontWeight: 700, py: 2.5 }}>TRANSACTION ID</TableCell>
                  <TableCell sx={{ color: '#4b5563', fontWeight: 700 }}>DATE</TableCell>
                  <TableCell sx={{ color: '#4b5563', fontWeight: 700 }}>METHOD</TableCell>
                  <TableCell sx={{ color: '#4b5563', fontWeight: 700 }}>AMOUNT</TableCell>
                  <TableCell sx={{ color: '#4b5563', fontWeight: 700 }}>STATUS</TableCell>
                  <TableCell align="right" sx={{ color: '#4b5563', fontWeight: 700, pr: 3 }}>
                    INVOICE
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ bgcolor: '#fff' }}>
                {payments.map(({ id, date, amount, method, transactionId, status }) => {
                  const config = getStatusConfig(status);
                  return (
                    <TableRow key={id} hover sx={{ '&:hover': { bgcolor: '#fcfcfc' } }}>
                      <TableCell sx={{ fontWeight: 700, color: '#111827' }}>{transactionId}</TableCell>
                      <TableCell sx={{ color: '#6b7280', fontSize: '0.85rem' }}>
                        {new Date(date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#e5e7eb' }} />
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {method}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell sx={{ fontWeight: 900, color: '#111827' }}>₹{amount.toLocaleString('en-IN')}</TableCell>
                      <TableCell>
                        <Chip
                          icon={config.icon}
                          label={status}
                          sx={{
                            height: 24,
                            fontWeight: 700,
                            fontSize: '0.7rem',
                            color: config.color,
                            bgcolor: config.bg,
                            borderRadius: 1.5,
                            '& .MuiChip-icon': { color: 'inherit' }
                          }}
                        />
                      </TableCell>
                      <TableCell align="right" sx={{ pr: 3 }}>
                        <Tooltip title="Download Invoice">
                          <IconButton size="small" sx={{ color: '#6b7280', '&:hover': { color: '#111827', bgcolor: '#f3f4f6' } }}>
                            <Download fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}

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

export default DashboardDefault;
