import React from 'react';
import styles from './Column.module.scss';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { IColunm } from 'interfaces/interface';

interface ColumnProps {
  column?: IColunm;
  columnOrder: number;
  children?: React.ReactNode;
  onClose?: () => void;
  onCreate?: () => void;
}

const Column: React.FC<ColumnProps> = ({ column, children, columnOrder, onClose, onCreate }) => {
  if (!column) {
    return null;
  }

  return (
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
              <div className={styles['close-button']} onClick={onClose} />
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

            <button className={styles['create-button']} onClick={onCreate}>
              <div className={styles['add-icon']} />
            </button>
            <div className={styles.column__footer}></div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
