import DepartmentSelect from '@/components/BusinessComponents/DepartmentSelect';
import { Col, Form, Input } from 'antd';

export const searchForm = (
  <>
    <Col>
      <Form.Item name="displayName" label="用户姓名">
        <Input placeholder="请输入用户姓名" allowClear />
      </Form.Item>
    </Col>
    <Col>
      <Form.Item name="name" label="账号名">
        <Input placeholder="请输入账号名" allowClear />
      </Form.Item>
    </Col>
    <Col span={6}>
      <Form.Item name="groupName" label="部门">
        <DepartmentSelect />
      </Form.Item>
    </Col>
    <Col>
      <Form.Item name="phone" label="手机号">
        <Input placeholder="请输入手机号" allowClear />
      </Form.Item>
    </Col>
    <Col>
      <Form.Item name="email" label="邮箱">
        <Input placeholder="请输入邮箱" allowClear />
      </Form.Item>
    </Col>
  </>
);
