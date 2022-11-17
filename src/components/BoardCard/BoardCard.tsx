import React from 'react';
import { changeBoards, changeCurrentBoard, deleteBoard } from 'store/sliceBoards';
import { IBoard } from 'interfaces/api-types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import styles from './BoardCard.module.scss';

interface BoardCardProps {
  board: IBoard;
}

const BoardCard = (props: BoardCardProps) => {
  const boardsState = useAppSelector((state) => state.boards);
  const dispatch = useAppDispatch();
  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>, board: IBoard) => {
    dispatch(changeCurrentBoard(board));
  };
  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    target.style.background = 'white';
  };
  const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    target.style.background = 'white';
  };
  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const target = e.target as HTMLDivElement;
    target.style.background = 'grey';
  };
  const dropHandler = (e: React.DragEvent<HTMLDivElement>, board: IBoard) => {
    e.preventDefault();
    const target = e.target as HTMLDivElement;
    target.style.background = 'white';
    let newBoardArr = [...boardsState.boards].filter(
      (el) => el._id !== boardsState.currentBoard?._id
    );

    const dropIndex = newBoardArr.indexOf(board);
    if (boardsState.currentBoard) {
      newBoardArr = [
        ...newBoardArr.slice(0, dropIndex),
        boardsState.currentBoard,
        ...newBoardArr.slice(dropIndex, newBoardArr.length),
      ];
    }
    dispatch(changeBoards(newBoardArr));
  };

  const deleteBoardHandler = () => {
    dispatch(deleteBoard(props.board));
  };
  return (
    <div
      className={styles['board-card__container']}
      onDragStart={(e) => {
        dragStartHandler(e, props.board);
      }}
      onDragLeave={(e) => {
        dragLeaveHandler(e);
      }}
      onDragEnd={(e) => {
        dragEndHandler(e);
      }}
      onDragOver={(e) => {
        dragOverHandler(e);
      }}
      onDrop={(e) => {
        dropHandler(e, props.board);
      }}
      draggable={true}
    >
      {props.board.title}
      <button onClick={deleteBoardHandler}>X</button>
    </div>
  );
};

export default BoardCard;
