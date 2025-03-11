import { STATUS_OPTIONS } from '@/constants';
import {
  UPGRADE_MOUDULE_LABEL,
  UPGRADE_TYPE_LABEL,
} from '@/services/ota/typings.d';
import { Col, Form, Input, Select } from 'antd';

export const searchForm = (
  <>
    <Col>
      <Form.Item label="版本号" name="version">
        <Input placeholder="请输入版本号" />
      </Form.Item>
    </Col>
    <Col>
      <Form.Item label="设备型号" name="model">
        <Input placeholder="请输入设备型号" />
      </Form.Item>
    </Col>
    <Col>
      <Form.Item label="模块类型" name="module_type">
        <Select
          style={{ width: '140px' }}
          placeholder="请选择状态"
          allowClear
          options={UPGRADE_MOUDULE_LABEL}
        />
      </Form.Item>
    </Col>
    <Col>
      <Form.Item label="升级类型" name="upgrade_type">
        <Select
          style={{ width: '140px' }}
          placeholder="升级类型"
          allowClear
          options={UPGRADE_TYPE_LABEL}
        />
      </Form.Item>
    </Col>
    <Col>
      <Form.Item label="状态" name="status">
        <Select
          style={{ width: '140px' }}
          placeholder="请选择状态"
          allowClear
          options={STATUS_OPTIONS}
        />
      </Form.Item>
    </Col>
  </>
);
