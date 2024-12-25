import BaseModalForm from '@/components/BaseModalForm';
import { RoleAPI } from '@/services/role/RoleController';
import type { RoleFormProps } from '@/services/role/typing';
import { message } from 'antd';
import { useState } from 'react';

const DeleteForm: React.FC<RoleFormProps> = ({
  modalVisible,
  onCancel,
  refresh,
  roleId = '',
}) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await RoleAPI.deleteRole(roleId);
      message.success('删除橘色成功');
      refresh();
      return Promise.resolve();
    } catch (error) {
      message.error('删除角色失败');
      return Promise.reject(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseModalForm
      title="删除角色"
      visible={modalVisible}
      onCancel={onCancel}
      onSubmit={handleSubmit}
      loading={loading}
    >
      <div>是否删除该角色？删除后不可恢复，请确认。</div>
    </BaseModalForm>
  );
};

export default DeleteForm;
