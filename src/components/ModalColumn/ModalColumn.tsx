import { Form, Input, Modal } from 'antd';
import { t } from 'i18next';
import { IColumn } from 'interfaces/interface';
import React, { useState } from 'react';

interface IModalColumnProps {
  column?: IColumn;
  type?: 'create' | 'edit';
  title?: React.ReactNode;
  isVisible?: boolean;
  onOk?: (data?: IColumn) => void;
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
  column,
  onOk = () => {},
  onCancel = () => {},
  onValueChange = () => {},
}) => {
  const [form] = Form.useForm();
  const columnTitle = Form.useWatch('title', form);
  const [loading, setLoading] = useState<boolean>(false);

  const onFormLayoutChange = (values: FormValues) => {
    onValueChange(values.title);
  };

  const onCancelHandler = () => {
    form.resetFields();
    onCancel();
  };

  const onOkHandler = () => {
    setLoading(true);
    if (type === 'create') {
      onOk();
    } else {
      const query = { ...column, title: columnTitle } as IColumn;
      onOk(query);
      onCancel();
    }
    form.resetFields();
    setLoading(false);
  };

  return (
    <Modal
      forceRender={true}
      confirmLoading={loading}
      open={isVisible}
      centered
      title={title}
      onOk={form.submit}
      onCancel={onCancelHandler}
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
          initialValue={type === 'edit' ? column?.title : ''}
        >
          <Input placeholder="input column title" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalColumn;
