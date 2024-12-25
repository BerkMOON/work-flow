import AuthoritySelect from '@/components/AuthoritySelect/AuthoritySelect';
import BaseModalForm from '@/components/BaseModalForm';
import { RoleAPI } from '@/services/role/RoleController';
import type { RoleCreateParams, RoleFormProps } from '@/services/role/typing';
import { Form, Input, message } from 'antd';
import { useState } from 'react';

const CreateForm: React.FC<RoleFormProps> = ({
  modalVisible,
  onCancel,
  refresh,
}) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: RoleCreateParams) => {
    try {
      setLoading(true);
      await RoleAPI.createRole(values);
      message.success('创建角色成功');
      refresh();
      onCancel();
    } catch (error) {
      message.error('创建角色失败，请稍后重试');
      console.error(error);
    } finally {
      setLoading(false);
    }
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
