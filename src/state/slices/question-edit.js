import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  apiGetAllQuestions,
  apiGetQuestion,
  apiCreateQuestion,
  apiUpdateQuestion,
  apiDeleteQuestion,
} from "../../api/questions";

/* initial state */

const initialState = {
  questions: [],
  drafts: [],
  draftDeletes: [],
  loading: false,
  error: null,
  lastUpdatedAt: null,
};

/* api thunks */

export const fetchAllQuestionsQE = createAsyncThunk(
  "questionEdit/fetchAllQuestionsQE",
  async (params) => {
    const response = await apiGetAllQuestions(params);
    return response.data;
  }
);

export const getQuestionQE = createAsyncThunk(
  "questionEdit/getQuestionQE",
  async ({QuestionID}) =>{
    const response = await apiGetQuestion(QuestionID);
    return response.data;
    
  }
)

export const createQuestionQE = createAsyncThunk(
  "questionEdit/createQuestionQE",
  async ({ data }) => {
    const response = await apiCreateQuestion(data);
    return response.data;
  }
);

export const updateQuestionQE = createAsyncThunk(
  "questionEdit/updateQuestionQE",
  async ({ id, data }) => {
    const response = await apiUpdateQuestion(id, data);
    return response.data;
  }
);

export const commitDraftsQE = createAsyncThunk(
  "questionEdit/commitDraftQE",
  async (_, { getState }) => {
    const state = getState();
    const { drafts, draftDeletes } = state.questionEdit;

    // update orders
    const orderedDrafts = drafts.map((d, idx) => ({ ...d, order: idx }));

    // create payload
    const createPayload = orderedDrafts
      .filter((d) => typeof d.id === "string") // find items with temp ids
      .map(({ id, ...data }) => data); // remove temp ids
    const updatePayload = orderedDrafts
      .filter((d) => typeof d.id !== "string") // find items with real ids
      .map(({ id, ...data }) => ({ id, data })); // separate id from data
    const deletePayload = draftDeletes;

    // make request
    let requests = [
      ...createPayload.map((p) => apiCreateQuestion(p)),
      ...updatePayload.map((p) => apiUpdateQuestion(p.id, p.data)),
      ...deletePayload.map((p) => apiDeleteQuestion(p)),
    ];
    const response = await axios.all(requests);
    return response.map((res) => res.data);
  }
);

/* slice */

const questionEditSlice = createSlice({
  name: "question-edit",
  initialState: initialState,
  reducers: {
    createDraftItemQE: (state, action) => {
      const { data } = action.payload;
      state.drafts.push(data);
    },
    updateDraftItemQE: (state, action) => {
      const { id, data } = action.payload;
      state.drafts = state.drafts.map((item) =>
        item.id === id ? { ...item, ...data } : item
      );
    },
    deleteDraftItemQE: (state, action) => {
      const { id } = action.payload;
      state.drafts = state.drafts.filter((item) => item.id !== id);
      if (typeof id !== "string") {
        // string ids are temp (not in db)
        state.draftDeletes.push(id);
      }
    },
    swapDraftItemIndicesQE: (state, action) => {
      const { idx1, idx2 } = action.payload;
      if (
        0 <= idx1 &&
        idx1 < state.drafts.length &&
        0 <= idx2 &&
        idx2 < state.drafts.length
      )
        [state.drafts[idx1], state.drafts[idx2]] = [
          state.drafts[idx2],
          state.drafts[idx1],
        ];
    },
  },
  extraReducers: {
    [fetchAllQuestionsQE.pending]: (state, action) => {
      state.error = null;
      state.loading = true;
    },
    [fetchAllQuestionsQE.fulfilled]: (state, action) => {
      const curQuestions = action.payload.sort(
        (item1, item2) => item1.order - item2.order
      );
      state.questions = curQuestions;
      state.drafts = curQuestions;
      state.draftDeletes = [];
      state.loading = false;
      state.lastUpdatedAt = Date.now();
    },
    [fetchAllQuestionsQE.rejected]: (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    },
    [commitDraftsQE.fulfilled]: (state, action) => {
      const curQuestions = action.payload
        .filter((item) => item !== "")
        .sort((item1, item2) => item1.order - item2.order);
      console.log(curQuestions);
      state.questions = curQuestions;
      state.drafts = curQuestions;
      state.draftDeletes = [];
      // state.loading = false;
      state.lastUpdatedAt = Date.now();
    },
    [commitDraftsQE.rejected]: (state, action) => {
      state.error = action.error.message;
      // state.loading = false;
    },

  },
});

export const {
  createDraftItemQE,
  updateDraftItemQE,
  deleteDraftItemQE,
  swapDraftItemIndicesQE,
} = questionEditSlice.actions;

export default questionEditSlice.reducer;

/* selectors */

export const selectAllQuestionsQE = (state) => state.questionEdit.questions;

export const selectDraftsQE = (state) => state.questionEdit.drafts;

export const selectIsLoadingQE = (state) => state.questionEdit.loading;
