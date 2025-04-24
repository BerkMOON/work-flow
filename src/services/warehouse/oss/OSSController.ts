import { ResponseInfoType } from '@/types/common';
import { request } from '@umijs/max';
import { OssConfig, OssSence } from './typings';

const API_PREFIX = '/api/admin/warehouse';

export const OssAPI = {
  getOSSConfig: (scene: OssSence) =>
    request<ResponseInfoType<OssConfig>>(`${API_PREFIX}/getOssPostSignature`, {
      method: 'GET',
      params: {
        scene,
      },
    }),
};
