import { Col, Form, Input } from 'antd';

export const searchForm = (
  <>
    <Col>
      <Form.Item name="item_name" label="标签名称">
        <Input placeholder="请输入标签名称" allowClear />
      </Form.Item>
    </Col>
  </>
);
