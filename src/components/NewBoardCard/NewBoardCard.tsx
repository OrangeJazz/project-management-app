import React from 'react';
import { useAppDispatch } from '../../hooks';
import { mockBoard } from '../../utils/mocks';
import { createUserBoard } from '../../store/sliceBoards';
import styles from './NewBoardCard.module.scss';

const NewBoardCard = () => {
  const dispatch = useAppDispatch();

  const addHandler = () => {
    console.log('click');
    dispatch(createUserBoard(mockBoard));
  };
  return (
    <div className={styles['board-card__container']} onClick={addHandler}>
      <h3>Add New Project</h3>
      <button>+</button>
    </div>
  );
};
export default NewBoardCard;
