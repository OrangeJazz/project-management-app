import { BoardsContainer, SearchBar } from 'components';
import React, { useState } from 'react';
import styles from './BoardsPage.module.scss';
import { IBoard } from '../../interfaces/api-types';

const BoardsPage = () => {
  // const [boards, setBoards] = useState(boardsMock);
  return (
    <div className={styles['boards__container']}>
      <h2 className={styles['boards__heading']}>Your Projects:</h2>
      <SearchBar />
      <BoardsContainer />
    </div>
  );
};

export default BoardsPage;
