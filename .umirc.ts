import { defineConfig } from '@umijs/max';

export default defineConfig({
  esbuildMinifyIIFE: true,
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
      redirect: '/home',
      component: './Home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
      hideInMenu: true,
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
      lazy: true,
    },
    {
      name: '角色管理',
      path: '/role',
      component: './Role',
      access: 'roleList',
      lazy: true,
    },
  ],
  npmClient: 'pnpm',
  proxy: {
    '/api': {
      // 标识需要进行转换的请求的url
      target: 'http://192.168.8.132:8888', // 服务端域名
      // target: 'https://eda.ai-kaka.com:443',
      changeOrigin: true, // 允许域名进行转换
    },
  },
});
