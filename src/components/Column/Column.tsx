import { Card } from 'antd';
import React from 'react';
import styles from './Column.module.scss';

interface ColumnProps {
  title?: string;
  children?: React.ReactNode;
  onClose?: () => void;
}

const Column: React.FC<ColumnProps> = ({ title, children, onClose }) => {
  return (
    <div className={styles['card-container']}>
      <div className={styles.column}>
        <div className={styles.column__header}>
          <div className={styles['close-button']} onClick={onClose} />
          <h3>{title}</h3>
        </div>
        <div className={styles['task-container']}>
          <Card></Card>
          <Card></Card>
          <Card></Card>
        </div>
      </div>
    </div>
  );
};

export default Column;
