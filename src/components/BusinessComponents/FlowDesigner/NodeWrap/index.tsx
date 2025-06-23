import { FlowNode, FlowPermission } from '@/services/auditModule/flow/typings';
import {
  addConditionNode,
  deleteConditionNode,
  deleteNode,
  setApproverDrawer,
  setApproverDrawerNode,
  setCopyerDrawer,
  setCopyerDrawerNode,
} from '@/store/flowDesignerSlice';
import { getApproverStr, getCopyerStr, getSponsorStr } from '@/utils/flowUtils';
import {
  AuditOutlined,
  CloseOutlined,
  RightOutlined,
  SignatureOutlined,
} from '@ant-design/icons';
import { Button } from 'antd';
import { cloneDeep } from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import AddNode from '../AddNode';
import { BgColors, NodeType, PlaceholderList } from '../constants';
import './index.scss';

interface NodeWrapIProps {
  nodes: FlowNode;
  flowPermission: FlowPermission[];
}

const NodeWrap: React.FC<NodeWrapIProps> = ({ nodes, flowPermission }) => {
  const dispatch = useDispatch();
  const [defaultText, setDefaultText] = useState('');
  const [showText, setShowText] = useState('');

  // const uid = useId()

  const removeNode = (nodeId: string) => {
    dispatch(deleteNode(nodeId));
  };

  const titleIcon = (type: NodeType) => {
    return (
      <>
        {type === NodeType.Approver && (
          <AuditOutlined style={{ marginRight: 5 }} />
        )}
        {type === NodeType.Copyer && (
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

  useEffect(() => {
    setDefaultText(PlaceholderList[nodes.nodeType as NodeType]);
    if (nodes.nodeType === NodeType.Sponsor) {
      setShowText(getSponsorStr());
    } else if (nodes.nodeType === NodeType.Approver) {
      setShowText(getApproverStr(nodes));
    } else if (nodes.nodeType === NodeType.Copyer) {
      setShowText(getCopyerStr(nodes));
    }
  }, [nodes, flowPermission]);

  //priorityLevel?: string
  const setPerson = () => {
    const { nodeType } = nodes;
    if (nodeType === NodeType.Sponsor) {
      // setPromoter(true);
      // setFlowPermission({
      //   value: flowPermission,
      //   flag: false,
      //   id: _uid,
      // });
    } else if (nodeType === NodeType.Approver) {
      dispatch(setApproverDrawer(true));
      dispatch(
        setApproverDrawerNode({
          node: {
            ...cloneDeep(nodes),
          },
        }),
      );
    } else if (nodeType === NodeType.Copyer) {
      dispatch(setCopyerDrawer(true));
      dispatch(
        setCopyerDrawerNode({
          node: {
            ...cloneDeep(nodes),
          },
        }),
      );
    } else {
      // setCondition(true);
      // setConditionsConfig({
      //   value: cloneDeep(config),
      //   priorityLevel,
      //   flag: false,
      //   id: _uid,
      // });
    }
  };

  return (
    <>
      {(nodes.nodeType === NodeType.Sponsor ||
        nodes.nodeType === NodeType.Approver ||
        nodes.nodeType === NodeType.Copyer ||
        nodes.nodeType === NodeType.Condition) && (
        <div className="node-wrap">
          <div
            className={`node-wrap-box ${
              nodes.nodeType === NodeType.Sponsor ? 'start-node' : ''
            }`}
          >
            <div
              className="title"
              style={{
                background: `rgb(${BgColors[nodes.nodeType as NodeType]})`,
              }}
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
            <div className="content" onClick={() => setPerson()}>
              <div className="content-title">
                {!showText ? (
                  <span className="placeholder">{defaultText}</span>
                ) : (
                  showText
                )}
              </div>
              <RightOutlined style={{ color: '#979797' }} />
            </div>
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
                        isCondition={true}
                        conditionId={nodes.nodeId}
                        childNodeParent={item.childNode}
                        parentId={item.nodeId}
                      />
                    </div>
                  </div>
                  {item.childNode ? (
                    <NodeWrap
                      flowPermission={flowPermission}
                      nodes={item.childNode}
                    />
                  ) : (
                    ''
                  )}
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
      {nodes.childNode ? (
        <NodeWrap flowPermission={flowPermission} nodes={nodes.childNode} />
      ) : (
        ''
      )}
    </>
  );
};

export default NodeWrap;
