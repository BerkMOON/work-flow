import { BaseListInfo, PageInfoParams } from '../../types/common';

export interface StoreItem {
  id: string;
  company_id: string;
  name: string;
  extra: string;
  create_time: string;
  modify_time: string;
  notify: string;
}

export interface StoreList extends BaseListInfo {
  store_list: StoreItem[];
}

export interface StoreParams extends PageInfoParams {
  name?: string;
  company_id: string;
}

export interface StoreCreateParams {
  name: string;
  extra?: string;
  company_id?: string;
  notify: string;
}

export interface StoreDeleteParams {
  id: string;
}

export interface StoreUpdateParams extends StoreCreateParams {
  id: string;
}

export interface StoreCodeParams {
  company_id: string;
  store_id: string;
}
