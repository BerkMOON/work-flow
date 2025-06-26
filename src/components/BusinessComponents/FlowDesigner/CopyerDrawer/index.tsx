import { FlowNode } from '@/services/auditModule/flow/typings';
import { RootState } from '@/store/configureStore';
import {
  setCopyerDrawer,
  setCopyerDrawerNode,
} from '@/store/flowDesignerSlice';
import { Button, Drawer, Form, Input, Space, Tag } from 'antd';
import { cloneDeep } from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SelectedUserModal from '../../SelectUser';
import './index.scss';

const CopyerDrawer = () => {
  const dispatch = useDispatch();
  const { showCopyerDrawer, copyerDrawerNode } = useSelector(
    (state: RootState) => state.flowDesigner,
  );
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [tempNode, setTempNode] = useState<FlowNode>();

  useEffect(() => {
    if (copyerDrawerNode) {
      form.setFieldsValue({
        node_name: copyerDrawerNode.node?.nodeName,
      });
      setTempNode(copyerDrawerNode?.node);
    }
  }, [copyerDrawerNode]);

  const onCancel = () => {
    dispatch(setCopyerDrawer(false));
    form.resetFields();
  };

  const onFinish = (values: any) => {
    if (tempNode) {
      const newNode = {
        ...tempNode,
        nodeName: values.node_name,
      };
      dispatch(
        setCopyerDrawerNode({
          ...copyerDrawerNode,
          node: newNode,
          flag: true,
        }),
      );
      onCancel();
    }
  };

  const onCloseTag = (name: string) => {
    if (tempNode) {
      const newNode = {
        ...cloneDeep(tempNode),
        nodeUserList: tempNode?.nodeUserList?.filter(
          (item) => item.targetId !== name,
        ),
      };
      setTempNode(newNode);
    }
  };

  return (
    <Drawer
      title="审核步骤设置"
      onClose={onCancel}
      open={showCopyerDrawer}
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
        <Button type="primary" onClick={() => setVisible(true)}>
          添加/修改人员
        </Button>
        <div className="tag-list">
          {tempNode?.nodeUserList?.map((info, key) => (
            <Tag
              key={key}
              closeIcon
              onClose={(e) => {
                e.preventDefault();
                onCloseTag(info.targetId as string);
              }}
            >
              {info.name}
            </Tag>
          ))}
        </div>
      </Form>
      <SelectedUserModal
        tempNode={tempNode}
        setTempNode={setTempNode}
        visible={visible}
        setVisible={setVisible}
      ></SelectedUserModal>
    </Drawer>
  );
};

export default CopyerDrawer;
