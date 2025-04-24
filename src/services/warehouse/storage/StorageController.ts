import { ResponseInfoType } from '@/types/common';
import { request } from '@umijs/max';
import type { StorageListResponse, StorageParams } from './typings';

const API_PREFIX = '/api/admin/warehouse';

export const StorageAPI = {
  /** 
  正式入库列表
  GET /api/admin/warehouse/formal/list
  接口ID：286146659
  接口地址：https://app.apifox.com/link/project/5084807/apis/api-286146659
  */
  getStorageList: (params: StorageParams) =>
    request<ResponseInfoType<StorageListResponse>>(
      `${API_PREFIX}/formal/list`,
      {
        method: 'GET',
        params,
      },
    ),
};
