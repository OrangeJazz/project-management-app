import { Form, Input, Modal } from 'antd';
import { t } from 'i18next';
import React from 'react';

interface IModalTaskProps {
  title?: React.ReactNode;
  isVisible?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
  onValueChange?: (formTitle: FormValues) => void;
}

interface FormValues {
  title: string;
  description: string;
}

const ModalTask: React.FC<IModalTaskProps> = ({
  title = <h4>Create task</h4>,
  isVisible = true,
  onOk = () => {},
  onCancel = () => {},
  onValueChange = () => {},
}) => {
  const [form] = Form.useForm();

  const onFormLayoutChange = (values: FormValues) => {
    onValueChange(values);
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
      <Form
        layout="vertical"
        form={form}
        onValuesChange={(a, b) => onFormLayoutChange(b)}
        autoComplete="off"
      >
        <Form.Item
          name="title"
          rules={[
            { required: true, message: 'Please, input column title!' },
            { min: 4, message: t('errors.login')! },
          ]}
          label={<h5>Task title:</h5>}
          initialValue=""
        >
          <Input placeholder="input task title" />
        </Form.Item>
        <Form.Item
          name="description"
          rules={[
            { required: true, message: 'Please, input column title!' },
            { min: 4, message: t('errors.login')! },
          ]}
          label={<h5>Task description:</h5>}
          initialValue=""
        >
          <Input placeholder="input task description" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalTask;
