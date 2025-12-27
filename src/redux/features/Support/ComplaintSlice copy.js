import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchComplaints, updateComplaintStatus, addCommentToComplaint } from './ComplaintService';

// Initial state
const initialState = {
  items: [],
  loading: false,
  error: null,
  successMessage: ''
};

// Async thunk for fetching complaints from the API
export const getComplaints = createAsyncThunk('complaints/getComplaints', async () => {
  const response = await fetchComplaints();
  if (!response || !response.data) {
    throw new Error('Failed to fetch complaints');
  }
  return response.data;
});

// Async thunk for updating complaint status
export const updateComplaint = createAsyncThunk('complaints/updateComplaintStatus', async ({ complaintId, status }) => {
  const response = await updateComplaintStatus(complaintId, status);
  return response.data;
});

// Async thunk for adding a comment to a complaint
export const addComment = createAsyncThunk('complaints/addComment', async ({ complaintId, comment }) => {
  const response = await addCommentToComplaint(complaintId, comment);
  return response.data;
});

// Slice for managing complaints state
const complaintSlice = createSlice({
  name: 'complaints',
  initialState,
  reducers: {
    clearSuccessMessage: (state) => {
      state.successMessage = '';
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getComplaints.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getComplaints.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
    });
    builder.addCase(getComplaints.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Update complaint status
    builder.addCase(updateComplaint.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateComplaint.fulfilled, (state, action) => {
      state.loading = false;
      const updatedComplaint = action.payload;
      const index = state.items.findIndex((item) => item.id === updatedComplaint.id);
      if (index !== -1) {
        state.items[index] = updatedComplaint;
      }
      state.successMessage = 'Complaint status updated successfully!';
    });
    builder.addCase(updateComplaint.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Add comment to complaint
    builder.addCase(addComment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.loading = false;
      const updatedComplaint = action.payload;
      const index = state.items.findIndex((item) => item.id === updatedComplaint.id);
      if (index !== -1) {
        state.items[index] = updatedComplaint;
      }
      state.successMessage = 'Comment added successfully!';
    });
    builder.addCase(addComment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  }
});

// Actions
export const { clearSuccessMessage } = complaintSlice.actions;

// Reducer
export default complaintSlice.reducer;
