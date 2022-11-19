import React from 'react';
import styles from './Task.module.scss';

interface TaskProps {
  title?: string;
  description?: string;
  user?: string[];
  onRemove?: () => void;
}

const Task: React.FC<TaskProps> = ({ title = 'Anonymous Task', description, user, onRemove }) => {
  return (
    <div className={styles['task-container']}>
      <h3>{title}</h3>
      <p className={styles['task-description']}>{description}</p>
      <p className={styles['task-description']}>
        {user?.map((user) => (
          <span key={user}>{user} </span>
        ))}
      </p>
      <div className={styles['task-close']} onClick={onRemove} />
    </div>
  );
};

export default Task;
