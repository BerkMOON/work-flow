import AuthoritySelect from '@/components/AuthoritySelect/AuthoritySelect';
import BaseModalForm from '@/components/BaseModalForm';
import { RoleAPI } from '@/services/role/RoleController';
import type { RoleDetailParams, RoleFormProps } from '@/services/role/typing';
import { Form, message } from 'antd';
import { useState } from 'react';

const UpdateRoleForm: React.FC<RoleFormProps> = ({
  modalVisible,
  onCancel,
  refresh,
  roleId = '',
}) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: RoleDetailParams) => {
    try {
      setLoading(true);
      await RoleAPI.updateRoleDetail({
        role_id: roleId,
        code_list: values.code_list,
      });
      message.success('更新角色权限成功');
      refresh();
      onCancel();
    } catch (error) {
      message.error('更新角色权限失败，请稍后重试');
      console.error(error);
    } finally {
      setLoading(false);
    }
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
