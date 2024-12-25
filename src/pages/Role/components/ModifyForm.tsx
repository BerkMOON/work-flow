import BaseModalForm from '@/components/BaseModalForm';
import { RoleAPI } from '@/services/role/RoleController';
import type { RoleFormProps, RoleUpdateParams } from '@/services/role/typing';
import { Form, Input, message } from 'antd';
import { useState } from 'react';

const ModifyForm: React.FC<RoleFormProps> = ({
  modalVisible,
  onCancel,
  refresh,
  roleId = '',
  name = '',
}) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: RoleUpdateParams) => {
    try {
      setLoading(true);
      await RoleAPI.modifyRole({
        name: values.name,
        role_id: roleId,
      });
      message.success('更新角色成功');
      refresh();
      onCancel();
    } catch (error) {
      message.error('更新角色失败，请稍后重试');
      console.error(error);
    } finally {
      setLoading(false);
    }
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
