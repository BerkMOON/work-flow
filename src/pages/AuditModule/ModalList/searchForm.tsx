import { Col, Form, Input } from 'antd';

export const searchForm = (
  <>
    <Col>
      <Form.Item name="key" label="类型标识">
        <Input placeholder="请输入类型标识" allowClear />
      </Form.Item>
    </Col>
    <Col>
      <Form.Item name="value" label="类型名称">
        <Input placeholder="请输入类型名称" allowClear />
      </Form.Item>
    </Col>
  </>
);
