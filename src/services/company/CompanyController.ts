import { ResponseInfoType } from '@/types/common';
import { request } from '@umijs/max';
import {
  CompanyCreateParams,
  CompanyDeleteParams,
  CompanyList,
  CompanyParams,
  CompanyUpdateParams,
} from './typing';

const API_PREFIX = '/api/admin/external/company';

export const CompanyAPI = {
  /**
   * 创建公司
   * POST /api/admin/external/company/create
   * 接口ID：250537485
   * 接口地址：https://app.apifox.com/link/project/5084807/apis/api-250537485
   */
  createCompany: (params?: CompanyCreateParams) =>
    request<ResponseInfoType<null>>(`${API_PREFIX}/create`, {
      method: 'POST',
      data: params,
    }),

  /**
   * 公司列表
   * GET /api/admin/external/company/getAllCompanies
   * 接口ID：250547524
   * 接口地址：https://app.apifox.com/link/project/5084807/apis/api-250547524
   */
  getAllCompanies: (params?: CompanyParams) =>
    request<ResponseInfoType<CompanyList>>(`${API_PREFIX}/getAllCompanies`, {
      method: 'GET',
      params,
    }),

  /**
   * 更新公司信息
   * POST /api/admin/external/company/update
   * 接口ID：250539938
   * 接口地址：https://app.apifox.com/link/project/5084807/apis/api-250539938
   */
  updateCompany: (params?: CompanyUpdateParams) =>
    request<ResponseInfoType<null>>(`${API_PREFIX}/update`, {
      method: 'POST',
      data: params,
    }),

  /**
   * 删除公司及对应门店
   * POST /api/admin/external/company/delete
   * 接口ID：250538678
   * 接口地址：https://app.apifox.com/link/project/5084807/apis/api-250538678
   */
  deleteCompany: (params?: CompanyDeleteParams) =>
    request<ResponseInfoType<null>>(`${API_PREFIX}/delete`, {
      method: 'POST',
      data: params,
    }),
};
