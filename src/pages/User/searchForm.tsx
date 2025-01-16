import { COMMON_STATUS } from '@/constants';
import { Col, Form, Input, Select } from 'antd';

export const searchForm = (
  <>
    <Col span={6}>
      <Form.Item name="name" label="用户姓名">
        <Input placeholder="请输入用户姓名" allowClear />
      </Form.Item>
    </Col>
    <Col span={6}>
      <Form.Item name="phone" label="手机号">
        <Input placeholder="请输入手机号" allowClear />
      </Form.Item>
    </Col>
    <Col span={6}>
      <Form.Item name="email" label="邮箱">
        <Input placeholder="请输入邮箱" allowClear />
      </Form.Item>
    </Col>
    <Col span={6}>
      <Form.Item name="company" label="公司">
        <Input placeholder="请输入公司id" allowClear />
      </Form.Item>
    </Col>
    <Col span={6}>
      <Form.Item name="role" label="角色id">
        <Input placeholder="请输入角色id" allowClear />
      </Form.Item>
    </Col>
    <Col span={6}>
      <Form.Item name="status" label="用户状态">
        <Select
          placeholder="请选择用户状态"
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
