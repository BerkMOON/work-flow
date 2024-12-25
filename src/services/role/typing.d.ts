export interface RoleListDataItem {
  authority_json: string;
  category_json: string;
  role_id: string;
  role_name: string;
  status: number;
}

export interface RoleList {
  role_list: RoleListDataItem[];
  meta: {
    total_count: number;
    total_page: number;
  };
}

export interface PermissionDataItem {
  authority: ParentType[];
}

export interface EndpointType {
  name: string;
  code: string;
  is_selected: boolean;
}

export interface ChildType {
  name: string;
  code: string;
  endpoints: EndpointType[];
}

export interface ParentType {
  name: string;
  code: string;
  children?: Child[]; // 使用 ? 表示 children 是可选的，因为 JSON 数据中可能不包含它
  endpoints: EndpointType[];
}

// 请求参数类型
export interface RoleQueryParams {
  page?: number;
  limit?: number;
  name?: string;
  status?: string;
}

export interface RoleUpdateParams {
  name: string;
  role_id: string;
}

export interface RoleCreateParams {
  role_name: string;
  code_list: string[];
}

export interface RoleDetailParams {
  role_id: string;
  code_list: string[];
}

export interface RoleItem {
  role_id: string;
  role_name: string;
  status: {
    name: string;
    code: string;
  };
  create_time: string;
  modify_time: string;
}

export interface RoleFormProps {
  modalVisible: boolean;
  onCancel: () => void;
  refresh: () => void;
  roleId?: string;
  name?: string;
}
