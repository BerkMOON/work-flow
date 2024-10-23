/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！

declare namespace API {
  interface ResponseStatus {
    code: number;
    extension: string | null;
    msg: number;
  }

  interface Result_PageInfo_UserInfo {
    response_status: ResponseStatus;
    data?: PageInfo_UserInfo;
  }

  interface UserInfo {
    username: string;
    header_img: string;
    nickname: string;
    phone: string;
    email: string;
    company: string;
    department: string;
    user_id: string;
  }

  interface InterfaceResult<T> {
    response_status: {
      code: number;
      msg: string;
      extension: {
        key: string;
        value: string;
      }[];
    };
    data?: T;
  }

  interface AuthorityInfo {
    name: string;
    code: string;
    endpoints: {
      name: 'string';
      code: 'string';
    }[];
  }
  interface UserSelfInfo {
    authority: (AuthorityInfo & {
      children: AuthorityInfo;
    })[];
    user_info: UserInfo;
  }

  interface PageInfo_UserInfo {
    meta: {
      total_count: number;
      total_page: number;
    };
    user_info_list: UserInfo[];
  }

  interface;
}
