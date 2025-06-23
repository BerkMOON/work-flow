import { Col, Form, Input } from 'antd';

export const searchForm = (
  <>
    <Col>
      <Form.Item name="displayName" label="流程编号">
        <Input placeholder="请输入流程编号" allowClear />
      </Form.Item>
    </Col>
    <Col>
      <Form.Item name="name" label="流程描述">
        <Input placeholder="请输入流程描述" allowClear />
      </Form.Item>
    </Col>
  </>
);
