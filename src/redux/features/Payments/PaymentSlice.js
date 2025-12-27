import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPaymentsAPI } from './PaymentService';

export const fetchPayments = createAsyncThunk('Payments/fetchPayments', async () => {
  const response = await fetchPaymentsAPI();
  return response.data;
});

const paymentSlice = createSlice({
  name: 'payments',
  initialState: {
    items: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPayments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const selectPayments = (state) => state.payments.items;
export const selectStatus = (state) => state.payments.status;

export default paymentSlice.reducer;
