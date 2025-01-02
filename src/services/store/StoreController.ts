import { ResponseInfoType } from '@/types/common';
import { request } from '@umijs/max';
import {
  StoreCreateParams,
  StoreDeleteParams,
  StoreList,
  StoreParams,
  StoreUpdateParams,
} from './typing';

const API_PREFIX = '/api/admin/external/store';

export const StoreAPI = {
  /**
   * 创建门店
   * POST /api/admin/external/store/create
   * 接口ID：250550159
   * 接口地址：https://app.apifox.com/link/project/5084807/apis/api-250550159
   */
  createStore: (params?: StoreCreateParams) =>
    request<ResponseInfoType<null>>(`${API_PREFIX}/create`, {
      method: 'POST',
      data: params,
    }),

  /**
   * 门店列表
   * GET /api/admin/external/store/getAllStores
   * 接口ID：250558353
   * 接口地址：https://app.apifox.com/link/project/5084807/apis/api-250558353
   */
  getAllStores: (params?: StoreParams) =>
    request<ResponseInfoType<StoreList>>(`${API_PREFIX}/getAllStores`, {
      method: 'GET',
      params,
    }),

  /**
   * 更新门店信息
   * POST /api/admin/external/store/update
   * 接口ID：250554225
   * 接口地址：https://app.apifox.com/link/project/5084807/apis/api-250554225
   */
  updateStore: (params?: StoreUpdateParams) =>
    request<ResponseInfoType<null>>(`${API_PREFIX}/update`, {
      method: 'POST',
      data: params,
    }),

  /**
   * 删除门店
   * POST /api/admin/external/store/delete
   * 接口ID：250552141
   * 接口地址：https://app.apifox.com/link/project/5084807/apis/api-250552141
   */
  deleteStore: (params?: StoreDeleteParams) =>
    request<ResponseInfoType<null>>(`${API_PREFIX}/delete`, {
      method: 'POST',
      data: params,
    }),
};
