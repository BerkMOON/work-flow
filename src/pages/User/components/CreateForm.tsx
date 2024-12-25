import BaseModalForm from '@/components/BaseModalForm';
import RoleSelect from '@/components/RoleSelect/RoleSelect';
import { UserInfo } from '@/services/user/typings';
import { UserAPI } from '@/services/user/UserController';
import { Form, Input, message } from 'antd';
import { useState } from 'react';

interface CreateFormProps {
  modalVisible: boolean;
  onCancel: () => void;
  refresh: () => void;
}

const CreateForm: React.FC<CreateFormProps> = ({
  modalVisible,
  onCancel,
  refresh,
}) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: UserInfo) => {
    try {
      setLoading(true);
      await UserAPI.register(values);
      message.success('创建用户成功');
      refresh();
      onCancel();
    } catch (error) {
      message.error('创建用户失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseModalForm
      title="注册用户"
      visible={modalVisible}
      onCancel={onCancel}
      onSubmit={handleSubmit}
      loading={loading}
    >
      <Form.Item
        required
        label="用户名"
        name="username"
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item required label="密码" name="password">
        <Input.Password />
      </Form.Item>
      <Form.Item label="角色" name="role_id">
        <RoleSelect></RoleSelect>
      </Form.Item>
      <Form.Item label="手机号" name="phone">
        <Input />
      </Form.Item>
      <Form.Item label="门店名" name="department">
        <Input />
      </Form.Item>
    </BaseModalForm>
  );
};

export default CreateForm;
