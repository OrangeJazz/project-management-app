import React from 'react';
import { deleteBoardFetch } from '../../store/sliceBoards';
import { IBoard } from '../../interfaces/interface';
import { useAppDispatch } from '../../hooks';
import styles from './BoardCard.module.scss';
import { Progress } from 'antd';

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
      <div className={styles['board-card__content']}>
        <h3 className={styles['board-card__heading']}>{props.board.title}</h3>
        <div style={{ width: 170 }}>
          <Progress
            percent={30}
            size="small"
            strokeColor="#84a17d"
            trailColor="#dde4e4"
            status="active"
          />
        </div>
        <p className={styles['board-card__info']}>30 / 111</p>
      </div>
      <div className={styles['board-card__img']}></div>
      <div className={styles['board-card__close-btn']} onClick={deleteBoardHandler}>
        &nbsp;
      </div>
    </div>
  );
};

export default BoardCard;
