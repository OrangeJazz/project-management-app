import React from 'react';
import { BoardCard, NewBoardCard } from 'components';
import styles from './BoardsContainer.module.scss';
import { useAppSelector } from '../../hooks';

const BoardsContainer = () => {
  const boardsState = useAppSelector((state) => state.boards);

  return (
    <div className={styles['boards-container']}>
      {boardsState.boards.map((el) => (
        <BoardCard board={el} key={Math.random()} />
      ))}
      <NewBoardCard />
    </div>
  );
};

export default BoardsContainer;
