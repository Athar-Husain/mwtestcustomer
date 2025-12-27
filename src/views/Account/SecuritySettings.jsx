import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  Button,
  Paper,
  Switch,
  TextField,
  Typography,
  Grid,
  FormControlLabel,
} from '@mui/material';

const SecuritySettings = () => {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
      twoFactorEnabled: false,
    },
  });

  const [twoFactor, setTwoFactor] = useState(false);

  const newPassword = watch('newPassword');

  const onSubmit = (data) => {
    // Simulate form submit
    alert('Password changed and security settings saved!');
    reset();
  };

  const handleTwoFactorToggle = (event) => {
    setTwoFactor(event.target.checked);
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Security Settings
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 2 }}>
        <Grid container spacing={3}>

          {/* Current Password */}
          <Grid size={{ xs: 12 }}>
            <Controller
              name="currentPassword"
              control={control}
              rules={{ required: 'Current password is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Current Password"
                  type="password"
                  fullWidth
                  error={!!errors.currentPassword}
                  helperText={errors.currentPassword?.message}
                />
              )}
            />
          </Grid>

          {/* New Password */}
          <Grid size={{ xs: 12 }}>
            <Controller
              name="newPassword"
              control={control}
              rules={{
                required: 'New password is required',
                minLength: { value: 8, message: 'Minimum length is 8 characters' },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="New Password"
                  type="password"
                  fullWidth
                  error={!!errors.newPassword}
                  helperText={errors.newPassword?.message}
                />
              )}
            />
          </Grid>

          {/* Confirm New Password */}
          <Grid size={{ xs: 12 }}>
            <Controller
              name="confirmNewPassword"
              control={control}
              rules={{
                required: 'Please confirm your new password',
                validate: (value) =>
                  value === newPassword || 'Passwords do not match',
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Confirm New Password"
                  type="password"
                  fullWidth
                  error={!!errors.confirmNewPassword}
                  helperText={errors.confirmNewPassword?.message}
                />
              )}
            />
          </Grid>

          {/* Two-Factor Authentication */}
          <Grid size={{ xs: 12 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={twoFactor}
                  onChange={(e) => {
                    handleTwoFactorToggle(e);
                    // optionally update react-hook-form state here if needed
                  }}
                  color="primary"
                />
              }
              label="Enable Two-Factor Authentication"
            />
          </Grid>

          {/* Submit Button */}
          <Grid size={{ xs: 12 }} sx={{ textAlign: 'right' }}>
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              Save Security Settings
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default SecuritySettings;
