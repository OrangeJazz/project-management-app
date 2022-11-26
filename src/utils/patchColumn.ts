import axios, { AxiosError } from 'axios';
import { IColumnData, IColumn } from 'interfaces/interface';
import sortByOrder from './sortByOrder';

const patchColumn = async (query: IColumnData[]) => {
  console.log('patched');
  const patchState = sortByOrder(query).map((columndata) => {
    const { order, _id } = columndata;
    return { order, _id };
  });
  try {
    axios.patch<IColumn[]>('/columnsSet', patchState);
  } catch (error) {
    console.log((error as AxiosError).message);
  }
};

export default patchColumn;
