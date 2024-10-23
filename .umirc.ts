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
      layout: false,
    },
    {
      name: '用户列表',
      path: '/user',
      component: './User',
      access: 'userList',
    },
    {
      name: '客服督查',
      path: '/supervision',
      component: './Supervision',
    },
    {
      name: '权限管理',
      path: '/role',
      component: './Role',
      access: 'userList',
    },
    {
      name: '视频审核',
      path: '/audit',
      component: './Audit',
    },
  ],
  npmClient: 'pnpm',
  proxy: {
    '/api': {
      // 标识需要进行转换的请求的url
      target: 'http://47.121.203.31:8888', // 服务端域名
      changeOrigin: true, // 允许域名进行转换
    },
    '/admin': {
      // 标识需要进行转换的请求的url
      target: 'http://47.121.203.31:8888', // 服务端域名
      changeOrigin: true, // 允许域名进行转换
    },
  },
});
