import type { ResponseInfoType } from '@/types/common';
import { request } from '@umijs/max';
import type {
  PermissionDataItem,
  RoleCreateParams,
  RoleDetailParams,
  RoleList,
  RoleQueryParams,
  RoleUpdateParams,
} from './typing';

const API_PREFIX = '/api/admin/auth';

export const RoleAPI = {
  /**
   * 获取角色列表
   * GET /api/admin/auth/getAllRoles
   * 接口ID：212763189
   * 接口地址：https://app.apifox.com/link/project/5084807/apis/api-212763189
   * @param params 分页参数
   */
  getAllRoles: (params?: RoleQueryParams) =>
    request<ResponseInfoType<RoleList>>(`${API_PREFIX}/getAllRoles`, {
      method: 'GET',
      params,
    }),

  /**
   * 更新角色信息(不含权限详情)
   * POST /api/admin/auth/updateRoleInfo
   * 接口ID：213087800
   * 接口地址：https://app.apifox.com/link/project/5084807/apis/api-213087800
   * @param params 角色信息
   */
  modifyRole: (params: RoleUpdateParams) =>
    request<ResponseInfoType<null>>(`${API_PREFIX}/updateRoleInfo`, {
      method: 'POST',
      data: params,
    }),

  /**
   * 新建角色
   * POST /api/admin/auth/createRole
   * 接口ID：215816839
   * 接口地址：https://app.apifox.com/link/project/5084807/apis/api-215816839
   * @param params 角色信息
   */
  createRole: (params: RoleCreateParams) =>
    request<ResponseInfoType<null>>(`${API_PREFIX}/createRole`, {
      method: 'POST',
      data: params,
    }),

  /**
   * 获取角色权限详情
   * GET /api/admin/auth/getRoleDetail
   * 接口ID：212784257
   * 接口地址：https://app.apifox.com/link/project/5084807/apis/api-212784257
   * @param roleId 角色ID
   */
  getRoleDetail: (roleId: string) =>
    request<ResponseInfoType<PermissionDataItem>>(
      `${API_PREFIX}/getRoleDetail`,
      {
        method: 'GET',
        params: { role_id: roleId },
      },
    ),

  /**
   * 更新角色权限详情
   * POST /api/admin/auth/updateRoleDetail
   * 接口ID：213089573
   * 接口地址：https://app.apifox.com/link/project/5084807/apis/api-213089573
   * @param params 角色权限信息
   */
  updateRoleDetail: (params: RoleDetailParams) =>
    request<ResponseInfoType<null>>(`${API_PREFIX}/updateRoleDetail`, {
      method: 'POST',
      data: params,
    }),

  /**
   * 删除角色
   * POST /api/admin/auth/delete
   * 接口ID：213088599
   * 接口地址：https://app.apifox.com/link/project/5084807/apis/api-213088599
   * @param roleId 角色ID
   */
  deleteRole: (roleId: string) =>
    request<ResponseInfoType<null>>(`${API_PREFIX}/delete`, {
      method: 'POST',
      data: { role_id: roleId },
    }),
};
