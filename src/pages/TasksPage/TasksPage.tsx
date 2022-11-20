import React, { useEffect } from 'react';
import { Column, Task } from 'components';
import { IColumnData, IColunm, ITask } from 'interfaces/interface';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import styles from './TasksPage.module.scss';
import {
  createTask,
  deleteTask,
  getColumn,
  ICreateTask,
  IDeleteTask,
  setColumnData,
} from 'store/columnDataSlice';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks';
import { Spin } from 'antd';

const TasksPage = () => {
  const { id } = useParams();
  const columns = useAppSelector((state) => state.columnData.columnsData);
  const user = useAppSelector((state) => state.auth);
  const loading = useAppSelector((state) => state.columnData.loading);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getColumn(id));
    }
  }, [dispatch, id]);

  const dragEndHandler = (result: DropResult) => {
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }

    const tasksOrder: IColumnData[] = JSON.parse(JSON.stringify(columns));

    if (type === 'columns') {
      const [item] = tasksOrder.splice(source.index, 1);
      tasksOrder.splice(destination.index, 0, item);
      tasksOrder.forEach((elem, index) => (elem.order = index));
      dispatch(setColumnData(tasksOrder));
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const startColumnID = source.droppableId;
    const endColumnID = destination.droppableId;
    const sourceColumnIndex = columns.findIndex((column) => column._id === startColumnID);
    const destinationColumnIndex = tasksOrder.findIndex((column) => column._id === endColumnID);

    if (startColumnID === endColumnID) {
      const [item] = tasksOrder[destinationColumnIndex].tasks.splice(source.index, 1);
      tasksOrder[destinationColumnIndex].tasks.splice(destination.index, 0, item);
    } else {
      const [dragItem] = tasksOrder[sourceColumnIndex].tasks.splice(source.index, 1);
      tasksOrder[sourceColumnIndex].tasks.forEach((task, index) => (task.order = index));
      dragItem.columnId = endColumnID;
      tasksOrder[destinationColumnIndex].tasks.splice(destination.index, 0, dragItem);
    }
    tasksOrder[destinationColumnIndex].tasks.forEach((task, index) => (task.order = index));
    dispatch(setColumnData(tasksOrder));
  };

  const maxTaskOrder = (arr: ITask[]) => {
    if (!arr.length) {
      return;
    }
    const result = arr.reduce((acc, curr) => (acc.order > curr.order ? acc : curr));
    return result.order;
  };

  const createNewTask = (column: IColumnData) => {
    const query: ICreateTask = {
      boardID: id || '',
      columnID: column._id,
      title: 'new Task',
      order: (maxTaskOrder(column.tasks) ?? 0) + 1,
      description: 'New Description',
      userId: user.id,
      users: [user.id],
    };
    dispatch(createTask(query));
  };

  const eraseTask = (task: ITask) => {
    const query: IDeleteTask = {
      boardID: id || '',
      columnID: task.columnId,
      taskID: task._id,
    };
    dispatch(deleteTask(query));
  };

  if (loading) return <Spin></Spin>;

  return (
    <>
      <h2>Project Title</h2>
      <DragDropContext onDragEnd={dragEndHandler}>
        <Droppable droppableId="colums" direction="horizontal" type="columns">
          {(provided) => (
            <div
              className={styles['column-container']}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {columns.map((column, index) => (
                <Column
                  column={column}
                  key={column._id}
                  columnOrder={index}
                  onCreate={() => {
                    createNewTask(column);
                  }}
                >
                  {column.tasks.map((task, index) => (
                    <Task
                      key={task._id}
                      task={task}
                      taskOrder={index}
                      onRemove={() => eraseTask(task)}
                    />
                  ))}
                </Column>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default TasksPage;
