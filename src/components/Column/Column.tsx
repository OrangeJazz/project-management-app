import React from 'react';
import styles from './Column.module.scss';
import { Droppable } from 'react-beautiful-dnd';
import { IColunm } from 'interfaces/interface';

interface ColumnProps {
  column?: IColunm;
  children?: React.ReactNode;
  onClose?: () => void;
  onCreate?: () => void;
}

const Column: React.FC<ColumnProps> = ({ column, children, onClose, onCreate }) => {
  if (!column) {
    return null;
  }

  return (
    <div className={styles['card-container']}>
      <div className={styles.column}>
        <div className={styles.column__header}>
          <div className={styles['close-button']} onClick={onClose} />
          <h3>{column.title}</h3>
        </div>
        <Droppable droppableId={column._id}>
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
  );
};

export default Column;
