export interface TagGroupItem {
  id: string;
  name: string;
  desc: string;
  create_time: string;
  modify_time: string;
}

export interface TagGroupList {
  group_list: TagGroupItem[];
  meta: {
    total_count: number;
    total_page: number;
  };
}

export interface TagGroupQueryParams {
  page?: number;
  limit?: number;
  name?: string;
}

export interface CreateTagGroupParams {
  name: string;
  desc: string;
  ext?: string;
}

export interface UpdateTagGroupParams {
  id: string;
  desc: string;
}

export interface TagItemQueryParams {
  group_id: string;
  name?: string;
}

export interface TagItemItem {
  id: number;
  group_id: number;
  name: string;
  desc: string;
  ext: string;
  create_time: string;
  modify_time: string;
}

export interface TagItemList {
  item_list: TagItemItem[];
  meta: {
    total_count: number;
    total_page: number;
  };
}

export interface CreateTagItemParams {
  group_id: number;
  name: string;
  desc: string;
  ext: string;
}

export interface UpdateTagItemParams {
  id: number;
  desc: string;
  ext?: string;
}
