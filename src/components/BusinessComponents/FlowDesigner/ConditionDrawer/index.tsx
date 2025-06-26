import ConditionInput, {
  ConditionValue,
} from '@/components/BasicComponents/ConditionInput';
import { FlowNode } from '@/services/auditModule/flow/typings';
import { RootState } from '@/store/configureStore';
import {
  setConditionDrawer,
  setConditionDrawerNode,
} from '@/store/flowDesignerSlice';
import { getConditionList } from '@/utils/flowUtils';
import { Button, Drawer, Form, Input, Space } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './index.scss';

const ConditionDrawer = () => {
  const dispatch = useDispatch();
  const { showConditionDrawer, conditionDrawerNode } = useSelector(
    (state: RootState) => state.flowDesigner,
  );
  const [form] = Form.useForm();
  const [tempNode, setTempNode] = useState<FlowNode>();

  useEffect(() => {
    if (
      conditionDrawerNode &&
      conditionDrawerNode.node?.conditionNodes &&
      conditionDrawerNode.priorityLevel
    ) {
      form.setFieldsValue({
        node_name:
          conditionDrawerNode.node?.conditionNodes[
            conditionDrawerNode.priorityLevel - 1
          ].nodeName,
      });
      setTempNode(conditionDrawerNode?.node);
    }
  }, [conditionDrawerNode]);

  const onCancel = () => {
    dispatch(setConditionDrawer(false));
    form.resetFields();
  };

  const onFinish = (values: any) => {
    if (tempNode) {
      const newNode = {
        ...tempNode,
        conditionNodes: tempNode?.conditionNodes?.map((item) => {
          if (item.priorityLevel === conditionDrawerNode?.priorityLevel) {
            return {
              ...item,
              nodeName: values.node_name,
              conditionList: getConditionList(values.price_range),
            };
          }
          return item;
        }),
      };
      dispatch(
        setConditionDrawerNode({
          ...conditionDrawerNode,
          node: newNode as FlowNode,
          flag: true,
        }),
      );
      onCancel();
    }
  };

  const validateConditionInput = (_: any, value: ConditionValue) => {
    if (!value?.condition) {
      return Promise.reject('请选择条件');
    }

    if (value.values.some((v) => v === null || v === undefined)) {
      return Promise.reject('请输入完整数值');
    }

    if (value.condition === 'between') {
      const [min, max] = value.values as number[];
      if (min >= max) {
        return Promise.reject('最小值必须小于最大值');
      }
    }

    return Promise.resolve();
  };

  return (
    <Drawer
      title="审核条件设置"
      onClose={onCancel}
      open={showConditionDrawer}
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
          label="审核条件名称"
          rules={[
            {
              required: true,
              message: '请输入审核条件名称',
            },
          ]}
          wrapperCol={{ span: 8 }}
        >
          <Input placeholder="例如：条件一" />
        </Form.Item>
        <Form.Item
          label="价格区间"
          name="price_range"
          rules={[{ validator: validateConditionInput }]}
        >
          <ConditionInput />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default ConditionDrawer;
