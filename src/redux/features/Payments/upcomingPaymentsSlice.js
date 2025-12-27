import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUpcomingPaymentsAPI } from './upcomingPaymentsService';

export const fetchUpcomingPayments = createAsyncThunk(
  'upcomingPayments/fetchUpcomingPayments',
  async () => {
    const response = await fetchUpcomingPaymentsAPI();
    return response.data;
  }
);

const upcomingPaymentsSlice = createSlice({
  name: 'upcomingPayments',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUpcomingPayments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUpcomingPayments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchUpcomingPayments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectUpcomingPayments = (state) => state.upcomingPayments.items;
export const selectUpcomingPaymentsStatus = (state) => state.upcomingPayments.status;

export default upcomingPaymentsSlice.reducer;
