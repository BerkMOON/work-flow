import { Form, Input } from 'antd';

export const createAndModifyForm = () => (
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
    <Form.Item label="手机号" name="phone">
      <Input />
    </Form.Item>
  </>
);
