import FlowDesigner from '@/components/BusinessComponents/FlowDesigner';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Button, message } from 'antd';
import { useState } from 'react';

interface AuditDetailType {
  id: string;
  title: string;
  type: '文本' | '图片' | '视频';
  priority: 'high' | 'medium' | 'low';
  content: string;
  applicant: string;
  createTime: string;
  deadline: string;
  status: 'pending' | 'approved' | 'rejected';
  process: Array<{
    action: string;
    operator: string;
    time: string;
    remark?: string;
  }>;
}

export default function ModalDetail() {
  const [, setCurrentAudit] = useState<AuditDetailType>();

  // Mock提交
  const handleSubmit = (values: any) => {
    const newAudit: AuditDetailType = {
      id: Date.now().toString(),
      ...values,
      applicant: '当前用户',
      createTime: new Date().toISOString(),
      status: 'pending',
      process: [],
    };
    setCurrentAudit(newAudit);
    message.success('提交成功');
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
            新建模版
          </>
        ),
      }}
      extra={
        <Button type="primary" onClick={handleSubmit}>
          提交模版
        </Button>
      }
    >
      <FlowDesigner />
      {/* <Card>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="标题" name="title" rules={[{ required: true }]}>
            <Input width={100} placeholder="请输入模版标题" />
          </Form.Item>
        </Form>
      </Card> */}
    </PageContainer>
  );
}
