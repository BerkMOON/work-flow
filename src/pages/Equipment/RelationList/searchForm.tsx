import CompanySelect from '@/components/BusinessComponents/CompanySelect';
import StoreSelect from '@/components/BusinessComponents/StoreSelect';
import { COMMON_STATUS } from '@/constants';
import { Col, Form, Input, Select } from 'antd';

export const searchForm = (
  <>
    <Col span={6}>
      <Form.Item name="device_id" label="设备号">
        <Input placeholder="请输入设备ID" allowClear />
      </Form.Item>
    </Col>
    <Col span={6}>
      <Form.Item name="company_id" label="选择公司">
        <CompanySelect placeholder="请选择公司" />
      </Form.Item>
    </Col>
    <Col span={6}>
      <Form.Item name="store_id" label="选择门店">
        <StoreSelect placeholder="请选择门店" />
      </Form.Item>
    </Col>
    <Col span={6}>
      <Form.Item name="phone" label="用户手机号">
        <Input placeholder="请输入用户手机号" allowClear />
      </Form.Item>
    </Col>
    <Col span={6}>
      <Form.Item name="open_id" label="用户openid">
        <Input placeholder="请输入用户openid" allowClear />
      </Form.Item>
    </Col>
    <Col span={6}>
      <Form.Item name="status" label="设备状态">
        <Select
          style={{ width: '140px' }}
          placeholder="请选择状态"
          allowClear
          options={[
            { label: '生效', value: COMMON_STATUS.ACTIVE },
            { label: '失效', value: COMMON_STATUS.DELETED },
          ]}
        />
      </Form.Item>
    </Col>
  </>
);
