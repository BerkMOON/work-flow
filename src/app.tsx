// 运行时配置
import { Button, Result } from 'antd';
import Login from './components/BasicComponents/Login/Login';
import { API_STATUS, Not_Login } from './constants';
import iconPng from './favicon.jpeg';
import { UserInfo } from './services/userManage/user/typings';
import { UserAPI } from './services/userManage/user/UserController';

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<
  (UserInfo & { isLogin: boolean }) | { isLogin: boolean }
> {
  // 在登录页面不请求用户信息
  if (window.location.pathname === '/login') {
    return { isLogin: false };
  }
  try {
    const userInfo = await UserAPI.getSelfInfo();
    const { data, status } = userInfo;
    if (data === Not_Login && status === API_STATUS.ERROR) {
      return { isLogin: false };
    } else {
      return { ...data, isLogin: true };
    }
  } catch (e) {
    console.error('get user info error', e);
    return { isLogin: false };
  }
}

export const request = {
  timeout: 10000,
  errorConfig: {
    errorHandler: (error: any) => {
      // 统一错误处理
      if (error.response?.status === 401) {
        const currentPath = window.location.pathname;
        localStorage.setItem('redirectPath', currentPath);
        window.location.href = '/login';
      }
    },
  },
};

export const layout = ({
  initialState,
}: {
  initialState: (UserInfo & { isLogin: boolean }) | { isLogin: boolean };
}) => {
  const { isLogin } = initialState;
  return {
    logo: iconPng,
    menu: {
      locale: false,
    },
    rightContentRender: () => <Login />,
    layout: 'top',
    unAccessible: (
      <Result
        status={`${isLogin ? '403' : '404'}`}
        title={`${isLogin ? '403' : '未登录'}`}
        subTitle={
          isLogin
            ? '抱歉，你无权访问此页面，如需使用，请联系管理员添加权限'
            : '请先登录再查看'
        }
        extra={
          <Button
            type="primary"
            onClick={() => {
              if (isLogin) {
                window.location.href = '/home';
              } else {
                window.location.href = '/login';
              }
            }}
          >
            {isLogin ? '返回首页' : '登录'}
          </Button>
        }
      />
    ),
  };
};
