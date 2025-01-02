import BaseModalForm from '@/components/BasicComponents/BaseModalForm';
import RoleSelect from '@/components/BusinessComponents/RoleSelect/RoleSelect';
import { useRequest } from '@/hooks/useRequest';
import { UserInfo } from '@/services/user/typings';
import { UserAPI } from '@/services/user/UserController';
import { Form, Input } from 'antd';

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
  const { loading, run } = useRequest<UserInfo, null>(UserAPI.register, {
    successMsg: '创建用户成功',
    onSuccess: refresh,
  });

  const handleSubmit = async (values: UserInfo) => {
    return await run(values);
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
