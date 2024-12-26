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
      name: '角色管理',
      path: '/role',
      component: './Role',
      access: 'userList',
    },
    {
      name: '标签管理',
      path: '/tag',
      component: './Tag/Group',
      access: 'tagList',
    },
    {
      name: '标签内容管理',
      path: '/tag/:groupId',
      component: './Tag/List',
      access: 'tagList',
      hideInMenu: true,
    },
    {
      name: '客服督查',
      path: '/supervision',
      component: './Supervision',
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
      target: 'http://47.121.134.143:8888', // 服务端域名
      changeOrigin: true, // 允许域名进行转换
    },
    '/admin': {
      // 标识需要进行转换的请求的url
      target: 'http://47.121.134.143:8888', // 服务端域名
      changeOrigin: true, // 允许域名进行转换
    },
  },
});
