import { ArrowLeftOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import {
  Button,
  Card,
  DatePicker,
  Descriptions,
  Divider,
  Form,
  Input,
  message,
  Select,
  Tag,
  Timeline,
} from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';

const { TextArea } = Input;

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

export default function AuditDetail() {
  const [form] = Form.useForm();
  const [currentAudit, setCurrentAudit] = useState<AuditDetailType>();

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
            发起审批
          </>
        ),
      }}
    >
      <Card>
        {/* 详情展示区域 */}
        {currentAudit ? (
          <Card title={currentAudit.title}>
            <Descriptions bordered column={2}>
              <Descriptions.Item label="申请人">
                {currentAudit.applicant}
              </Descriptions.Item>
              <Descriptions.Item label="优先级">
                <Tag
                  color={
                    currentAudit.priority === 'high'
                      ? '#ff4d4f'
                      : currentAudit.priority === 'medium'
                      ? '#faad14'
                      : '#52c41a'
                  }
                >
                  {currentAudit.priority === 'high'
                    ? '紧急'
                    : currentAudit.priority === 'medium'
                    ? '中等'
                    : '普通'}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="创建时间">
                {dayjs(currentAudit.createTime).format('YYYY-MM-DD HH:mm')}
              </Descriptions.Item>
              <Descriptions.Item label="截止时间">
                {dayjs(currentAudit.deadline).format('YYYY-MM-DD HH:mm')}
              </Descriptions.Item>
              <Descriptions.Item label="当前状态">
                <Tag
                  color={
                    currentAudit.status === 'pending'
                      ? '#1890ff'
                      : currentAudit.status === 'approved'
                      ? '#52c41a'
                      : '#ff4d4f'
                  }
                >
                  {currentAudit.status === 'pending'
                    ? '待审批'
                    : currentAudit.status === 'approved'
                    ? '已通过'
                    : '已拒绝'}
                </Tag>
              </Descriptions.Item>
            </Descriptions>

            <Divider orientation="left">审批流程</Divider>
            <Timeline mode="alternate">
              {currentAudit.process.map((step, index) => (
                <Timeline.Item
                  key={index}
                  label={dayjs(step.time).format('HH:mm')}
                >
                  <strong>{step.action}</strong>
                  <p>操作人：{step.operator}</p>
                  {step.remark && <p>备注：{step.remark}</p>}
                </Timeline.Item>
              ))}
            </Timeline>
          </Card>
        ) : (
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item label="标题" name="title" rules={[{ required: true }]}>
              <Input placeholder="请输入审批标题" />
            </Form.Item>

            <Form.Item label="类型" name="type" rules={[{ required: true }]}>
              <Select
                options={[
                  { value: '文本', label: '文本' },
                  { value: '图片', label: '图片' },
                  { value: '视频', label: '视频' },
                ]}
              />
            </Form.Item>

            <Form.Item
              label="优先级"
              name="priority"
              rules={[{ required: true }]}
            >
              <Select
                options={[
                  { value: 'high', label: '紧急' },
                  { value: 'medium', label: '中等' },
                  { value: 'low', label: '普通' },
                ]}
              />
            </Form.Item>

            <Form.Item
              label="审批内容"
              name="content"
              rules={[{ required: true }]}
            >
              <TextArea rows={4} placeholder="请输入详细内容" />
            </Form.Item>

            <Form.Item
              label="截止时间"
              name="deadline"
              rules={[{ required: true }]}
            >
              <DatePicker showTime style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                提交审批
              </Button>
            </Form.Item>
          </Form>
        )}
      </Card>
    </PageContainer>
  );
}
