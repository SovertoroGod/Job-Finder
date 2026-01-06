import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchJobs } from "../api/jobApi";

export const getAllJobs = createAsyncThunk(
    "jobs/getJobs",
    async ({ page }, { rejectWithValue }) => {
        try {
            const res = await fetchJobs({ page });
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);


const jobSlice = createSlice({
    name: "jobs",
    initialState: {
        jobs: [],
        pagination: {},
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllJobs.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllJobs.fulfilled, (state, action) => {
                state.loading = false;
                state.jobs = action.payload.data;
                state.pagination = action.payload.pagination;
            })
            .addCase(getAllJobs.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    }
});

export default jobSlice.reducer;