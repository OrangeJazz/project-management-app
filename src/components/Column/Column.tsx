import React from 'react';
import styles from './Column.module.scss';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { IColumnData } from 'interfaces/interface';
import ModalConfirm from 'components/ModalConfirm/ModalConfirm';

interface ColumnProps {
  column?: IColumnData;
  columnOrder: number;
  children?: React.ReactNode;
  addTaskButton: React.ReactNode;
  onClose?: () => void;
}

const Column: React.FC<ColumnProps> = ({
  column,
  children,
  columnOrder,
  addTaskButton,
  onClose,
}) => {
  if (!column) {
    return null;
  }

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
              {addTaskButton}
              <div className={styles.column__footer} />
            </div>
          </div>
        )}
      </Draggable>
    </>
  );
};

export default Column;
