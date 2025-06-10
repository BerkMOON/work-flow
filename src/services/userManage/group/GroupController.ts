/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！
import { COMPANY_NAME } from '@/constants';
import { ResponseInfoType } from '@/types/common';
import { request } from '@umijs/max';
import type { GroupInfo, GroupRequest } from './typings';

const API_PREFIX = '/api';

export const GroupAPI = {
  /**
   * 获取群组列表
   * GET /api/get-groups
   * @param params 分页参数
   */
  queryGroupList: (params?: GroupRequest) =>
    request<ResponseInfoType<GroupInfo[], number>>(`${API_PREFIX}/get-groups`, {
      method: 'GET',
      params: {
        ...params,
        owner: COMPANY_NAME,
      },
    }),

  /**
   * 新建部门
   * GET /api/get-users
   * @param params 分页参数
   */
  createGroup: (params: GroupInfo) =>
    request<ResponseInfoType<string, null>>(`${API_PREFIX}/add-group`, {
      method: 'POST',
      data: params,
    }),

  /**
   * 删除部门
   * GET /api/get-users
   * @param params 分页参数
   */
  deleteGroup: (params: GroupInfo) =>
    request<ResponseInfoType<string, null>>(`${API_PREFIX}/delete-group`, {
      method: 'POST',
      data: params,
    }),

  /**
   * 更新部门
   * GET /api/update-users
   * @param params 分页参数
   */
  updateGroup: (params: GroupInfo & { id?: string }) =>
    request<ResponseInfoType<string, null>>(
      `${API_PREFIX}/update-group?id=${params.owner}/${params.id}`,
      {
        method: 'POST',
        data: params,
      },
    ),
};
