import { FlowNode } from '../flow/typings';

export interface ModalInfo {
  createTime: string;
  hasStarUserChooseModule: boolean;
  key: string;
  remark: string;
  type: string;
  value: string;
  nodeConig: FlowNode;
}
