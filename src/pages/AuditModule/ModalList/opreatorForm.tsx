import DepartmentSelect from '@/components/BusinessComponents/DepartmentSelect';
import { Form, Input, Switch } from 'antd';

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
    <Form.Item label="是否是管理员" name="isAdmin">
      <Switch />
    </Form.Item>
    <Form.Item required label="职务" name="title">
      <Input />
    </Form.Item>
    <Form.Item required label="部门" name="groups">
      <DepartmentSelect></DepartmentSelect>
    </Form.Item>
    <Form.Item required label="手机号" name="phone">
      <Input />
    </Form.Item>
    <Form.Item required label="邮箱" name="email">
      <Input />
    </Form.Item>
  </>
);
