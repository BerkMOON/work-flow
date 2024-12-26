import BaseModalForm from '@/components/BaseModalForm';
import { useRequest } from '@/hooks/useRequest';
import { TagAPI } from '@/services/tag/TagController';
import type { TagItemItem, UpdateTagItemParams } from '@/services/tag/typings';
import { BaseModalFormProps } from '@/types/common';
import { Form, Input } from 'antd';

interface ModifyFormProps extends BaseModalFormProps {
  record?: TagItemItem;
}

const ModifyForm: React.FC<ModifyFormProps> = ({
  modalVisible,
  onCancel,
  refresh,
  record,
}) => {
  const { loading, run } = useRequest<UpdateTagItemParams, null>(
    TagAPI.updateTagItem,
    {
      successMsg: '修改标签成功',
      onSuccess: refresh,
    },
  );

  const handleSubmit = async (values: { desc: string; ext: string }) => {
    return await run({
      id: record?.id || 0,
      desc: values.desc,
      ext: values.ext,
    });
  };

  return (
    <BaseModalForm
      title="修改标签信息"
      visible={modalVisible}
      onCancel={onCancel}
      onSubmit={handleSubmit}
      loading={loading}
      initialValues={record}
    >
      <Form.Item name="desc" label="标签组描述">
        <Input placeholder="请输入标签组描述" />
      </Form.Item>
      <Form.Item name="ext" label="标签扩展内容">
        <Input placeholder="请输入标签扩展内容" />
      </Form.Item>
    </BaseModalForm>
  );
};

export default ModifyForm;
