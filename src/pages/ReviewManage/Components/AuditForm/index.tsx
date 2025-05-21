import { TagSelect } from '@/components/BusinessComponents/TagSelect/TagSelect';
import { AUDIT_LEVEL, AUDIT_RESULT } from '@/constants';
import { useRequest } from '@/hooks/useRequest';
import { AuditAPI } from '@/services/audit/AuditController';
import { AuditTaskDetail, AuditTaskParams } from '@/services/audit/typings';
import { Button, Form, Input, Radio } from 'antd';
import React from 'react';

interface AuditFormComponentProps {
  onFinished: () => Promise<void>;
  detail: AuditTaskDetail;
  disabledDeter?: boolean;
}

const AuditForm: React.FC<AuditFormComponentProps> = ({
  onFinished,
  detail,
  disabledDeter = false,
}) => {
  const [form] = Form.useForm();
  const groupType = Form.useWatch('audit_result', form);

  const { loading: auditTaskLoading, run: auditTaskRun } = useRequest<
    AuditTaskParams,
    null
  >(AuditAPI.auditTask, {
    successMsg: '审核完成',
    onSuccess: () => {
      form.resetFields();
      onFinished?.();
    },
  });

  const onFinish = async (values: AuditTaskParams) => {
    return await auditTaskRun({
      task_id: detail?.id || 0,
      audit_result: values.audit_result,
      clue_id: detail?.clue_id || '',
      level: values?.level || '',
      note: values?.note || '',
      tag_id_list: values?.tag_id_list || [],
    });
  };

  return (
    <Form
      form={form}
      name="audit"
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
          {!disabledDeter && (
            <Radio value={AUDIT_RESULT.UNDETERMINE}>待确定</Radio>
          )}
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
        <Radio.Group disabled={groupType === AUDIT_RESULT.UNDETERMINE}>
          <Radio value={AUDIT_LEVEL.A}>AAAA</Radio>
          <Radio value={AUDIT_LEVEL.B}>AAA</Radio>
          <Radio value={AUDIT_LEVEL.C}>AA</Radio>
          <Radio value={AUDIT_LEVEL.D}>A</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item label="审核备注" name="note">
        <Input.TextArea
          placeholder="请输入审核详情"
          disabled={groupType === AUDIT_RESULT.UNDETERMINE}
        ></Input.TextArea>
      </Form.Item>

      <Form.Item
        label="审核标签"
        name="tag_id_list"
        rules={[
          {
            required: groupType !== AUDIT_RESULT.UNDETERMINE,
            message: '请选择审核标签',
          },
        ]}
      >
        <TagSelect
          groupType={groupType}
          disabled={groupType === AUDIT_RESULT.UNDETERMINE}
        />
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
  );
};

export default AuditForm;
