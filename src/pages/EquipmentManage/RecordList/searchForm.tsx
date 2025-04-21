import { COMMON_STATUS } from '@/constants';
import { Col, Form, Input, Select } from 'antd';

export const searchForm = (
  <>
    <Col>
      <Form.Item name="device_id" label="设备号">
        <Input placeholder="请输入设备ID" allowClear />
      </Form.Item>
    </Col>
    <Col>
      <Form.Item name="sn" label="设备SN号">
        <Input placeholder="请输入设备SN" allowClear />
      </Form.Item>
    </Col>
    <Col>
      <Form.Item name="model" label="版本号">
        <Input placeholder="请输入版本号" allowClear />
      </Form.Item>
    </Col>
    <Col>
      <Form.Item name="status" label="设备状态">
        <Select
          style={{ width: '194px' }}
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
