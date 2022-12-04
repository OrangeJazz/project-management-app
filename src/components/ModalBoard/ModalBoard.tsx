import { Form, Input, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useAppSelector } from 'hooks';
import { t } from 'i18next';
import { IBoard } from 'interfaces/interface';
import React from 'react';
import { Link } from 'react-router-dom';

interface ModalBoard {
  isOpen: boolean;
  onOk: (data?: IBoard) => void;
  onCancel: () => void;
}

const ModalBoard: React.FC<ModalBoard> = ({
  isOpen = false,
  onOk = () => {},
  onCancel = () => {},
}) => {
  const [form] = Form.useForm();
  const boards = useAppSelector((state) => state.boards);

  const onOkHandler = () => {
    const userId = localStorage.getItem('id') || '';
    const title = `${form.getFieldValue('title') || ''}|${
      form.getFieldValue('description') || ''
    } `;
    const query: IBoard = { title, owner: userId, users: [userId] };
    onOk(query);
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title="Add New Project"
      open={isOpen}
      onOk={form.submit}
      okButtonProps={{ htmlType: 'submit', icon: <LinkIcon /> }}
      confirmLoading={boards.loading}
      onCancel={onCancel}
      centered={true}
    >
      <Form
        form={form}
        layout="vertical"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 15 }}
        labelAlign={'right'}
        requiredMark={true}
        onFinish={onOkHandler}
      >
        <Form.Item
          label="Project Title"
          name="title"
          rules={[
            { required: true, message: t('errors.empty')! },
            { min: 4, message: t('errors.login')! },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Project description" name="description" rules={[{ required: false }]}>
          <TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const LinkIcon = () => {
  return (
    <Link
      style={{
        width: '50px',
        height: '32px',
        display: 'block',
        position: 'absolute',
        top: '0',
        left: '0',
      }}
      to="/boards"
    />
  );
};

export default ModalBoard;