import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { message } from 'antd';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import sortByOrder from 'utils/sortByOrder';
import { IColumnData, IColunm, ITask } from '../interfaces/interface';

const token = localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

interface IState {
  columnsData: IColumnData[];
  loading: boolean;
}

const initialState: IState = {
  columnsData: [],
  loading: false,
};

export const getColumn = createAsyncThunk('columnDataSlice/getColumn', async (boardID: string) => {
  const { data } = await axios.get<IColunm[]>(`boards/${boardID}/columns/`);
  const columnsData: IColumnData[] = [];

  for await (const column of data) {
    const { data } = await axios.get<ITask[]>(`/boards/${boardID}/columns/${column._id}/tasks/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    columnsData.push({ ...column, tasks: data });
  }
  return columnsData;
});

interface IAddColumn {
  boardID: string;
  tytle: string;
  order: string;
}

const addColumn = createAsyncThunk('columnDataSlice/addColumn', async (query: IAddColumn) => {
  const body = {
    title: query.tytle,
    order: query.order,
  };
  const { data } = await axios.post<IColunm>(`boards/${query.boardID}/columns/`, body);
  return data;
});

interface ChangeColumn extends IAddColumn {
  columnID: string;
}

const changeColumn = createAsyncThunk(
  'columnDataSlice/changeColumn',
  async (query: ChangeColumn) => {
    const body = {
      title: query.tytle,
      order: query.order,
    };
    const { data } = await axios.put<IColunm>(
      `boards/${query.boardID}/columns/${query.columnID}`,
      body
    );
    return data;
  }
);

const deleteColumn = createAsyncThunk(
  'columnDataSlice/deleteColumn',
  async (query: ChangeColumn) => {
    const { data } = await axios.delete<IColunm>(
      `boards/${query.boardID}/columns/${query.columnID}`
    );
    return data;
  }
);

interface IGetTask {
  boardID: string;
  columnID: string;
}
// const getTask = createAsyncThunk('columnDataSlice/getTask', async (params: IGetTask) => {

// })

export interface ICreateTask extends IGetTask {
  title: string;
  order: number;
  description: string;
  userId: string;
  users: string[];
}

export const createTask = createAsyncThunk(
  'columnDataSlice/createTask',
  async (params: ICreateTask) => {
    const body = {
      title: params.title,
      order: params.order,
      description: params.description,
      userId: params.userId,
      users: [params.userId],
    };
    const { data } = await axios.post<ITask>(
      `boards/${params.boardID}/columns/${params.columnID}/tasks`,
      body
    );

    return data;
  }
);

// const changeTask = createAsyncThunk('columnDataSlice/changeTask', async (params: type) => {

// })

export interface IDeleteTask extends IGetTask {
  taskID: string;
}
export const deleteTask = createAsyncThunk(
  'columnDataSlice/deleteTask',
  async (params: IDeleteTask) => {
    const { data } = await axios.delete<ITask>(
      `boards/${params.boardID}/columns/${params.columnID}/tasks/${params.taskID}`
    );
    return data;
  }
);

export const columnDataSilce = createSlice({
  name: 'columnData',
  initialState: initialState,
  reducers: {
    setColumnData(state, action) {
      state.columnsData = sortByOrder(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getColumn.pending, (state) => {
        state.loading = true;
      })
      .addCase(getColumn.fulfilled, (state, action) => {
        console.log(sortByOrder(action.payload));
        state.columnsData = sortByOrder(action.payload);
        state.loading = false;
      })
      .addCase(createTask.fulfilled, (state, action: PayloadAction<ITask>) => {
        const index = state.columnsData.findIndex((colum) => colum._id === action.payload.columnId);
        state.columnsData[index].tasks.push(action.payload);
      })

      .addCase(deleteTask.fulfilled, (state, action) => {
        const findTaskIndex = (state: IColumnData[], taskID: string) => {
          let findedTask: ITask = {
            _id: '',
            title: '',
            boardId: '',
            columnId: '',
            description: '',
            order: 0,
            userId: '',
            users: [],
          };
          state.forEach((column) => {
            column.tasks.forEach((task) => {
              if (task._id === taskID) {
                findedTask = task;
              }
            });
          });
          console.log(findedTask);

          return findedTask;
        };

        const actualTask = findTaskIndex(state.columnsData, action.payload._id);
        console.log(actualTask);
        const columnIndex = state.columnsData.findIndex((column) => column._id === actualTask._id);
        const taskIndex = state.columnsData[columnIndex].tasks.findIndex(
          (task) => task._id === actualTask._id
        );
        state.columnsData[columnIndex].tasks.splice(taskIndex, 1);
        state.columnsData[columnIndex].tasks = sortByOrder(state.columnsData[columnIndex].tasks);
      });
  },
});

export const getTest = async (boardID: string) => {
  const token = localStorage.getItem('token');
  const { data } = await axios.get<IColunm[]>(`boards/${boardID}/columns/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const columnsData: IColumnData[] = [];

  for await (const column of data) {
    const { data } = await axios.get<ITask[]>(`/boards/${boardID}/columns/${column._id}/tasks/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    columnsData.push({ ...column, tasks: data });
  }
  return columnsData;
};

export default columnDataSilce.reducer;

export const { setColumnData } = columnDataSilce.actions;
