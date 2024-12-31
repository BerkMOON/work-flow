import BaseModalForm from '@/components/BaseModalForm';
import { useRequest } from '@/hooks/useRequest';
import type { UserInfo } from '@/services/user/typings';
import { UserAPI } from '@/services/user/UserController';
import { Form, Input } from 'antd';

interface ModifyFormProps {
  modalVisible: boolean;
  onCancel: () => void;
  refresh: () => void;
  record?: UserInfo;
}

const ModifyForm: React.FC<ModifyFormProps> = ({
  modalVisible,
  onCancel,
  refresh,
  record,
}) => {
  const { loading, run } = useRequest<UserInfo, null>(UserAPI.modifyUserInfo, {
    successMsg: '修改用户成功',
    onSuccess: refresh,
  });

  const handleSubmit = async (values: any) => {
    return await run({
      ...values,
      user_id: record?.user_id,
    });
  };

  return (
    <BaseModalForm
      title="修改用户信息"
      visible={modalVisible}
      onCancel={onCancel}
      onSubmit={handleSubmit}
      loading={loading}
      initialValues={record}
    >
      <Form.Item
        name="username"
        label="用户名"
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input placeholder="请输入用户名" />
      </Form.Item>
      <Form.Item name="password" label="密码">
        <Input.Password placeholder="请输入密码" />
      </Form.Item>
      <Form.Item name="phone" label="手机号">
        <Input placeholder="请输入手机号" />
      </Form.Item>
      <Form.Item name="department" label="门店名">
        <Input placeholder="请输入门店名" />
      </Form.Item>
    </BaseModalForm>
  );
};

export default ModifyForm;
