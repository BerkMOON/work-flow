import { deleteUser } from '@/services/user/UserController';
import { Modal } from 'antd';
import React from 'react';

interface DeleteFormProps {
  modalVisible: boolean;
  userId: string;
  refresh: () => void;
  onCancel: () => void;
}

const DeleteForm: React.FC<DeleteFormProps> = (props) => {
  const { modalVisible, onCancel, refresh, userId } = props;

  const onDelete = async () => {
    await deleteUser({
      user_id: userId,
    });
    refresh();
    onCancel();
  };

  return (
    <Modal
      destroyOnClose
      title="删除用户"
      width={420}
      open={modalVisible}
      onCancel={() => onCancel()}
      onOk={onDelete}
    >
      <div>是否删除用户，删除后不可回复，请确认</div>
    </Modal>
  );
};

export default DeleteForm;
