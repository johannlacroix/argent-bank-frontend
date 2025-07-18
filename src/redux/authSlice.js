import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// imports fonctions appel API : login, profil, mise à jour
import { login, getProfile, updateProfile } from "../api/authService";

// Thunk : loginUser
// création d’un Thunk asynchrone pour la connexion : createAsyncThunk gère automatiquement les états pending, fulfilled, rejected
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await login(email, password); // appel API de login
      const token = response.data.body.token; // stockage du token localement
      localStorage.setItem("token", token);
      return token;
    } catch (err) {
      return thunkAPI.rejectWithValue("Identifiants invalides"); // gestion de l’erreur
    }
  }
);

// Thunk : fetchUserProfile
export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (_, thunkAPI) => {
    // récupère profil utilisateur connecté, après token disponible dans store Redux
    try {
      const token = thunkAPI.getState().auth.token;// récupération du token dans Redux
      const response = await getProfile(token);// appel à l’API
      return response.data.body; // retourne les infos utilisateur (nom, email, etc.)
    } catch (err) {
      return thunkAPI.rejectWithValue(
        "Erreur lors de la récupération du profil"
      );
    }
  }
);

// Thunk : updateUserProfile
export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async (newUserName, thunkAPI) => {
    //Pour mettre à jour ou modifier le nom d’utilisateur via une requête PUT
    const token = thunkAPI.getState().auth.token; // utilise token du store
    try {
      const response = await updateProfile(token, newUserName);
      return response.data.body; // retourne les nouvelles données
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
    token: localStorage.getItem("token") || null, // persistance du token
    user: null, // infos utilisateur
    error: null, // message d’erreur eventuel
    loading: false, // état de chargement pour les requêtes
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token"); // déconnexion complète
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null; // reset erreurs
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload; // token récupéré
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // affichage d’une erreur de login
      })
      // fetchUserProfile
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        console.log("Profil utilisateur récupéré:", action.payload);
      })
      // updateUserProfile
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload; // mise à jour du nom d’utilisateur dans le store
      });
  },
});

export const { logout } = authSlice.actions; // export action logout
export default authSlice.reducer; // export du reducer pour qu'il soit dispo dans store global
