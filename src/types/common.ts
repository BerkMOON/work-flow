import { ModalControl } from '@/hooks/useModalControl';
import { FormInstance } from 'antd';

export interface ResponseInfoType<T, K> {
  data: T;
  data2: K;
  msg: string;
  name: string;
  status: string;
  sub: string;
}

export interface ResponseStatus {
  code: number;
  extension: {
    key: string;
    value: string;
  };
  msg: string;
}

export interface ModalStates {
  create: boolean;
  update: boolean;
  delete: boolean;
  modify: boolean;
}

export interface BaseModalFormProps {
  modalVisible: boolean;
  onCancel: () => void;
  refresh: () => void;
}

export interface BaseListInfo {
  meta: MetaInfo;
}

export interface PageInfoParams {
  page: number;
  limit: number;
}

export interface BaseCreateModalFormProps {
  modalVisible: boolean;
  onCancel: () => void;
  refresh: () => void;
  children?: React.ReactNode;
  text: {
    title: string;
    successMsg: string;
  };
  api: (params: any) => Promise<any>;
  record?: any;
  id?: string;
  idMapKey?: string;
  idMapValue?: string;
  ownForm?: FormInstance<any>;
  operatorFields?: (
    values: Record<string, any>,
    record: Record<string, any>,
  ) => Record<string, any>;
}

export interface ColumnsProps<T> {
  handleModalOpen: (modal: ModalControl, record: T) => void;
  changeStatusModal?: ModalControl;
  deleteModal?: ModalControl;
  createOrModifyModal: ModalControl;
  updateRoleModal?: ModalControl;
  customModal?: ModalControl;
}

export interface StatusInfo {
  code: number;
  name: string;
}

export interface CreatorInfo {
  user_id: string;
  username: string;
}

export interface CreatorList extends BaseListInfo {
  creators: CreatorInfo[];
}

export interface MetaInfo {
  total_count: number;
  total_page: number;
}
