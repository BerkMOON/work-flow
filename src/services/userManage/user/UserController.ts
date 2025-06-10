/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！
import { COMPANY_NAME } from '@/constants';
import { ResponseInfoType } from '@/types/common';
import { request } from '@umijs/max';
import type {
  UserInfo,
  UserLoginRequest,
  UserLoginResponse,
  UserSelfInfo,
} from './typings';

const API_PREFIX = '/api';

export const UserAPI = {
  /**
   * 获取用户列表
   * GET /api/admin/user/getAllUsers
   * @param params 分页参数
   */
  queryUserList: (params?: { page?: number; limit?: number }) =>
    request<ResponseInfoType<UserInfo[], number>>(`${API_PREFIX}/get-users`, {
      method: 'GET',
      params: {
        ...params,
        owner: COMPANY_NAME,
      },
    }),

  /**
   * 获取用户详情
   * GET /api/getSelfInfo
   */
  getSelfInfo: () =>
    request<UserSelfInfo>(`${API_PREFIX}/get-account`, {
      method: 'GET',
    }),

  /**
   * 用户登录
   * POST /api/login
   */
  loginUser: (params: UserLoginRequest) =>
    request<UserLoginResponse>(`${API_PREFIX}/login`, {
      method: 'POST',
      data: params,
    }),

  /**
   * 用户登出
   * POST /api/logout
   */
  logout: () =>
    request<UserLoginResponse>(`${API_PREFIX}/logout`, {
      method: 'POST',
    }),

  /**
   * 用户注册
   * POST /api/add-user
   */
  createUser: (params: UserInfo) =>
    request<ResponseInfoType<string, null>>(`${API_PREFIX}/add-user`, {
      method: 'POST',
      data: params,
    }),

  /**
   * 删除用户
   * POST /api/admin/user/delete
   */
  deleteUser: (params: UserInfo) =>
    request<ResponseInfoType<string, null>>(`${API_PREFIX}/delete-user`, {
      method: 'POST',
      data: params,
    }),

  /**
   * 更新用户信息
   * POST /api/admin/user/updateUserInfo
   * 接口ID：210698804
   * 接口地址：https://app.apifox.com/link/project/5084807/apis/api-210698804
   */
  modifyUserInfo: (params: UserInfo & { user_id?: string }) =>
    request<ResponseInfoType<string, null>>(
      `${API_PREFIX}/update-user?id=${params.owner}/${params.user_id}`,
      {
        method: 'POST',
        data: params,
      },
    ),
};
