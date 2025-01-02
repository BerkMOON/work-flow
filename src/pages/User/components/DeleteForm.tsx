import BaseModalForm from '@/components/BasicComponents/BaseModalForm';
import { useRequest } from '@/hooks/useRequest';
import { UserAPI } from '@/services/user/UserController';
import React from 'react';

interface DeleteFormProps {
  modalVisible: boolean;
  userId: string;
  refresh: () => void;
  onCancel: () => void;
}

const DeleteForm: React.FC<DeleteFormProps> = (props) => {
  const { modalVisible, onCancel, refresh, userId } = props;
  const { loading, run } = useRequest<string, null>(UserAPI.deleteUser, {
    successMsg: '删除用户成功',
    onSuccess: refresh,
  });

  const handleSubmit = async () => {
    return await run(userId);
  };

  return (
    <BaseModalForm
      title="删除用户"
      visible={modalVisible}
      onCancel={onCancel}
      onSubmit={handleSubmit}
      loading={loading}
    >
      <div>是否删除该用户？删除后不可恢复，请确认。</div>
    </BaseModalForm>
  );
};

export default DeleteForm;
