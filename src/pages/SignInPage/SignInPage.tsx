import React from 'react';
import styles from './SignInPage.module.scss';
import { Button, Form, Input, Spin } from 'antd';
import { IFormData } from 'interfaces/interface';
import { useAppDispatch, useAppSelector } from 'hooks';
import { handleSingIn } from 'store/authSlice';
import { NavLink } from 'react-router-dom';

const SingInPage = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.auth.loading);
  const onFinish = (formData: IFormData) => {
    dispatch(handleSingIn(formData));
    form.resetFields();
  };

  return (
    <div className={styles.container}>
      <Spin
        spinning={loading!}
        size="large"
        style={{
          position: 'fixed',
          top: '44%',
          left: '53%',
          zIndex: '100',
          transform: 'translate(-50%,-50%)',
        }}
      />
      <Form
        form={form}
        name="basic"
        style={{ margin: '0 auto', width: '320px' }}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Login"
          name="login"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
        <NavLink to="/signup">You dont have account</NavLink>
      </Form>
    </div>
  );
};

export default SingInPage;
