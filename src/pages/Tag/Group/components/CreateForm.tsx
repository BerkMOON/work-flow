import BaseModalForm from '@/components/BaseModalForm';
import { useRequest } from '@/hooks/useRequest';
import { TagAPI } from '@/services/tag/TagController';
import { CreateTagGroupParams } from '@/services/tag/typings';
import { BaseModalFormProps } from '@/types/common';
import { Form, Input } from 'antd';

const CreateForm: React.FC<BaseModalFormProps> = ({
  modalVisible,
  onCancel,
  refresh,
}) => {
  const { loading, run } = useRequest<CreateTagGroupParams, null>(
    TagAPI.createTagGroup,
    {
      successMsg: '创建标签组成功',
      onSuccess: refresh,
    },
  );

  const handleSubmit = async (values: CreateTagGroupParams) => {
    return await run(values);
  };

  return (
    <BaseModalForm
      title="新建标签组"
      visible={modalVisible}
      onCancel={onCancel}
      onSubmit={handleSubmit}
      loading={loading}
    >
      <Form.Item
        name="name"
        label="标签组名称"
        rules={[{ required: true, message: '请输入标签组名称' }]}
      >
        <Input placeholder="请输入标签组名称" />
      </Form.Item>
      <Form.Item name="desc" label="标签组描述">
        <Input placeholder="请输入标签组描述" />
      </Form.Item>
    </BaseModalForm>
  );
};

export default CreateForm;
