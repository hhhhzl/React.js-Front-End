import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiLoginUser,
  apiRegisterUser,
  apiUpdateUser,
  apiGetTokenProfile,
} from "../../api/users";
import { TOKEN_LOCAL_STORAGE_KEY } from "../../constants/values";

/* initial state */

const initialState = {
  token: localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY) || null,
  profile: null,
  loading: false,
  error: null,
};

/* api thunks */

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await apiLoginUser(username, password);
      return response.data;
    } catch (err) {
      const { message, response } = err;
      return rejectWithValue({ message, response });
    }
  }
);

export const register = createAsyncThunk("auth/register", async ({ data }) => {
  const response = await apiRegisterUser(data);
  return response.data;
});

// export const update= createAsyncThunk(
//   "auth/update", async()=>{
//     const response= await apiUpdateUser();
//     return response.data;
//   }
// )
export const getTokenProfile = createAsyncThunk(
  "auth/getTokenProfile",
  async () => {
    const response = await apiGetTokenProfile();
    return response.data;
  }
);

/* slice */

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.removeItem(TOKEN_LOCAL_STORAGE_KEY);
      state.profile = null;
      state.error = null;
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, action.payload.token);
      state.profile = action.payload.profile;
      state.error = null;
    },
    [login.rejected]: (state, action) => {
      console.log(action);
      state.loading = false;
      state.token = null;
      localStorage.removeItem(TOKEN_LOCAL_STORAGE_KEY);
      state.profile = null;
      state.error = action.payload.message;
    },
    [getTokenProfile.pending]: (state, action) => {
      state.loading = true;
    },
    [getTokenProfile.fulfilled]: (state, action) => {
      state.loading = false;
      state.profile = action.payload?.profile;
      state.error = null;
    },
    [getTokenProfile.rejected]: (state, action) => {
      state.loading = false;
      state.token = null;
      localStorage.removeItem(TOKEN_LOCAL_STORAGE_KEY);
      state.profile = null;
      state.error = action.payload.message;
    },
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;

/* selectors */

export const selectAuthToken = (state) => state.auth.token;

export const selectAuthUserProfile = (state) => state.auth.profile;

export const selectAuthError = (state) => state.auth.error;

export const selectAuthUserOrg = (state) => state.auth.profile?.org;
