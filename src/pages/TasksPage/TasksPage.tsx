import React, { useEffect } from 'react';
import { Column, ColumnAddButton, ModalTask, Task } from 'components';
import { IColumnData, IColumn, ITask } from 'interfaces/interface';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import styles from './TasksPage.module.scss';
import {
  addColumn,
  createTask,
  deleteColumn,
  deleteTask,
  getColumn,
  IAddColumn,
  ICreateTask,
  IDeleteTask,
  setColumnData,
} from 'store/columnDataSlice';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks';
import { Spin } from 'antd';
import getMaxOrder from 'utils/getMaxOrder';
import patchColumn from 'utils/patchColumn';

const TasksPage = () => {
  const { id } = useParams();
  const columns = useAppSelector((state) => state.columnData.columnsData);
  const columnloading = useAppSelector((state) => state.columnData.loading);
  const user = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getColumn(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (!columns.length) return;
    patchColumn(columns);
  }, [columns]);

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

  const createColumnHandler = (query: IAddColumn) => {
    dispatch(addColumn(query));
  };

  const deleteColumnHandler = (column: IColumn) => {
    dispatch(deleteColumn(column));
  };

  const createNewTask = (query: ICreateTask) => {
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

  if (columnloading) return <Spin />;

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
                  onCreate={createNewTask}
                  onClose={() => deleteColumnHandler(column)}
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
              <ColumnAddButton onClick={createColumnHandler} state={columns} />
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default TasksPage;
