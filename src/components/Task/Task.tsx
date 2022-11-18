import React from 'react';
import styles from './Task.module.css';

interface TaskProps {
  title: string;
  description: string;
  user: string[];
}

const Task: React.FC<TaskProps> = () => {
  return <div className={styles.task}>Task</div>;
};

export default Task;
