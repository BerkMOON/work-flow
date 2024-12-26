import BaseModalForm from '@/components/BaseModalForm';
import { useRequest } from '@/hooks/useRequest';
import { TagAPI } from '@/services/tag/TagController';
import type {
  TagGroupItem,
  UpdateTagGroupParams,
} from '@/services/tag/typings';
import { BaseModalFormProps } from '@/types/common';
import { Form, Input } from 'antd';

interface ModifyFormProps extends BaseModalFormProps {
  record?: TagGroupItem;
}

const ModifyForm: React.FC<ModifyFormProps> = ({
  modalVisible,
  onCancel,
  refresh,
  record,
}) => {
  const { loading, run } = useRequest<UpdateTagGroupParams, null>(
    TagAPI.updateTagGroup,
    {
      successMsg: '修改标签组成功',
      onSuccess: refresh,
    },
  );

  const handleSubmit = async (values: { desc: string }) => {
    return await run({
      id: record?.id || '',
      desc: values.desc,
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
      <Form.Item
        name="desc"
        label="标签组描述"
        rules={[{ required: true, message: '请输入标签组描述' }]}
      >
        <Input placeholder="请输入标签组描述" />
      </Form.Item>
    </BaseModalForm>
  );
};

export default ModifyForm;
