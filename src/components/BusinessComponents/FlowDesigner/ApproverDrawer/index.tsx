import { FlowNode } from '@/services/auditModule/flow/typings';
import { RootState } from '@/store/configureStore';
import {
  setApproverDrawer,
  setApproverDrawerNode,
} from '@/store/flowDesignerSlice';
import { Button, Drawer, Form, Input, Radio, Space, Tag } from 'antd';
import { cloneDeep } from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DepartmentSelect from '../../DepartmentSelect';
import SelectedUserModal from '../../SelectUser';
import {
  ApproverUserType,
  MultiApproverTypeOption,
  ReviewerTypeEnum,
  ReviewerTypeOption,
} from '../constants';
import './index.scss';

const ApproverDrawer = () => {
  const dispatch = useDispatch();
  const { showApproverDrawer, approverDrawerNode } = useSelector(
    (state: RootState) => state.flowDesigner,
  );
  const [form] = Form.useForm();
  const setType = Form.useWatch('set_type', form);
  const [visible, setVisible] = useState(false);
  const [tempNode, setTempNode] = useState<FlowNode>();

  useEffect(() => {
    if (setType) {
      setTempNode({
        ...tempNode,
        nodeUserList: [],
      } as FlowNode);
    }
  }, [setType]);

  useEffect(() => {
    if (approverDrawerNode) {
      form.setFieldsValue({
        node_name: approverDrawerNode.node?.nodeName,
        set_type: approverDrawerNode.node?.setType,
        department: approverDrawerNode.node?.nodeUserList?.[0]?.targetId,
      });
      setTempNode(approverDrawerNode.node);
    }
  }, [approverDrawerNode]);

  const onCancel = () => {
    dispatch(setApproverDrawer(false));
    form.resetFields();
    setTempNode(undefined);
  };

  const onFinish = (values: any) => {
    if (tempNode) {
      let newNode = {
        ...tempNode,
        nodeName: values.node_name,
        setType: values.set_type,
      };
      if (setType === ReviewerTypeEnum.SpecifyDepart) {
        newNode = {
          ...newNode,
          nodeUserList: [
            {
              targetId: values.department,
              name: values.department,
              type: ApproverUserType.Group,
            },
          ],
        };
      }
      if (setType === ReviewerTypeEnum.Optional) {
        newNode = {
          ...newNode,
          nodeUserList: [],
        };
      }
      dispatch(
        setApproverDrawerNode({
          ...approverDrawerNode,
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
        nodeUserList: tempNode.nodeUserList?.filter(
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
      open={showApproverDrawer}
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
        <Form.Item
          name="set_type"
          label="审批人员"
          rules={[
            {
              required: true,
              message: '请选择审批人员',
            },
          ]}
        >
          <Radio.Group options={ReviewerTypeOption}></Radio.Group>
        </Form.Item>
        {setType === ReviewerTypeEnum.SpecifyUser && (
          <>
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
          </>
        )}
        {setType === ReviewerTypeEnum.SpecifyDepart && (
          <>
            <Form.Item
              label="选择部门"
              name="department"
              wrapperCol={{ span: 8 }}
            >
              <DepartmentSelect />
            </Form.Item>
          </>
        )}
        <Form.Item
          label="多人审批时采用的审批方式"
          name="multi_approver_type"
          rules={[
            {
              required: true,
              message: '请选择审批方式',
            },
          ]}
        >
          <Radio.Group options={MultiApproverTypeOption} />
        </Form.Item>
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

export default ApproverDrawer;
