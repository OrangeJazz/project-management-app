import { Button, Form, Input } from 'antd';
import { useAppDispatch, useAppSelector } from 'hooks';
import { IFormData } from 'interfaces/interface';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { handleSingUp } from 'store/authSlice';
import avatar from '../../assets/icons/avatar.svg';
import styles from './ProfilePage.module.scss';

const ProfilePage = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.auth.loading);
  const login = useAppSelector((state) => state.auth.login);
  const name = useAppSelector((state) => state.auth.name);
  const onFinish = (formData: IFormData) => {
    dispatch(handleSingUp(formData));
    form.resetFields();
  };
  const onDelete = () => {
    console.log('dfsdf');
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
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label={t('sign.name')}
          name="name"
          initialValue={name}
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t('sign.login')}
          name="login"
          initialValue={login}
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={t('sign.pass')}
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
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
