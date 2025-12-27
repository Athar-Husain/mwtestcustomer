import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Paper,
  Grid,
  Snackbar,
  Alert,
  CircularProgress,
  InputAdornment,
  Stack,
  Chip,
  Avatar
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createTicket } from '../../redux/features/Tickets/TicketSlice';
import { AssignmentLate, DescriptionOutlined, PriorityHigh, Send, CancelOutlined } from '@mui/icons-material';

const complaintCategories = ['Shifting', 'No Internet', 'Slow Speed', 'Billing Issue', 'Frequent Disconnection', 'Other'];

const NewTicket = ({ onSuccess, onCancel }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const {
    control,
    handleSubmit,
    watch,
    formState: { isDirty, isValid }
  } = useForm({
    defaultValues: {
      issueType: '',
      description: '',
      priority: 'low'
    },
    mode: 'onChange'
  });

  const descriptionValue = watch('description');

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Assuming your slice returns a promise
      await dispatch(createTicket(data)).unwrap();

      setSnackbar({
        open: true,
        message: 'Your ticket has been raised successfully!',
        severity: 'success'
      });

      // Allow user to see the success message before closing
      setTimeout(() => {
        if (onSuccess) onSuccess();
      }, 1200);
    } catch (error) {
      setSnackbar({
        open: true,
        message: error?.message || 'Failed to submit ticket. Please try again.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxWidth={650} mx="auto" sx={{ py: 2 }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 5 },
          borderRadius: 4,
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: '0 10px 40px rgba(0,0,0,0.04)'
        }}
      >
        {/* Header Section */}
        <Box sx={{ mb: 4 }}>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>
              <AssignmentLate fontSize="small" />
            </Avatar>
            <Typography variant="h5" sx={{ fontWeight: 800 }}>
              Raise a New Ticket
            </Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary">
            Provide details about your issue. Our technical team will review it and get back to you shortly.
          </Typography>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={3}>
            {/* Category Selection */}
            <Grid size={{ xs: 12 }}>
              <Controller
                name="issueType"
                control={control}
                rules={{ required: 'Please select an issue category' }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    select
                    label="What issue are you facing?"
                    fullWidth
                    variant="outlined"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AssignmentLate color="action" sx={{ mr: 1 }} />
                        </InputAdornment>
                      )
                    }}
                  >
                    {complaintCategories.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>

            {/* Priority Picker (Enhanced UI) */}
            <Grid size={{ xs: 12 }}>
              <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
                Priority Level
              </Typography>
              <Controller
                name="priority"
                control={control}
                render={({ field }) => (
                  <Stack direction="row" spacing={1}>
                    {['low', 'medium', 'high'].map((p) => (
                      <Chip
                        key={p}
                        label={p.toUpperCase()}
                        onClick={() => field.onChange(p)}
                        color={field.value === p ? (p === 'high' ? 'error' : p === 'medium' ? 'warning' : 'success') : 'default'}
                        variant={field.value === p ? 'filled' : 'outlined'}
                        sx={{ px: 2, fontWeight: 600, textTransform: 'capitalize' }}
                      />
                    ))}
                  </Stack>
                )}
              />
            </Grid>

            {/* Description */}
            <Grid size={{ xs: 12 }}>
              <Controller
                name="description"
                control={control}
                rules={{
                  required: 'Please describe the issue in detail',
                  minLength: { value: 10, message: 'Description should be at least 10 characters' }
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Detailed Description"
                    fullWidth
                    multiline
                    rows={5}
                    placeholder="Describe exactly what happened..."
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message || `${descriptionValue?.length || 0}/500 characters`}
                    inputProps={{ maxLength: 500 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5 }}>
                          <DescriptionOutlined color="action" sx={{ mr: 1 }} />
                        </InputAdornment>
                      )
                    }}
                  />
                )}
              />
            </Grid>

            {/* Action Buttons */}
            <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button
                  onClick={onCancel}
                  variant="text"
                  color="inherit"
                  sx={{ fontWeight: 600, px: 3 }}
                  startIcon={<CancelOutlined />}
                  disabled={loading}
                >
                  Discard
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading || !isValid}
                  sx={{
                    borderRadius: 2,
                    px: 4,
                    fontWeight: 700,
                    boxShadow: '0 8px 16px rgba(25, 118, 210, 0.2)'
                  }}
                  endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Send />}
                >
                  {loading ? 'Submitting...' : 'Submit Ticket'}
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* Snackbar for Notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%', borderRadius: 2 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default NewTicket;
