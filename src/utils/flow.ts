import { FlowNode } from '@/services/auditModule/flow/typings';

export const addNodeInfo = (
  flow: FlowNode,
  nodeId: string,
  newNode: FlowNode,
): FlowNode => {
  if (flow.nodeId === nodeId) {
    flow.childNode = newNode;
    return flow;
  }
  if (flow.childNode) {
    flow.childNode = addNodeInfo(flow.childNode, nodeId, newNode);
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

export const replaceNode = (flow: FlowNode, newNode: FlowNode): FlowNode => {
  if (flow.nodeId === newNode.nodeId) {
    return newNode;
  }
  if (flow.childNode) {
    flow.childNode = replaceNode(flow.childNode, newNode);
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

export const addConditionFlow = (
  flow: FlowNode,
  nodeId: string,
  conditionId: string,
  newNode: FlowNode,
): FlowNode => {
  if (flow.nodeId === conditionId) {
    // flow.conditionNodes = addNodeInfo(flow.conditionNodes!, nodeId, newNode);
    return flow;
  }
  if (flow.childNode) {
    flow.childNode = addConditionFlow(
      flow.childNode,
      nodeId,
      conditionId,
      newNode,
    );
  }
  return flow;
};
