import CompanySelect from '@/components/BusinessComponents/CompanySelect';
import { Form, Input } from 'antd';

export const createAndModifyForm = (
  <>
    <Form.Item
      label="门店名称"
      name="store_name"
      rules={[{ required: true, message: '请输入门店名称' }]}
    >
      <Input placeholder="请输入门店名称" />
    </Form.Item>
    <Form.Item
      label="公司"
      name="company_id"
      rules={[{ required: true, message: '请选择公司' }]}
    >
      <CompanySelect />
    </Form.Item>
    <Form.Item label="通知方式" name="notify">
      <Input placeholder="请输入通知方式" />
    </Form.Item>
    <Form.Item label="描述" name="extra">
      <Input placeholder="请输入描述" />
    </Form.Item>
  </>
);
