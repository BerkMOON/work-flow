export enum NodeType {
  Sponsor,
  Approver,
  Copyer,
  Condition,
  ConditionBranch,
}

export const NodeNameMap = {
  [NodeType.Sponsor]: '发起人',
  [NodeType.Approver]: '审核人',
  [NodeType.Copyer]: '抄送人',
  [NodeType.Condition]: '条件',
  [NodeType.ConditionBranch]: '条件分支',
};

export const BgColors: Record<NodeType, string> = {
  [NodeType.Sponsor]: '87, 106, 149',
  [NodeType.Approver]: '255, 148, 62',
  [NodeType.Copyer]: '50, 150, 250',
  [NodeType.Condition]: '0,0,0',
  [NodeType.ConditionBranch]: '0,0,0',
};

export const PlaceholderList: Record<NodeType, string> = {
  [NodeType.Sponsor]: '所有人',
  [NodeType.Approver]: '请选择审核人',
  [NodeType.Copyer]: '请选择抄送人',
  [NodeType.Condition]: '请设置条件',
  [NodeType.ConditionBranch]: '请设置条件',
};

export enum ReviewerTypeEnum {
  SpecifyUser = 5,
  SpecifyDepart = 4,
  Optional = 7,
}

export const ReviewerTypeOption = [
  {
    label: '指定用户',
    value: ReviewerTypeEnum.SpecifyUser,
  },
  {
    label: '指定部门',
    value: ReviewerTypeEnum.SpecifyDepart,
  },
  {
    label: '发起人自选审批人',
    value: ReviewerTypeEnum.Optional,
  },
];

export enum ApproverUserType {
  User = 1,
  Group = 2,
}

export const MultiApproverTypeOption = [
  {
    label: '会签（需所有审批人同意，不限顺序）',
    value: 1,
  },
  {
    label: '或签（只需一名审批人同意或拒绝即可）',
    value: 2,
  },
];
