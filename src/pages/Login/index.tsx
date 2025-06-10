import chartPng from '@/assets/images/chart.png';
import linePng from '@/assets/images/line.png';
import workPng from '@/assets/images/work-progress.png';
import { API_STATUS, COMPANY_NAME } from '@/constants';
import { UserAPI } from '@/services/userManage/user/UserController';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, message } from 'antd';
import { useState } from 'react';
import styles from './index.scss';

const LoginPage: React.FC = () => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const onFinish = async (values: any) => {
    if (values) {
      setConfirmLoading(true);
      const { username, password } = values;
      const loginParams = {
        username,
        password,
        application: 'door',
        autoSignin: true,
        language: '',
        organization: COMPANY_NAME,
        signinMethod: 'Password',
        type: 'login',
      };
      try {
        const { status, msg } = await UserAPI.loginUser(loginParams);
        if (status === API_STATUS.SUCCESS) {
          message.success('登录成功');
          const redirectPath = localStorage.getItem('redirectPath') || '/home';
          localStorage.removeItem('redirectPath'); // 清除保存的路径
          window.location.href = redirectPath;
        } else {
          message.error(msg || '登录失败，请重试');
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
          <div className={styles['card-content']}>
            <div className={styles.right}>
              <div className={styles.logo}>HELLO</div>
              <div className={styles.images}>
                <img className={styles.chart} src={chartPng} />
                <img className={styles.work} src={workPng} />
                <img className={styles.line} src={linePng} alt="" />
              </div>
            </div>
            <div className={styles['login-info']}>
              <div className={styles.header}>
                <h1 className={styles.welcome}>WELCOME</h1>
                <p className={styles.subtitle}>欢迎来到奥吉通管理系统</p>
              </div>
              <Form
                name="login"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                size="large"
              >
                <Form.Item
                  name="username"
                  rules={[{ required: true, message: '请输入您的账号' }]}
                >
                  <Input
                    prefix={<UserOutlined className={styles.inputIcon} />}
                    placeholder="请输入您的账号"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: '请输入您的密码' }]}
                >
                  <Input.Password
                    prefix={<LockOutlined className={styles.inputIcon} />}
                    placeholder="请输入您的密码"
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
                    登录 →
                  </Button>
                </Form.Item>
              </Form>
              <div className={styles.footer}>
                <p>Copyright © 2022 北京达安数智科技有限公司</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
