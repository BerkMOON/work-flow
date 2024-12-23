/* eslint-disable */
import { request } from '@umijs/max';
import { ResponseInfoType, ResponseStatus } from '../typing';
import { PermissionDataItem, RoleList } from './typing';

/**
 * 获取角色列表
  GET /api/admin/auth/getAllRoles
  接口ID：212763189
  接口地址：https://app.apifox.com/link/project/5084807/apis/api-212763189
 */
export async function getAllRoles(params?: { page?: number; limit?: number }) {
  return request<ResponseInfoType<RoleList>>('/api/admin/auth/getAllRoles', {
    method: 'GET',
    params,
  });
}

/**
 * 
 * 更新角色信息(不含权限详情)
  POST /api/admin/auth/updateRoleInfo
  接口ID：213087800
  接口地址：https://app.apifox.com/link/project/5084807/apis/api-213087800
 */
export async function modifyRole(params: { name: string; role_id: string }) {
  return request<any>('/api/admin/auth/updateRoleInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

/**
 * 
 * 新建角色
  POST /api/admin/auth/createRole
  接口ID：215816839
  接口地址：https://app.apifox.com/link/project/5084807/apis/api-215816839
 */
export async function createRole(params: { role_name: string }) {
  return request<ResponseStatus>('/api/admin/auth/createRole', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

/**
 * 
 * 获取角色权限详情
  GET /api/admin/auth/getRoleDetail
  接口ID：212784257
  接口地址：https://app.apifox.com/link/project/5084807/apis/api-212784257
 */
export async function getRoleDetail(role_id: string) {
  return request<ResponseInfoType<PermissionDataItem>>(
    '/api/admin/auth/getRoleDetail',
    {
      method: 'GET',
      params: {
        role_id,
      },
    },
  );
}

/**
 * 更新角色权限详情
  POST /api/admin/auth/updateRoleDetail
  接口ID：213089573
  接口地址：https://app.apifox.com/link/project/5084807/apis/api-213089573
 */
export async function updateRoleDetail(params: {
  role_id: string;
  code_list: string[];
}) {
  return request<ResponseStatus>('/api/admin/auth/updateRoleDetail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

/**
 * 删除角色
  POST /api/admin/auth/delete
  接口ID：213088599
  接口地址：https://app.apifox.com/link/project/5084807/apis/api-213088599
 */
export async function deleteRole(role_id: string) {
  return request<ResponseStatus>('/api/admin/auth/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      role_id,
    },
  });
}
