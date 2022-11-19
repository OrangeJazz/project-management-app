import React from 'react';
import { BoardCard, ModalNewBoard } from 'components';
import styles from './BoardsContainer.module.scss';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { createUserBoard, deleteBoardFetch } from '../../store/sliceBoards';
import { IBoard } from '../../interfaces/interface';

const BoardsContainer = () => {
  const boardsState = useAppSelector((state) => state.boards);
  const authState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const mockBoard: IBoard = {
    title: 'Mock',
    owner: authState.id,
    users: [authState.id],
  };

  const addNewBoardHandler = () => {
    console.log('click');
    dispatch(createUserBoard(mockBoard));
  };
  const deleteBoardHandler = (board: IBoard) => {
    dispatch(deleteBoardFetch(board));
  };
  const clickHandler = (board: IBoard) => {
    console.log(board);
  };

  return (
    <div className={styles['boards-container']}>
      {boardsState.boards.map((el) => (
        <BoardCard
          board={el}
          key={el._id || Date.now().toString()}
          onBoardClick={clickHandler}
          onCloseClick={deleteBoardHandler}
        />
      ))}
      <ModalNewBoard />
    </div>
  );
};

export default BoardsContainer;
