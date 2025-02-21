import { COMMON_STATUS } from '@/constants';
import { BaseListInfo } from '@/types/common';

export enum UPGRADE_TYPE {
  FULL_GRAY = 1,
  TARGETED = 2,
}

export const UPGRADE_TYPE_LABEL = [
  { label: '全量灰度', value: UPGRADE_TYPE.FULL_GRAY },
  { label: '定向设备', value: UPGRADE_TYPE.TARGETED },
];

export interface OtaItem {
  id: number;
  model: string; // 设备型号
  version: string; //版本
  status: {
    name: string;
    code: COMMON_STATUS;
  }; // 状态，生效：active，删除：deleted
  filename: string; // 文件名
  path: string; // 文件url
  md5: string;
  handler_name: string; // 处理人
  upgrade_type: {
    name: string;
    code: UPGRADE_TYPE;
  }; // 升级类型，1：全量灰度，2：定向设备
  rule: string; // 规则
  release_range: number; // 灰度比例
  ext: string; // 扩展信息
  create_time: string; // 创建时间
  modify_time: string; // 修改时间
}

export interface OtaList extends BaseListInfo {
  record_list: OtaItem[];
}

export interface OtaParams {
  page: number;
  limit: number;
  model: string; // 型号
  version?: string;
  status?: COMMON_STATUS; // 状态，生效：active，删除：deleted
  upgrade_type?: UPGRADE_TYPE; // 升级类型，1：全量灰度，2：定向设备
}

export interface OssConfig {
  policy: string;
  signature: string;
  ossAccessKeyId: string;
  host: string;
  dir: string;
}

export interface OtaCreateParams {
  model: string; // 型号
  filename: string;
  path: string;
  md5: string;
  upgrade_type: UPGRADE_TYPE; // 升级类型，1：全量灰度，2：定向设备
  rule: string; // 规则
  release_range: number; // 灰度比例
  device_ids: string[];
  ext: string;
}

export interface OtaUpdateParams {
  record_id: number;
  device_ids: string[];
  ext: string;
}

export interface OtaDeleteParams {
  record_id: number;
  status: number;
}

export interface OtaReleaseParams {
  record_id: number;
  release_range: number;
}
