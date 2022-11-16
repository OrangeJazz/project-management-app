import jwtDecode from 'jwt-decode';
import { IDecodedToken, IErrorResp, ISignUpResp } from './../interfaces/interface';
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
};
export const handleSingIn = createAsyncThunk(
  'auth/handleSingIn',
  async (query: IFormData, { rejectWithValue }) => {
    try {
      const repsSignInData = await axios.post('/auth/signin', query);
      return repsSignInData.data;
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
      localStorage.removeItem('login');
      localStorage.removeItem('id');
      localStorage.removeItem('name');
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleSingUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleSingUp.fulfilled, (state, action: PayloadAction<ISignUpResp>) => {
        state.login = action.payload.login;
        state.id = action.payload._id;
        state.name = action.payload.name;
        localStorage.setItem('id', action.payload._id);
        localStorage.setItem('token', action.payload.token);
        state.loading = false;
        message.success('acc created');
      })
      .addCase(handleSingUp.rejected, (state) => {
        state.loading = false;
        message.error('already exict');
      })
      .addCase(handleSingIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleSingIn.fulfilled, (state, action: PayloadAction<ISignUpResp>) => {
        const decodedData: IDecodedToken = jwtDecode(action.payload.token);
        state.id = decodedData.id;
        state.login = decodedData.login;
        localStorage.setItem('id', decodedData.id);
        localStorage.setItem('token', action.payload.token);
        state.loading = false;
        message.success('your logged');
      })
      .addCase(handleSingIn.rejected, (state) => {
        state.loading = false;
        message.error('no such account');
      });
  },
});

export const { handleLogOut } = authSlice.actions;

export default authSlice.reducer;
