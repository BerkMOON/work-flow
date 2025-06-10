import DepartmentSelect from '@/components/BusinessComponents/DepartmentSelect';
import RoleSelect from '@/components/BusinessComponents/RoleSelect';
import { Form, Input } from 'antd';

export const createAndModifyForm = () => (
  <>
    <Form.Item
      required
      label="部门名称"
      name="name"
      tooltip="请保证部门名称唯一"
      rules={[{ required: true, message: '请输入部门名称，并且保证唯一' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item required label="上级部门" name="parentId">
      <DepartmentSelect></DepartmentSelect>
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
