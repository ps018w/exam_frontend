// questionSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define initial state
const initialState = {
  allQuestion: [],
//   totalQuestions: [],
//   status: 'idle',
  loading: false,
  error: null,
};

// Define async thunk for fetching questions
export const fetchFirstQuestions = createAsyncThunk(
  'fetchFirstQuestions',
  async (categoryId) => {
    const response = await axios.get(`http://44.221.201.10/api/question/${categoryId}`);
    return response.data.results;
  }
);

export const fetchNextQuestion = createAsyncThunk(
    'fetchNextQuestionData',
    async ({ categoryId, nextId }) => {
      const response = await axios.get(`http://44.221.201.10/api/question/${categoryId}?page=${nextId}`);
      return response.data.results;
    }
  );

  export const fetchPreviousQuestion = createAsyncThunk(
    'fetchPreviousQuestionData',
    async ({ categoryId, previousId }) => {
      const response = await axios.get(`http://44.221.201.10/api/question/${categoryId}?page=${previousId}`);
      return response.data.results;
    }
  );

  export const fetchQuestionsByPagination = createAsyncThunk(
    'fetchQuestionsByPagination',
    async ({ categoryId, id }) => {
      const response = await axios.get(`http://44.221.201.10/api/question/${categoryId}?page=${id}`);
      return response.data.results;
    }
  );

// Define question slice
const questionSlice = createSlice({
  name: 'questionsData',
  initialState,
//   reducers: {
//     // Define additional reducers if needed
//   },
extraReducers: (builder) => {
    builder
      .addCase(fetchFirstQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFirstQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.allQuestion = action.payload;
        state.error = null;
      })
      .addCase(fetchFirstQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchNextQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.allQuestion = action.payload;
        state.error = null;
      })
      .addCase(fetchNextQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchPreviousQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.allQuestion = action.payload;
        state.error = null;
      })
      .addCase(fetchPreviousQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchQuestionsByPagination.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuestionsByPagination.fulfilled, (state, action) => {
        state.loading = false;
        state.allQuestion = action.payload;
        state.error = null;
      })
      .addCase(fetchQuestionsByPagination.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export action creators and reducer
// export const { /* Additional action creators */ } = questionSlice.actions;
export default questionSlice.reducer;