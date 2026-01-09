import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import CustomerService, { TokenManager } from './CustomerService';

const token = localStorage.getItem('access_token');
const tokenExpiry = localStorage.getItem('token_expiry');

const initialState = {
  customer: null, // For logged-in or fetched single customer
  isLoggedIn: !!(token && tokenExpiry && Date.now() < +tokenExpiry),
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: ''
};

// Helper to extract error message
const getError = (err) => err?.response?.data?.message || err.message || 'Something went wrong';

// Async Thunks

// Login customer
export const loginCustomer = createAsyncThunk('customer/login', async (data, thunkAPI) => {
  try {
    // return await CustomerService.login(data);

    const response = await CustomerService.login(data);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(getError(error));
  }
});

// Get all customers (Admin protected)
export const getAllCustomers = createAsyncThunk('customer/getAll', async (_, thunkAPI) => {
  try {
    return await CustomerService.getAll();
  } catch (error) {
    return thunkAPI.rejectWithValue(getError(error));
  }
});

// Get logged-in customer profile
export const getCustomerProfile = createAsyncThunk('customer/getProfile', async (_, thunkAPI) => {
  try {
    // FIX: The service now returns the customer object
    return await CustomerService.getProfile();
  } catch (error) {
    return thunkAPI.rejectWithValue(getError(error));
  }
});

// Update customer (Admin protected)
export const updateCustomer = createAsyncThunk('customer/update', async (data, thunkAPI) => {
  try {
    return await CustomerService.update(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(getError(error));
  }
});

// Forgot password (send OTP)
export const forgotPassword = createAsyncThunk('customer/forgotPassword', async (email, thunkAPI) => {
  try {
    return await CustomerService.forgotPassword(email);
  } catch (error) {
    return thunkAPI.rejectWithValue(getError(error));
  }
});

// Verify OTP
export const verifyOtp = createAsyncThunk('customer/verifyOtp', async (data, thunkAPI) => {
  try {
    return await CustomerService.verifyOtp(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(getError(error));
  }
});

// Change password
export const changePassword = createAsyncThunk('customer/changePassword', async (data, thunkAPI) => {
  try {
    return await CustomerService.changePassword(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(getError(error));
  }
});

// Logout customer
export const logoutCustomer = createAsyncThunk('customer/logout', async (_, thunkAPI) => {
  try {
    TokenManager.clear();
    return await CustomerService.logout();
  } catch (error) {
    return thunkAPI.rejectWithValue(getError(error));
  }
});

// Check if customer is logged in based on server status
export const getCustomerLoginStatus = createAsyncThunk('admin/status', async (_, thunkAPI) => {
  try {
    return await CustomerService.getCustomerLoginStatus();
  } catch (error) {
    return thunkAPI.rejectWithValue(getError(error));
  }
});

// Search customer by phone (Admin or open, depending on backend)
export const searchCustomerByPhone = createAsyncThunk('customer/searchByPhone', async (phone, thunkAPI) => {
  try {
    return await CustomerService.searchByPhone(phone);
  } catch (error) {
    return thunkAPI.rejectWithValue(getError(error));
  }
});

export const switchConnection = createAsyncThunk('customer/switchConnection', async (data, thunkAPI) => {
  try {
    return await CustomerService.switchConnection(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(getError(error));
  }
});

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    resetCustomerState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
      state.customer = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;

        localStorage.setItem('access_token', action.payload.token);
        localStorage.setItem('token_expiry', Date.now() + action.payload.expiresIn * 1000); // expiresIn in seconds?
        // toast.success('Login successful');

        // FIX: Removed duplicate toast
        toast.success('Login successful!');
      })

      // Get all customers
      .addCase(getAllCustomers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.allCustomers = action.payload;
      })

      // Get customer profile
      .addCase(getCustomerProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // FIX: Payload from getProfile is the customer object.
        state.customer = action.payload;
        state.isLoggedIn = true; // Confirms user is logged in
      })

      // Get customer login status
      .addCase(getCustomerLoginStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Payload from getStatus is a boolean true/false
        state.isLoggedIn = action.payload;
      })
      .addCase(getCustomerLoginStatus.rejected, (state, action) => {
        state.isLoading = false;
        // console.log('Login status rejected:');
        state.isLoggedIn = false;
        state.customer = null;
        state.isError = true;
        state.message = action.payload;
        if (action.payload.includes('jwt expired')) {
          state.isLoggedIn = false;
          localStorage.removeItem('access_token');
          localStorage.removeItem('token_expiry');
          toast.info('Session Expires Please Login', {
            position: 'top-center' // Position the toast at the top center
          });
        }

        // toast.info('Session expired. Please login again.');
        // localStorage.removeItem('access_token');
        // localStorage.removeItem('token_expiry');
      })

      // Update customer
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // OPTIONAL: Update the customer profile in state with the response data
        state.customer = action.payload;
        toast.success('Customer updated successfully!');
      })

      // Forgot password
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        toast.success('OTP sent to email!');
      })

      // Verify OTP
      .addCase(verifyOtp.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        toast.success('OTP verified!');
      })

      // Change password
      .addCase(changePassword.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        toast.success('Password changed successfully!');
      })

      // Logout customer
      .addCase(logoutCustomer.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.customer = null;

        localStorage.removeItem('access_token');
        localStorage.removeItem('token_expiry');
        toast.info('Logged out');
      })

      .addCase(switchConnection.fulfilled, (state, action) => {
        state.isLoading = false;
        // Update the customer's activeConnection with the ID from the payload
        state.customer = {
          ...state.customer,
          activeConnection: action.payload.activeConnection
        };
        toast.success('Connection switched successfully!');
      })

      // Global pending matcher for all customer actions
      .addMatcher(
        (action) => action.type.startsWith('customer/') && action.type.endsWith('/pending'),
        (state) => {
          state.isLoading = true;
          state.isError = false;
          state.isSuccess = false;
          state.message = '';
        }
      )

      // Global rejected matcher for all customer actions
      .addMatcher(
        (action) => action.type.startsWith('customer/') && action.type.endsWith('/rejected'),
        (state, action) => {
          state.isLoading = false;
          state.isError = true;

          const errorMessage = action.payload || 'Failed to perform action';

          if (errorMessage !== 'No authorization header' && errorMessage !== 'Unauthorized') {
            toast.error(errorMessage);
          }

          // state.isSuccess = false;
          // state.message = action.payload || 'Failed to perform action';
          // toast.error(state.message);
        }
      );
  }
});

export const { resetCustomerState } = customerSlice.actions;
export default customerSlice.reducer;
