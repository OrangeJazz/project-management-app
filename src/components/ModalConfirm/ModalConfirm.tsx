import React, { useState } from 'react';
import { Modal } from 'antd';
import styles from './ModalConfirm.module.scss';

interface ModalConfirmProps {
  confirmHandler: () => void;
  element: string;
}

const ModalConfirm: React.FC<ModalConfirmProps> = ({ confirmHandler, element }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    confirmHandler();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className={styles[`close-btn__${element}`]} onClick={showModal}>
        &nbsp;
      </div>
      <Modal title="Warning!" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>A you sure?</p>
      </Modal>
    </>
  );
};

export default ModalConfirm;
