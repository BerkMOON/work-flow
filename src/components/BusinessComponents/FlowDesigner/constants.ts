export enum NodeType {
  Sponsor = 1,
  Reviewer = 2,
  Cc = 3,
  Condition = 4,
  ConditionBranch = 5,
}

export const NodeNameMap = {
  [NodeType.Sponsor]: '发起人',
  [NodeType.Reviewer]: '审核人',
  [NodeType.Cc]: '抄送人',
  [NodeType.Condition]: '条件',
  [NodeType.ConditionBranch]: '条件分支',
};
