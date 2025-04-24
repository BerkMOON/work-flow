import CompanySelect from '@/components/BusinessComponents/CompanySelect';
import StoreSelect from '@/components/BusinessComponents/StoreSelect';
import { TASK_STATUS_OPTIONS } from '@/constants';
import { Col, Form, Select } from 'antd';

export const searchForm = (
  <>
    <Col>
      <Form.Item name="company_id" label="公司">
        <CompanySelect style={{ width: '180px' }} placeholder="请选择公司" />
      </Form.Item>
    </Col>
    <Col>
      <Form.Item name="store_id" label="门店">
        <StoreSelect style={{ width: '180px' }} placeholder="请选择门店" />
      </Form.Item>
    </Col>
    <Col>
      <Form.Item name="status" label="工单状态">
        <Select
          placeholder="请选择工单状态"
          allowClear
          style={{ width: 180 }}
          options={TASK_STATUS_OPTIONS}
        />
      </Form.Item>
    </Col>
  </>
);
