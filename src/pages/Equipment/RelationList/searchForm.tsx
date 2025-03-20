import CompanySelect from '@/components/BusinessComponents/CompanySelect';
import StoreSelect from '@/components/BusinessComponents/StoreSelect';
import { COMMON_STATUS } from '@/constants';
import { EquipmentCStatus } from '@/services/equipment/typings.d';
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
      <Form.Item name="sn" label="设备SN号">
        <Input placeholder="请输入设备SN号" allowClear />
      </Form.Item>
    </Col>
    <Col span={6}>
      <Form.Item name="vin" label="车架号">
        <Input placeholder="请输入车架号" allowClear />
      </Form.Item>
    </Col>
    <Col span={6}>
      <Form.Item name="b_status" label="B端设备绑定状态">
        <Select
          style={{ width: '190px' }}
          placeholder="请选择状态"
          allowClear
          options={[
            { label: '已绑定', value: COMMON_STATUS.ACTIVE },
            { label: '未绑定', value: COMMON_STATUS.DELETED },
          ]}
        />
      </Form.Item>
    </Col>
    <Col span={6}>
      <Form.Item name="c_status" label="C端设备绑定状态">
        <Select
          style={{ width: '190px' }}
          placeholder="请选择状态"
          allowClear
          options={[
            { label: '未绑定', value: EquipmentCStatus.init },
            { label: '已绑定', value: EquipmentCStatus.binded },
            { label: '已解绑', value: EquipmentCStatus.deleted },
          ]}
        />
      </Form.Item>
    </Col>
  </>
);
