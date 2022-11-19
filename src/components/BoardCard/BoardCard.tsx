import React from 'react';
import { IBoard } from '../../interfaces/interface';
import styles from './BoardCard.module.scss';
import { Progress } from 'antd';

interface BoardCardProps {
  board: IBoard;
  onBoardClick: (board: IBoard) => void;
  onCloseClick: (board: IBoard) => void;
}

const BoardCard: React.FC<BoardCardProps> = ({ board, onBoardClick, onCloseClick }) => {
  return (
    <div className={styles['board-card__container']} onClick={() => onBoardClick(board)}>
      <div className={styles['board-card__content']}>
        <h3 className={styles['board-card__heading']}>{board.title}</h3>
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
      <div className={styles['board-card__close-btn']} onClick={() => onCloseClick(board)}>
        &nbsp;
      </div>
    </div>
  );
};

export default BoardCard;
