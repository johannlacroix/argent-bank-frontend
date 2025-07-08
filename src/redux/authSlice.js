import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, getProfile, updateProfile } from "../api/authService";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await login(email, password);
      const token = response.data.body.token;
      localStorage.setItem("token", token);
      return token;
    } catch (err) {
      return thunkAPI.rejectWithValue("Identifiants invalides");
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await getProfile(token);
      return response.data.body;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        "Erreur lors de la récupération du profil"
      );
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async (newUserName, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    try {
      const response = await updateProfile(token, newUserName);
      return response.data.body;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        "Erreur lors de la mise à jour du profil"
      );
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    user: null,
    error: null,
    loading: false,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        console.log("Profil utilisateur récupéré:", action.payload);
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
