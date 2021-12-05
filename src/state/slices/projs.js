import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
    apiCreateProject,
    apiGetAllProjects,
    apiUpdateProject,
  } from "../../api/projects";

  /* initial state */

const initialState = {
    items: [],
    loading: false,
    error: null,
    lastUpdatedAt: null,
  };
  
  /* api thunks */
  
  export const fetchAllProjects = createAsyncThunk("projects/fetchAllProjects", async () => {
    const response = await apiGetAllProjects();
    return response.data;
  });
  
  export const CreateProject = createAsyncThunk(
    "projects/createProject",
    async ({ data }) => {
      const response = await apiCreateProject(data);
      return response.data;
    }
  );
  
  export const updateProject = createAsyncThunk(
    "projects/updateProject",
    async ({ projectID, data }) => {
      const response = await apiUpdateProject(projectID, data);
      return response.data;
    }
  );

  
  /* slice */
  
  const ProjectsSlice = createSlice({
    name: "projects",
    initialState: initialState,
    reducers: {},
    extraReducers: {
      [fetchAllProjects.pending]: (state, action) => {
        state.error = null;
        state.loading = true;
      },
      [fetchAllProjects.fulfilled]: (state, action) => {
        state.items = action.payload;
        state.loading = false;
        state.lastUpdatedAt = Date.now();
      },
      [fetchAllProjects.rejected]: (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      },
      [CreateProject.fulfilled]: (state, action) => {
        state.items = [...state.items, action.payload];
        state.error = null;
        state.lastUpdatedAt = Date.now();
      },
      [CreateProject.rejected]: (state, action) => {
        console.log(action);
        state.error = action.error.message;
      },
      [updateProject.fulfilled]: (state, action) => {
        const idx = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (idx >= 0) {
          state.items[idx] = action.payload;
        }
        state.error = null;
        state.lastUpdatedAt = Date.now();
      },
      [updateProject.rejected]: (state, action) => {
        state.error = action.error.message;
      },
    },
  });
  
  export default ProjectsSlice.reducer;
  
  /* selectors */
  
  export const selectAllProjects = (state) => state.projs.items;
  export const selectProjectsById = (state, id) =>
    state.projs.items.find((item) => item.id === id);
  export const selectErrorProjects = (state) => state.projs.error;
  export const selectIsLoadingProjects = (state) => state.projs.loading;
  export const selectLastUpdatedAtProjects = (state) => state.projs.lastUpdatedAt;
  