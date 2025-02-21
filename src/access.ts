import { PERMISSION_CODE } from './constants/permission';
import { UserSelfInfo } from './services/user/typings';

export default (initialState: UserSelfInfo & { isLogin: boolean }) => {
  // 在这里按照初始化数据定义项目中的权限，统一管理
  // 参考文档 https://umijs.org/docs/max/access

  return {
    isLogin: !!initialState?.isLogin,
    // 用户管理
    userList: () => {
      const userModule = initialState?.authority?.find(
        (authority) => authority.code === PERMISSION_CODE.USER_MODULE,
      );
      return !!userModule?.children.find(
        (child) => child.code === PERMISSION_CODE.USER_MANAGER,
      );
    },
    // 角色管理
    roleList: () => {
      const userModule = initialState?.authority?.find(
        (authority) => authority.code === PERMISSION_CODE.USER_MODULE,
      );
      return !!userModule?.children.find(
        (child) => child.code === PERMISSION_CODE.ROLE_MANAGER,
      );
    },
    // 标签管理
    tagGroup: () => {
      const tagModule = initialState?.authority?.find(
        (authority) => authority.code === PERMISSION_CODE.TAG_MODULE,
      );
      return !!tagModule?.children.find(
        (child) => child.code === PERMISSION_CODE.TAG_GROUP,
      );
    },
    // 标签内容管理
    tagList: () => {
      const tagModule = initialState?.authority?.find(
        (authority) => authority.code === PERMISSION_CODE.TAG_MODULE,
      );
      return !!tagModule?.children.find(
        (child) => child.code === PERMISSION_CODE.TAG_LIST,
      );
    },
    // 审核管理
    reviewManage: !!initialState?.authority?.find(
      (authority) => authority.code === PERMISSION_CODE.AUDIT_MODULE,
    ),
    // 审核视频
    auditVideo: () => {
      const auditModule = initialState?.authority?.find(
        (authority) => authority.code === PERMISSION_CODE.AUDIT_MODULE,
      );
      return !!auditModule?.children.find(
        (child) => child.code === PERMISSION_CODE.INCIDENT_AUDIT,
      );
    },
    // 任务管理
    taskList: () => {
      const auditModule = initialState?.authority?.find(
        (authority) => authority.code === PERMISSION_CODE.AUDIT_MODULE,
      );
      const taskManager = auditModule?.children.find(
        (child) => child.code === PERMISSION_CODE.TASK_MANAGER,
      );
      return taskManager?.endpoints.find(
        (endpoint) => endpoint.code === PERMISSION_CODE.TASK_LIST,
      );
    },
    // 任务详情
    taskDetail: () => {
      const auditModule = initialState?.authority?.find(
        (authority) => authority.code === PERMISSION_CODE.AUDIT_MODULE,
      );
      const taskManager = auditModule?.children.find(
        (child) => child.code === PERMISSION_CODE.TASK_MANAGER,
      );
      return taskManager?.endpoints.find(
        (endpoint) => endpoint.code === PERMISSION_CODE.TASK_DETAIL,
      );
    },
    // 线索管理
    clueList: () => {
      const auditModule = initialState?.authority?.find(
        (authority) => authority.code === PERMISSION_CODE.AUDIT_MODULE,
      );
      const taskManager = auditModule?.children.find(
        (child) => child.code === PERMISSION_CODE.TASK_MANAGER,
      );
      return taskManager?.endpoints.find(
        (endpoint) => endpoint.code === PERMISSION_CODE.LIST_CLUE,
      );
    },
    // 处理人管理
    handlerList: () => {
      const auditModule = initialState?.authority?.find(
        (authority) => authority.code === PERMISSION_CODE.AUDIT_MODULE,
      );
      const taskManager = auditModule?.children.find(
        (child) => child.code === PERMISSION_CODE.TASK_MANAGER,
      );
      return taskManager?.endpoints.find(
        (endpoint) => endpoint.code === PERMISSION_CODE.LIST_HANDLER,
      );
    },
    // 外部公司管理
    companyAndStoreManage: !!initialState?.authority?.find(
      (authority) => authority.code === PERMISSION_CODE.EXTERNAL_COMPANY_MODULE,
    ),
    // 外部公司列表
    companyList: () => {
      const companyAndStoreManage = initialState?.authority?.find(
        (authority) =>
          authority.code === PERMISSION_CODE.EXTERNAL_COMPANY_MODULE,
      );
      return companyAndStoreManage?.endpoints.find(
        (endpoint) => endpoint.code === PERMISSION_CODE.COMPANY_LIST,
      );
    },
    // 门店列表
    storeList: () => {
      const companyAndStoreManage = initialState?.authority?.find(
        (authority) =>
          authority.code === PERMISSION_CODE.EXTERNAL_COMPANY_MODULE,
      );
      return companyAndStoreManage?.endpoints.find(
        (endpoint) => endpoint.code === PERMISSION_CODE.STORE_LIST,
      );
    },
    // 门店码生成
    storeGenCode: () => {
      const companyAndStoreManage = initialState?.authority?.find(
        (authority) => authority.code === PERMISSION_CODE.CODE_MODULE,
      );
      return companyAndStoreManage?.endpoints.find(
        (endpoint) => endpoint.code === PERMISSION_CODE.INVITATION_GENERATE,
      );
    },
    // 设备管理
    equipmentManage: !!initialState?.authority?.find(
      (authority) => authority.code === PERMISSION_CODE.DEVICE_MODULE,
    ),
    // 设备记录
    equipmentRecordList: () => {
      const auditModule = initialState?.authority?.find(
        (authority) => authority.code === PERMISSION_CODE.DEVICE_MODULE,
      );
      return !!auditModule?.children.find(
        (child) => child.code === PERMISSION_CODE.DEVICE_RECORD_MODULE,
      );
    },
    // 设备关系
    equipmentRelationList: () => {
      const auditModule = initialState?.authority?.find(
        (authority) => authority.code === PERMISSION_CODE.DEVICE_MODULE,
      );
      return !!auditModule?.children.find(
        (child) => child.code === PERMISSION_CODE.DEVICE_RELATION_MODULE,
      );
    },
    // 设备OTA
    otaVersion: () => {
      const otaModule = initialState?.authority?.find(
        (authority) => authority.code === PERMISSION_CODE.OTA_MODULE,
      );
      return !!otaModule?.children.find(
        (child) => child.code === PERMISSION_CODE.OTA_VERSION,
      );
    },
  };
};
