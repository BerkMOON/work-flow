import { BaseListInfo, PageInfoParams } from '../../types/common';

export interface CompanyItem {
  id: string;
  name: string;
  extra: string;
  create_time: string;
  modify_time: string;
}

export interface CompanyList extends BaseListInfo {
  company_list: CompanyItem[];
}

export interface CompanyParams extends PageInfoParams {
  name?: string;
}

export interface CompanyCreateParams {
  name: string;
  extra?: string;
}

export interface CompanyDeleteParams {
  id: string;
}

export interface CompanyUpdateParams extends CompanyCreateParams {
  id: string;
}
