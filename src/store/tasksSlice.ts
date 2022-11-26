import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ITask } from '../interfaces/interface';
const token = localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

interface IGetTask {
  boardID: string;
  columnID: string;
}

const initialTasks: ITask[] = [];

export const getTasksFetch = createAsyncThunk(
  'taskSlice/getTasksFetch',
  async (query: IGetTask) => {
    const { data } = await axios.get(`/boards/${query.boardID}/columns/${query.columnID}/tasks`);
    return data;
  }
);

export interface ICreateTask extends IGetTask {
  title: string;
  order: number;
  description: string;
  userId: string;
  users: string[];
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: initialTasks,
  reducers: {},
  extraReducers: (builder) =>
    builder.addCase(getTasksFetch.fulfilled, (state, actions: PayloadAction<ITask[]>) => {
      state = actions.payload;
    }),
});

export default tasksSlice.reducer;
