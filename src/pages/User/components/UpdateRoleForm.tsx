import BaseModalForm from '@/components/BasicComponents/BaseModalForm';
import RoleSelect from '@/components/BusinessComponents/RoleSelect/RoleSelect';
import { useRequest } from '@/hooks/useRequest';
import { ModifyRoleParams, UserInfo } from '@/services/user/typings';
import { UserAPI } from '@/services/user/UserController';
import { Form } from 'antd';
import React from 'react';

interface UpdateRoleFormProps {
  modalVisible: boolean;
  record?: UserInfo;
  refresh: () => void;
  onCancel: () => void;
}

const UpdateRoleForm: React.FC<UpdateRoleFormProps> = (props) => {
  const { modalVisible, onCancel, refresh, record } = props;
  const { loading, run } = useRequest<ModifyRoleParams, null>(
    UserAPI.modifyRole,
    {
      successMsg: '修改角色成功',
      onSuccess: refresh,
    },
  );

  const handleSubmit = async (values: any) => {
    return await run({
      user_id: record?.user_id || '',
      role_id: values.role_id,
    });
  };

  return (
    <BaseModalForm
      title="修改角色信息"
      visible={modalVisible}
      onCancel={onCancel}
      onSubmit={handleSubmit}
      loading={loading}
    >
      <Form.Item
        name="role_id"
        label="角色"
        rules={[{ required: true, message: '请选择角色' }]}
      >
        <RoleSelect roleName={record?.role_name} />
      </Form.Item>
    </BaseModalForm>
  );
};

export default UpdateRoleForm;
