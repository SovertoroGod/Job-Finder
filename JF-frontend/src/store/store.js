import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';
import jobReducer from './jobSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        jobs: jobReducer
    }
});