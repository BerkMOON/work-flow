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
    },
    {
      name: '角色管理',
      path: '/role',
      component: './Role',
      access: 'roleList',
    },
    {
      name: '标签管理',
      path: '/tag',
      component: './Tag/Group',
      access: 'tagGroup',
    },
    {
      name: '标签内容管理',
      path: '/tag/:groupId',
      component: './Tag/List',
      access: 'tagList',
      hideInMenu: true,
    },
    {
      name: '审核管理',
      access: 'reviewManage',
      path: '/review',
      hideInBreadcrumb: true,
      routes: [
        {
          path: '/review/audit',
          name: '审核页面',
          component: './Audit',
          access: 'auditVideo',
        },
        {
          path: '/review/task',
          name: '任务列表',
          component: './Task',
          access: 'taskList',
        },
        {
          path: '/review/task/:clueId',
          name: '任务详情',
          component: './Task/Detail',
          access: 'taskDetail',
          hideInMenu: true,
        },
        {
          path: '/review/clue',
          name: '线索列表',
          component: './ClueList',
          access: 'clueList',
        },
        {
          path: '/review/clue/:clueId',
          name: '线索详情',
          component: './Task/Detail',
          hideInMenu: true,
        },
      ],
    },
    {
      name: '公司与门店管理',
      access: 'companyAndStoreManage',
      path: '/cas',
      hideInBreadcrumb: true,
      routes: [
        {
          path: '/cas/company',
          name: '公司列表',
          component: './Company',
          access: 'companyList',
        },
        {
          path: '/cas/store',
          name: '门店列表',
          component: './Store',
          access: 'storeList',
        },
        {
          path: '/cas/user',
          name: '门店人员管理',
          component: './BusinessUser',
          access: 'userList',
        },
        {
          path: '/cas/gencode',
          name: '生成门店码',
          component: './Store/GenCode',
        },
      ],
    },
    {
      name: '设备管理',
      access: 'equipmentManage',
      path: '/equipment',
      hideInBreadcrumb: true,
      routes: [
        {
          path: '/equipment/record',
          name: '设备记录',
          component: './Equipment/RecordList',
          access: 'equipmentRecordList',
        },
        {
          path: '/equipment/relation',
          name: '设备关联',
          component: './Equipment/RelationList',
          access: 'equipmentRelationList',
        },
      ],
    },
    {
      name: '设备OTA',
      path: '/ota',
      component: './Ota',
      access: 'otaVersion',
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
