import { IColumnData, IColunm, ITask } from 'interfaces/interface';

const sortByOrder = <T extends Array<ITask | IColunm | IColumnData>>(arg: T): T => {
  const copyArr: T = JSON.parse(JSON.stringify(arg));
  copyArr.sort((a, b) => (a.order > b.order ? 1 : -1));
  copyArr.forEach((e, i) => (e.order = i));
  return copyArr;
};

export default sortByOrder;
