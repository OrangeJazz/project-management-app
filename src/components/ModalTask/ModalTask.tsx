import { Form, Input, Modal } from 'antd';
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
  onValueChange?: (formTitle: FormValues) => void;
}

interface FormValues {
  title: string;
  description: string;
}

const ModalTask: React.FC<IModalTaskProps> = ({
  type = 'create',
  title = <h4>Create task</h4>,
  isVisible = true,
  task,
  column,
  onOk = () => {},
  onCancel = () => {},
}) => {
  const user = useAppSelector((state) => state.auth);
  const [form] = Form.useForm();

  const onOkHandler = () => {
    if (type === 'create') {
      const query: ICreateTask = {
        boardID: column!.boardId,
        columnID: column!._id,
        title: form.getFieldValue('title'),
        description: form.getFieldValue('description'),
        order: (getMaxOrder(column!.tasks) ?? 0) + 1,
        userId: user.name,
        users: [user.name],
      };
      onOk<ICreateTask>(query);
      onCancel();
    }
    if (type === 'edit') {
      const query = {
        _id: task!._id,
        boardId: task!.boardId,
        title: form.getFieldValue('title'),
        description: form.getFieldValue('description'),
        order: task!.order,
        columnId: task!.columnId,
        userId: task!.userId,
        users: task!.users,
      };
      onOk<ITask>(query);
      onCancel();
    }

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
      <Form layout="vertical" form={form} autoComplete="off">
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
