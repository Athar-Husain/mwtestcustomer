import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  CircularProgress,
  Grid,
  Card,
  Button,
  Stack,
  IconButton,
  Tooltip,
  Avatar,
  TextField,
  InputAdornment
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
import { useSelector, useDispatch } from 'react-redux';
import { fetchPayments, selectPayments, selectStatus } from '../../redux/features/Payments/PaymentSlice';

const Billings = () => {
  const dispatch = useDispatch();
  const payments = useSelector(selectPayments);
  const status = useSelector(selectStatus);
  const [searchTerm, setSearchTerm] = useState('');

  const dueAmount = 1499.0;
  const dueDate = '2025-01-15';
  const isOverdue = new Date(dueDate) < new Date();

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

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: { xs: 2, md: 4 }, bgcolor: '#fafafa', minHeight: '100vh' }}>
      {/* 1. Elegant Header */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ sm: 'center' }}
        spacing={2}
        sx={{ mb: 4 }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 900, color: '#111827', letterSpacing: '-0.5px' }}>
            Billing
          </Typography>
          <Typography variant="body2" sx={{ color: '#6b7280', mt: 0.5 }}>
            View your billing history and manage payment methods.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1.5}>
          <Button
            variant="outlined"
            sx={{ borderRadius: 2.5, px: 3, textTransform: 'none', fontWeight: 700, borderColor: '#e5e7eb', color: '#374151' }}
          >
            Download All
          </Button>
          <Button
            variant="contained"
            disableElevation
            sx={{ borderRadius: 2.5, px: 3, textTransform: 'none', fontWeight: 700, bgcolor: '#111827', '&:hover': { bgcolor: '#1f2937' } }}
          >
            Add Credits
          </Button>
        </Stack>
      </Stack>

      <Grid container spacing={3} sx={{ mb: 6 }}>
        {/* Overdue/Amount Card */}
        <Grid size={{ zs: 12, md: 4 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 5,
              border: '1px solid',
              borderColor: isOverdue ? '#fee2e2' : '#e5e7eb',
              background: isOverdue ? 'linear-gradient(135deg, #fffcfc 0%, #fff5f5 100%)' : '#fff',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 800, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Amount Due
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 900, color: isOverdue ? '#b91c1c' : '#111827', my: 1 }}>
                  ₹{dueAmount.toLocaleString('en-IN')}
                </Typography>
                {isOverdue && (
                  <Chip label="Overdue" size="small" sx={{ bgcolor: '#fee2e2', color: '#b91c1c', fontWeight: 800, fontSize: '0.65rem' }} />
                )}
              </Box>
              <Avatar sx={{ bgcolor: isOverdue ? '#fee2e2' : '#f3f4f6', color: isOverdue ? '#ef4444' : '#111827', borderRadius: 3 }}>
                <AccountBalanceWallet fontSize="small" />
              </Avatar>
            </Stack>
          </Paper>
        </Grid>

        {/* Due Date Card */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 5, border: '1px solid #e5e7eb', background: '#fff' }}>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
              <Avatar sx={{ bgcolor: '#eff6ff', color: '#2563eb', borderRadius: 3 }}>
                <EventNote fontSize="small" />
              </Avatar>
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 800, color: '#6b7280', textTransform: 'uppercase' }}>
                  Next Payment
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#111827' }}>
                  {new Date(dueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </Typography>
              </Box>
            </Stack>
            <Button
              fullWidth
              size="small"
              variant="text"
              sx={{ justifyContent: 'space-between', color: '#2563eb', fontWeight: 700, textTransform: 'none' }}
            >
              Set a reminder <ArrowForwardIos sx={{ fontSize: 12 }} />
            </Button>
          </Paper>
        </Grid>

        {/* Action Card */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 5,
              bgcolor: '#0141caff',
              color: 'white',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
              Quick Pay
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.7, mb: 2.5 }}>
              Settle your outstanding balance instantly.
            </Typography>
            <Button
              variant="contained"
              fullWidth
              sx={{ bgcolor: '#fff', color: '#111827', fontWeight: 800, borderRadius: 2.5, '&:hover': { bgcolor: '#f3f4f6' } }}
            >
              Pay Now
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* 2. Transaction Controls */}
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems={{ md: 'center' }}
        sx={{ mb: 3 }}
        spacing={2}
      >
        <Typography variant="h6" sx={{ fontWeight: 800, color: '#111827' }}>
          Recent Transactions
        </Typography>
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
    </Box>
  );
};

export default Billings;
