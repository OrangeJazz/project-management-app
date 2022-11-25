import { Button, Form, Input } from 'antd';
import { useAppDispatch, useAppSelector } from 'hooks';
import { IFormData } from 'interfaces/interface';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { handleDeleteAcc, handleUpdateAcc } from 'store/authSlice';
import avatar from '../../assets/icons/avatar.svg';
import styles from './ProfilePage.module.scss';

const ProfilePage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const onFinish = (formData: IFormData) => {
    dispatch(handleUpdateAcc(formData));
    form.resetFields();
  };
  const onDelete = () => {
    dispatch(handleDeleteAcc());
    navigate('/');
  };
  return (
    <div className={styles.container}>
      <div className={styles['wrapper-card']}>
        <div className={styles.card}>
          <img src={avatar} alt="avatar" />
        </div>
        <Button htmlType="button" type="primary" danger onClick={onDelete}>
          {t('sign.delete')}
        </Button>
      </div>
      <Form
        form={form}
        labelAlign="left"
        name="basic"
        style={{ width: '300px', marginTop: '4rem' }}
        labelCol={{ span: 7 }}
        autoComplete={'nope'}
        onFinish={onFinish}
      >
        <Form.Item
          label={t('sign.name')}
          name="name"
          rules={[{ required: true, message: t('errors.empty')! }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t('sign.login')}
          name="login"
          rules={[
            { required: true, message: t('errors.empty')! },
            { min: 4, message: t('errors.login')! },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={t('sign.pass')}
          name="password"
          rules={[
            { required: true, message: t('errors.empty')! },
            { min: 6, message: t('errors.pass')! },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: '200px', margin: '1rem 50px 0 50px' }}
          >
            {t('sign.edit')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProfilePage;
