import BaseModalForm from '@/components/BasicComponents/BaseModalForm';
import { useRequest } from '@/hooks/useRequest';
import { TagAPI } from '@/services/tag/TagController';
import { CreateTagItemParams } from '@/services/tag/typings';
import { BaseModalFormProps } from '@/types/common';
import { useParams } from '@umijs/max';
import { Form, Input } from 'antd';

const CreateForm: React.FC<BaseModalFormProps> = ({
  modalVisible,
  onCancel,
  refresh,
}) => {
  const { groupId } = useParams<{ groupId: string }>();
  const { loading, run } = useRequest<CreateTagItemParams, null>(
    TagAPI.createTagItem,
    {
      successMsg: '创建标签成功',
      onSuccess: refresh,
    },
  );

  const handleSubmit = async (values: CreateTagItemParams) => {
    return await run({
      ...values,
      group_id: Number(groupId),
    });
  };

  return (
    <BaseModalForm
      title="新建标签"
      visible={modalVisible}
      onCancel={onCancel}
      onSubmit={handleSubmit}
      loading={loading}
    >
      <Form.Item
        name="name"
        label="标签名称"
        rules={[{ required: true, message: '请输入标签名称' }]}
      >
        <Input placeholder="请输入标签名称" />
      </Form.Item>
      <Form.Item name="desc" label="标签描述">
        <Input placeholder="请输入标签描述" />
      </Form.Item>
      <Form.Item name="ext" label="标签扩展内容">
        <Input placeholder="请输入标签扩展内容" />
      </Form.Item>
    </BaseModalForm>
  );
};

export default CreateForm;
