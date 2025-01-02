import BaseModalForm from '@/components/BasicComponents/BaseModalForm';
import { useRequest } from '@/hooks/useRequest';
import { RoleAPI } from '@/services/role/RoleController';
import type { RoleFormProps, RoleUpdateParams } from '@/services/role/typing';
import { Form, Input } from 'antd';

const ModifyForm: React.FC<RoleFormProps> = ({
  modalVisible,
  onCancel,
  refresh,
  roleId = '',
  name = '',
}) => {
  const { loading, run } = useRequest<RoleUpdateParams, null>(
    RoleAPI.modifyRole,
    {
      successMsg: '更新角色成功',
      onSuccess: refresh,
    },
  );

  const handleSubmit = async (values: RoleUpdateParams) => {
    return await run({
      name: values.name,
      role_id: roleId,
    });
  };

  return (
    <BaseModalForm
      title="更新角色信息"
      visible={modalVisible}
      onCancel={onCancel}
      onSubmit={handleSubmit}
      loading={loading}
      initialValues={{ name }}
    >
      <Form.Item
        label="角色名称"
        name="name"
        rules={[{ required: true, message: '请输入角色名称' }]}
      >
        <Input placeholder="请输入角色名称" />
      </Form.Item>
    </BaseModalForm>
  );
};

export default ModifyForm;
