import {
  NodeNameMap,
  NodeType,
} from '@/components/BusinessComponents/FlowDesigner/constants';
import {
  addCondition,
  removeCondition,
  removeNode,
  replaceNode,
} from '@/utils/flow';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FlowNode {
  nodeName: string;
  nodeId: string;
  nodeType: NodeType;
  childNode?: FlowNode;
  conditionNodes?: FlowNode[];
}

export interface FlowState {
  nodes: FlowNode;
}

const initialState: FlowState = {
  nodes: {
    nodeId: '1',
    nodeName: NodeNameMap[NodeType.Sponsor],
    nodeType: NodeType.Sponsor,
  },
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
      const replacedNode = replaceNode(state.nodes, parentId, newNode);
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
  },
});

export const { addNode, deleteNode, addConditionNode, deleteConditionNode } =
  flowSlice.actions;
export default flowSlice.reducer;
