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
      icon: 'ApartmentOutlined',
      hideInBreadcrumb: true,
      routes: [
        {
          name: '员工列表',
          path: '/userManage/user',
          component: './UserManage/User',
          access: 'userList',
        },
        {
          icons: 'ApartmentOutlined',
          name: '部门列表',
          path: '/userManage/group',
          component: './UserManage/Group',
          access: 'userList',
        },
      ],
    },
    {
      name: '任务中心',
      path: '/task',
      access: 'userList',
      hideInBreadcrumb: true,
      icon: 'AuditOutlined',
      routes: [
        {
          name: '我的发起',
          path: '/task/sponsor',
          component: './TaskCenter/SponsorList',
        },
        {
          name: '待办任务',
          path: '/task/todo',
          component: './TaskCenter/TodoList',
        },
        {
          name: '已办任务',
          path: '/task/done',
          component: './TaskCenter/DoneList',
        },
        {
          name: '抄送到我',
          path: '/task/cc',
          component: './TaskCenter/CcList',
        },
      ],
    },
    {
      name: '审核管理',
      path: '/audit',
      access: 'userList',
      hideInBreadcrumb: true,
      icon: 'AuditOutlined',
      routes: [
        {
          name: '审批模版列表',
          path: '/audit/modalList',
          component: './AuditModule/ModalList',
        },
        {
          name: '审批实例列表',
          path: '/audit/auditList',
          component: './AuditModule/AuditList',
        },
        {
          path: '/audit/modal/create',
          name: '创建模版',
          component: './AuditModule/ModalDetail',
          hideInMenu: true,
        },
        {
          path: '/audit/modal/modify/:id',
          name: '修改模版',
          component: './AuditModule/ModalDetail',
          hideInMenu: true,
        },
      ],
    },
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
