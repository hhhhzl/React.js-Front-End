import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
    apiGetAllQuestionExperts,
    apiCreateQuestionExpert,
    apiGetQuestionExpert,
    apiUpdateQuestionExpert,
    apiDeleteQuestionExpert,
  } from "../../api/junctions";

  /* initial state */

const initialState = {
    items: [],
    loading: false,
    error: null,
    lastUpdatedAt: null,
  };
  
  /* api thunks */
  
  export const fetchAllQuestionExperts = createAsyncThunk(
      "/quesiton_expert/fetchQuestionExperts", async () => {
    const response = await apiGetAllQuestionExperts();
    return response.data;
  });
  
  export const createQuestionExpert = createAsyncThunk(
    "/question_expert/createQuestionExpert",
    async ({ data }) => {
      const response = await apiCreateQuestionExpert(data);
      return response.data;
    }
  );

  export const getQuestionExpert = createAsyncThunk(
      "/question_expert/getQuestionExpert",
      async ({ questionID, expertID}) => {
        const response = await apiGetQuestionExpert(questionID, expertID);
        return response.data;
      }
  )
  
  export const updateQuestionExpert = createAsyncThunk(
    "question_expert/updateQuestionExpert",
    async ({ questionID, expertID, data }) => {
      const response = await apiUpdateQuestionExpert(questionID, expertID, data);
      return response.data;
    }
  );


  export const deleteQuestionExpert = createAsyncThunk(
    "question_expert/deleteQuestionExpert",
    async ({ questionID, expertID}) => {
      const response = await apiDeleteQuestionExpert(questionID, expertID);
      return response.data;
    }
  );

  const quesitonExpertSlice = createSlice({
    name: "question_expert",
    initialState: initialState,
    reducers: {},
    extraReducers: {
      [fetchAllQuestionExperts.pending]: (state, action) => {
        state.error = null;
        state.loading = true;
      },
      [fetchAllQuestionExperts.fulfilled]: (state, action) => {
        state.items = action.payload;
        state.error = null;
        state.loading = false;
        state.lastUpdatedAt = Date.now();
      },
      [fetchAllQuestionExperts.rejected]: (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      },    


      [createQuestionExpert.fulfilled]: (state, action) => {
        const idx = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (idx >= 0) {
          state.items[idx] = action.payload;
        }
        state.error = null;
        state.lastUpdatedAt = Date.now();
      },
      [createQuestionExpert.rejected]: (state, action) => {
        state.error = action.error.message;
      },

      [updateQuestionExpert.fulfilled]: (state, action) => {
        const idx = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (idx >= 0) {
          state.items[idx] = action.payload;
        }
        state.error = null;
        state.lastUpdatedAt = Date.now();
      },
      [updateQuestionExpert.rejected]: (state, action) => {
        state.error = action.error.message;
      },

      [deleteQuestionExpert.fulfilled]: (state, action) => {
        const idx = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (idx >= 0) {
          state.items[idx] = action.payload;
        }
        state.error = null;
        state.lastUpdatedAt = Date.now();
      },
      [deleteQuestionExpert.rejected]: (state, action) => {
        state.error = action.error.message;
      },


    },
  });

  export default quesitonExpertSlice.reducer;

  /* selectors */
export const selectAllQuestionExpert = (state) =>state.question_export.items;
