import { defineConfig } from '@umijs/max';

export default defineConfig({
  esbuildMinifyIIFE: true,
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '奥吉通管理系统',
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
      name: '公司人员管理',
      path: '/userManage',
      access: 'userList',
      hideInBreadcrumb: true,
      routes: [
        {
          name: '员工列表',
          path: '/userManage/user',
          component: './UserManage/User',
          access: 'userList',
        },
        {
          name: '部门列表',
          path: '/userManage/group',
          component: './UserManage/Group',
          access: 'userList',
        },
      ],
    },
    // {
    //   name: '角色管理',
    //   path: '/role',
    //   component: './Role',
    //   access: 'roleList',
    //   lazy: true,
    // },
  ],
  npmClient: 'pnpm',
  proxy: {
    '/api': {
      // 标识需要进行转换的请求的url
      target: 'http://47.121.134.143:8000', // 服务端域名
      // target: 'https://eda.ai-kaka.com:443',
      changeOrigin: true, // 允许域名进行转换
    },
  },
});
