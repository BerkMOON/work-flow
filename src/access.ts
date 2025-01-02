import { UserSelfInfo } from './services/user/typings';

export default (initialState: UserSelfInfo & { isLogin: boolean }) => {
  // 在这里按照初始化数据定义项目中的权限，统一管理
  // 参考文档 https://umijs.org/docs/max/access

  return {
    isLogin: !!initialState?.isLogin,
    userList: !!initialState?.authority?.find(
      (authority) => authority.code === 'user_module',
    ),
    auditVideo: !!initialState?.authority?.find(
      (authority) => authority.code === 'audit_module',
    ),
    tagList: !!initialState?.authority?.find(
      (authority) => authority.code === 'tag_module',
    ),
    taskList: !!initialState?.authority?.find(
      (authority) => authority.code === 'audit_module',
    ),
    taskDetail: !!initialState?.authority?.find(
      (authority) => authority.code === 'audit_module',
    ),
    clueList: !!initialState?.authority?.find(
      (authority) => authority.code === 'audit_module',
    ),
    handlerList: !!initialState?.authority?.find(
      (authority) => authority.code === 'audit_module',
    ),
    companyList: !!initialState?.authority?.find(
      (authority) => authority.code === 'external_company_module',
    ),
    storeList: !!initialState?.authority?.find(
      (authority) => authority.code === 'external_company_module',
    ),
  };
};
