import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import memoizedGet from 'utils/memoizedGet';
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
    const data: ITask[] = (await memoizedGet(
      `/boards/${boardID}/columns/${column._id}/tasks/`
    )) as ITask[];
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
        console.log(sortByOrder(action.payload));
        state.columnsData = sortByOrder(action.payload);
        state.loading = false;
      })

      .addCase(addColumn.fulfilled, (state, action: PayloadAction<IColumn>) => {
        const columnData: IColumnData = { ...action.payload, tasks: [] };
        console.log('columnData', columnData);
        state.columnsData.push(columnData);
      })

      .addCase(deleteColumn.fulfilled, (state, action: PayloadAction<IColumn>) => {
        state.columnsData.splice(action.payload.order, 1);
      })

      .addCase(createTask.fulfilled, (state, action: PayloadAction<ITask>) => {
        const index = state.columnsData.findIndex((colum) => colum._id === action.payload.columnId);
        state.columnsData[index].tasks.push(action.payload);
      })

      // .addCase(updateTaskList.fulfilled, (state, action) => {
      //   action.payload.map(() => )
      //  })

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
  const { data } = await axios.get<IColumn[]>(`boards/${boardID}/columns/`, {
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
