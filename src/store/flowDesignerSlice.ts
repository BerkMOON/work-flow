import {
  NodeNameMap,
  NodeType,
  ReviewerTypeEnum,
} from '@/components/BusinessComponents/FlowDesigner/constants';
import { FlowNode } from '@/services/auditModule/flow/typings';
import {
  addCondition,
  addConditionFlow,
  addNodeInfo,
  removeCondition,
  removeNode,
  replaceNode,
} from '@/utils/flow';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface FlowState {
  nodes: FlowNode;
  showApproverDrawer: boolean;
  approverDrawerNode?: {
    node?: FlowNode;
  };
  showCopyerDrawer: boolean;
  copyerDrawerNode?: {
    node?: FlowNode;
  };
}

const initialState: FlowState = {
  nodes: {
    nodeId: '1',
    nodeName: NodeNameMap[NodeType.Sponsor],
    nodeType: NodeType.Sponsor,
    setType: ReviewerTypeEnum.SpecifyUser,
  },
  showApproverDrawer: false,
  showCopyerDrawer: false,
};

const flowSlice = createSlice({
  name: 'flowDesigner',
  initialState,
  reducers: {
    addNode: (
      state,
      action: PayloadAction<{ parentId: string; newNode: FlowNode }>,
    ) => {
      const { parentId, newNode } = action.payload;
      const replacedNode = addNodeInfo(state.nodes, parentId, newNode);
      state.nodes = replacedNode;
    },
    deleteNode: (state, action: PayloadAction<string>) => {
      const nodeId = action.payload;
      const newNodes = removeNode(state.nodes, nodeId);
      state.nodes = newNodes;
    },
    addConditionNode: (
      state,
      action: PayloadAction<{ nodeId: string; newNode: FlowNode }>,
    ) => {
      const { nodeId, newNode } = action.payload;
      const newNodes = addCondition(state.nodes, nodeId, newNode);
      state.nodes = newNodes;
    },
    deleteConditionNode: (
      state,
      action: PayloadAction<{ nodeId: string; conditionNodeId: string }>,
    ) => {
      const { nodeId, conditionNodeId } = action.payload;
      const newNodes = removeCondition(state.nodes, nodeId, conditionNodeId);
      state.nodes = newNodes;
    },
    addConditionFlowNode: (
      state,
      action: PayloadAction<{
        nodeId: string;
        conditionId: string;
        newNode: FlowNode;
      }>,
    ) => {
      const { nodeId, newNode, conditionId } = action.payload;
      const newNodes = addConditionFlow(
        state.nodes,
        nodeId,
        conditionId,
        newNode,
      );
      state.nodes = newNodes;
    },
    replaceNodes: (state, action: PayloadAction<FlowNode>) => {
      const nodes = action.payload;
      const newNodes = replaceNode(state.nodes, nodes);
      state.nodes = newNodes;
    },
    setApproverDrawer: (state, action: PayloadAction<boolean>) => {
      state.showApproverDrawer = action.payload;
    },
    setApproverDrawerNode: (
      state,
      action: PayloadAction<{
        node?: FlowNode;
      }>,
    ) => {
      state.approverDrawerNode = action.payload;
    },
    setCopyerDrawer: (state, action: PayloadAction<boolean>) => {
      state.showCopyerDrawer = action.payload;
    },
    setCopyerDrawerNode: (
      state,
      action: PayloadAction<{
        node?: FlowNode;
      }>,
    ) => {
      state.copyerDrawerNode = action.payload;
    },
  },
});

export const {
  addNode,
  deleteNode,
  addConditionNode,
  addConditionFlowNode,
  deleteConditionNode,
  replaceNodes,
  setApproverDrawer,
  setApproverDrawerNode,
  setCopyerDrawer,
  setCopyerDrawerNode,
} = flowSlice.actions;
export default flowSlice.reducer;
