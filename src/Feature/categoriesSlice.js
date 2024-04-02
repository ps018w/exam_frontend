import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCategories = createAsyncThunk(
  "fetchData",
  async () => {
    const response = await axios.get("http://44.221.201.10/api/categories");
    return response.data;
  }
);

const categoriesSlice = createSlice({
  name: "categoriesData",
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
//   reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
        state.error = null;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default categoriesSlice.reducer;
// export const selectCategories = (state) => state.categories.categories;
// export const selectLoading = (state) => state.categories.loading;
// export const selectError = (state) => state.categories.error;