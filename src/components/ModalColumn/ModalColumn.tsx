import { Form, Input, Modal } from 'antd';
import { t } from 'i18next';
import React from 'react';

interface IModalColumnProps {
  type?: 'create' | 'edit';
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
  type = 'create',
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
      onOk={form.submit}
      onCancel={onCancel}
    >
      <Form
        id="form"
        layout="vertical"
        form={form}
        onValuesChange={onFormLayoutChange}
        autoComplete="off"
        onFinish={onOkHandler}
      >
        <Form.Item
          name="title"
          rules={[
            { required: true, message: 'Please, input column title!' },
            { min: 4, message: t('errors.login')! },
          ]}
          label={<h5>{`Column title`}</h5>}
          initialValue={type === 'create' ? '' : '123'}
        >
          <Input placeholder="input column title" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalColumn;
