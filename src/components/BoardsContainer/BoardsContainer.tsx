import React from 'react';
import { BoardCard, NewBoardCard } from 'components';
import styles from './BoardsContainer.module.scss';
import { IBoard } from '../../types/api-types';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux';

const newBoard: IBoard = {
  _id: '11111',
  title: 'new title',
  owner: 'new owner',
  users: ['new owner'],
};

const BoardsContainer = () => {
  const boardsState = useAppSelector((state) => state.sliceBoards);
  const dispatch = useAppDispatch();
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
