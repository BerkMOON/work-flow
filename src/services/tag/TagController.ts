import type { ResponseInfoType } from '@/types/common';
import { request } from '@umijs/max';
import type {
  CreateTagGroupParams,
  CreateTagItemParams,
  TagGroupList,
  TagGroupQueryParams,
  TagItemList,
  TagItemQueryParams,
  UpdateTagGroupParams,
  UpdateTagItemParams,
} from './typings';

const API_PREFIX = '/api/admin/tag';

export const TagAPI = {
  /**
   * 标签组列表
   * GET /api/admin/tag/group/getAllTagGroups
   * 接口ID：248229436
   * 接口地址：https://app.apifox.com/link/project/5084807/apis/api-248229436
   */
  getAllTagGroups: (params?: TagGroupQueryParams) =>
    request<ResponseInfoType<TagGroupList>>(
      `${API_PREFIX}/group/getAllTagGroups`,
      {
        method: 'GET',
        params,
      },
    ),

  /**
   * 创建标签组
   * POST /api/admin/tag/group/create
   * 接口ID：248226291
   * 接口地址：https://app.apifox.com/link/project/5084807/apis/api-248226291
   */
  createTagGroup: (data: CreateTagGroupParams) =>
    request<ResponseInfoType<null>>(`${API_PREFIX}/group/create`, {
      method: 'POST',
      data,
    }),

  /**
   * 更新标签组
   * POST /api/admin/tag/group/updateTagGroup
   * 接口ID：248229438
   * 接口地址：https://app.apifox.com/link/project/5084807/apis/api-248229438
   */
  updateTagGroup: (data: UpdateTagGroupParams) =>
    request<ResponseInfoType<null>>(`${API_PREFIX}/group/update`, {
      method: 'POST',
      data,
    }),

  /**
   * 删除标签组
   * POST /api/admin/tag/group/delete
   * 接口ID：248226926
   * 接口地址：https://app.apifox.com/link/project/5084807/apis/api-248226926
   */
  deleteTagGroup: (id: string) =>
    request<ResponseInfoType<null>>(`${API_PREFIX}/group/delete`, {
      method: 'POST',
      data: {
        id,
      },
    }),

  /**
   * 标签项列表
   * GET /api/admin/tag/item/getTagItems
   * 接口ID：248292062
   * 接口地址：https://app.apifox.com/link/project/5084807/apis/api-248292062
   */
  getTagItems: (params?: TagItemQueryParams) =>
    request<ResponseInfoType<TagItemList>>(`${API_PREFIX}/item/getTagItems`, {
      method: 'GET',
      params,
    }),

  /**
   * 创建标签项
   * POST /api/admin/tag/item/create
   * 接口ID：248229977
   * 接口地址：https://app.apifox.com/link/project/5084807/apis/api-248229977
   */
  createTagItem: (data: CreateTagItemParams) =>
    request<ResponseInfoType<null>>(`${API_PREFIX}/item/create`, {
      method: 'POST',
      data,
    }),

  /**
   * 更新标签项信息
   * POST /api/admin/tag/item/update
   * 接口ID：248236557
   * 接口地址：https://app.apifox.com/link/project/5084807/apis/api-248236557
   */
  updateTagItem: (data: UpdateTagItemParams) =>
    request<ResponseInfoType<null>>(`${API_PREFIX}/item/update`, {
      method: 'POST',
      data,
    }),

  /**
   * 删除标签项
   * POST /api/admin/tag/item/delete
   * 接口ID：248233438
   * 接口地址：https://app.apifox.com/link/project/5084807/apis/api-248233438
   */
  deleteTagItem: (id: number) =>
    request<ResponseInfoType<null>>(`${API_PREFIX}/item/delete`, {
      method: 'POST',
      data: {
        id,
      },
    }),
};
