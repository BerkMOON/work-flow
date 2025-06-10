import { Col, Form, Input } from 'antd';

export const searchForm = (
  <>
    <Col>
      <Form.Item name="name" label="部门名称">
        <Input placeholder="请输入部门名称" allowClear />
      </Form.Item>
    </Col>
  </>
);
