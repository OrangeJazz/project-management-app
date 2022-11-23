import { BoardsContainer, SearchBar } from 'components';
import React, { useEffect, useState } from 'react';
import styles from './BoardsPage.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getUserBoards } from '../../store/sliceBoards';

const BoardsPage = () => {
  const boardsState = useAppSelector((state) => state.boards);
  const dispatch = useAppDispatch();
  const [filteredBoards, setFilteredBoards] = useState([...boardsState.boards]);

  useEffect(() => {
    dispatch(getUserBoards());
    setFilteredBoards([...boardsState.boards]);
  }, [dispatch, boardsState.boards.length]);

  const searchValue = (value: string) => {
    if (!value) {
      setFilteredBoards([...boardsState.boards]);
      return;
    }
    const filteredBoards = boardsState.boards.filter((el) => el.title.includes(value));
    setFilteredBoards(filteredBoards);
  };

  return (
    <div className={styles['boards__wrapper']}>
      <div className={styles['boards__content']}>
        <h2 className={styles['boards__heading']}>Your Projects:</h2>
        <SearchBar searchValue={searchValue} />
        <BoardsContainer boards={filteredBoards} />
      </div>
    </div>
  );
};

export default BoardsPage;
