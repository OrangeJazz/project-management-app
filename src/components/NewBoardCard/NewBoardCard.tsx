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
    <div className={styles['new-card__container']} onClick={addHandler}>
      <h3 className={styles['new-card__heading']}>Add New Project</h3>
      <div className={styles['new-card__add-btn']}>+</div>
    </div>
  );
};
export default NewBoardCard;
