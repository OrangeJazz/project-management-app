import React from 'react';
import { deleteBoardFetch } from '../../store/sliceBoards';
import { IBoard } from '../../interfaces/api-types';
import { useAppDispatch } from '../../hooks';
import styles from './BoardCard.module.scss';

interface BoardCardProps {
  board: IBoard;
}

const BoardCard = (props: BoardCardProps) => {
  const dispatch = useAppDispatch();
  const deleteBoardHandler = () => {
    dispatch(deleteBoardFetch(props.board));
  };
  const clickHandler = () => {
    console.log(props.board);
  };
  return (
    <div className={styles['board-card__container']} onClick={clickHandler}>
      {props.board.title}
      <button onClick={deleteBoardHandler}>X</button>
    </div>
  );
};

export default BoardCard;
