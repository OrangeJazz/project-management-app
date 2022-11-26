import { Form, Input, Modal } from 'antd';
import React from 'react';

interface IModalColumnProps {
  title?: React.ReactNode;
  isVisible?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
  onValueChange?: (formTitle: string) => void;
}

interface FormValues {
  title: string;
}

const ModalColumn: React.FC<IModalColumnProps> = ({
  title = <h4>Create column</h4>,
  isVisible = true,
  onOk = () => {},
  onCancel = () => {},
  onValueChange = () => {},
}) => {
  const [form] = Form.useForm();

  const onFormLayoutChange = (values: FormValues) => {
    onValueChange(values.title);
  };

  const onOkHandler = () => {
    onOk();
    form.resetFields();
  };

  return (
    <Modal
      open={isVisible}
      centered
      destroyOnClose={true}
      title={title}
      onOk={onOkHandler}
      onCancel={onCancel}
    >
      <Form layout="vertical" form={form} onValuesChange={onFormLayoutChange} autoComplete="off">
        <Form.Item
          name="title"
          rules={[{ required: true, message: 'Please, input column title!' }]}
          label={<h5>Column title:</h5>}
          initialValue=""
        >
          <Input placeholder="input column title" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalColumn;
