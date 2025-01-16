import { COMMON_STATUS } from '@/constants';
import { Form, Input, Select } from 'antd';

export const searchForm = (
  <>
    <Form.Item name="equipment_id" label="设备号">
      <Input placeholder="请输入设备ID" allowClear />
    </Form.Item>
    <Form.Item name="version" label="版本号">
      <Input placeholder="请输入版本号" allowClear />
    </Form.Item>
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
  </>
);
