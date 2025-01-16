import { COMMON_STATUS } from '@/constants';
import { Col, Form, Input, Select } from 'antd';

export const searchForm = (
  <>
    <Col span={12}>
      <Form.Item name="role_name" label="角色姓名">
        <Input placeholder="请输入角色姓名" allowClear />
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item name="status" label="角色状态">
        <Select
          placeholder="请选择角色状态"
          allowClear
          style={{ width: 200 }}
          options={[
            { label: '生效', value: COMMON_STATUS.ACTIVE },
            { label: '已失效', value: COMMON_STATUS.DELETED },
          ]}
        />
      </Form.Item>
    </Col>
  </>
);
