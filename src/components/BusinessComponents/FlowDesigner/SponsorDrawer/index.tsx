import { FlowNode } from '@/services/auditModule/flow/typings';
import { RootState } from '@/store/configureStore';
import {
  setShowSponsorDrawer,
  setSponsorDrawerNode,
} from '@/store/flowDesignerSlice';
import { Button, Drawer, Form, Input, Space } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DepartmentSelect from '../../DepartmentSelect';
import { ApproverUserType } from '../constants';
import './index.scss';

const SponsorDrawer = () => {
  const dispatch = useDispatch();
  const { showSponsorDrawer, sponsorDrawerNode } = useSelector(
    (state: RootState) => state.flowDesigner,
  );
  const [form] = Form.useForm();
  const [tempNode, setTempNode] = useState<FlowNode>();

  useEffect(() => {
    if (sponsorDrawerNode) {
      form.setFieldsValue({
        node_name: sponsorDrawerNode.node?.nodeName,
        department: sponsorDrawerNode.node?.nodeUserList?.map(
          (item) => item.targetId,
        ),
      });
      setTempNode(sponsorDrawerNode?.node);
    }
  }, [sponsorDrawerNode]);

  const onCancel = () => {
    dispatch(setShowSponsorDrawer(false));
    form.resetFields();
  };

  const onFinish = (values: any) => {
    if (tempNode) {
      const newNode = {
        ...tempNode,
        nodeName: values.node_name,
        nodeUserList: values.department.map((item: string) => ({
          targetId: item,
          name: item,
          type: ApproverUserType.Group,
        })),
      };
      dispatch(
        setSponsorDrawerNode({
          ...sponsorDrawerNode,
          node: newNode,
          flag: true,
        }),
      );
      onCancel();
    }
  };

  return (
    <Drawer
      title="审核步骤设置"
      onClose={onCancel}
      open={showSponsorDrawer}
      width={650}
      closeIcon={null}
      extra={
        <Space>
          <Button onClick={onCancel}>取消</Button>
          <Button type="primary" onClick={() => form.submit()}>
            保存
          </Button>
        </Space>
      }
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="node_name"
          label="审核步骤名称"
          rules={[
            {
              required: true,
              message: '请输入审核步骤名称',
            },
          ]}
          wrapperCol={{ span: 8 }}
        >
          <Input placeholder="例如：品牌部审核" />
        </Form.Item>
        <Form.Item label="选择部门" name="department" wrapperCol={{ span: 8 }}>
          <DepartmentSelect multiple />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default SponsorDrawer;
