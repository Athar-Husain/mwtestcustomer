import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchComplaints, updateComplaintStatus, addCommentToComplaint } from './ComplaintService';

const initialState = {
  items: [], // This should be the array holding complaints
  loading: false,
  error: null,
  successMessage: ''
};

export const getComplaints = createAsyncThunk('complaints/fetchComplaints', async () => {
  const response = await fetchComplaints();
  return response.data;
});

export const submitComplaint = createAsyncThunk('complaints/submitComplaint', async (payload) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Complaint submitted:', payload);
      resolve(payload);
    }, 1000);
  });
});

export const updateComplaint = createAsyncThunk('complaints/updateComplaintStatus', async ({ complaintId, status }) => {
  const response = await updateComplaintStatus(complaintId, status);
  return response.data;
});

export const addComment = createAsyncThunk('complaints/addComment', async ({ complaintId, comment }) => {
  const response = await addCommentToComplaint(complaintId, comment);
  return response.data;
});

const complaintsSlice = createSlice({
  name: 'complaints',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getComplaints.pending, (state) => {
        state.loading = true;
      })
      .addCase(getComplaints.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload; // Ensure we're updating `state.items`
      })
      .addCase(getComplaints.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Handle updateComplaint action
      .addCase(updateComplaint.fulfilled, (state, action) => {
        const updatedComplaint = action.payload;
        state.items = state.items.map((complaint) => (complaint.id === updatedComplaint.id ? updatedComplaint : complaint));
      })
      // Handle addComment action
      .addCase(addComment.fulfilled, (state, action) => {
        const updatedComplaint = action.payload;
        state.items = state.items.map((complaint) => (complaint.id === updatedComplaint.id ? updatedComplaint : complaint));
      });
  }
});

export const selectComplaints = (state) => state.complaints.items; // Access `state.complaints.items` here
export const selectComplaintsStatus = (state) => state.complaints.loading; // Check loading status

export default complaintsSlice.reducer;
