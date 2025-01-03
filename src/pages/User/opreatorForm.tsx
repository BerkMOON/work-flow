import RoleSelect from '@/components/BusinessComponents/RoleSelect';
import { Form, Input } from 'antd';

export const createAndModifyForm = (isModify: boolean) => (
  <>
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
    {isModify ? null : (
      <Form.Item label="角色" name="role_id">
        <RoleSelect></RoleSelect>
      </Form.Item>
    )}
    <Form.Item label="手机号" name="phone">
      <Input />
    </Form.Item>
    <Form.Item label="门店名" name="department">
      <Input />
    </Form.Item>
  </>
);

export const updateRoleForm = (role_name: string) => (
  <Form.Item
    name="role_id"
    label="角色"
    rules={[{ required: true, message: '请选择角色' }]}
  >
    <RoleSelect roleName={role_name} />
  </Form.Item>
);
