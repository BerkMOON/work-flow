import { RootState } from '@/store/configureStore';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import './index.scss';
import NodeWrap from './NodeWrap';

const FlowDesigner = () => {
  let [curSize, setCurSize] = useState(100);

  const { nodes } = useSelector((state: RootState) => state.flowDesigner);

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

  const saveNode = () => {};

  return (
    <Card
      title="审批流程设计器"
      style={{ minHeight: 600 }}
      extra={
        <Button type="primary" onClick={saveNode}>
          保存模板
        </Button>
      }
    >
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
            <NodeWrap nodes={nodes} />
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

export default FlowDesigner;
