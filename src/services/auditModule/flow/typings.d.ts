import { ReviewerTypeEnum } from '@/components/BusinessComponents/FlowDesigner/constants';
export interface FlowNode {
  nodeName: string;
  nodeId: string;
  nodeType: NodeType;
  nodeDisplayName?: string;
  nodeUserList?: {
    name: string;
    targetId: number | string;
    type: number;
  }[];
  childNode?: FlowNode;
  conditionNodes?: FlowNode[];
  setType?: ReviewerTypeEnum;
}

export interface FlowPermission {
  id: string;
  name: string;
  type: 'user' | 'group';
}
