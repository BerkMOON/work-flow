import BaseModalForm from '@/components/BasicComponents/BaseModalForm';
import { useRequest } from '@/hooks/useRequest';
import { RoleAPI } from '@/services/role/RoleController';
import type { RoleFormProps } from '@/services/role/typing';

const DeleteForm: React.FC<RoleFormProps> = ({
  modalVisible,
  onCancel,
  refresh,
  roleId = '',
}) => {
  const { loading, run } = useRequest<string, null>(RoleAPI.deleteRole, {
    successMsg: '删除角色成功',
    onSuccess: refresh,
  });

  const handleSubmit = async () => {
    return await run(roleId);
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
