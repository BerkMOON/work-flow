import {
  addConditionNode,
  deleteConditionNode,
  deleteNode,
  FlowNode,
} from '@/store/flowDesignerSlice';
import { bgColors } from '@/utils/flow';
import {
  AuditOutlined,
  CloseOutlined,
  SignatureOutlined,
} from '@ant-design/icons';
import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import AddNode from '../AddNode';
import { NodeType } from '../constants';
import './index.scss';

interface NodeWrapIProps {
  nodes: FlowNode;
}

const NodeWrap: React.FC<NodeWrapIProps> = ({ nodes }) => {
  const dispatch = useDispatch();
  const [nodeConfig, setNodeConfig] = useState<FlowNode>();

  useEffect(() => {
    setNodeConfig(nodeConfig);
  }, [nodes]);

  const removeNode = (nodeId: string) => {
    dispatch(deleteNode(nodeId));
  };

  const titleIcon = (type: NodeType) => {
    return (
      <>
        {type === NodeType.Reviewer && (
          <AuditOutlined style={{ marginRight: 5 }} />
        )}
        {type === NodeType.Cc && (
          <SignatureOutlined style={{ marginRight: 5 }} />
        )}
      </>
    );
  };

  const addTerm = (nodes: FlowNode) => {
    dispatch(
      addConditionNode({
        nodeId: nodes.nodeId,
        newNode: {
          nodeName: '条件',
          nodeType: NodeType.Condition,
          nodeId: new Date().valueOf().toString(),
        },
      }),
    );
  };

  const removeTerm = (nodeId: string, conditionNodeId: string) => {
    dispatch(
      deleteConditionNode({
        nodeId,
        conditionNodeId,
      }),
    );
  };

  return (
    <>
      {(nodes.nodeType === NodeType.Sponsor ||
        nodes.nodeType === NodeType.Reviewer ||
        nodes.nodeType === NodeType.Cc ||
        nodes.nodeType === NodeType.Condition) && (
        <div className="node-wrap">
          <div
            className={`node-wrap-box ${
              nodes.nodeType === NodeType.Sponsor ? 'start-node' : ''
            }`}
          >
            <div
              className="title"
              style={{ background: `rgb(${bgColors[nodes.nodeType]})` }}
            >
              {titleIcon(nodes.nodeType)}
              <div>{nodes.nodeName}</div>
              {nodes.nodeType !== NodeType.Sponsor && (
                <CloseOutlined
                  className="close"
                  onClick={() => removeNode(nodes.nodeId)}
                />
              )}
            </div>
            <div className="content">所有人</div>
          </div>
          <AddNode childNodeParent={nodes.childNode} parentId={nodes.nodeId} />
        </div>
      )}
      {nodes.nodeType === NodeType.ConditionBranch && (
        <div className="branch-wrap">
          <div className="branch-box-wrap">
            <div className="branch-box">
              <Button className="add-branch" onClick={() => addTerm(nodes)}>
                添加条件
              </Button>
              {nodes.conditionNodes?.map((item, index) => (
                <div className="col-box" key={index}>
                  <div className="condition-node">
                    <div className="condition-node-box">
                      <div className="auto-judge">
                        <div className="title-wrapper">
                          <CloseOutlined
                            className="close"
                            onClick={() =>
                              removeTerm(nodes.nodeId, item.nodeId)
                            }
                          />
                          <div>条件</div>
                          <div>请设置条件</div>
                        </div>
                      </div>
                      <AddNode
                        childNodeParent={nodes.childNode}
                        parentId={nodes.nodeId}
                      />
                    </div>
                  </div>
                  {item.childNode ? <NodeWrap nodes={item.childNode} /> : ''}
                  {index === 0 ? (
                    <>
                      <div className="top-left-cover-line"></div>
                      <div className="bottom-left-cover-line"></div>
                    </>
                  ) : (
                    ''
                  )}
                  {index === (nodes?.conditionNodes ?? []).length - 1 ? (
                    <>
                      <div className="top-right-cover-line"></div>
                      <div className="bottom-right-cover-line"></div>
                    </>
                  ) : (
                    ''
                  )}
                </div>
              ))}
            </div>
            <AddNode
              childNodeParent={nodes.childNode}
              parentId={nodes.nodeId}
            />
          </div>
        </div>
      )}
      {nodes.childNode ? <NodeWrap nodes={nodes.childNode} /> : ''}
    </>
  );
};

export default NodeWrap;
