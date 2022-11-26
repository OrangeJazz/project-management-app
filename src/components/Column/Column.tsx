import React, { useState } from 'react';
import styles from './Column.module.scss';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { IColumnData } from 'interfaces/interface';
import ModalConfirm from 'components/ModalConfirm/ModalConfirm';
import TaskAddButton from 'components/TaskAddButton/TaskAddButton';
import { ModalTask } from 'components';
import getMaxOrder from 'utils/getMaxOrder';
import { ICreateTask } from 'store/columnDataSlice';
import { useAppSelector } from 'hooks';

interface ColumnProps {
  column?: IColumnData;
  columnOrder: number;
  children?: React.ReactNode;
  onClose?: () => void;
  onCreate?: (query: ICreateTask) => void;
}

const Column: React.FC<ColumnProps> = ({
  column,
  children,
  columnOrder,
  onClose,
  onCreate = () => {},
}) => {
  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);
  const [taskHeader, setTaskHeader] = useState<{ title: string; description: string }>({
    title: '',
    description: '',
  });
  const user = useAppSelector((state) => state.auth);
  if (!column) {
    return null;
  }

  const openModal = () => {
    setIsVisibleModal(true);
  };

  const onCanselHandler = () => {
    setIsVisibleModal(false);
  };

  const onCreateTaskHandler = () => {
    const query: ICreateTask = {
      boardID: column.boardId,
      columnID: column._id,
      title: taskHeader.title,
      description: taskHeader.description,
      order: (getMaxOrder(column.tasks) ?? 0) + 1,
      userId: user.name,
      users: [user.name],
    };
    onCreate(query);
    onCanselHandler();
  };

  return (
    <>
      <Draggable draggableId={column._id} index={columnOrder}>
        {(provided) => (
          <div
            className={styles['card-container']}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div className={styles.column}>
              <div className={styles.column__header}>
                <ModalConfirm element="column" confirmHandler={onClose} />
                <h3>{column.title}</h3>
              </div>
              <Droppable droppableId={column._id} type="tasks">
                {(provided) => (
                  <div
                    className={styles['task-container']}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {children}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <TaskAddButton onClick={openModal} />
              <div className={styles.column__footer}></div>
            </div>
          </div>
        )}
      </Draggable>
      <ModalTask
        isVisible={isVisibleModal}
        onCancel={onCanselHandler}
        onValueChange={setTaskHeader}
        onOk={onCreateTaskHandler}
      />
    </>
  );
};

export default Column;
