import CompanySelect from '@/components/BusinessComponents/CompanySelect';
import { Col, Form, Input } from 'antd';

export const searchForm = (
  <>
    <Col>
      <Form.Item name="store_name" label="门店名称">
        <Input placeholder="请输入门店名称" allowClear />
      </Form.Item>
    </Col>
    <Col>
      <Form.Item name="company_id" label="公司">
        <CompanySelect style={{ width: '220px' }} />
      </Form.Item>
    </Col>
  </>
);
