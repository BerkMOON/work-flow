import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal } from 'antd';
import { useState } from 'react';
import styles from './Login.scss';

const Login: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const login = () => {
    setOpen(true);
  };

  const onFinish = (values: any) => {
    console.log(values);
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  return (
    <>
      <div className={styles['login-info']}>
        <Button type="link" onClick={login}>
          请登录
        </Button>
      </div>
      <Modal
        title="登录"
        open={open}
        onCancel={handleCancel}
        footer={null}
        width={400}
        centered
      >
        <div className={styles['login-container']}>
          <Form
            name="login"
            initialValues={{ remember: true }}
            style={{ width: 350 }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="用户名" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="密码"
              />
            </Form.Item>

            <Form.Item>
              <Button
                block
                loading={confirmLoading}
                type="primary"
                htmlType="submit"
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default Login;
