import { auditTask, getAuditInfo } from '@/services/audit/AuditController';
import { PageContainer } from '@ant-design/pro-components';
import { Access, Navigate, useAccess } from '@umijs/max';
import { Button, Form, Input, Radio } from 'antd';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import styles from './index.less';

const AuditPage: React.FC = () => {
  const { isLogin, auditVideo } = useAccess();
  const [auditUrl, setAuditUrl] = useState<string>('');
  const [isPolling, setIsPolling] = useState(true);
  const [taskId, setTaskId] = useState<number>(0);

  useEffect(() => {
    let intervalId = null;

    if (isPolling && !auditUrl) {
      // 设置轮询间隔（例如每2秒轮询一次）
      intervalId = setInterval(() => {
        getAuditInfo()
          .then((result) => {
            const {
              data: { video_url, task_id },
            } = result;
            if (video_url) {
              setAuditUrl(video_url);
              setTaskId(task_id);
              setIsPolling(false); // 一旦获取到video_url，停止轮询
            }
          })
          .catch((error) => {
            // 处理错误，例如记录日志或显示错误消息
            console.error('Failed to fetch audit info:', error);
          });
      }, 3000); // 1秒轮询一次
    }

    // 清理函数，在组件卸载或停止轮询时执行
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [auditUrl, isPolling]);

  if (!isLogin) {
    return <Navigate to="/login" />;
  }

  if (!auditVideo) {
    return (
      <Access
        accessible={auditVideo}
        fallback={<div>Can not read foo content.</div>}
      />
    );
  }

  const onFinish = async (values: { audit_result: string }) => {
    try {
      await auditTask({
        task_id: taskId,
        audit_result: values.audit_result,
      });
      setAuditUrl('');
    } catch (error) {}
  };

  return (
    <PageContainer
      header={{
        title: '审核页面',
      }}
    >
      {auditUrl ? (
        <div className={styles.container}>
          <ReactPlayer url={auditUrl} />
          <Form
            name="login"
            initialValues={{ remember: true }}
            style={{ width: 350, marginTop: 30 }}
            onFinish={onFinish}
          >
            <Form.Item label="审核通过" name="audit_result">
              <Radio.Group>
                <Radio value={'approved'}>通过</Radio>
                <Radio value={'rejected'}>拒绝</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item label="审核评级" name="audit_result">
              <Radio.Group>
                <Radio value={'a'}>A</Radio>
                <Radio value={'b'}>B</Radio>
                <Radio value={'c'}>C</Radio>
                <Radio value={'d'}>D</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item label="审核详情" name="audit_result">
              <Input.TextArea placeholder="请输入审核详情"></Input.TextArea>
            </Form.Item>

            <Form.Item>
              <Button block type="primary" htmlType="submit">
                确认
              </Button>
            </Form.Item>
          </Form>
        </div>
      ) : (
        <div>暂时没有审核对象</div>
      )}
    </PageContainer>
  );
};

export default AuditPage;
