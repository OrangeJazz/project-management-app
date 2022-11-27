import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import sortByOrder from 'utils/sortByOrder';
import { IColumn, IColumnData, ITask } from '../interfaces/interface';
const token = localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

interface IBoardID {
  boardID: string;
}

interface IState {
  columnsData: IColumnData[];
  loading: boolean;
}

const initialState: IState = {
  columnsData: [],
  loading: false,
};

export const getColumn = createAsyncThunk('columnDataSlice/getColumn', async (boardID: string) => {
  const { data } = await axios.get<IColumn[]>(`boards/${boardID}/columns/`);
  const columnsData: IColumnData[] = [];

  for await (const column of data) {
    const { data } = await axios.get(`/boards/${boardID}/columns/${column._id}/tasks/`);
    columnsData.push({ ...column, tasks: data });
  }
  return columnsData;
});

export interface IAddColumn extends IBoardID {
  title: string;
  order: number;
}

export const addColumn = createAsyncThunk(
  'columnDataSlice/addColumn',
  async (query: IAddColumn) => {
    const body = {
      title: query.title,
      order: query.order,
    };
    const { data } = await axios.post<IColumn>(`boards/${query.boardID}/columns/`, body);
    return data;
  }
);

export const deleteColumn = createAsyncThunk(
  'columnDataSlice/deleteColumn',
  async (column: IColumn) => {
    const deleteResponse = await axios.delete<IColumn>(
      `boards/${column.boardId}/columns/${column._id}`
    );
    return deleteResponse.data;
  }
);

interface IGetTask {
  boardID: string;
  columnID: string;
}

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

export const editTaskFetch = createAsyncThunk(
  'columnDataSlice/changeTask',
  async (params: ITask) => {
    const query = {
      title: params.title,
      description: params.description,
      order: params.order,
      columnId: params.columnId,
      userId: params.userId,
      users: params.users,
    };

    const { data } = await axios.put<ITask>(
      `/boards/${params.boardId}/columns/${params.columnId}/tasks/${params._id}`,
      query
    );
    return data;
  }
);

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

interface IUpdateTask {
  _id: string;
  columnId: string;
  order: number;
}

export const updateTaskList = createAsyncThunk(
  'columnDataSlice/updateTaskList',
  async (body: IUpdateTask[]) => {
    const { data } = await axios.patch<ITask[]>('/taskSet', body);

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
        state.columnsData = sortByOrder(action.payload);
        state.loading = false;
      })

      .addCase(addColumn.fulfilled, (state, action: PayloadAction<IColumn>) => {
        const columnData: IColumnData = { ...action.payload, tasks: [] };
        state.columnsData.push(columnData);
      })

      .addCase(deleteColumn.fulfilled, (state, action: PayloadAction<IColumn>) => {
        state.columnsData.splice(action.payload.order, 1);
      })

      .addCase(createTask.fulfilled, (state, action: PayloadAction<ITask>) => {
        const index = state.columnsData.findIndex(
          (column) => column._id === action.payload.columnId
        );
        state.columnsData[index].tasks.push(action.payload);
      })

      .addCase(editTaskFetch.fulfilled, (state, actions: PayloadAction<ITask>) => {
        const columnIndex = state.columnsData.findIndex(
          (column) => column._id === actions.payload.columnId
        );
        const taskIndex = state.columnsData[columnIndex].tasks.findIndex(
          (task) => task._id === actions.payload._id
        );
        state.columnsData[columnIndex].tasks.splice(taskIndex, 1, actions.payload);
      })

      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<ITask>) => {
        const columnIndex = state.columnsData.findIndex(
          (column) => column._id === action.payload.columnId
        );
        const taskIndex = state.columnsData[columnIndex].tasks.findIndex(
          (task) => task._id === action.payload._id
        );
        state.columnsData[columnIndex].tasks.splice(taskIndex, 1);
      });
  },
});

export default columnDataSilce.reducer;

export const { setColumnData } = columnDataSilce.actions;
