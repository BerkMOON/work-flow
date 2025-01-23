import { UserAPI } from '@/services/user/UserController';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, message } from 'antd';
import { useState } from 'react';
import styles from './index.scss';

const SuccessStatus = 200;

const LoginPage: React.FC = () => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const onFinish = async (values: any) => {
    if (values) {
      setConfirmLoading(true);
      try {
        const {
          response_status: { code },
        } = await UserAPI.loginUser(values);
        if (code === SuccessStatus) {
          message.success('登录成功');
          location.href = '/home';
        } else {
          message.error('登录失败，请重试');
        }
      } catch (error) {
        message.error('登录失败，请重试');
      } finally {
        setConfirmLoading(false);
      }
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <Card className={styles.loginCard}>
          <div className={styles.header}>
            <h1>车辆管理系统</h1>
          </div>
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            size="large"
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input
                prefix={<UserOutlined className={styles.inputIcon} />}
                placeholder="用户名"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password
                prefix={<LockOutlined className={styles.inputIcon} />}
                placeholder="密码"
              />
            </Form.Item>

            <Form.Item>
              <Button
                block
                loading={confirmLoading}
                type="primary"
                htmlType="submit"
                className={styles.loginButton}
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
