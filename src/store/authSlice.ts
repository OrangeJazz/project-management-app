import { IErrorResp } from './../interfaces/interface';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { IAuthState, IFormData, ISignInResp } from 'interfaces/interface';
import axios, { AxiosError } from 'axios';
import { message } from 'antd';

export const initialState: IAuthState = {
  login: '',
  name: '',
  id: '',
  token: '',
  loading: false,
};
export const handleSingUp = createAsyncThunk(
  'auth/handleSingUp',
  async (query: IFormData, { rejectWithValue }) => {
    try {
      const userData = await axios.post('/auth/signup', query);
      return userData.data;
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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleSingUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleSingUp.fulfilled, (state, action: PayloadAction<ISignInResp>) => {
        console.log(action.payload);
        state.login = action.payload.login;
        state.id = action.payload._id;
        state.name = action.payload.name;
        localStorage.setItem('login', action.payload.login);
        localStorage.setItem('id', action.payload._id);
        localStorage.setItem('name', action.payload.name);
        state.loading = false;
        message.success('acc created');
      })
      .addCase(handleSingUp.rejected, (state) => {
        state.login = '';
        state.id = '';
        state.name = '';
        state.loading = false;
        message.error('already exict');
      });
  },
});

export const { handleLogOut } = authSlice.actions;

export default authSlice.reducer;
