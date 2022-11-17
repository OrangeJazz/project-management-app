import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/api';
import { IBoard } from '../../types/api-types';

const boardsMock: IBoard[] = [
  {
    _id: '1',
    title: 'title1',
    owner: 'owner1',
    users: ['owner1'],
  },
  {
    _id: '2',
    title: 'title2',
    owner: 'owner2',
    users: ['owner2'],
  },
  {
    _id: '3',
    title: 'title3',
    owner: 'owner3',
    users: ['owner3'],
  },
  {
    _id: '4',
    title: 'title4',
    owner: 'owner4',
    users: ['owner4'],
  },
  {
    _id: '5',
    title: 'title5',
    owner: 'owner5',
    users: ['owner5'],
  },
  {
    _id: '6',
    title: 'title6',
    owner: 'owner6',
    users: ['owner6'],
  },
];

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
  boards: boardsMock,
  loading: true,
  currentBoard: null,
};

interface NewBoard {
  user: string;
  board: IBoard;
}

// export const getAllBoards = createAsyncThunk('getAllBoards', async () => {
//   return (await axiosInstance.get(`boards`)) as IBoard[];
// });

// export const getUserBoards = createAsyncThunk('getUserBoards', async (userID) => {
//   return (await axiosInstance.get(`boards/${userID}`)) as IBoard[];
// });

// export const createUserBoards = createAsyncThunk('createUserBoards', async (state: NewBoard) => {
//   return (await axiosInstance.post(`boards/${state.user}`, state.board)) as IBoard[];
// });
// export const deleteUserBoard = createAsyncThunk('deleteUserBoard', async (state: IBoard) => {
//   return await axiosInstance.delete(`boards/${state._id}`);
// });

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

  // extraReducers: (builder) => {
  //   builder
  //     .addCase(getUserBoards.pending, (state) => {
  //       state.loading = true;
  //     })
  //     .addCase(getUserBoards.fulfilled, (state, action) => {
  //       state.boards = action.payload as IBoard[];
  //       state.loading = false;
  //     })
  //     .addCase(getUserBoards.rejected, (state, action) => {
  //       console.log(action.error);
  //       state.boards = [];
  //       state.loading = false;
  //     })
  //     .addCase(createUserBoards.pending, (state) => {
  //       state.loading = true;
  //     })
  //     .addCase(createUserBoards.fulfilled, (state, action) => {
  //       state.loading = false;
  //     })
  //     .addCase(createUserBoards.rejected, (state, action) => {
  //       console.log(action.error);
  //       state.loading = false;
  //     });
  // },
});

export default slice.reducer;

export const { changeToken, changeUser, changeCurrentBoard, changeBoards, addBoard, deleteBoard } =
  slice.actions;
