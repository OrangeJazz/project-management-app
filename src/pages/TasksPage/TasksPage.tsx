import React, { useEffect, useState } from 'react';
import { Column, Task } from 'components';
import { IColumnData, IColunm } from 'interfaces/interface';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import styles from './TasksPage.module.scss';
import sortByOrder from 'utils/sortByOrder';
import { getTest } from 'store/columnDataSlice';

const TasksPage = () => {
  const [columns, setColums] = useState<IColumnData[]>([]);

  useEffect(() => {
    getTest().then((resp) => {
      console.log(resp);

      setColums(resp);
    });
  }, []);

  const dragEndHandler = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const startColumnID = source.droppableId;
    const endColumnID = destination.droppableId;
    const tasksOrder = [...columns];

    if (startColumnID === endColumnID) {
      const columnIndex = columns.findIndex((column) => column._id === startColumnID);
      const from = tasksOrder[columnIndex].tasks[source.index];
      const to = tasksOrder[columnIndex].tasks[destination.index];
      [to.order, from.order] = [from.order, to.order];
    } else {
      const sourceColumnIndex = columns.findIndex((column) => column._id === startColumnID);
      const destinationColumnIndex = columns.findIndex((column) => column._id === endColumnID);
      const [dragItem] = tasksOrder[sourceColumnIndex].tasks.splice(source.index, 1);
      tasksOrder[sourceColumnIndex].tasks.forEach((task, index) => (task.order = index));
      dragItem.columnId = endColumnID;
      dragItem.order = destination.index;
      tasksOrder[destinationColumnIndex].tasks.splice(destination.index, 0, dragItem);
      tasksOrder[destinationColumnIndex].tasks.forEach((task, index) => (task.order = index));
    }

    setColums(tasksOrder);
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
              {sortByOrder(column.tasks).map(
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
