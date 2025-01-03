import { Col, Form, Input } from 'antd';

export const searchForm = (
  <>
    <Col span={24}>
      <Form.Item name="group_name" label="标签组名称">
        <Input placeholder="请输入标签组名称" allowClear />
      </Form.Item>
    </Col>
  </>
);
