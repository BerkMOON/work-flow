import { FlowNode } from '@/services/auditModule/flow/typings';
import {
  ApartmentOutlined,
  AuditOutlined,
  PlusOutlined,
  SignatureOutlined,
} from '@ant-design/icons';
import { Button, Popover } from 'antd';
import { useState } from 'react';
import { NodeNameMap, NodeType } from '../constants';
import './index.scss';

interface AddNodeIProps {
  childNodeParent?: FlowNode;
  changeNode: (node: FlowNode) => void;
}

const AddNode: React.FC<AddNodeIProps> = ({ childNodeParent, changeNode }) => {
  let [visible, setVisible] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    setVisible(newOpen);
  };

  const addType = (type: NodeType) => {
    setVisible(false);

    if (type === NodeType.ConditionBranch) {
      const newNode = {
        nodeName: NodeNameMap[type],
        nodeType: type,
        nodeId: new Date().valueOf().toString(),
        childNode: childNodeParent,
        conditionNodes: [
          {
            nodeName: NodeNameMap[NodeType.Condition] + 1,
            nodeType: NodeType.Condition,
            nodeId: 'condition1',
            priorityLevel: 1,
            conditionList: [],
          },
          {
            nodeName: NodeNameMap[NodeType.Condition] + 2,
            nodeType: NodeType.Condition,
            nodeId: 'condition2',
            conditionList: [],
            priorityLevel: 2,
          },
        ],
      };
      changeNode(newNode);
    } else {
      changeNode({
        nodeName: NodeNameMap[type],
        nodeType: type,
        nodeUserList: [],
        nodeId: new Date().valueOf().toString(),
        childNode: childNodeParent,
      });
    }
  };

  const content = (
    <>
      <div className="add-node-popover-body">
        <a
          className="add-node-popover-item approver"
          onClick={() => addType(NodeType.Approver)}
        >
          <div className="item-wrapper">
            <AuditOutlined style={{ fontSize: 30 }} />
          </div>
          <p>审批人</p>
        </a>
        <a
          className="add-node-popover-item notifier"
          onClick={() => addType(NodeType.Copyer)}
        >
          <div className="item-wrapper">
            <SignatureOutlined style={{ fontSize: 30 }} />
          </div>
          <p>抄送人</p>
        </a>
        <a
          className="add-node-popover-item condition"
          onClick={() => addType(NodeType.ConditionBranch)}
        >
          <div className="item-wrapper">
            <ApartmentOutlined style={{ fontSize: 30 }} />
          </div>
          <p>条件分支</p>
        </a>
      </div>
    </>
  );

  return (
    <div className="add-node-btn-box">
      <div className="add-node-btn">
        <Popover
          content={content}
          placement="rightTop"
          trigger="click"
          open={visible}
          onOpenChange={handleOpenChange}
        >
          <Button className="btn" type="primary">
            <PlusOutlined />
          </Button>
        </Popover>
      </div>
    </div>
  );
};

export default AddNode;
