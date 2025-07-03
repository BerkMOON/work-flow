import { FlowNode } from '@/services/auditModule/flow/typings';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import { useEffect, useState } from 'react';
import './index.scss';
import NodeWrap from './NodeWrap';

const FlowBoard = (props: { nodes?: FlowNode }) => {
  const { nodes } = props;
  let [curSize, setCurSize] = useState(100);

  const [nodeConfig, setNodeConfig] = useState<FlowNode>();

  useEffect(() => {
    setNodeConfig(nodes);
  }, [nodes]);

  const zoomSize = (type: number) => {
    if (type === 1) {
      if (curSize === 50) {
        return;
      }
      setCurSize(curSize - 10);
    } else {
      if (curSize === 300) {
        return;
      }
      setCurSize(curSize + 10);
    }
  };

  if (!nodeConfig) {
    return <></>;
  }

  return (
    <Card title="审批流程模版" style={{ minHeight: 600 }}>
      <div className="fd-nav-content">
        <section className="dingflow-design">
          <div className="zoom">
            <MinusCircleOutlined
              style={{ fontSize: 25 }}
              className={`zoom-out ${curSize === 50 ? 'disabled' : ''}`}
              onClick={() => zoomSize(1)}
            />
            <span>{curSize}%</span>
            <PlusCircleOutlined
              style={{ fontSize: 25 }}
              className={`zoom-in ${curSize === 300 ? 'disabled' : ''}`}
              onClick={() => zoomSize(2)}
            />
          </div>
          <div
            className="box-scale"
            style={{ transform: `scale(${curSize / 100})` }}
          >
            <NodeWrap nodes={nodeConfig} flowPermission={[]} />
            <div className="end-node">
              <div className="end-node-circle"></div>
              <div className="end-node-text">流程结束</div>
            </div>
          </div>
        </section>
      </div>
    </Card>
  );
};

export default FlowBoard;
