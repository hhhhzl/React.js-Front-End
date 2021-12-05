import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  apiCreateOrg,
  apiDeleteOrg,
  apiGetAllOrgs,
  apiUpdateOrg,
} from "../../api/organizations";

/* initial state */

const initialState = {
  items: [],
  loading: false,
  error: null,
  lastUpdatedAt: null,
};

/* api thunks */

export const fetchAllOrgs = createAsyncThunk("orgs/fetchAllOrgs", async () => {
  const response = await apiGetAllOrgs();
  return response.data;
});

export const createOrg = createAsyncThunk(
  "orgs/createOrg",
  async ({ data }) => {
    const response = await apiCreateOrg(data);
    return response.data;
  }
);

export const updateOrg = createAsyncThunk(
  "orgs/updateOrg",
  async ({ orgID, data }) => {
    const response = await apiUpdateOrg(orgID, data);
    return response.data;
  }
);

export const deleteOrg = createAsyncThunk(
  "orgs/deleteOrg",
  async ({ orgID }) => {
    const response = await apiDeleteOrg(orgID);
    return parseInt(orgID);
  }
);

/* slice */

const OrgsSlice = createSlice({
  name: "orgs",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [fetchAllOrgs.pending]: (state, action) => {
      state.error = null;
      state.loading = true;
    },
    [fetchAllOrgs.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.loading = false;
      state.lastUpdatedAt = Date.now();
    },
    [fetchAllOrgs.rejected]: (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    },
    [createOrg.fulfilled]: (state, action) => {
      state.items = [...state.items, action.payload];
      state.error = null;
      state.lastUpdatedAt = Date.now();
    },
    [createOrg.rejected]: (state, action) => {
      console.log(action);
      state.error = action.error.message;
    },
    [updateOrg.fulfilled]: (state, action) => {
      const idx = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (idx >= 0) {
        state.items[idx] = action.payload;
      }
      state.error = null;
      state.lastUpdatedAt = Date.now();
    },
    [updateOrg.rejected]: (state, action) => {
      state.error = action.error.message;
    },
    [deleteOrg.fulfilled]: (state, action) => {
      console.log(action);
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.error = null;
      state.lastUpdatedAt = Date.now();
    },
    [deleteOrg.rejected]: (state, action) => {
      state.error = action.error.message;
    },
  },
});

export default OrgsSlice.reducer;

/* selectors */

export const selectAllOrgs = (state) => state.orgs.items;
export const selectOrgById = (state, id) =>
  state.orgs.items.find((item) => item.id === id);
export const selectErrorOrgs = (state) => state.orgs.error;
export const selectIsLoadingOrgs = (state) => state.orgs.loading;
export const selectLastUpdatedAtOrgs = (state) => state.orgs.lastUpdatedAt;
