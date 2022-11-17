import React from 'react';
import { BoardCard, NewBoardCard } from 'components';
import styles from './BoardsContainer.module.scss';
import { IBoard } from '../../interfaces/api-types';
import { useAppDispatch, useAppSelector } from '../../hooks';

const newBoard: IBoard = {
  _id: '11111',
  title: 'new title',
  owner: 'new owner',
  users: ['new owner'],
};

const BoardsContainer = () => {
  const boardsState = useAppSelector((state) => state.boards);
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
