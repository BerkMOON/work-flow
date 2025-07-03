import { FlowNode, FlowPermission } from '@/services/auditModule/flow/typings';
import {
  getApproverStr,
  getConditionStr,
  getCopyerStr,
  getSponsorStr,
} from '@/utils/flowUtils';
import { AuditOutlined, SignatureOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useEffect, useState } from 'react';
import NodeLine from '../NodeLine';
import { BgColors, NodeType, PlaceholderList } from '../constants';
import './index.scss';

interface NodeWrapIProps {
  nodes: FlowNode;
  flowPermission?: FlowPermission[];
}

const NodeWrap: React.FC<NodeWrapIProps> = ({ nodes, flowPermission }) => {
  const [defaultText, setDefaultText] = useState('');
  const [showText, setShowText] = useState('');
  const [nodeConfig, setNodeConfig] = useState<FlowNode>();

  useEffect(() => {
    if (nodes) {
      setNodeConfig(nodes);
    }
  }, [nodes]);

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

  useEffect(() => {
    setDefaultText(PlaceholderList[nodes.nodeType as NodeType]);
    if (nodes.nodeType === NodeType.Sponsor) {
      setShowText(getSponsorStr(nodes));
    } else if (nodes.nodeType === NodeType.Approver) {
      setShowText(getApproverStr(nodes));
    } else if (nodes.nodeType === NodeType.Copyer) {
      setShowText(getCopyerStr(nodes));
    }
  }, [nodes, flowPermission]);

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
            </div>
            <div className="content">
              <div className="content-title">
                {!showText ? (
                  <span className="placeholder">{defaultText}</span>
                ) : (
                  showText
                )}
              </div>
            </div>
          </div>
          <NodeLine />
        </div>
      )}
      {nodeConfig.nodeType === NodeType.ConditionBranch && (
        <div className="branch-wrap">
          <div className="branch-box-wrap">
            <div className="branch-box">
              <Button className="add-branch">审核条件</Button>
              {nodeConfig.conditionNodes?.map((item, index) => (
                <div className="col-box" key={index}>
                  <div className="condition-node">
                    <div className="condition-node-box">
                      <div className="auto-judge">
                        <div className="title-wrapper">
                          <div>{item.nodeName}</div>
                          <div>{getConditionStr(nodeConfig, index)}</div>
                        </div>
                      </div>
                      <NodeLine />
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
            <NodeLine />
          </div>
        </div>
      )}
      {nodeConfig.childNode ? (
        <NodeWrap
          flowPermission={flowPermission}
          nodes={nodeConfig.childNode}
        />
      ) : (
        ''
      )}
    </>
  );
};

export default NodeWrap;
