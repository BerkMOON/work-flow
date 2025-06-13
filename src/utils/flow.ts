import { FlowNode } from '@/store/flowDesignerSlice';

export const bgColors = [
  '0,0,0',
  '87, 106, 149',
  '255, 148, 62',
  '50, 150, 250',
];

export const replaceNode = (
  flow: FlowNode,
  nodeId: string,
  newNode: FlowNode,
): FlowNode => {
  if (flow.nodeId === nodeId) {
    flow.childNode = newNode;
    return flow;
  }
  if (flow.childNode) {
    flow.childNode = replaceNode(flow.childNode, nodeId, newNode);
  }
  return flow;
};

export const removeNode = (flow: FlowNode, nodeId: string): FlowNode => {
  if (flow.nodeId === nodeId) {
    return flow.childNode!;
  }
  if (flow.childNode) {
    flow.childNode = removeNode(flow.childNode, nodeId);
  }
  return flow;
};

export const addCondition = (
  flow: FlowNode,
  nodeId: string,
  newNode: FlowNode,
): FlowNode => {
  if (flow.nodeId === nodeId) {
    flow.conditionNodes = flow.conditionNodes || [];
    flow.conditionNodes.push(newNode);
    return flow;
  }
  if (flow.childNode) {
    flow.childNode = addCondition(flow.childNode, nodeId, newNode);
  }
  return flow;
};

export const removeCondition = (
  flow: FlowNode,
  nodeId: string,
  conditionNodeId: string,
): FlowNode => {
  if (flow.nodeId === nodeId) {
    if ((flow.conditionNodes || []).length <= 2) {
      return flow.childNode!;
    } else {
      flow.conditionNodes = flow.conditionNodes?.filter(
        (node) => node.nodeId !== conditionNodeId,
      );
    }
    return flow;
  }
  if (flow.childNode) {
    flow.childNode = removeCondition(flow.childNode, nodeId, conditionNodeId);
  }
  return flow;
};
