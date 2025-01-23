import { TagSelect } from '@/components/BusinessComponents/TagSelect/TagSelect';
import { AUDIT_LEVEL, AUDIT_RESULT } from '@/constants';
import { useRequest } from '@/hooks/useRequest';
import { AuditAPI } from '@/services/audit/AuditController';
import { AuditTaskDetail, AuditTaskParams } from '@/services/audit/typings';
import { PageContainer } from '@ant-design/pro-components';
import { Navigate, useAccess } from '@umijs/max';
import { Button, Card, Form, Input, Radio, Result, Spin } from 'antd';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import styles from './index.less';

const AuditPage: React.FC = () => {
  const { isLogin, auditVideo } = useAccess();
  const auditVideoAccess = auditVideo();
  const [auditTaskDetail, setAuditTaskDetail] = useState<AuditTaskDetail>();
  const [form] = Form.useForm();
  const groupType = Form.useWatch('audit_result', form);
  const [polling, setPolling] = useState(true);

  const { run: getAuditTaskDetail } = useRequest(AuditAPI.getAuditTaskDetail, {
    showError: false,
    onSuccess: (data) => {
      setAuditTaskDetail(data);
    },
  });

  // 开启轮询
  const { run } = useRequest(AuditAPI.getAuditInfo, {
    polling,
    pollingInterval: 3000, // 每3秒请求一次
    showError: false,
    onSuccess: (data) => {
      if (data?.clue_id) {
        setPolling(false);
        getAuditTaskDetail({
          clue_id: data.clue_id,
          needRecordDetail: true,
        });
      }
    },
  });

  const { loading: auditTaskLoading, run: auditTaskRun } = useRequest<
    AuditTaskParams,
    null
  >(AuditAPI.auditTask, {
    successMsg: '审核完成',
    onSuccess: () => {
      setAuditTaskDetail(undefined);
      setPolling(true);
      form.resetFields();
      run(null);
    },
  });

  // 初始请求
  useEffect(() => {
    run(null);
  }, []);

  if (!isLogin) {
    return <Navigate to="/login" />;
  }

  if (!auditVideoAccess) {
    return <Result status="403" title="403" subTitle="无权限访问" />;
  }

  const onFinish = async (values: AuditTaskParams) => {
    return await auditTaskRun({
      task_id: auditTaskDetail?.id || 0,
      audit_result: values.audit_result,
      clue_id: auditTaskDetail?.clue_id || '',
      level: values?.level || '',
      note: values?.note || '',
      tag_id_list: values?.tag_id_list || [],
    });
  };

  return (
    <PageContainer
      header={{
        title: '审核页面',
        breadcrumb: {},
      }}
    >
      {auditTaskDetail ? (
        <div className={styles.container}>
          <Card title="视频内容" style={{ marginBottom: 24 }}>
            <ReactPlayer url={auditTaskDetail.video_url} controls />
          </Card>
          <Form
            form={form}
            name="login"
            initialValues={{ remember: true }}
            style={{ width: 350, marginTop: 30 }}
            onFinish={onFinish}
          >
            <Form.Item
              label="审核通过"
              name="audit_result"
              rules={[{ required: true, message: '请选择审核结果' }]}
            >
              <Radio.Group>
                <Radio value={AUDIT_RESULT.APPROVED}>通过</Radio>
                <Radio value={AUDIT_RESULT.REJECTED}>拒绝</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label="审核评级"
              name="level"
              rules={[
                {
                  required: groupType === AUDIT_RESULT.APPROVED,
                  message: '请选择审核评级',
                },
              ]}
            >
              <Radio.Group>
                <Radio value={AUDIT_LEVEL.A}>A</Radio>
                <Radio value={AUDIT_LEVEL.B}>B</Radio>
                <Radio value={AUDIT_LEVEL.C}>C</Radio>
                <Radio value={AUDIT_LEVEL.D}>D</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item label="审核备注" name="note">
              <Input.TextArea placeholder="请输入审核详情"></Input.TextArea>
            </Form.Item>

            <Form.Item
              label="审核标签"
              name="tag_id_list"
              rules={[{ required: true, message: '请选择审核标签' }]}
            >
              <TagSelect groupType={groupType} />
            </Form.Item>

            <Form.Item>
              <Button
                loading={auditTaskLoading}
                block
                type="primary"
                htmlType="submit"
              >
                确认
              </Button>
            </Form.Item>
          </Form>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '50px 0' }}>
          <Spin size="large">
            <div>暂时没有审核对象</div>
          </Spin>
        </div>
      )}
    </PageContainer>
  );
};

export default AuditPage;
