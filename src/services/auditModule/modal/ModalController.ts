/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！
import { ModalInfo } from './typings';

const API_PREFIX = '/api';

export const ModalAPI = {
  queryModalList: async (params: any) => {
    try {
      const modalList = localStorage.getItem('modalList');
      if (modalList) {
        return JSON.parse(modalList);
      }
    } catch (e) {
      return e;
    }
    // return request<ResponseInfoType>(`${API_PREFIX}/auditModule/flow/saveFlowTemplate`, {
    //   method: 'POST',
    //   data: params,
    // })
  },

  getModalDetail: async (id: string) => {
    try {
      const modalList = localStorage.getItem('modalList');
      if (modalList) {
        const newModalList = JSON.parse(modalList);
        return newModalList.find((item: ModalInfo) => item.key === id);
      }
    } catch (e) {
      return e;
    }
  },

  createModal: async (params: any) => {
    try {
      const modalList = localStorage.getItem('modalList');
      let exsitModalList = [];
      if (modalList) {
        exsitModalList = JSON.parse(modalList as string);
      }
      exsitModalList.push(params);
      localStorage.setItem('modalList', JSON.stringify(exsitModalList));
      return true;
    } catch (e) {
      return e;
    }
  },

  updateModal: async (params: any) => {
    try {
      const modalList = localStorage.getItem('modalList');
      let exsitModalList = [];
      if (modalList) {
        exsitModalList = JSON.parse(modalList as string);
        const list = exsitModalList.map((item: any) => {
          if (item.key === params.key) {
            return params;
          } else {
            return item;
          }
        });
        localStorage.setItem('modalList', JSON.stringify(list));
      }
      return true;
    } catch (e) {
      return e;
    }
  },

  deleteModal: async (params: ModalInfo) => {
    try {
      const modalList = localStorage.getItem('modalList');
      let exsitModalList = [];
      if (modalList) {
        exsitModalList = JSON.parse(modalList as string);
      }
      exsitModalList = exsitModalList.filter(
        (item: any) => item.key !== params.key,
      );
      localStorage.setItem('modalList', JSON.stringify(exsitModalList));
      return true;
    } catch (e) {
      return e;
    }
  },
};
