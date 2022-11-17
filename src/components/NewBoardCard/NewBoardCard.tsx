import React from 'react';
import styles from './NewBoardCard.module.scss';

const NewBoardCard = () => {
  const addHandler = () => {};
  return (
    <div className={styles['board-card__container']} onClick={addHandler}>
      <h3>Add New Project</h3>
      <button>+</button>
    </div>
  );
};
export default NewBoardCard;
