import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchJobs, searchJobs } from "../api/jobApi";
import { act } from "react";

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

export const searchJobList = createAsyncThunk(
  "jobs/searchJobs",
  async (params, { rejectWithValue }) => {
    try {
      const res = await searchJobs(params);
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
    error: null,
    isSearching: false,
  },
  reducers: {
    clearSearch(state) {
      state.isSearching = false;
    },
  },
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
      })

      .addCase(searchJobList.pending, (state) => {
        state.loading = true;
        state.isSearching = true;
      })
      .addCase(searchJobList.fulfilled, (state, action) => {
        state.jobs = action.payload.data;
        state.loading = false;
        state.pagination = action.payload.pagination;
      })
      .addCase(searchJobList.rejected, (state, action) => {
        state.isSearching = false;
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSearch } = jobSlice.actions;
export default jobSlice.reducer;