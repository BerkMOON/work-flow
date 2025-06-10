export const COMPANY_NAME = '奥吉通集团';

export enum GROUP_TYPE {
  Physical = 'Physical',
  Virtual = 'Virtual',
}

export const DEFAULT_NAME = 'Umi Max';

export enum COMMON_STATUS {
  ACTIVE = 'active',
  DELETED = 'deleted',
}

export enum COMMON_STATUS_CODE {
  DELETED,
  ACTIVE,
}

export enum SuccessCode {
  SUCCESS = 200,
}

export enum STATUS_LABEL {
  ACTIVE = '生效中',
  DELETED = '已删除',
}

export const STATUS_OPTIONS = [
  { label: STATUS_LABEL.ACTIVE, value: COMMON_STATUS.ACTIVE },
  { label: STATUS_LABEL.DELETED, value: COMMON_STATUS.DELETED },
];

export const Not_Login = 'Please login first';

export const API_STATUS = {
  SUCCESS: 'ok',
  ERROR: 'error',
};
