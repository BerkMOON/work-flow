import { UserInfo } from '@/services/userManage/user/typings';
import { UserAPI } from '@/services/userManage/user/UserController';
import { DownOutlined, LogoutOutlined } from '@ant-design/icons';
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
          <img src={(initialState as UserInfo)?.avatar} alt="" />
          {(initialState as UserInfo)?.displayName}
          <DownOutlined style={{ marginLeft: '20px' }} />
        </div>
      </Dropdown>
    </>
  );
};

export default Login;
