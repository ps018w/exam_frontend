import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// create category actions

export const getCategoryTemplate = createAsyncThunk("getCategoryTemplate", async ({rejectWithValue}) => {
    try {
      const response = await axios.get('http://44.221.201.10/api/categories/');
      return response.data; // Assuming you want to return the response data
    } catch (error) {
        return rejectWithValue(error)
    }
  });
  export const categoryTemplateDetails = createSlice({
    name: "categoryTemplateDetails",
    initialState: {
      data: null,
      loading: false,
      error: null,
    },
    extraReducers: (builder) => {
      builder
        .addCase(getCategoryTemplate.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getCategoryTemplate.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload; // Accessing response data from payload
          state.error = null;
        })
        .addCase(getCategoryTemplate.rejected, (state, action) => {
          state.loading = false;
          state.error = action; // You might want to set the error state with the payload
          state.data = null; // Reset users to null in case of rejection
        });
    },
  });


  export default categoryTemplateDetails.reducer;