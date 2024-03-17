import { configureStore } from "@reduxjs/toolkit";
import userDetails from "../Feature/userDetailedSlice.js";
import signUpdetails from "../Feature/userSignUpSlice.js";
export const store = configureStore({
  reducer: {
    app:userDetails,
    signUp:signUpdetails
  },
});