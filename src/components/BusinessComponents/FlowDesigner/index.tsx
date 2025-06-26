import { FlowNode } from '@/services/auditModule/flow/typings';
import { RootState } from '@/store/configureStore';
import { setNodes } from '@/store/flowDesignerSlice';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Card, message } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ApproverDrawer from './ApproverDrawer';
import ConditionDrawer from './ConditionDrawer';
import CopyerDrawer from './CopyerDrawer';
import './index.scss';
import NodeWrap from './NodeWrap';

const FlowDesigner = (props: { setIsSaved: (isSaved: boolean) => void }) => {
  const { setIsSaved } = props;
  let [curSize, setCurSize] = useState(100);

  const dispatch = useDispatch();
  const { nodes } = useSelector((state: RootState) => state.flowDesigner);
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

  const saveNode = async () => {
    if (!nodeConfig) {
      return;
    }
    dispatch(setNodes(nodeConfig));
    setIsSaved(true);
    message.success('保存模版');
  };

  if (!nodeConfig) {
    return <></>;
  }

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
            <NodeWrap
              nodes={nodeConfig}
              flowPermission={[]}
              setNode={setNodeConfig}
            />
            <div className="end-node">
              <div className="end-node-circle"></div>
              <div className="end-node-text">流程结束</div>
            </div>
          </div>
        </section>
      </div>
      <ApproverDrawer />
      <CopyerDrawer />
      <ConditionDrawer />
    </Card>
  );
};

export default FlowDesigner;
