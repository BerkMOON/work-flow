import { Form, Input } from 'antd';

export const createAndModifyForm = (
  <>
    <Form.Item
      name="group_name"
      label="标签组名称"
      rules={[{ required: true, message: '请输入标签组名称' }]}
    >
      <Input placeholder="请输入标签组名称" />
    </Form.Item>
    <Form.Item name="desc" label="标签组描述">
      <Input placeholder="请输入标签组描述" />
    </Form.Item>
  </>
);
