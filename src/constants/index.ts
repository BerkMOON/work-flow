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

export enum AUDIT_LEVEL {
  A = 'AAAA',
  B = 'AAA',
  C = 'AA',
  D = 'A',
}

export enum AUDIT_RESULT {
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export const DEVICE_STATUS = {
  NOT_UPGRADED: 0,
  UPGRADING: 1,
  SUCCESS: 2,
  FAILED: 3,
} as const;

export enum STATUS_LABEL {
  ACTIVE = '生效中',
  DELETED = '已删除',
}

export const STATUS_OPTIONS = [
  { label: STATUS_LABEL.ACTIVE, value: COMMON_STATUS.ACTIVE },
  { label: STATUS_LABEL.DELETED, value: COMMON_STATUS.DELETED },
];
