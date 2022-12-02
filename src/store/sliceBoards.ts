import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import axios from 'axios';
import { IBoard } from '../interfaces/interface';

export type ApiState = {
  token: string;
  user: string;
  boards: IBoard[];
  loading: boolean;
  currentBoard: IBoard | null;
};

export const initialState: ApiState = {
  token: '',
  user: '',
  boards: [],
  loading: true,
  currentBoard: null,
};

export const getAllBoards = createAsyncThunk('getAllBoards', async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(`boards`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(res.data);
  return res.data as IBoard[];
});

export const getUserBoards = createAsyncThunk('getUserBoards', async () => {
  const token = localStorage.getItem('token');
  const id = localStorage.getItem('id');
  const res = await axios.get(`boardsSet/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data as IBoard[];
});

export const createUserBoard = createAsyncThunk('createUserBoards', async (board: IBoard) => {
  const token = localStorage.getItem('token');
  await axios.post(`boards`, board, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return board;
});

export const editUserBoard = createAsyncThunk('editUserBoards', async (board: IBoard) => {
  const sendBoard = {
    title: board.title,
    owner: board.owner,
    users: [board.owner],
  };
  await axios.put(`boards/${board._id}`, sendBoard);
  return board;
});

export const deleteBoardFetch = createAsyncThunk('deleteUserBoard', async (board: IBoard) => {
  const token = localStorage.getItem('token');
  await axios.delete(`boards/${board._id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return board;
});

export const slice = createSlice({
  name: 'boards',
  initialState,

  reducers: {
    changeToken(state, action) {
      state.token = action.payload;
    },

    changeUser(state, action) {
      state.user = action.payload;
    },

    changeCurrentBoard(state, action) {
      state.currentBoard = action.payload;
    },
    changeBoards(state, action) {
      state.boards = action.payload;
    },

    addBoard(state, action) {
      state.boards.push(action.payload);
    },

    deleteBoard(state, action) {
      state.boards = state.boards.filter((el) => el._id !== action.payload._id);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllBoards.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllBoards.fulfilled, (state, action) => {
        state.boards = action.payload.length > 0 ? action.payload : [];
        state.loading = false;
      })
      .addCase(getAllBoards.rejected, (state, action) => {
        console.log(action.error);
        state.boards = [];
        state.loading = false;
      })
      .addCase(getUserBoards.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserBoards.fulfilled, (state, action) => {
        state.boards = action.payload.length > 0 ? action.payload : [];
        state.loading = false;
      })
      .addCase(getUserBoards.rejected, (state, action) => {
        console.log(action.error);
        state.boards = [];
        state.loading = false;
      })
      .addCase(createUserBoard.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUserBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.boards.push(action.payload);
        message.success('Project added');
      })
      .addCase(createUserBoard.rejected, (state, action) => {
        console.log(action.error);
        state.loading = false;
        message.error('Server error! Please try again');
      })
      .addCase(deleteBoardFetch.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBoardFetch.fulfilled, (state, action) => {
        state.loading = false;
        state.boards = state.boards.filter((el) => el._id !== action.payload._id);
        message.success('Project delete');
      })
      .addCase(deleteBoardFetch.rejected, (state, action) => {
        console.log(action.error);
        state.loading = false;
        message.error('Server error! Please try again');
      })
      .addCase(editUserBoard.pending, (state) => {
        state.loading = true;
      })
      .addCase(editUserBoard.fulfilled, (state, action) => {
        state.loading = false;
        const i = state.boards.findIndex((el) => el._id === action.payload._id);
        state.boards.splice(i, 1, action.payload);
        message.success('Project edited');
      })
      .addCase(editUserBoard.rejected, (state, action) => {
        console.log(action.error);
        state.loading = false;
        message.error('Server error! Please try again');
      });
  },
});

export default slice.reducer;

export const { changeToken, changeUser, changeCurrentBoard, changeBoards, addBoard, deleteBoard } =
  slice.actions;
