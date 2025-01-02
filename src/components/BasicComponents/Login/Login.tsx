import { UserSelfInfo } from '@/services/user/typings';
import { UserAPI } from '@/services/user/UserController';
import { LogoutOutlined } from '@ant-design/icons';
import { history, useModel } from '@umijs/max';
import { Dropdown } from 'antd';
import styles from './Login.scss';

const Login: React.FC = () => {
  const { initialState } = useModel('@@initialState');

  const goLogout = async () => {
    await UserAPI.logout();
    history.push('/login');
  };

  const items = [
    {
      key: '1',
      label: (
        <a target="_blank" onClick={goLogout}>
          退出登录
        </a>
      ),
      icon: <LogoutOutlined />,
    },
  ];

  return (
    <>
      <Dropdown menu={{ items }} placement="topLeft">
        <div className={styles['login-info']}>
          {(initialState as UserSelfInfo)?.user_info?.username}
        </div>
      </Dropdown>
    </>
  );
};

export default Login;
