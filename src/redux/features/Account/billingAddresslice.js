import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchBillingAddressAPI, updateBillingAddressAPI } from './billingAddressService';

export const fetchBillingAddress = createAsyncThunk(
  'billingAddress/fetchBillingAddress',
  async () => {
    const response = await fetchBillingAddressAPI();
    return response.data;
  }
);

export const updateBillingAddress = createAsyncThunk(
  'billingAddress/updateBillingAddress',
  async (address) => {
    const response = await updateBillingAddressAPI(address);
    return response.data;
  }
);

const billingAddressSlice = createSlice({
  name: 'billingAddress',
  initialState: {
    address: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBillingAddress.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBillingAddress.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.address = action.payload;
      })
      .addCase(fetchBillingAddress.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateBillingAddress.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateBillingAddress.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.address = action.payload;
      })
      .addCase(updateBillingAddress.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectBillingAddress = (state) => state.billingAddress.address;
export const selectBillingStatus = (state) => state.billingAddress.status;

export default billingAddressSlice.reducer;
