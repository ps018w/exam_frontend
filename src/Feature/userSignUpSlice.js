import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';

//create signUp actions
export const signUpUser = createAsyncThunk("signUpUser", async (data,{rejectWithValue}) => {
    try {
      const response = await axios.post('http://educomet.com.au/api/accounts/register/', data); 
      return response; // Assuming you want to return the response data
    } catch (error) {
        return rejectWithValue(error)
    }
  });

  export const signUpUserDetails = createSlice({
    name: "signUpUserDetails",
    initialState: {
      users: null,
      loading: false,
      error: null,
    },
    extraReducers: (builder) => {
      builder
        .addCase(signUpUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(signUpUser.fulfilled, (state, action) => {
          state.loading = false;
          state.users = action.payload.data; // Accessing response data from payload
          state.error = null;
        })
        .addCase(signUpUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload; // You might want to set the error state with the payload
          state.users = null; // Reset users to null in case of rejection
        });
    },
  });
export default signUpUserDetails.reducer;