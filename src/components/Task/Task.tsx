import React, { useState } from 'react';
import styles from './Task.module.scss';
import { Draggable } from 'react-beautiful-dnd';
import { ITask } from 'interfaces/interface';
import ModalConfirm from 'components/ModalConfirm/ModalConfirm';
import ModalTask from 'components/ModalTask/ModalTask';
import { editTaskFetch } from 'store/columnDataSlice';
import { useAppDispatch } from 'hooks';
import { Divider, Tag } from 'antd';
import { userInfo } from 'os';
import getRandomColor from 'utils/geRandomColor';

interface TaskProps {
  task: ITask;
  taskOrder: number;
  onRemove?: () => void;
}

const Task: React.FC<TaskProps> = ({ task, taskOrder = 0, onRemove }) => {
  const dispatch = useAppDispatch();
  const [isVisilbeModal, setIsVisibleModal] = useState<boolean>(false);
  const openEditModal = () => {
    setIsVisibleModal(true);
  };

  const closeEditModal = () => {
    setIsVisibleModal(false);
  };

  const editTask = (task: ITask) => {
    dispatch(editTaskFetch(task));
  };

  return (
    <>
      <Draggable draggableId={task._id} index={taskOrder}>
        {(provided) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className={styles['task-container']}
          >
            <div className={styles['task-header-container']}>
              <h3 className={styles['task-header__title']}>{task.title}</h3>
              <div className={styles['task-btn-edit']} onClick={openEditModal} />
            </div>
            <Divider orientation="center">Description</Divider>
            <p className={styles['task-description']}>{task.description}</p>

            <Divider orientation="center">Autor</Divider>
            <p className={styles['task-autor']}>{task.userId}</p>
            <Divider orientation="center">Responsible user:</Divider>

            {task.users?.map((user, index) => (
              <Tag key={`${user}-${index}`} color={getRandomColor()}>
                {user}
              </Tag>
            ))}

            <ModalConfirm element="task" confirmHandler={onRemove} />
          </div>
        )}
      </Draggable>
      <ModalTask
        type="edit"
        task={task}
        title={<h5>Edit Task </h5>}
        isVisible={isVisilbeModal}
        onCancel={closeEditModal}
        onOk={editTask as () => void}
      />
    </>
  );
};

export default Task;
