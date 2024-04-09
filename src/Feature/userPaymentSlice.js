import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';

//create payment actions
export const createPayment = createAsyncThunk("createPayment", async (data,{rejectWithValue}) => {
    try {
        const response = await axios.post('http://44.221.201.10/api/pay/payment', data, {
            headers: {
                'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('key')).accessToken}`
            }
        });
        return response?.response?.data; 
    } catch (error) {
        return rejectWithValue(error);
    }
  });

  export const paymentDetails = createSlice({
    name: "paymentDetails",
    initialState: {
      paymentDetailed: null,
      loading: false,
      error: null,
    },
    extraReducers: (builder) => {
      builder
        .addCase(createPayment.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(createPayment.fulfilled, (state, action) => {
          state.loading = false;
          state.paymentDetailed = action.payload.data; // Accessing response data from payload
          state.error = null;
        })
        .addCase(createPayment.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload; // You might want to set the error state with the payload
          state.paymentDetailed = null; // Reset users to null in case of rejection
        });
    },
  });
export default paymentDetails.reducer;