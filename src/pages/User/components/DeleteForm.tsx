import BaseModalForm from '@/components/BaseModalForm';
import { UserAPI } from '@/services/user/UserController';
import { message } from 'antd';
import React, { useState } from 'react';

interface DeleteFormProps {
  modalVisible: boolean;
  userId: string;
  refresh: () => void;
  onCancel: () => void;
}

const DeleteForm: React.FC<DeleteFormProps> = (props) => {
  const { modalVisible, onCancel, refresh, userId } = props;
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await UserAPI.deleteUser({
        user_id: userId,
      });
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
