import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useTheme } from '@mui/material/styles';
import { Box, Typography, Card, CardContent, Stack, Button, alpha, CircularProgress, Paper } from '@mui/material';
import { Speed as SpeedIcon, Update as TimerIcon, ErrorOutline as WarningIcon } from '@mui/icons-material';
import { getCustomerCurrentPlan } from '../../../redux/features/Plan/PlanSlice';

export const DashboardPlanCard = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { activePlan, isPlanLoading } = useSelector((state) => state.plan);

  useEffect(() => {
    dispatch(getCustomerCurrentPlan());
  }, [dispatch]);

  if (isPlanLoading === 'pending') {
    return (
      <Card sx={{ borderRadius: 4, height: 210, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress size={24} thickness={5} />
      </Card>
    );
  }

  if (!activePlan?.currentPlan) return null;

  const { plan, startDate, endDate, price } = activePlan.currentPlan;

  // Logic for Progress and Days
  const start = new Date(startDate);
  const end = new Date(endDate);
  const today = new Date();

  const totalDuration = end - start;
  const elapsed = today - start;
  const progressValue = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));

  const daysLeft = Math.max(0, Math.ceil((end - today) / (1000 * 60 * 60 * 24)));
  const isExpired = daysLeft === 0;

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: `1px solid ${isExpired ? theme.palette.error.main : alpha(theme.palette.divider, 0.1)}`,
        background: '#ffffff',
        height: '100%'
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        {/* Header: Label and Progress Ring */}
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={1}>
          <Box>
            <Typography variant="caption" sx={{ fontWeight: 900, letterSpacing: 1, color: 'text.primary' }}>
              ACTIVE PLAN
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 900, color: '#2563eb', mt: 0.5 }}>
              ₹{price.toLocaleString()}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.secondary' }}>
              {plan.name}
            </Typography>
          </Box>

          <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress
              variant="determinate"
              value={isExpired ? 100 : progressValue}
              size={58}
              thickness={6} // Increased thickness for better visibility
              sx={{
                color: isExpired ? 'error.main' : 'primary.main',
                bgcolor: alpha(theme.palette.divider, 0.1),
                borderRadius: '50%'
              }}
            />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 900, fontSize: '0.85rem' }}>
                {daysLeft}d
              </Typography>
            </Box>
          </Box>
        </Stack>

        {/* Middle: Plan Specs with consistent icon sizes */}
        <Stack direction="row" spacing={3} sx={{ mt: 2, mb: 2 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <SpeedIcon sx={{ fontSize: 20, color: 'text.primary' }} />
            <Typography variant="body2" sx={{ fontWeight: 800 }}>
              {plan.internetSpeed} {plan.internetSpeedUnit}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <TimerIcon sx={{ fontSize: 20, color: 'text.primary' }} />
            <Typography variant="body2" sx={{ fontWeight: 800 }}>
              {activePlan.currentPlan.duration} Days
            </Typography>
          </Stack>
        </Stack>

        {/* Bottom: Alert Section */}
        <Paper
          elevation={0}
          sx={{
            p: 1.5,
            borderRadius: 3,
            bgcolor: alpha(theme.palette.error.main, 0.04),
            border: `1px solid ${alpha(theme.palette.error.main, 0.1)}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <WarningIcon sx={{ color: 'error.main', fontSize: 22 }} />
            <Box>
              <Typography variant="caption" sx={{ display: 'block', fontWeight: 800, color: 'text.primary', lineHeight: 1.2 }}>
                EXPIRY DATE
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 900, color: 'error.main' }}>
                {new Date(endDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
              </Typography>
            </Box>
          </Stack>

          {/* <Button
            variant="contained"
            color="error"
            size="small"
            sx={{
              fontWeight: 900,
              borderRadius: 2,
              px: 2,
              boxShadow: 'none',
              '&:hover': { boxShadow: 'none' }
            }}
          >
            RENEW
          </Button> */}
        </Paper>
      </CardContent>
    </Card>
  );
};
