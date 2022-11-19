import { BoardsContainer, SearchBar } from 'components';
import React, { useEffect } from 'react';
import styles from './BoardsPage.module.scss';
import { useAppDispatch } from '../../hooks';
import { getUserBoards } from '../../store/sliceBoards';

const BoardsPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUserBoards());
  }, [dispatch]);
  return (
    <div className={styles['boards__wrapper']}>
      <div className={styles['boards__content']}>
        <h2 className={styles['boards__heading']}>Your Projects:</h2>
        <SearchBar />
        <BoardsContainer />
      </div>
    </div>
  );
};

export default BoardsPage;
