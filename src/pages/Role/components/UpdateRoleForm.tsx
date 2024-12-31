import AuthoritySelect from '@/components/AuthoritySelect/AuthoritySelect';
import BaseModalForm from '@/components/BaseModalForm';
import { useRequest } from '@/hooks/useRequest';
import { RoleAPI } from '@/services/role/RoleController';
import type { RoleDetailParams, RoleFormProps } from '@/services/role/typing';
import { Form } from 'antd';

const UpdateRoleForm: React.FC<RoleFormProps> = ({
  modalVisible,
  onCancel,
  refresh,
  roleId = '',
}) => {
  const { loading, run } = useRequest<RoleDetailParams, null>(
    RoleAPI.updateRoleDetail,
    {
      successMsg: '更新角色权限成功',
      onSuccess: refresh,
    },
  );

  const handleSubmit = async (values: RoleDetailParams) => {
    return await run({
      role_id: roleId,
      code_list: values.code_list,
    });
  };

  return (
    <BaseModalForm
      title="修改角色权限详情"
      visible={modalVisible}
      onCancel={onCancel}
      onSubmit={handleSubmit}
      loading={loading}
    >
      <Form.Item
        label="角色权限"
        name="code_list"
        rules={[{ required: true, message: '请选择角色权限' }]}
      >
        <AuthoritySelect roleId={roleId} />
      </Form.Item>
    </BaseModalForm>
  );
};

export default UpdateRoleForm;
