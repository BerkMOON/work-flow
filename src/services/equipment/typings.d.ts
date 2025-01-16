import { BaseListInfo, PageInfoParams } from '@/types/common';

export interface EquipmentRecordItem {
  id: number;
  equipment_id: string;
  version: string;
  username: string;
  secret: string;
  status: {
    code: number;
    name: string;
  };
  create_time: string;
  modify_time: string;
}

export interface EquipmentRecordList extends BaseListInfo {
  record_list: EquipmentRecordItem[];
}

export interface EquipmentRecordParams extends PageInfoParams {
  equipment_id?: string;
  version?: string;
  status?: string;
}

export interface CreateEquipmentRecordParams {
  equipment_id: string;
  version: string;
  username: string;
  secret: string;
  ext: string;
}

export interface UpdateEquipmentRecordStatusParams {
  record_id: number;
  equipment_id: string;
  status: string;
}

export interface UpdateEquipmentRecordParams {
  record_id: number;
  version: string;
  username: string;
  secret: string;
  ext: string;
}

export interface EquipmentRelationParams extends PageInfoParams {
  /**
   * 公司id
   */
  companyid?: number;
  /**
   * 设备号
   */
  equipmentid?: string;
  /**
   * 用户openid
   */
  openid?: string;
  /**
   * 用户手机号
   */
  phone?: string;
  /**
   * 状态，active生效，deleted失效
   */
  status?: string;
  /**
   * 门店id
   */
  storeid?: number;
}

export interface EquipmentRelationList extends BaseListInfo {
  relation_list: EquipmentRelationItem[];
}

export interface EquipmentRelationItem {
  id: number;
  equipment_id: string;
  open_id: string;
  phone: string;
  company_name: string;
  store_name: string;
  status: {
    code: number;
    name: string;
  };
  create_time: string;
  modify_time: string;
}

export interface CreateEquipmentRelationParams {
  equipment_id: string;
  open_id: string;
  phone: string;
  company_id: number;
  store_id: number;
}

export interface UpdateEquipmentRelationParams {
  relation_id: number;
  open_id: string;
  phone: string;
  company_id: number;
  store_id: number;
}

export interface UpdateEquipmentRelationStatusParams {
  relation_id: number;
  status: string;
}
