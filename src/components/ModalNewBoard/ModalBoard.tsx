import React, { useState } from 'react';
import { Form, Input, Modal } from 'antd';
import { NewBoardCard } from 'components';
import { IBoard } from 'interfaces/interface';

interface ModalProps {
  addBoard: (board: IBoard) => void;
  user: string;
}

interface FormValues {
  title: string;
}

const ModalLayout: React.FC<ModalProps> = ({ addBoard, user }) => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [newBoardTitle, setNewBoardTitle] = useState('');

  const showModal = () => {
    setOpen(true);
  };

  const cancelHandler = () => {
    setOpen(false);
  };

  const okHandler = async () => {
    setConfirmLoading(true);
    const newBoard: IBoard = {
      title: newBoardTitle,
      owner: user,
      users: [user],
    };
    addBoard(newBoard);
    form.resetFields();
    setOpen(false);
    setConfirmLoading(false);
  };

  const onFormLayoutChange = (values: FormValues) => {
    setNewBoardTitle(values.title);
  };

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
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 15 }}
          labelAlign={'right'}
          onValuesChange={onFormLayoutChange}
          requiredMark={true}
        >
          <Form.Item
            label="Project Title"
            name="title"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ModalLayout;
