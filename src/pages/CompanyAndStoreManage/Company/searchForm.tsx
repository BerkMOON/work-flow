import { Col, Form, Input } from 'antd';

export const searchForm = (
  <>
    <Col span={24}>
      <Form.Item name="company_name" label="公司名称">
        <Input placeholder="请输入公司名称" allowClear />
      </Form.Item>
    </Col>
  </>
);
