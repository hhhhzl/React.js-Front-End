import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { apiGetAllQuestions } from "../../api/questions";

import {
  apiGetAllIndicators,
  apiCreateIndicator,
  apiGetIndicator,
  apiUpdateIndicator,
  apiDeleteIndicator,
} from "../../api/questionnaires";

/* initial state */

const initialState = {
  questions: [],
  indicators: [],
  questionsLoading: false,
  indicatorsLoading: false,
  error: null,
  lastUpdatedAt: null,
};

/* api thunks */

export const fetchAllQuestionsIE = createAsyncThunk(
  "questionEdit/fetchAllQuestionsIE",
  async (params) => {
    const response = await apiGetAllQuestions(params);
    return response.data;
  }
);

export const fetchAllIndicatorsIE = createAsyncThunk(
  "questionEdit/fetchAllIndicatorsIE",
  async (params) => {
    const response = await apiGetAllIndicators(params);
    return response.data;
  }
);

export const createIndicatorIE = createAsyncThunk(
  "questionEdit/createIndicatorIE",
  async ({ qnaireID, data }) => {
    const response = await apiCreateIndicator(qnaireID, data);
    return response.data;
  }
);

export const updateIndicatorIE = createAsyncThunk(
  "questionEdit/updateIndicatorIE",
  async ({ qnaireID, indicatorID, data }) => {
    const response = await apiUpdateIndicator(qnaireID, indicatorID, data);
    return response.data;
  }
);

export const deleteIndicatorIE = createAsyncThunk(
  "questionEdit/deleteIndicatorIE",
  async ({ qnaireID, indicatorID }) => {
    const response = await apiDeleteIndicator(qnaireID, indicatorID);
    return parseInt(indicatorID);
  }
);

/* slice */

const indicatorEditSlice = createSlice({
  name: "indicator-edit",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [fetchAllQuestionsIE.pending]: (state, action) => {
      state.error = null;
      state.questionsLoading = true;
    },
    [fetchAllQuestionsIE.fulfilled]: (state, action) => {
      state.questions = action.payload.sort(
        (item1, item2) => item1.order - item2.order
      );
      state.questionsLoading = false;
      state.lastUpdatedAt = Date.now();
    },
    [fetchAllQuestionsIE.rejected]: (state, action) => {
      state.error = action.error.message;
      state.questionsLoading = false;
    },
    [fetchAllIndicatorsIE.pending]: (state, action) => {
      state.error = null;
      state.indicatorsLoading = true;
    },
    [fetchAllIndicatorsIE.fulfilled]: (state, action) => {
      state.indicators = action.payload;
      state.indicatorsLoading = false;
      state.lastUpdatedAt = Date.now();
    },
    [fetchAllIndicatorsIE.rejected]: (state, action) => {
      state.error = action.error.message;
      state.indicatorsLoading = false;
    },
    [createIndicatorIE.fulfilled]: (state, action) => {
      state.indicators = [...state.indicators, action.payload];
      state.indicatorsLoading = false;
      state.lastUpdatedAt = Date.now();
    },
    [createIndicatorIE.rejected]: (state, action) => {
      state.error = action.error.message;
      state.indicatorsLoading = false;
    },
    [updateIndicatorIE.fulfilled]: (state, action) => {
      state.indicators = state.indicators.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
      state.indicatorsLoading = false;
      state.lastUpdatedAt = Date.now();
    },
    [updateIndicatorIE.rejected]: (state, action) => {
      state.error = action.error.message;
      state.indicatorsLoading = false;
    },
    [deleteIndicatorIE.fulfilled]: (state, action) => {
      state.indicators = state.indicators.filter(
        (item) => item.id !== action.payload
      );
      state.indicatorsLoading = false;
      state.lastUpdatedAt = Date.now();
    },
    [deleteIndicatorIE.rejected]: (state, action) => {
      state.error = action.error.message;
      state.indicatorsLoading = false;
    },
  },
});

// export const {} = indicatorEditSlice.actions;

export default indicatorEditSlice.reducer;

/* selectors */

export const selectAllQuestionsIE = (state) => state.indicatorEdit.questions;

export const selectAllIndicatorsIE = (state) => state.indicatorEdit.indicators;

export const selectIsLoadingIE = (state) =>
  state.indicatorEdit.questionsLoading || state.indicatorEdit.indicatorsLoading;
