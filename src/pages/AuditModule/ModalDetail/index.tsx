import FlowDesigner from '@/components/BusinessComponents/FlowDesigner';
import { ModalAPI } from '@/services/auditModule/modal/ModalController';
import { RootState } from '@/store/configureStore';
import { setNodes } from '@/store/flowDesignerSlice';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { history, useParams } from '@umijs/max';
import { Button, Form, Input, message, Steps } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface FormValues {
  value: string;
  key: string;
  remark: string;
}

export default function ModalDetail() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { nodes } = useSelector((state: RootState) => state.flowDesigner);
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState<FormValues>();
  const [isSaveTemp, setIsSaveTemp] = useState(false);

  useEffect(() => {
    if (id) {
      ModalAPI.getModalDetail(id).then((res) => {
        form.setFieldsValue({
          key: res.key,
          value: res.value,
          remark: res.remark,
        });
        dispatch(setNodes(res.nodeConig));
      });
    }
  }, [id]);

  const onChange = (value: number) => {
    setCurrent(value);
  };

  const handleSubmit = async () => {
    if (isSaveTemp) {
      const api = id ? ModalAPI.updateModal : ModalAPI.createModal;

      await api({
        ...formValues,
        nodeConig: nodes,
      });
      message.success('保存成功');
      history.push(`/audit/modalList`);
    } else {
      message.error('请先保存模版');
    }
  };

  // Mock提交
  const handleFormSubmit = (values: FormValues) => {
    onChange(current + 1);
    setFormValues(values);
  };

  return (
    <PageContainer
      header={{
        title: (
          <>
            <ArrowLeftOutlined
              onClick={() => {
                history.back();
              }}
            />{' '}
            {id ? '编辑模版' : '新建模版'}
          </>
        ),
      }}
      extra={
        <>
          {current !== 0 && (
            <Button onClick={() => onChange(current - 1)}>上一步</Button>
          )}
          <Button
            type="primary"
            onClick={() => {
              if (current === 0) {
                form.submit();
              } else {
                handleSubmit();
              }
            }}
          >
            {current === 0 ? '下一步' : '提交模版'}
          </Button>
        </>
      }
    >
      <Steps
        type="navigation"
        style={{ marginBottom: '20px' }}
        current={current}
        items={[
          {
            title: '模版信息',
          },
          {
            title: '模版流程',
          },
        ]}
      />
      {current === 0 && (
        <Form
          form={form}
          onFinish={handleFormSubmit}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 6 }}
        >
          <Form.Item
            name="value"
            label="模版名称"
            rules={[{ required: true, message: '请输入模版名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="key"
            label="模版标识"
            rules={[{ required: true, message: '请输入模版标识' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="remark" label="备注">
            <Input.TextArea minLength={4} />
          </Form.Item>
        </Form>
      )}
      {current === 1 && <FlowDesigner setIsSaved={setIsSaveTemp} />}
    </PageContainer>
  );
}
