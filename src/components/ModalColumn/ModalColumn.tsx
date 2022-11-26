import { Form, Input, Modal } from 'antd';
import React, { useState } from 'react';

interface IModalColumnProps {
  title?: React.ReactNode;
  isVisible?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
}

interface FormValues {
  title: string;
}

const ModalColumn: React.FC<IModalColumnProps> = ({
  title = <h4>Create column</h4>,
  isVisible = true,
  onOk = () => {},
  onCancel = () => {},
}) => {
  const [form] = Form.useForm();
  const [formTitle, setFormTitle] = useState('');

  const okHandler = () => {
    if (!formTitle) return;
    onOk();
  };

  const onFormLayoutChange = (values: FormValues) => {
    setFormTitle(values.title);
  };

  return (
    <Modal
      open={isVisible}
      centered
      destroyOnClose
      title={title}
      onOk={okHandler}
      okButtonProps={{ htmlType: 'submit' }}
      onCancel={onCancel}
    >
      <Form layout="vertical" form={form} onValuesChange={onFormLayoutChange} autoComplete="off">
        <Form.Item
          name="title"
          rules={[{ required: true, message: 'Please, input column title!' }]}
          label={<h5>Column title:</h5>}
        >
          <Input placeholder="input column title" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalColumn;
