import React from 'react';
import styles from './Task.module.scss';
import { Draggable } from 'react-beautiful-dnd';
import { ITask } from 'interfaces/interface';

interface TaskProps {
  task: ITask;
  taskOrder: number;
  onRemove?: () => void;
  onEdit?: () => void;
}

const Task: React.FC<TaskProps> = ({ task, taskOrder = 0, onRemove, onEdit = () => {} }) => {
  return (
    <Draggable draggableId={task._id} index={taskOrder}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={styles['task-container']}
        >
          <div className={styles['task-header']}>
            <h3>{task.title}</h3>
            <div className={styles['task-btn-edit']} onClick={onEdit} />
          </div>

          <p className={styles['task-description']}>{task.description}</p>
          <p className={styles['task-description']}>
            {task.users?.map((user) => (
              <span key={user}>{user} </span>
            ))}
          </p>
          <div className={styles['task-close']} onClick={onRemove} />
        </div>
      )}
    </Draggable>
  );
};

export default Task;
