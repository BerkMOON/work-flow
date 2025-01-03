import { Form, Input } from 'antd';

export const createAndModifyForm = (
  <>
    <Form.Item
      name="item_name"
      label="标签名称"
      rules={[{ required: true, message: '请输入标签名称' }]}
    >
      <Input placeholder="请输入标签名称" />
    </Form.Item>
    <Form.Item name="desc" label="标签描述">
      <Input placeholder="请输入标签描述" />
    </Form.Item>
    <Form.Item name="ext" label="标签扩展内容">
      <Input placeholder="请输入标签扩展内容" />
    </Form.Item>
  </>
);
