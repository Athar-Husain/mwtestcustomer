import React, { useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Chip,
  Stack,
  Paper,
  Avatar,
  IconButton,
  InputAdornment,
  Grid // Using Grid2 for the 'size' prop compatibility
} from '@mui/material';
import {
  Edit as EditIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Router as RouterIcon,
  Lock as LockIcon,
  Logout as LogoutIcon,
  Save as SaveIcon,
  Devices as DevicesIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

const ProfileScreen = () => {
  const { customer } = useSelector((state) => state.customer);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: ''
    }
  });

  // Populate form when customer loads
  useEffect(() => {
    if (customer) {
      reset({
        firstName: customer.firstName || '',
        lastName: customer.lastName || '',
        phone: customer.phone || ''
      });
    }
  }, [customer, reset]);

  const onSubmit = (data) => {
    console.log('Updated profile data:', data);
    // dispatch(updateProfile(data))
  };

  // Common styles for TextFields to fix readability
  const inputStyles = {
    bgcolor: '#fafafa',
    '& .MuiInputBase-input.Mui-disabled': {
      WebkitTextFillColor: '#666' // Makes disabled email more readable
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f4f7f9', py: 6, px: { xs: 2, md: 4 } }}>
      <Box sx={{ width: '100%', maxWidth: 900, mx: 'auto' }}>
        {/* Header Section */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 4,
            borderRadius: 4,
            bgcolor: 'primary.dark',
            color: 'white'
          }}
        >
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems="center">
            <Box sx={{ position: 'relative' }}>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  bgcolor: 'secondary.main',
                  fontSize: '2.5rem',
                  fontWeight: 700,
                  border: '4px solid rgba(255,255,255,0.2)'
                }}
              >
                {customer?.firstName?.[0]}
                {customer?.lastName?.[0]}
              </Avatar>
              <IconButton
                size="small"
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  bgcolor: 'white',
                  '&:hover': { bgcolor: '#f0f0f0' }
                }}
              >
                <EditIcon fontSize="small" color="primary" />
              </IconButton>
            </Box>
            <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Typography variant="h4" fontWeight={800}>
                {customer?.firstName} {customer?.lastName}
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.8 }}>
                Customer Profile Management
              </Typography>
            </Box>
          </Stack>
        </Paper>

        <Grid container spacing={4}>
          {/* Left Column: Personal Details */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: '1px solid #e0e6ed' }}>
              <Stack direction="row" spacing={1} alignItems="center" mb={3}>
                <PersonIcon color="primary" />
                <Typography variant="h6" fontWeight={700}>
                  Personal Details
                </Typography>
              </Stack>

              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={3}>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField
                      label="First Name"
                      fullWidth
                      {...register('firstName', { required: 'First name is required' })}
                      error={!!errors.firstName}
                      helperText={errors.firstName?.message}
                      InputLabelProps={{ shrink: true }} // Fixes overlapping label
                      sx={inputStyles}
                    />
                    <TextField
                      label="Last Name"
                      fullWidth
                      {...register('lastName', { required: 'Last name is required' })}
                      error={!!errors.lastName}
                      helperText={errors.lastName?.message}
                      InputLabelProps={{ shrink: true }} // Fixes overlapping label
                      sx={inputStyles}
                    />
                  </Stack>

                  <TextField
                    label="Email Address"
                    value={customer?.email || ''}
                    disabled
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    sx={inputStyles}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon fontSize="small" />
                        </InputAdornment>
                      )
                    }}
                  />

                  <TextField
                    label="Phone Number"
                    fullWidth
                    {...register('phone')}
                    InputLabelProps={{ shrink: true }}
                    sx={inputStyles}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneIcon fontSize="small" />
                        </InputAdornment>
                      )
                    }}
                  />

                  {/* <Button
                    type="submit"
                    variant="contained"
                    startIcon={<SaveIcon />}
                    sx={{ py: 1.5, fontWeight: 700, borderRadius: 2, mt: 1 }}
                  >
                    Save Profile Changes
                  </Button> */}
                </Stack>
              </form>
            </Paper>
          </Grid>

          {/* Right Column: Connections & Security */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Stack spacing={4}>
              <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: '1px solid #e0e6ed' }}>
                <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                  <DevicesIcon color="primary" />
                  <Typography variant="h6" fontWeight={700}>
                    Active Connections
                  </Typography>
                </Stack>

                <Stack spacing={1.5}>
                  {customer?.connections?.length > 0 ? (
                    customer.connections.map((id) => {
                      const isActive = id === customer.activeConnection;
                      return (
                        <Box
                          key={id}
                          sx={{
                            p: 2,
                            borderRadius: 3,
                            border: '1px solid',
                            borderColor: isActive ? 'primary.light' : '#eee',
                            bgcolor: isActive ? 'rgba(25, 118, 210, 0.04)' : 'transparent'
                          }}
                        >
                          <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Stack direction="row" spacing={1.5} alignItems="center">
                              <RouterIcon color={isActive ? 'primary' : 'disabled'} />
                              <Box>
                                <Typography variant="body2" fontWeight={700}>
                                  Fiber Node {id.slice(-4).toUpperCase()}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  ID: {id}
                                </Typography>
                              </Box>
                            </Stack>
                            {isActive && (
                              <Chip icon={<CheckCircleIcon style={{ fontSize: '1rem' }} />} label="Current" size="small" color="primary" />
                            )}
                          </Stack>
                        </Box>
                      );
                    })
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No active connections found.
                    </Typography>
                  )}
                </Stack>
              </Paper>

              <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: '1px solid #e0e6ed' }}>
                <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                  <LockIcon color="primary" />
                  <Typography variant="h6" fontWeight={700}>
                    Security
                  </Typography>
                </Stack>

                <Stack spacing={2}>
                  <Button variant="outlined" fullWidth sx={{ fontWeight: 600 }}>
                    Change Password
                  </Button>
                  <Button variant="text" color="error" fullWidth startIcon={<LogoutIcon />} sx={{ fontWeight: 600 }}>
                    Sign Out of All Devices
                  </Button>
                </Stack>
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ProfileScreen;
