import { Form, Input } from 'antd';

export const createAndModifyForm = (
  <>
    <Form.Item
      name="equipment_id"
      label="设备号"
      rules={[{ required: true, message: '请输入设备号' }]}
    >
      <Input placeholder="请输入设备号" allowClear />
    </Form.Item>
    <Form.Item name="version" label="版本号">
      <Input placeholder="请输入版本号" allowClear />
    </Form.Item>
    <Form.Item name="username" label="用户名称">
      <Input placeholder="请输入用户名称" allowClear />
    </Form.Item>
    <Form.Item name="secret" label="密钥">
      <Input placeholder="请输入密钥" allowClear />
    </Form.Item>
    <Form.Item name="ext" label="描述">
      <Input placeholder="请输入描述" allowClear />
    </Form.Item>
  </>
);
