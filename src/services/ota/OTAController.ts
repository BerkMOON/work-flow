import { ResponseInfoType } from '@/types/common';
import { request } from '@umijs/max';
import {
  OssConfig,
  OtaCreateParams,
  OtaDeleteParams,
  OtaList,
  OtaParams,
  OtaReleaseParams,
  OtaUpdateParams,
  OtaUploadParams,
} from './typings';

const API_PREFIX = '/api/admin/ota';

export const OtaAPI = {
  /**
   * ota记录列表
   * GET /api/admin/ota/record/getAllOTARecords
   * 接口ID：262550661
   * 接口地址：https://app.apifox.com/link/project/5084807/apis/api-262550661
   */
  getOtaUpdataList: (params?: OtaParams) =>
    request<ResponseInfoType<OtaList>>(
      `${API_PREFIX}/record/getAllOTARecords`,
      {
        method: 'GET',
        params,
      },
    ),

  /**
   *ota记录状态修改
   *POST /api/admin/ota/record/status
   *接口ID：262534710
   *接口地址：https://app.apifox.com/link/project/5084807/apis/api-262534710
   */
  deleteVersion: (params: OtaDeleteParams) =>
    request<ResponseInfoType<null>>(`${API_PREFIX}/record/status`, {
      method: 'POST',
      data: params,
    }),

  /**
   * ota信息更新
   * POST /api/admin/ota/record/update
   * 接口ID：262535994
   *  接口地址：https://app.apifox.com/link/project/5084807/apis/api-262535994
   */
  updateOtaStatus: (params: OtaUpdateParams) =>
    request<ResponseInfoType<null>>(`${API_PREFIX}/record/update`, {
      method: 'POST',
      data: params,
    }),

  /**
   * 新建ota版本
   * POST /api/admin/ota/record/create
   * 接口ID：262533510
   * 接口地址：https://app.apifox.com/link/project/5084807/apis/api-262533510
   */
  createOtaUpdate: (params: OtaCreateParams) =>
    request<ResponseInfoType<null>>(`${API_PREFIX}/record/create`, {
      method: 'POST',
      data: params,
    }),

  /**
   * 灰度发布
   * POST /api/admin/ota/record/OTARelease
   * 接口ID：262551217
   * 接口地址：https://app.apifox.com/link/project/5084807/apis/api-262551217
   */
  otaRelease: (params: OtaReleaseParams) =>
    request<ResponseInfoType<null>>(`${API_PREFIX}/record/OTARelease`, {
      method: 'POST',
      data: params,
    }),

  getOSSConfig: (params: OtaUploadParams) =>
    request<ResponseInfoType<OssConfig>>(`${API_PREFIX}/getOssPostSignature`, {
      method: 'GET',
      params,
    }),
};
