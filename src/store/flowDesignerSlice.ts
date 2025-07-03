import {
  NodeNameMap,
  NodeType,
  ReviewerTypeEnum,
} from '@/components/BusinessComponents/FlowDesigner/constants';
import { DrawerNode, FlowNode } from '@/services/auditModule/flow/typings';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface FlowState {
  nodes: FlowNode;
  showSponsorDrawer: boolean;
  sponsorDrawerNode?: DrawerNode;
  showApproverDrawer: boolean;
  approverDrawerNode?: DrawerNode;
  showCopyerDrawer: boolean;
  copyerDrawerNode?: DrawerNode;
  showConditionDrawer?: boolean;
  conditionDrawerNode?: DrawerNode;
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
  showConditionDrawer: false,
  showSponsorDrawer: false,
};

const flowSlice = createSlice({
  name: 'flowDesigner',
  initialState,
  reducers: {
    setNodes: (state, action: PayloadAction<FlowNode>) => {
      state.nodes = action.payload;
    },
    setApproverDrawer: (state, action: PayloadAction<boolean>) => {
      state.showApproverDrawer = action.payload;
    },
    setApproverDrawerNode: (state, action: PayloadAction<DrawerNode>) => {
      state.approverDrawerNode = action.payload;
    },
    setCopyerDrawer: (state, action: PayloadAction<boolean>) => {
      state.showCopyerDrawer = action.payload;
    },
    setCopyerDrawerNode: (state, action: PayloadAction<DrawerNode>) => {
      state.copyerDrawerNode = action.payload;
    },
    setConditionDrawer: (state, action: PayloadAction<boolean>) => {
      state.showConditionDrawer = action.payload;
    },
    setConditionDrawerNode: (state, action: PayloadAction<DrawerNode>) => {
      state.conditionDrawerNode = action.payload;
    },
    setShowSponsorDrawer: (state, action: PayloadAction<boolean>) => {
      state.showSponsorDrawer = action.payload;
    },
    setSponsorDrawerNode: (state, action: PayloadAction<DrawerNode>) => {
      state.sponsorDrawerNode = action.payload;
    },
  },
});

export const {
  setNodes,
  setApproverDrawer,
  setApproverDrawerNode,
  setCopyerDrawer,
  setCopyerDrawerNode,
  setConditionDrawer,
  setConditionDrawerNode,
  setSponsorDrawerNode,
  setShowSponsorDrawer,
} = flowSlice.actions;
export default flowSlice.reducer;
