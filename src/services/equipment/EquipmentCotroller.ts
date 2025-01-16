import { ResponseInfoType } from '@/types/common';
import { request } from '@umijs/max';
import {
  CreateEquipmentRecordParams,
  CreateEquipmentRelationParams,
  EquipmentRecordList,
  EquipmentRecordParams,
  EquipmentRelationList,
  EquipmentRelationParams,
  UpdateEquipmentRecordParams,
  UpdateEquipmentRecordStatusParams,
  UpdateEquipmentRelationParams,
  UpdateEquipmentRelationStatusParams,
} from './typings';

const API_PREFIX = '/api/admin/equipment';

const EquipmentAPI = {
  /**
   * 查询设备记录列表
   * GET /api/admin/equipment/record/getAllEquipmentRecords
   * 接口ID：253969570
   * 接口地址：https://app.apifox.com/link/project/5084807/apis/api-253969570
   */
  getEquipmentRecords: async (params?: EquipmentRecordParams) => {
    return await request<ResponseInfoType<EquipmentRecordList>>(
      `${API_PREFIX}/record/getAllEquipmentRecords`,
      {
        method: 'GET',
        params,
      },
    );
  },

  /**
   * 创建设备记录
   * POST /api/admin/equipment/record/create
   * 接口ID：253963292
   * 接口地址：https://app.apifox.com/link/project/5084807/apis/api-253963292
   */
  createEquipmentRecord: async (params?: CreateEquipmentRecordParams) => {
    return await request<ResponseInfoType<null>>(
      `${API_PREFIX}/record/create`,
      {
        method: 'POST',
        data: params,
      },
    );
  },

  /**
   * 更新设备记录
   * POST /api/admin/equipment/record/update
   * 接口ID：253965028
   * 接口地址：https://app.apifox.com/link/project/5084807/apis/api-253965028
   */
  updateEquipmentRecord: async (params?: UpdateEquipmentRecordParams) => {
    return await request(`${API_PREFIX}/record/update`, {
      method: 'POST',
      data: params,
    });
  },

  /**
   * 修改记录状态
   * POST /api/admin/equipment/record/status
   * 接口ID：253964583
   * 接口地址：https://app.apifox.com/link/project/5084807/apis/api-253964583
   */
  updateEquipmentRecordStatus: async (
    params?: UpdateEquipmentRecordStatusParams,
  ) => {
    return await request(`${API_PREFIX}/record/status`, {
      method: 'POST',
      data: params,
    });
  },

  /**
   * 查询设备关联列表
   * GET /api/admin/equipment/relation/getAllEquipmentRelations
   * 接口ID：253975597
   * 接口地址：https://app.apifox.com/link/project/5084807/apis/api-253975597
   */
  getEquipmentRelations: async (params?: EquipmentRelationParams) => {
    return await request<ResponseInfoType<EquipmentRelationList>>(
      `${API_PREFIX}/relation/getAllEquipmentRelations`,
      {
        method: 'GET',
        params,
      },
    );
  },

  /**
   * 创建设备关联
   * POST /api/admin/equipment/relation/create
   * 接口ID：253971177
   * 接口地址：https://app.apifox.com/link/project/5084807/apis/api-253971177
   */
  createEquipmentRelation: async (params?: CreateEquipmentRelationParams) => {
    return await request<ResponseInfoType<null>>(
      `${API_PREFIX}/relation/create`,
      {
        method: 'POST',
        data: params,
      },
    );
  },

  /**
   * 更新关联信息
   * POST /api/admin/equipment/relation/update
   * 接口ID：253972720
   * 接口地址：https://app.apifox.com/link/project/5084807/apis/api-253972720
   */
  updateEquipmentRelation: async (params?: UpdateEquipmentRelationParams) => {
    return await request(`${API_PREFIX}/relation/update`, {
      method: 'POST',
      data: params,
    });
  },

  /**
   * 更新关联状态
   * POST /api/admin/equipment/relation/status
   * 接口ID：253971693
   * 接口地址：https://app.apifox.com/link/project/5084807/apis/api-253971693
   */
  updateEquipmentRelationStatus: async (
    params?: UpdateEquipmentRelationStatusParams,
  ) => {
    return await request(`${API_PREFIX}/relation/status`, {
      method: 'POST',
      data: params,
    });
  },
};

export default EquipmentAPI;
