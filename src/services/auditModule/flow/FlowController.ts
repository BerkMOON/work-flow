/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！
import { FlowNode } from './typings';

const API_PREFIX = '/api';

export const FlowAPI = {
  saveFlowTemplate: async (params: FlowNode) => {
    try {
      localStorage.setItem('flowTemplate', JSON.stringify(params));
      return true;
    } catch (e) {
      return e;
    }
    // return request<ResponseInfoType>(`${API_PREFIX}/auditModule/flow/saveFlowTemplate`, {
    //   method: 'POST',
    //   data: params,
    // })
  },
};
