import AuthoritySelect from '@/components/AuthoritySelect/AuthoritySelect';
import BaseModalForm from '@/components/BaseModalForm';
import { useRequest } from '@/hooks/useRequest';
import { RoleAPI } from '@/services/role/RoleController';
import type { RoleCreateParams, RoleFormProps } from '@/services/role/typing';
import { Form, Input } from 'antd';

const CreateForm: React.FC<RoleFormProps> = ({
  modalVisible,
  onCancel,
  refresh,
}) => {
  const { loading, run } = useRequest<RoleCreateParams, null>(
    RoleAPI.createRole,
    {
      successMsg: '创建角色成功',
      onSuccess: refresh,
    },
  );

  const handleSubmit = async (values: RoleCreateParams) => {
    return await run(values);
  };

  return (
    <BaseModalForm
      title="新建角色"
      visible={modalVisible}
      onCancel={onCancel}
      onSubmit={handleSubmit}
      loading={loading}
    >
      <Form.Item
        label="角色名称"
        name="role_name"
        rules={[{ required: true, message: '请输入角色名称' }]}
      >
        <Input placeholder="请输入角色名称" />
      </Form.Item>
      <Form.Item
        label="角色权限"
        name="code_list"
        rules={[{ required: true, message: '请选择角色权限' }]}
      >
        <AuthoritySelect />
      </Form.Item>
    </BaseModalForm>
  );
};

export default CreateForm;
