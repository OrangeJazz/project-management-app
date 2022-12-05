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
export const handleDeleteAcc = createAsyncThunk(
  'auth/handleDeleteAcc',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const id = localStorage.getItem('id');
      const resp = await axios.delete(`/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return resp.data;
    } catch (err) {
      const error = err as AxiosError<IErrorResp>;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
export const handleUpdateAcc = createAsyncThunk(
  'auth/handleUpdateAcc',
  async (query: IFormData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const id = localStorage.getItem('id');
      const resp = await axios.put(`/users/${id}`, query, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return resp.data;
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
        message.success('Account was created');
      })
      .addCase(handleSingUp.rejected, (state) => {
        state.isLoggedIn = false;
        state.loading = false;
        message.error('Account with this login already exist');
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
        message.success('You are logged in');
      })
      .addCase(handleSingIn.rejected, (state) => {
        state.isLoggedIn = false;
        state.loading = false;
        message.error('Incorrect login and/or password');
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
        message.success('Intial login');
      })
      .addCase(handleInitialRenderLogIn.rejected, (state) => {
        state.isLoggedIn = false;
        state.loading = false;
        message.error('Your token expired, please sign in again');
      })

      .addCase(handleDeleteAcc.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleDeleteAcc.fulfilled, (state) => {
        state.login = '';
        state.loading = false;
        state.id = '';
        state.name = '';
        state.isLoggedIn = false;
        localStorage.removeItem('id');
        localStorage.removeItem('token');
        message.success('Account deleted!');
      })
      .addCase(handleDeleteAcc.rejected, (state) => {
        state.loading = false;
        message.error('Oops something went wrong.. Try reload');
      })

      .addCase(handleUpdateAcc.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleUpdateAcc.fulfilled, (state, action: PayloadAction<ISignResp>) => {
        state.loading = false;
        state.login = action.payload.login;
        state.id = action.payload._id;
        state.name = action.payload.name;
        message.success('Account changed!');
      })
      .addCase(handleUpdateAcc.rejected, (state) => {
        state.loading = false;
        message.error('User with this login already exist');
      });
  },
});

export const { handleLogOut, handleFailedIntialLogIn } = authSlice.actions;

export default authSlice.reducer;
