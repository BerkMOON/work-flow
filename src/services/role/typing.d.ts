export interface RoleListDataItem {
  id: number;
  name: string;
  status: Status;
  create_time: string; // 假设这是ISO格式的日期字符串或其他格式的字符串
  modify_time: string; // 同上
}

export interface RoleList {
  role_info_list: RoleListDataItem[];
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
