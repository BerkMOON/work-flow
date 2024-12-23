/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！
import { request } from '@umijs/max';

/** 此处后端没有提供注释 GET /api/v1/queryUserList */
export async function queryUserList(params: {
  page?: number;
  /** pageSize */
  limit?: number;
}) {
  return request<API.InterfaceResult<API.PageInfo_UserInfo>>(
    '/admin/user/getAllUsers',
    {
      method: 'GET',
      params: {
        ...params,
      },
    },
  );
}

// /** 此处后端没有提供注释 POST /api/v1/user */
// export async function addUser(
//   body?: API.UserInfoVO,
//   options?: { [key: string]: any },
// ) {
//   return request<API.Result_UserInfo_>('/api/v1/user', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     data: body,
//     ...(options || {}),
//   });
// }

/** 此处后端没有提供注释 GET /api/v1/user/${param0} */
export async function getUserDetail() {
  return request<API.InterfaceResult<API.UserSelfInfo>>('/api/getSelfInfo', {
    method: 'GET',
  });
}

// /** 此处后端没有提供注释 PUT /api/v1/user/${param0} */
// export async function modifyUser(
//   params: {
//     // path
//     /** userId */
//     userId?: string;
//   },
//   body?: API.UserInfoVO,
//   options?: { [key: string]: any },
// ) {
//   const { userId: param0 } = params;
//   return request<API.Result_UserInfo_>(`/api/v1/user/${param0}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     params: { ...params },
//     data: body,
//     ...(options || {}),
//   });
// }

// /** 此处后端没有提供注释 DELETE /api/v1/user/${param0} */
// export async function deleteUser(
//   params: {
//     // path
//     /** userId */
//     userId?: string;
//   },
//   options?: { [key: string]: any },
// ) {
//   const { userId: param0 } = params;
//   return request<API.Result_string_>(`/api/v1/user/${param0}`, {
//     method: 'DELETE',
//     params: { ...params },
//     ...(options || {}),
//   });
// }

export async function loginUser(params: {
  username: string;
  password: string;
}) {
  return fetch(`/api/login`, {
    method: 'POST',
    body: JSON.stringify(params),
  });
  return (
    request<any>('/api/login'),
    {
      method: 'POST',
      data: params,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}

export async function logout() {
  return request<any>('/api/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function register(params: any) {
  return request<any>('api/admin/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

export async function deleteUser(params: { user_id: string }) {
  return request<any>('/admin/user/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

export async function getAllRoles(params?: { page?: number; limit?: number }) {
  return request<any>('/admin/auth/getAllRoles', {
    method: 'GET',
    params: params,
  });
}

export async function modifyRole(params: { user_id: string; role_id: string }) {
  return request<any>('/admin/user/updateUserRole', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}
