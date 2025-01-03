import AuthoritySelect from '@/components/BusinessComponents/AuthoritySelect';
import { Form, Input } from 'antd';

export const createAndModifyForm = (isCreate: boolean) => (
  <>
    <Form.Item
      label="角色名称"
      name="role_name"
      rules={[{ required: true, message: '请输入角色名称' }]}
    >
      <Input placeholder="请输入角色名称" />
    </Form.Item>
    {isCreate ? (
      <Form.Item
        label="角色权限"
        name="code_list"
        rules={[{ required: true, message: '请选择角色权限' }]}
      >
        <AuthoritySelect />
      </Form.Item>
    ) : null}
  </>
);

export const updateRoleForm = (roleId: number) => (
  <Form.Item
    label="角色权限"
    name="code_list"
    rules={[{ required: true, message: '请选择角色权限' }]}
  >
    <AuthoritySelect roleId={roleId} />
  </Form.Item>
);
