// 运行时配置
import Login from './components/Login/Login';
import { getUserDetail } from './services/user/UserController';

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<
  (API.UserSelfInfo & { isLogin: boolean }) | { isLogin: boolean }
> {
  try {
    const userInfo = await getUserDetail();
    const { data } = userInfo;
    if (data) {
      return { ...data, isLogin: true };
    } else {
      return { isLogin: false };
    }
  } catch (e) {
    console.error('get user info error', e);
    return { isLogin: false };
  }
}

export const layout = () => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
    rightContentRender: () => <Login />,
    layout: 'top',
  };
};
