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
  conditionList?: {
    opt1?: string;
    opt2?: string;
    zdy1?: string | number;
    zdy2?: string | number;
    optType?: string;
    showName?: string;
  }[];
  conditionNodes?: FlowNode[];
  setType?: ReviewerTypeEnum;
  priorityLevel?: number;
}

export interface FlowPermission {
  id: string;
  name: string;
  type: 'user' | 'group';
}

export interface DrawerNode {
  node?: FlowNode;
  id?: string;
  flag?: boolean;
  priorityLevel?: number;
}
