export interface GroupRequest {
  owner?: string;
  p?: number;
  pageSize?: number;
  field?: string;
  value?: string;
  sortField?: string;
  sortOrder?: string;
  withTree?: boolean;
}

export interface GroupInfo {
  contactEmail?: string;
  createdTime: string;
  displayName: string;
  haveChildren: boolean;
  isEnabled: boolean;
  isTopGroup: boolean;
  key?: string;
  manager: string;
  name: string;
  owner: string;
  parentId: string;
  parentName: string;
  title: string;
  type: string;
  updatedTime: string;
  users: null | string[];
  children?: GroupInfo[];
}
