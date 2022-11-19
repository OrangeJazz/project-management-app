import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import axios from 'axios';
import { IBoard, IColumnData, IColunm, ITask } from '../interfaces/interface';

const boardID = '6379054469fc3d113d896289';

const getCoulumn = createAsyncThunk('columnDataSlice/colunmData', async () => {
  const token = localStorage.getItem('token');
  const { data } = await axios.get<IColunm[]>(`boards/${boardID}/columns/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const columnsData = data.map(async (colunm) => {
    const { data } = await axios.get<ITask[]>(`/boards/${boardID}/columns/${colunm._id}/tasks`);
    return { ...colunm, task: data };
  });
});

export const getTest = async () => {
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
  // const columnsData = data.map(async (colunm) => {
  // 	const { data } = await axios.get<ITask[]>(`/boards/${boardID}/columns/${colunm._id}/tasks`)
  // 	return { ...colunm, task: data }
  // })
  return columnsData;
};
