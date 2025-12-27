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
  Divider,
  Stack,
  Card,
  CardContent,
  Chip,
  Tooltip,
  alpha,
  useTheme,
  TextField,
  InputAdornment,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Skeleton
} from '@mui/material';

import {
  ReceiptLong as ReceiptLongIcon,
  Download,
  CheckCircleOutline,
  ErrorOutline,
  HistoryEdu,
  Search,
  FilterList,
  Wifi as WifiIcon,
  MonetizationOn as MonetizationOnIcon,
  AccountBalanceWallet as AccountBalanceWalletIcon,
  ReportProblem as ReportProblemIcon,
  Person as PersonIcon,
  Router as RouterIcon,
  SignalCellularAlt as SignalCellularAltIcon,
  Info as InfoIcon,
  HelpOutline as HelpOutlineIcon
} from '@mui/icons-material';

import { useDispatch, useSelector } from 'react-redux';
import { getActiveConnection } from '../../../redux/features/Connection/ConnectionSlice';
import { fetchPayments, selectPayments, selectStatus } from '../../../redux/features/Payments/PaymentSlice';
import { DashboardPlanCard } from './DashboardPlanCard';

const dashboardData = {
  user: {
    activeConnectionsCount: 2,
    referralPoints: 1200,
    outstandingBalance: 15.75,
    activeComplaints: 1
  }
};

const DashboardDefault = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  // Redux Selectors
  const payments = useSelector(selectPayments);
  const paymentStatus = useSelector(selectStatus);
  const { customer } = useSelector((state) => state.customer);
  const { connection: activeConnection, isConnectionLoading } = useSelector((state) => state.connection);
  const { user } = dashboardData;

  useEffect(() => {
    dispatch(fetchPayments());
    dispatch(getActiveConnection());
  }, [dispatch]);

  // 1. Enhanced Filtered Payments Logic
  const filteredPayments = useMemo(() => {
    if (!payments) return [];
    return payments.filter(
      (p) =>
        p.transactionId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.method?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.status?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [payments, searchTerm]);

  const getStatusConfig = (status) => {
    const configs = {
      Success: { color: '#10b981', bg: '#ecfdf5', icon: <CheckCircleOutline sx={{ fontSize: 14 }} /> },
      Failed: { color: '#ef4444', bg: '#fef2f2', icon: <ErrorOutline sx={{ fontSize: 14 }} /> },
      Pending: { color: '#f59e0b', bg: '#fffbeb', icon: <HistoryEdu sx={{ fontSize: 14 }} /> }
    };
    return configs[status] || { color: '#6b7280', bg: '#f3f4f6' };
  };

  const getNetworkStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'good':
        return '#10b981';
      case 'moderate':
        return '#f59e0b';
      case 'slow':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const statusColor = getNetworkStatusColor(activeConnection?.serviceArea?.networkStatus);

  const kpiCards = [
    { icon: <WifiIcon />, label: 'Connections', value: user.activeConnectionsCount, color: '#3f51b5' },
    { icon: <MonetizationOnIcon />, label: 'Referral Pts', value: user.referralPoints, color: '#ffb300' },
    { icon: <AccountBalanceWalletIcon />, label: 'Balance', value: `₹${user.outstandingBalance}`, color: '#00bcd4' },
    { icon: <ReportProblemIcon />, label: 'Open Tickets', value: user.activeComplaints, color: '#f44336' }
  ];

  // 2. Active Connection Card Component
  const ActiveConnectionCard = useMemo(() => {
    if (isConnectionLoading === 'pending') {
      return <Skeleton variant="rectangular" height={220} sx={{ borderRadius: 4 }} />;
    }
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
                sx={{ p: 1.5, borderRadius: 2, bgcolor: alpha(statusColor, 0.05), borderColor: alpha(statusColor, 0.1) }}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <SignalCellularAltIcon sx={{ color: statusColor, fontSize: 20 }} />
                    <Box>
                      <Typography variant="caption" fontWeight={800} sx={{ display: 'block', lineHeight: 1 }}>
                        {activeConnection.serviceArea?.networkStatus} Connection
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {activeConnection.serviceArea?.region}
                      </Typography>
                    </Box>
                  </Stack>
                  <Tooltip title={activeConnection.serviceArea?.description || 'Status Info'}>
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
  }, [activeConnection, statusColor, isConnectionLoading, theme]);

  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', pb: 8 }}>
      <Container maxWidth="lg" sx={{ pt: 4 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
          <Box>
            <Typography variant="h5" color="text.secondary">
              Welcome back, <b>{customer?.firstName || 'User'}</b>
            </Typography>
          </Box>
        </Stack>

        <Grid container spacing={3} mb={6}>
          <Grid size={{ xs: 12, md: 6 }}>{ActiveConnectionCard}</Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <DashboardPlanCard />
          </Grid>
        </Grid>

        <Typography variant="overline" fontWeight={800} color="text.secondary" sx={{ mb: 2, display: 'block', letterSpacing: 1.5 }}>
          Account Summary
        </Typography>
        <Grid container spacing={2} mb={6}>
          {kpiCards.map((card, i) => (
            <Grid key={i} size={{ xs: 12, sm: 6, md: 3 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  borderRadius: 3,
                  border: '1px solid #eef0f2',
                  display: 'flex',
                  alignItems: 'center',
                  bgcolor: '#fff',
                  transition: '0.2s',
                  '&:hover': { boxShadow: '0 8px 24px rgba(0,0,0,0.05)', borderColor: card.color }
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
                  <Typography variant="h6" fontWeight={800}>
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
          <Stack direction="row" spacing={2} alignItems="center">
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
                sx: { borderRadius: 2.5, bgcolor: '#fff' }
              }}
            />
          </Stack>
        </Stack>

        {/* 3. Skeleton Table Loading Logic */}
        <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 4, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
          <Table>
            <TableHead sx={{ bgcolor: '#f9fafb' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>TRANSACTION ID</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>DATE</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>METHOD</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>AMOUNT</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>STATUS</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700, pr: 3 }}>
                  INVOICE
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ bgcolor: '#fff' }}>
              {paymentStatus === 'loading' ? (
                // Render 5 Skeleton Rows
                [...Array(5)].map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton variant="text" width={100} />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width={60} />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width={50} />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="rounded" width={80} height={24} />
                    </TableCell>
                    <TableCell align="right">
                      <Skeleton variant="circular" width={30} height={30} sx={{ ml: 'auto' }} />
                    </TableCell>
                  </TableRow>
                ))
              ) : filteredPayments.length > 0 ? (
                filteredPayments.map(({ id, date, amount, method, transactionId, status }) => {
                  const config = getStatusConfig(status);
                  return (
                    <TableRow key={id} hover>
                      <TableCell sx={{ fontWeight: 700 }}>{transactionId}</TableCell>
                      <TableCell>
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
                      <TableCell sx={{ fontWeight: 900 }}>₹{amount.toLocaleString('en-IN')}</TableCell>
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
                            borderRadius: 1.5
                          }}
                        />
                      </TableCell>
                      <TableCell align="right" sx={{ pr: 3 }}>
                        <IconButton size="small">
                          <Download fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 8 }}>
                    <Typography color="text.secondary">No matching transactions found.</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ position: 'fixed', bottom: 32, right: 32 }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<HelpOutlineIcon />}
            sx={{ borderRadius: 10, px: 4, py: 1.5, boxShadow: 6, textTransform: 'none', fontWeight: 700 }}
          >
            Live Support
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default DashboardDefault;
