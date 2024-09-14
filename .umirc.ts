import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '车辆管理系统',
  },
  routes: [
    {
      path: '/',
      redirect: '/audit',
      component: './Audit',
    },
    {
      name: '登录',
      path: '/login',
      component: './Login',
      hideInMenu: true,
    },
    {
      name: '用户列表',
      path: '/table',
      component: './Table',
    },
    {
      name: '视频审核',
      path: '/audit',
      component: './Audit',
    },
  ],
  npmClient: 'pnpm',
});
