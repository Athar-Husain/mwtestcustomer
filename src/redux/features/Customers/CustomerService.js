import axios from 'axios';
// import { TokenManager } from '../Admin/adminService';

const BASE_API_URL = import.meta.env.VITE_BACKEND_URL;
const CUSTOMER_URL = `${BASE_API_URL}/api/customers`;

// Create a reusable axios instance for customer-related requests
const axiosInstance = axios.create({
  baseURL: CUSTOMER_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// ===============================
// Token Management Utility
// ===============================
export const TokenManager = {
  save: (token, expiresInSeconds) => {
    // expiresInSeconds is the duration (e.g., 3600 seconds), so calculate the future timestamp
    const expiryTime = Date.now() + expiresInSeconds * 1000;
    localStorage.setItem('access_token', token);
    localStorage.setItem('token_expiry', expiryTime.toString());
  },
  clear: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('token_expiry');
  },
  getToken: () => localStorage.getItem('access_token'),
  isValid: () => {
    const expiry = localStorage.getItem('token_expiry');
    return expiry && Date.now() < parseInt(expiry, 10);
  }
};

// Adding token authentication for the requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = TokenManager.getToken();
    if (token && TokenManager.isValid()) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Service to handle all API interactions for customer management.
 */
const CustomerService = {
  // Registers a new customer (Admin protected)
  register: (data) => axiosInstance.post('/register', data).then((res) => res.data),

  login: async (data) => {
    const response = await axiosInstance.post('/login', data);
    const { token, expiresIn } = response.data;

    if (token && expiresIn) {
      // TokenManager saves the token and calculates expiry based on expiresIn (in seconds)
      TokenManager.save(token, expiresIn);
    }

    return response.data;
  },

  // Fetches all customers (Admin protected)
  getAll: () => axiosInstance.get('/all').then((res) => res.data),

  // Gets the logged-in customer's profile
  getProfile: () => axiosInstance.get('/profile').then((res) => res.data),

  getCustomerLoginStatus: () => axiosInstance.get('/status').then((res) => res.data),

  // Updates the logged-in customer's profile (Admin protected)
  update: (data) => axiosInstance.patch('/update', data).then((res) => res.data),

  // Sends forgot password OTP email
  forgotPassword: (email) => axiosInstance.post('/forgot-password', { email }).then((res) => res.data),

  // Verifies OTP for password reset
  verifyOtp: (otpData) => axiosInstance.post('/verify-otp', otpData).then((res) => res.data),

  // Changes password (protected route)
  changePassword: (passwordData) => axiosInstance.post('/change-password', passwordData).then((res) => res.data),

  // Logs out the customer
  logout: async () => {
    const response = await axiosInstance.post('/logout');
    TokenManager.clear();

    // FIX: Simplified return value. The slice handles the toast message.
    return response.data;
  },

  switchConnection: (data) => axiosInstance.patch('/switchConnection', data).then((res) => res.data),

  // Searches customers by phone (query param)
  searchByPhone: (phone) => axiosInstance.get(`/search?phone=${phone}`).then((res) => res.data),

  // Delete a customer by id (you had this in slice, but not in routes, add if needed)
  delete: (id) => axiosInstance.delete(`/${id}`).then((res) => res.data)
};

export default CustomerService;
