import { loginUser } from '@/services/user/UserController';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Form, Input, message } from 'antd';
import { useState } from 'react';
import styles from './index.scss';

const SuccessStatus = 200;

const LoginPage: React.FC = () => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const onFinish = async (values: any) => {
    if (values) {
      console.log(values);
      setConfirmLoading(true);
      const { status }: any = await loginUser(values);
      if (status === SuccessStatus) {
        setTimeout(() => {
          message.success('登录成功');
          setConfirmLoading(false);
          location.href = '/audit';
        }, 700);
      } else {
        setConfirmLoading(false);
        message.error('登录失败，请重试');
      }
    }
  };

  return (
    <PageContainer
      ghost
      header={{
        title: '登录页面',
      }}
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
    </PageContainer>
  );
};

export default LoginPage;
