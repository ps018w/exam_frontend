import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';

//create login actions
export const createUser = createAsyncThunk("createUser", async (data,{rejectWithValue}) => {
    try {
      const response = await axios.post('http://educomet.com.au/api/accounts/login/', data);
      let baseCredintial={
        email:response?.data?.email,
        accessToken:response?.data?.access
      }
      sessionStorage.setItem('key', JSON.stringify(baseCredintial));
     
      return response; // Assuming you want to return the response data
    } catch (error) {
        return rejectWithValue(error)
    }
  });

  export const userDetails = createSlice({
    name: "userDetails",
    initialState: {
      users: null,
      loading: false,
      error: null,
    },
    extraReducers: (builder) => {
      builder
        .addCase(createUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(createUser.fulfilled, (state, action) => {
          state.loading = false;
          state.users = action.payload.data; // Accessing response data from payload
          state.error = null;
        })
        .addCase(createUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload; // You might want to set the error state with the payload
          state.users = null; // Reset users to null in case of rejection
        });
    },
  });
export default userDetails.reducer;