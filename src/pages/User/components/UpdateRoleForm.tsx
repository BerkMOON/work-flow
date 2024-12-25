import BaseModalForm from '@/components/BaseModalForm';
import RoleSelect from '@/components/RoleSelect/RoleSelect';
import { UserInfo } from '@/services/user/typings';
import { UserAPI } from '@/services/user/UserController';
import { Form, message } from 'antd';
import React, { useState } from 'react';

interface UpdateRoleFormProps {
  modalVisible: boolean;
  record?: UserInfo;
  refresh: () => void;
  onCancel: () => void;
}

const UpdateRoleForm: React.FC<UpdateRoleFormProps> = (props) => {
  const { modalVisible, onCancel, refresh, record } = props;
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      await UserAPI.modifyRole({
        user_id: record?.user_id || '',
        role_id: values.role_id,
      });
      message.success('修改角色成功');
      refresh();
      return Promise.resolve();
    } catch (error) {
      message.error('修改角色失败');
      return Promise.reject(error);
    } finally {
      setLoading(false);
    }
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
