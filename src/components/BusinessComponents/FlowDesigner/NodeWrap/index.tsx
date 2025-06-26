import { FlowNode, FlowPermission } from '@/services/auditModule/flow/typings';
import { RootState } from '@/store/configureStore';
import {
  setApproverDrawer,
  setApproverDrawerNode,
  setConditionDrawer,
  setConditionDrawerNode,
  setCopyerDrawer,
  setCopyerDrawerNode,
} from '@/store/flowDesignerSlice';
import {
  getApproverStr,
  getConditionStr,
  getCopyerStr,
  getSponsorStr,
} from '@/utils/flowUtils';
import {
  AuditOutlined,
  CloseOutlined,
  RightOutlined,
  SignatureOutlined,
} from '@ant-design/icons';
import { Button } from 'antd';
import { cloneDeep } from 'lodash';
import { useEffect, useId, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddNode from '../AddNode';
import { BgColors, NodeType, PlaceholderList } from '../constants';
import './index.scss';

interface NodeWrapIProps {
  nodes: FlowNode;
  setNode: (node?: FlowNode) => void;
  flowPermission?: FlowPermission[];
}

const NodeWrap: React.FC<NodeWrapIProps> = ({
  nodes,
  setNode,
  flowPermission,
}) => {
  const dispatch = useDispatch();
  const [defaultText, setDefaultText] = useState('');
  const [showText, setShowText] = useState('');
  const [nodeConfig, setNodeConfig] = useState<FlowNode>();
  const { approverDrawerNode, copyerDrawerNode, conditionDrawerNode } =
    useSelector((state: RootState) => state.flowDesigner);

  const uid = useId();

  useEffect(() => {
    if (nodes) {
      setNodeConfig(nodes);
    }
  }, [nodes]);

  useEffect(() => {
    if (approverDrawerNode?.flag && approverDrawerNode?.id === uid) {
      setNode(approverDrawerNode.node);
    }
  }, [approverDrawerNode]);

  useEffect(() => {
    if (copyerDrawerNode?.flag && copyerDrawerNode?.id === uid) {
      setNode(copyerDrawerNode.node);
    }
  }, [copyerDrawerNode]);

  useEffect(() => {
    if (conditionDrawerNode?.flag && conditionDrawerNode?.id === uid) {
      setNode(conditionDrawerNode.node);
    }
  }, [conditionDrawerNode]);

  const removeNode = () => {
    if (!nodeConfig) {
      return;
    }
    setNode(nodeConfig?.childNode ? { ...nodeConfig?.childNode } : undefined);
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

  const reData = (data: FlowNode, addData: FlowNode) => {
    if (!data.childNode) {
      data.childNode = addData;
    } else {
      reData(data.childNode, addData);
    }
  };

  const addTerm = () => {
    if (!nodeConfig) {
      return;
    }
    let len = (nodeConfig.conditionNodes?.length || 0) + 1;
    const conditionNode = {
      nodeName: '条件' + len,
      nodeType: NodeType.Condition,
      nodeId: new Date().valueOf().toString(),
      nodeUserList: [],
      priorityLevel: len,
      conditionList: [],
    };
    const newConfig = cloneDeep(nodeConfig);
    newConfig?.conditionNodes?.push(conditionNode);
    setNode(newConfig);
  };

  const delTerm = (index: number) => {
    if (!nodeConfig?.conditionNodes) {
      return;
    }
    const config = cloneDeep(nodeConfig);
    config.conditionNodes?.splice(index, 1);
    config.conditionNodes?.forEach((item, index) => {
      item.priorityLevel = index + 1;
      item.nodeName = `条件${index + 1}`;
    });
    // resetConditionNodesErr()
    setNode({ ...config });
    if (config.conditionNodes?.length === 1) {
      if (config.childNode) {
        if (config.conditionNodes[0].childNode) {
          reData(config.conditionNodes[0].childNode, config.childNode);
        } else {
          config.conditionNodes[0].childNode = config.childNode;
        }
      }
      setNode(config.conditionNodes?.[0].childNode as FlowNode);
    }
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

  const setPerson = (priorityLevel?: number) => {
    if (!nodeConfig) {
      return;
    }
    const { nodeType } = nodeConfig;
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
            ...cloneDeep(nodeConfig),
          },
          id: uid,
          flag: false,
        }),
      );
    } else if (nodeType === NodeType.Copyer) {
      dispatch(setCopyerDrawer(true));
      dispatch(
        setCopyerDrawerNode({
          node: {
            ...cloneDeep(nodeConfig),
          },
          id: uid,
          flag: false,
        }),
      );
    } else {
      dispatch(setConditionDrawer(true));
      dispatch(
        setConditionDrawerNode({
          node: {
            ...cloneDeep(nodeConfig),
          },
          priorityLevel,
          id: uid,
          flag: false,
        }),
      );
    }
  };

  const changeNode = (childNode?: FlowNode, index?: number) => {
    if (!nodeConfig) {
      return;
    }
    if (typeof index === 'number') {
      const newConfig = cloneDeep(nodeConfig);
      let { conditionNodes } = newConfig;
      if (conditionNodes) {
        conditionNodes[index].childNode = childNode;
      }
      setNode({ ...newConfig, conditionNodes });
    } else {
      setNode({ ...nodeConfig, childNode });
    }
  };

  const updateChildNode = (childNode: FlowNode, i: number) => {
    if (!nodeConfig) {
      return;
    }
    const newConfig = cloneDeep(nodeConfig);
    let { conditionNodes } = newConfig;
    if (conditionNodes) {
      conditionNodes[i].childNode = childNode;
    }
    setNode({ ...newConfig, conditionNodes });
  };

  if (!nodeConfig) {
    return <></>;
  }

  return (
    <>
      {(nodeConfig.nodeType === NodeType.Sponsor ||
        nodeConfig.nodeType === NodeType.Approver ||
        nodeConfig.nodeType === NodeType.Copyer ||
        nodeConfig.nodeType === NodeType.Condition) && (
        <div className="node-wrap">
          <div
            className={`node-wrap-box ${
              nodeConfig.nodeType === NodeType.Sponsor ? 'start-node' : ''
            }`}
          >
            <div
              className="title"
              style={{
                background: `rgb(${BgColors[nodeConfig.nodeType as NodeType]})`,
              }}
            >
              {titleIcon(nodeConfig.nodeType)}
              <div>{nodeConfig.nodeName}</div>
              {nodeConfig.nodeType !== NodeType.Sponsor && (
                <CloseOutlined className="close" onClick={removeNode} />
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
          <AddNode
            childNodeParent={nodeConfig.childNode}
            changeNode={changeNode}
          />
        </div>
      )}
      {nodeConfig.nodeType === NodeType.ConditionBranch && (
        <div className="branch-wrap">
          <div className="branch-box-wrap">
            <div className="branch-box">
              <Button className="add-branch" onClick={addTerm}>
                添加条件
              </Button>
              {nodeConfig.conditionNodes?.map((item, index) => (
                <div className="col-box" key={index}>
                  <div className="condition-node">
                    <div className="condition-node-box">
                      <div
                        className="auto-judge"
                        onClick={() => setPerson(item.priorityLevel)}
                      >
                        <div className="title-wrapper">
                          <CloseOutlined
                            className="close"
                            onClick={(e) => {
                              e.stopPropagation();
                              delTerm(index);
                            }}
                          />
                          <div>{item.nodeName}</div>
                          <div>{getConditionStr(nodeConfig, index)}</div>
                        </div>
                      </div>
                      <AddNode
                        childNodeParent={item.childNode}
                        changeNode={(e) => updateChildNode(e, index)}
                      />
                    </div>
                  </div>
                  {item.childNode ? (
                    <NodeWrap
                      setNode={(e) => changeNode(e, index)}
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
                  {index === (nodeConfig?.conditionNodes ?? []).length - 1 ? (
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
              childNodeParent={nodeConfig.childNode}
              changeNode={changeNode}
            />
          </div>
        </div>
      )}
      {nodeConfig.childNode ? (
        <NodeWrap
          flowPermission={flowPermission}
          nodes={nodeConfig.childNode}
          setNode={changeNode}
        />
      ) : (
        ''
      )}
    </>
  );
};

export default NodeWrap;
