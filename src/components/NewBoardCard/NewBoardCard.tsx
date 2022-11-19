import React from 'react';
import styles from './NewBoardCard.module.scss';

interface NewBoardCardProps {
  onClick: () => void;
}

const NewBoardCard: React.FC<NewBoardCardProps> = ({ onClick }) => {
  return (
    <div className={styles['new-card__container']} onClick={onClick}>
      <h3 className={styles['new-card__heading']}>Add New Project</h3>
      <div className={styles['new-card__add-btn']}>&nbsp;</div>
    </div>
  );
};

export default NewBoardCard;
