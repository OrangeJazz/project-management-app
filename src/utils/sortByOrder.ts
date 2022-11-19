import { IColunm, ITask } from 'interfaces/interface';

const sortByOrder = <T extends Array<ITask | IColunm>>(arg: T): T =>
  arg.sort((a, b) => (a.order > b.order ? 1 : -1));

export default sortByOrder;
