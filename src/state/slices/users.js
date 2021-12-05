import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { apiGetAllUsers, apiUpdateUser } from "../../api/users";

/* initial state */

const initialState = {
  items: [],
  loading: false,
  error: null,
  lastUpdatedAt: null,
};

/* api thunks */

export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async () => {
    const response = await apiGetAllUsers();
    return response.data;
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUsers",
  async ({ userID, data }) => {
    const response = await apiUpdateUser(userID, data);
    return response.data;
  }
);

/* slice */

const usersSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [fetchAllUsers.pending]: (state, action) => {
      state.error = null;
      state.loading = true;
    },
    [fetchAllUsers.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.error = null;
      state.loading = false;
      state.lastUpdatedAt = Date.now();
    },
    [fetchAllUsers.rejected]: (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    },    
    [updateUser.fulfilled]: (state, action) => {
      const idx = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (idx >= 0) {
        state.items[idx] = action.payload;
      }
      state.error = null;
      state.lastUpdatedAt = Date.now();
    },
    [updateUser.rejected]: (state, action) => {
      state.error = action.error.message;
    },
  },
});

export default usersSlice.reducer;

/* selectors */

export const selectAllUsers = (state) => state.users.items;
export const selectUserById = (state, id) =>
  state.users.items.find((item) => item.id === id);
export const selectErrorUsers = (state) => state.users.error;
export const selectIsLoadingUsers = (state) => state.users.loading;
export const selectLastUpdatedAtUsers = (state) => state.users.lastUpdatedAt;
export const selectAllAdmins = (state) => state.users.items.filter(u => u.user_type === "A");
