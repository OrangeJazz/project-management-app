import { Button } from 'antd';
import React from 'react';
import styles from './Column.module.scss';

interface ColumnProps {
  title?: string;
  children?: React.ReactNode;
  onClose?: () => void;
  onCreate?: () => void;
}

const Column: React.FC<ColumnProps> = ({ title, children, onClose, onCreate }) => {
  return (
    <div className={styles['card-container']}>
      <div className={styles.column}>
        <div className={styles.column__header}>
          <div className={styles['close-button']} onClick={onClose} />
          <h3>{title}</h3>
        </div>
        <div className={styles['task-container']}>{children}</div>
        <button className={styles['create-button']} onClick={onCreate}>
          <div className={styles['add-icon']} />
        </button>
        <div className={styles.column__footer}></div>
      </div>
    </div>
  );
};

export default Column;
