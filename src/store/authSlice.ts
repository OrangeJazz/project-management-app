import jwtDecode from 'jwt-decode';
import { IDecodedToken, IErrorResp, ISignResp, ILocalStorageData } from './../interfaces/interface';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { IAuthState, IFormData } from 'interfaces/interface';
import axios, { AxiosError } from 'axios';
import { message } from 'antd';

export const initialState: IAuthState = {
  login: '',
  name: '',
  id: '',
  token: '',
  loading: false,
  isLoggedIn: null,
};
export const handleSingIn = createAsyncThunk(
  'auth/handleSingIn',
  async (query: IFormData, { rejectWithValue }) => {
    try {
      const repsSignInData = await axios.post('/auth/signin', query);
      const decodedData: IDecodedToken = jwtDecode(repsSignInData.data.token);
      const respUserData = await axios.get(`/users/${decodedData.id}`, {
        headers: { Authorization: `Bearer ${repsSignInData.data.token}` },
      });
      return { ...respUserData.data, ...repsSignInData.data };
    } catch (err) {
      const error = err as AxiosError<IErrorResp>;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
export const handleInitialRenderLogIn = createAsyncThunk(
  'auth/handleInitialRenderLogIn',
  async (localStorageData: ILocalStorageData, { rejectWithValue }) => {
    try {
      const { id, token } = localStorageData;
      const reps = await axios.get(`/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return reps.data;
    } catch (err) {
      const error = err as AxiosError<IErrorResp>;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
export const handleSingUp = createAsyncThunk(
  'auth/handleSingUp',
  async (query: IFormData, { rejectWithValue }) => {
    try {
      const repsSignUpData = await axios.post('/auth/signup', query);
      const { login, password } = query;
      const repsSignInData = await axios.post('/auth/signin', { login, password });
      return { ...repsSignInData.data, ...repsSignUpData.data };
    } catch (err) {
      const error = err as AxiosError<IErrorResp>;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    handleLogOut(state) {
      state.login = '';
      state.id = '';
      state.name = '';
      state.isLoggedIn = false;
      localStorage.removeItem('id');
      localStorage.removeItem('token');
    },
    handleFailedIntialLogIn(state) {
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleSingUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleSingUp.fulfilled, (state, action: PayloadAction<ISignResp>) => {
        state.isLoggedIn = true;
        state.login = action.payload.login;
        state.id = action.payload._id;
        state.name = action.payload.name;
        localStorage.setItem('id', action.payload._id);
        localStorage.setItem('token', action.payload.token);
        state.loading = false;
        message.success('acc created');
      })
      .addCase(handleSingUp.rejected, (state) => {
        state.isLoggedIn = false;
        state.loading = false;
        message.error('already exict');
      })

      .addCase(handleSingIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleSingIn.fulfilled, (state, action: PayloadAction<ISignResp>) => {
        state.isLoggedIn = true;
        state.id = action.payload._id;
        state.login = action.payload.login;
        state.name = action.payload.name;
        localStorage.setItem('id', action.payload._id);
        localStorage.setItem('token', action.payload.token);
        state.loading = false;
        message.success('your logged');
      })
      .addCase(handleSingIn.rejected, (state) => {
        state.isLoggedIn = false;
        state.loading = false;
        message.error('no such account');
      })

      .addCase(handleInitialRenderLogIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleInitialRenderLogIn.fulfilled, (state, action: PayloadAction<ISignResp>) => {
        state.isLoggedIn = true;
        state.id = action.payload._id;
        state.name = action.payload.name;
        state.login = action.payload.login;
        state.loading = false;
        message.success('intial login');
      })
      .addCase(handleInitialRenderLogIn.rejected, (state) => {
        state.isLoggedIn = false;
        state.loading = false;
        message.error('please log in again');
      });
  },
});

export const { handleLogOut, handleFailedIntialLogIn } = authSlice.actions;

export default authSlice.reducer;
