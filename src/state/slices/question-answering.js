import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { apiGetAllQuestions } from "../../api/questions";
import {
  apiGetAllSubmissions,
  apiCreateSubmission,
  apiUpdateSubmission,
} from "../../api/submissions";

/* initial state */

const initialState = {
  questions: [],
  submissions: [],
  questionsLoading: false,
  submissionsLoading: false,
  error: null,
  lastUpdatedAt: null,
};

/* api thunks */

export const fetchAllQuestionsQA = createAsyncThunk(
  "questionAnswering/fetchAllQuestionsQA",
  async (params) => {
    const response = await apiGetAllQuestions(params);
    return response.data;
  }
);

export const fetchAllSubmissionsQA = createAsyncThunk(
  "questionAnswering/fetchAllSubmissionsQA",
  async (params) => {
    const response = await apiGetAllSubmissions(params);
    return response.data;
  }
);

export const createSubmissionQA = createAsyncThunk(
  "questionAnswering/createSubmissionQA",
  async ({ data }) => {
    const response = await apiCreateSubmission(data);
    return response.data;
  }
);

export const updateSubmissionQA = createAsyncThunk(
  "questionAnswering/updateSubmissionQA",
  async ({ id, data }) => {
    const response = await apiUpdateSubmission(id, data);
    return response.data;
  }
);

/* slice */

const questionAnsweringSlice = createSlice({
  name: "question-answering",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [fetchAllQuestionsQA.pending]: (state, action) => {
      state.error = null;
      state.questionsLoading = true;
    },
    [fetchAllQuestionsQA.fulfilled]: (state, action) => {
      state.questions = action.payload.sort(
        (item1, item2) => item1.order - item2.order
      );
      state.questionsLoading = false;
      state.lastUpdatedAt = Date.now();
    },
    [fetchAllQuestionsQA.rejected]: (state, action) => {
      state.error = action.error.message;
      state.questionsLoading = false;
    },
    [fetchAllSubmissionsQA.pending]: (state, action) => {
      state.error = null;
      state.submissionsLoading = true;
    },
    [fetchAllSubmissionsQA.fulfilled]: (state, action) => {
      state.submissions = action.payload;
      state.submissionsLoading = false;
      state.lastUpdatedAt = Date.now();
    },
    [fetchAllSubmissionsQA.rejected]: (state, action) => {
      state.error = action.error.message;
      state.submissionsLoading = false;
    },
    [createSubmissionQA.fulfilled]: (state, action) => {
      console.log(action);
      state.submissions = [...state.submissions, action.payload];
      // state.submissionsLoading = false;
      state.lastUpdatedAt = Date.now();
    },
    [createSubmissionQA.rejected]: (state, action) => {
      state.error = action.error.message;
      // state.submissionsLoading = false;
    },
    [updateSubmissionQA.fulfilled]: (state, action) => {
      const idx = state.submissions.findIndex(
        (item) => item.id === action.payload.id
      );
      if (idx >= 0) {
        state.submissions[idx] = action.payload;
      }
      state.error = null;
      // state.submissionsLoading = false;
      state.lastUpdatedAt = Date.now();
    },
    [updateSubmissionQA.rejected]: (state, action) => {
      state.error = action.error.message;
      // state.submissionsLoading = false;
    },
  },
});

export default questionAnsweringSlice.reducer;

/* selectors */

export const selectAllQuestionsQA = (state) =>
  state.questionAnswering.questions;

export const selectAllSubmissionsQA = (state) =>
  state.questionAnswering.submissions;

export const selectAreQuestionsLoadingQA = (state) =>
  state.questionAnswering.questionsLoading;

export const selectAreSubmissionsLoadingQA = (state) =>
  state.questionAnswering.submissionsLoading;

export const selectIsLoadingQA = (state) =>
  state.questionAnswering.questionsLoading ||
  state.questionAnswering.submissionsLoading;
