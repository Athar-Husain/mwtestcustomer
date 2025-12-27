import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const PaymentMethod = () => {
  const [methods, setMethods] = useState([
    { id: 1, type: 'Card', cardHolder: 'John Doe', cardNumber: '**** **** **** 1234', expiry: '12/24' },
    { id: 2, type: 'UPI', upiId: 'john.doe@upi' },
  ]);
  const [openDialog, setOpenDialog] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      paymentType: 'Card',
      cardHolder: '',
      cardNumber: '',
      expiry: '',
      cvv: '',
      upiId: '',
    },
  });

  const paymentType = watch('paymentType');

  const onSubmit = (data) => {
    let newMethod;
    if (data.paymentType === 'Card') {
      const maskedNumber = '**** **** **** ' + data.cardNumber.slice(-4);
      newMethod = {
        id: methods.length + 1,
        type: 'Card',
        cardHolder: data.cardHolder,
        cardNumber: maskedNumber,
        expiry: data.expiry,
      };
    } else {
      newMethod = {
        id: methods.length + 1,
        type: 'UPI',
        upiId: data.upiId,
      };
    }
    setMethods((prev) => [...prev, newMethod]);
    reset();
    setOpenDialog(false);
  };

  const handleDelete = (id) => {
    setMethods((prev) => prev.filter((method) => method.id !== id));
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Payment Methods
      </Typography>

      <List sx={{ mb: 3 }}>
        {methods.length === 0 && (
          <Typography textAlign="center" color="text.secondary" p={2}>
            No payment methods saved.
          </Typography>
        )}
        {methods.map((method) => (
          <React.Fragment key={method.id}>
            <ListItem
              secondaryAction={
                <IconButton edge="end" onClick={() => handleDelete(method.id)} aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText
                primary={
                  method.type === 'Card'
                    ? `${method.cardHolder} — ${method.cardNumber}`
                    : `UPI ID: ${method.upiId}`
                }
                secondary={method.type === 'Card' ? `Expiry: ${method.expiry}` : ''}
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>

      <Button variant="contained" onClick={() => setOpenDialog(true)}>
        Add New Payment Method
      </Button>

      {/* Add Payment Method Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Payment Method</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
            <FormLabel id="payment-type-label">Payment Type</FormLabel>
            <Controller
              name="paymentType"
              control={control}
              render={({ field }) => (
                <RadioGroup row {...field} aria-labelledby="payment-type-label" sx={{ mb: 3 }}>
                  <FormControlLabel value="Card" control={<Radio />} label="Card" />
                  <FormControlLabel value="UPI" control={<Radio />} label="UPI" />
                </RadioGroup>
              )}
            />

            {paymentType === 'Card' && (
              <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                  <Controller
                    name="cardHolder"
                    control={control}
                    rules={{ required: 'Cardholder name is required' }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Cardholder Name"
                        fullWidth
                        error={!!errors.cardHolder}
                        helperText={errors.cardHolder?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Controller
                    name="cardNumber"
                    control={control}
                    rules={{
                      required: 'Card number is required',
                      pattern: {
                        value: /^[0-9]{16}$/,
                        message: 'Card number must be 16 digits',
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Card Number"
                        fullWidth
                        error={!!errors.cardNumber}
                        helperText={errors.cardNumber?.message}
                        inputProps={{ maxLength: 16 }}
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 6 }}>
                  <Controller
                    name="expiry"
                    control={control}
                    rules={{
                      required: 'Expiry date is required',
                      pattern: {
                        value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                        message: 'Expiry must be in MM/YY format',
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Expiry (MM/YY)"
                        fullWidth
                        error={!!errors.expiry}
                        helperText={errors.expiry?.message}
                        placeholder="MM/YY"
                        inputProps={{ maxLength: 5 }}
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 6 }}>
                  <Controller
                    name="cvv"
                    control={control}
                    rules={{
                      required: 'CVV is required',
                      pattern: {
                        value: /^[0-9]{3,4}$/,
                        message: 'CVV must be 3 or 4 digits',
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="CVV"
                        fullWidth
                        error={!!errors.cvv}
                        helperText={errors.cvv?.message}
                        inputProps={{ maxLength: 4 }}
                        type="password"
                      />
                    )}
                  />
                </Grid>
              </Grid>
            )}

            {paymentType === 'UPI' && (
              <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                  <Controller
                    name="upiId"
                    control={control}
                    rules={{
                      required: 'UPI ID is required',
                      pattern: {
                        value: /^[\w.-]+@[\w.-]+$/,
                        message: 'Enter a valid UPI ID (e.g., user@bank)',
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="UPI ID"
                        fullWidth
                        error={!!errors.upiId}
                        helperText={errors.upiId?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            )}

            <DialogActions sx={{ px: 0, pt: 3 }}>
              <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
              <Button type="submit" variant="contained" disabled={isSubmitting}>
                Save
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </Paper>
  );
};

export default PaymentMethod;
