import React from 'react';
import { BoardCard, ModalBoard } from 'components';
import styles from './BoardsContainer.module.scss';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { createUserBoard, deleteBoardFetch } from '../../store/sliceBoards';
import { IBoard } from '../../interfaces/interface';

interface BoardsContainerProps {
  boards: IBoard[];
}

const BoardsContainer: React.FC<BoardsContainerProps> = ({ boards }) => {
  const authState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

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
        <BoardCard
          board={el}
          key={el._id || Date.now().toString()}
          onBoardClick={clickHandler}
          onCloseClick={deleteBoardHandler}
        />
      ))}
      <ModalBoard user={authState.id} addBoard={fetchNewBoard} />
    </div>
  );
};

export default BoardsContainer;
