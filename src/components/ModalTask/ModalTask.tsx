import { Form, Input, Modal, Select } from 'antd';
import { useAppSelector } from 'hooks';
import { t } from 'i18next';
import { IColumnData, ITask } from 'interfaces/interface';
import React from 'react';
import { ICreateTask } from 'store/columnDataSlice';
import getMaxOrder from 'utils/getMaxOrder';

interface IModalTaskProps {
  type: 'create' | 'edit';
  task?: ITask | null;
  column?: IColumnData | null;
  title?: React.ReactNode;
  isVisible?: boolean;
  onOk?: <T extends ITask | ICreateTask>(query: T) => void;
  onCancel?: () => void;
}

const userId = localStorage.getItem('id') || '';

const ModalTask: React.FC<IModalTaskProps> = ({
  type = 'create',
  title = <h4>Create task</h4>,
  isVisible = true,
  task,
  column,
  onOk = () => {},
  onCancel = () => {},
}) => {
  const users = useAppSelector((state) => state.users.users);

  const [form] = Form.useForm();
  const { Option } = Select;

  const onOkHandler = () => {
    if (type === 'create') {
      const query: ICreateTask = {
        boardID: column!.boardId,
        columnID: column!._id,
        title: form.getFieldValue('title'),
        description: form.getFieldValue('description'),
        order: (getMaxOrder(column!.tasks) ?? 0) + 1,
        userId: userId,
        users: form.getFieldValue('users'),
      };
      onOk<ICreateTask>(query);
      onCancel();
    }
    if (type === 'edit') {
      const query = {
        ...task,
        title: form.getFieldValue('title'),
        description: form.getFieldValue('description'),
        userId: userId,
        users: form.getFieldValue('users'),
      } as ITask;
      onOk<ITask>(query);
      onCancel();
    }
    form.resetFields();
  };

  const onCancelHandler = () => {
    onCancel();
    form.resetFields();
  };

  const onSelectChange = (value: string[]) => {
    form.setFieldValue('users', value);
  };

  return (
    <Modal
      forceRender
      open={isVisible}
      centered
      destroyOnClose={true}
      title={title}
      onOk={form.submit}
      onCancel={onCancelHandler}
    >
      <Form
        layout="vertical"
        form={form}
        autoComplete="off"
        onFinish={onOkHandler}
        initialValues={{
          title: type === 'edit' ? task?.title : '',
          description: type === 'edit' ? task?.description : '',
          users: task?.users,
        }}
      >
        <Form.Item
          name="title"
          rules={[
            { required: true, message: 'Please, input column title!' },
            { min: 4, message: t('errors.login')! },
            { max: 10, message: t('errors.login')! },
          ]}
          label={<h5>Task title:</h5>}
        >
          <Input placeholder="input task title" />
        </Form.Item>

        <Form.Item
          name="description"
          rules={[
            { required: true, message: 'Please, input column title!' },
            { min: 4, message: t('errors.login')! },
            { max: 15, message: t('errors.login')! },
          ]}
          label={<h5>Task description:</h5>}
        >
          <Input placeholder="input task description" />
        </Form.Item>

        <Form.Item label={<h5>Responsible user:</h5>} name="users">
          <Select mode="multiple" onChange={onSelectChange}>
            {users.map((user) => (
              <Option key={user._id} value={user._id}>
                {user.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalTask;
