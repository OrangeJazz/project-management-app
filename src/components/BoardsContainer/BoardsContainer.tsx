import React from 'react';
import { BoardCard, ModalBoard } from 'components';
import styles from './BoardsContainer.module.scss';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { createUserBoard, deleteBoardFetch } from '../../store/sliceBoards';
import { IBoard } from '../../interfaces/interface';
import { NavLink } from 'react-router-dom';

interface BoardsContainerProps {
  boards: IBoard[];
}

const BoardsContainer: React.FC<BoardsContainerProps> = ({ boards }) => {
  const authState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  // console.log(boards);
  const deleteBoardHandler = async (board: IBoard) => {
    await dispatch(deleteBoardFetch(board));
  };

  const clickHandler = (board: IBoard) => {
    console.log(board);
  };

  const fetchNewBoard = async (board: IBoard) => {
    await dispatch(createUserBoard(board));
  };

  return (
    <div className={styles['boards-container']}>
      {boards.map((el) => (
        <NavLink to={el._id || ''} key={el._id || Date.now().toString()}>
          <BoardCard board={el} onBoardClick={clickHandler} onCloseClick={deleteBoardHandler} />
        </NavLink>
      ))}
      <ModalBoard user={authState.id} addBoard={fetchNewBoard} />
    </div>
  );
};

export default BoardsContainer;
