import DepartmentSelect from '@/components/BusinessComponents/DepartmentSelect';
import RoleSelect from '@/components/BusinessComponents/RoleSelect';
import { Form, Input } from 'antd';

export const createAndModifyForm = () => (
  <>
    <Form.Item
      required
      label="员工ID"
      name="name"
      rules={[{ required: true, message: '请输入员工ID' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      required
      label="员工姓名"
      name="displayName"
      rules={[{ required: true, message: '请输入员工姓名' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item required label="密码" name="password">
      <Input.Password />
    </Form.Item>
    <Form.Item label="职务" name="title">
      <Input />
    </Form.Item>
    <Form.Item label="部门" name="groups">
      <DepartmentSelect></DepartmentSelect>
    </Form.Item>
    <Form.Item label="手机号" name="phone">
      <Input />
    </Form.Item>
    <Form.Item label="邮箱" name="email">
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
