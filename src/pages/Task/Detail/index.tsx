import { useRequest } from '@/hooks/useRequest';
import { AuditAPI } from '@/services/audit/AuditController';
import { PageContainer } from '@ant-design/pro-components';
import { Navigate, useAccess, useParams } from '@umijs/max';
import { Card, Descriptions, Result, Spin } from 'antd';
import React from 'react';
import ReactPlayer from 'react-player';

const TaskDetail: React.FC = () => {
  const { clueId } = useParams<{ clueId: string }>();
  const { isLogin, taskDetail } = useAccess();
  const taskDetailAccess = taskDetail();

  const { loading, data: detail } = useRequest(AuditAPI.getAuditTaskDetail, {
    immediate: true,
    immediateParams: {
      clue_id: clueId || '',
      needRecordDetail: true,
      needAuditResult: true,
    },
  });

  if (!isLogin) {
    return <Navigate to="/login" />;
  }

  if (!taskDetailAccess) {
    return <Result status="403" title="403" subTitle="无权限访问" />;
  }

  return (
    <PageContainer
      header={{
        title: '详情',
      }}
    >
      <Spin spinning={loading}>
        <Card>
          {detail?.video_url && (
            <Card title="视频内容" style={{ marginBottom: 24 }}>
              <ReactPlayer url={detail.video_url} controls />
            </Card>
          )}

          <Card title="任务信息">
            <Descriptions column={2}>
              <Descriptions.Item label="任务ID">{detail?.id}</Descriptions.Item>
              <Descriptions.Item label="线索ID">
                {detail?.clue_id}
              </Descriptions.Item>
              <Descriptions.Item label="设备ID">
                {detail?.equipment_id}
              </Descriptions.Item>
              <Descriptions.Item label="处理人">
                {detail?.handler_name}
              </Descriptions.Item>
              <Descriptions.Item label="状态">
                {detail?.status?.name}
              </Descriptions.Item>
              <Descriptions.Item label="等级">
                {detail?.level}
              </Descriptions.Item>
              <Descriptions.Item label="创建时间">
                {detail?.create_time}
              </Descriptions.Item>
              <Descriptions.Item label="更新时间">
                {detail?.modify_time}
              </Descriptions.Item>
            </Descriptions>
          </Card>

          {detail?.status.code === 1 && (
            <Card title="审核结果" style={{ marginTop: 24 }}>
              <Descriptions column={2}>
                <Descriptions.Item label="审核结果">
                  {detail.status.code === 1 ? '通过' : '拒绝'}
                </Descriptions.Item>
                <Descriptions.Item label="审核标签">
                  {detail.tag_list?.map((tag) => tag).join(', ')}
                </Descriptions.Item>
                <Descriptions.Item label="审核备注">
                  {detail.note}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          )}
        </Card>
      </Spin>
    </PageContainer>
  );
};

export default TaskDetail;
