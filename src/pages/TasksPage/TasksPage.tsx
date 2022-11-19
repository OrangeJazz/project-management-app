import React, { useState } from 'react';
import { Column, Task } from 'components';
import { IColunm, ITask } from 'interfaces/interface';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import styles from './TasksPage.module.scss';
import sortByOrder from 'utils/sortByOrder';

const TasksList: ITask[] = [
  {
    _id: '2',
    title: 'tytle2',
    order: 2,
    boardId: '0',
    columnId: '0',
    description: 'descript2',
    userId: 555,
    users: ['vasya, lesha'],
  },
  {
    _id: '3',
    title: 'tytle3',
    order: 3,
    boardId: '0',
    columnId: '0',
    description: 'descript3',
    userId: 555,
    users: ['lesha, petya'],
  },
  {
    _id: '4',
    title: 'tytle4',
    order: 4,
    boardId: '0',
    columnId: '0',
    description: 'descript3',
    userId: 555,
    users: ['lesha, petya'],
  },
  {
    _id: '0',
    title: 'tytle0',
    order: 0,
    boardId: '0',
    columnId: '0',
    description: 'descript0',
    userId: 555,
    users: ['lesha, petya'],
  },
];

const ColumnList: IColunm[] = [
  {
    _id: '1',
    title: 'column1',
    order: 0,
    boardId: '0',
  },
  {
    _id: '0',
    title: 'column2',
    order: 1,
    boardId: '0',
  },
];

const TasksPage = () => {
  const [columns, setColums] = useState<IColunm[]>(ColumnList);
  const [tasks, setTasks] = useState<ITask[]>(TasksList);

  const dragEndHandler = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const tasksOrder = [...tasks];
    const from = tasksOrder[source.index];
    const to = tasksOrder[destination.index];

    [from.columnId, to.columnId] = [to.columnId, from.columnId];
    [from.order, to.order] = [to.order, from.order];

    console.log(tasksOrder);

    setTasks(sortByOrder(tasksOrder));
  };

  const createTask = (column: IColunm) => {
    console.log(`in ${column} created new task`);
  };

  return (
    <>
      <h2>Project Title</h2>

      <div className={styles['column-container']}>
        <DragDropContext onDragEnd={dragEndHandler}>
          {sortByOrder(columns).map((column) => (
            <Column column={column} key={column._id} onCreate={() => createTask(column)}>
              {sortByOrder(tasks).map(
                (task, index) =>
                  task.columnId === column._id && (
                    <Task key={task._id} task={task} taskOrder={index} />
                  )
              )}
            </Column>
          ))}
        </DragDropContext>
      </div>
    </>
  );
};

export default TasksPage;
