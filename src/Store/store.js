import { configureStore } from '@reduxjs/toolkit';
import userDetails from '../Feature/userDetailedSlice.js';
import signUpdetails from '../Feature/userSignUpSlice.js';
import categoryDetails from '../Feature/categoriesSlice.js';
import firstQuestion from '../Feature/questionsSlice.js';
import paymentDetails from "../Feature/userPaymentSlice.js"
import categoryTemplateDetails from "../Feature/useCategoryTemplateSlice.js";


export const store = configureStore({
  reducer: {
    app: userDetails,
    signUp: signUpdetails,
    getCategory: categoryDetails,
    getQuestions: firstQuestion,
    categoryTemplate:categoryTemplateDetails,
    payment:paymentDetails
  },
});
