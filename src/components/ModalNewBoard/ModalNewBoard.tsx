import React, { useState } from 'react';
// import styles from './ModalNewBoard.module.scss';
import { Form, Input, Modal } from 'antd';
import { NewBoardCard } from 'components';
// interface ModalProps {}
const ModalLayout: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const cancelHandler = () => {
    setOpen(false);
  };
  const okHandler = async () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const onFormLayoutChange = () => {};
  return (
    <div>
      <NewBoardCard onClick={showModal} />
      <Modal
        title="Add New Project"
        open={open}
        onOk={okHandler}
        okButtonProps={{ htmlType: 'submit' }}
        confirmLoading={confirmLoading}
        onCancel={cancelHandler}
        centered={true}
      >
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 15 }}
          labelAlign={'right'}
          onValuesChange={onFormLayoutChange}
        >
          <Form.Item label="Project Title">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ModalLayout;
