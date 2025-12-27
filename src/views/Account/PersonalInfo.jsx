import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Grid,
  Paper,
} from '@mui/material';

const countries = [
  { code: 'US', label: 'United States' },
  { code: 'CA', label: 'Canada' },
  { code: 'GB', label: 'United Kingdom' },
  { code: 'AU', label: 'Australia' },
  // Add more countries as needed
];

const PersonalInfo = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      country: '',
    },
  });

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    alert('Personal info saved successfully!');
    reset(data);
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 700, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Personal Information
      </Typography>

      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <Controller
              name="fullName"
              control={control}
              rules={{ required: 'Full Name is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Full Name"
                  fullWidth
                  error={!!errors.fullName}
                  helperText={errors.fullName?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="email"
              control={control}
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Enter a valid email address',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  type="email"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="phone"
              control={control}
              rules={{
                required: 'Phone Number is required',
                pattern: {
                  value: /^[+\d]?(?:[\d-.\s()]*)$/,
                  message: 'Enter a valid phone number',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Phone Number"
                  fullWidth
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Controller
              name="address1"
              control={control}
              rules={{ required: 'Address Line 1 is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Address Line 1"
                  fullWidth
                  error={!!errors.address1}
                  helperText={errors.address1?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Controller
              name="address2"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Address Line 2 (optional)"
                  fullWidth
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <Controller
              name="city"
              control={control}
              rules={{ required: 'City is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="City"
                  fullWidth
                  error={!!errors.city}
                  helperText={errors.city?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <Controller
              name="state"
              control={control}
              rules={{ required: 'State/Province is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="State/Province"
                  fullWidth
                  error={!!errors.state}
                  helperText={errors.state?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <Controller
              name="zip"
              control={control}
              rules={{
                required: 'Zip/Postal Code is required',
                pattern: {
                  value: /^[A-Za-z0-9-\s]+$/,
                  message: 'Invalid postal code',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Zip / Postal Code"
                  fullWidth
                  error={!!errors.zip}
                  helperText={errors.zip?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Controller
              name="country"
              control={control}
              rules={{ required: 'Country is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Country"
                  fullWidth
                  error={!!errors.country}
                  helperText={errors.country?.message}
                >
                  {countries.map((option) => (
                    <MenuItem key={option.code} value={option.label}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }} sx={{ textAlign: 'right' }}>
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default PersonalInfo;
