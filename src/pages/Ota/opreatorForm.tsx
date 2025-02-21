import { AliyunOSSUpload } from '@/components/BusinessComponents/OSSUpload';
import { UPGRADE_TYPE, UPGRADE_TYPE_LABEL } from '@/services/ota/typings.d';
import { Form, FormInstance, Input, Radio, Slider } from 'antd';
import { useState } from 'react';

interface OtaFormProps {
  form: FormInstance;
}

export const OtaForm: React.FC<OtaFormProps> = ({ form }) => {
  const [upgradeType, setUpgradeType] = useState<UPGRADE_TYPE>();

  const handleFileUpload = (fileInfo: {
    path: string;
    name: string;
    md5: string;
  }) => {
    // 设置多个表单字段的值
    form.setFieldsValue({
      path: fileInfo.path,
      filename: fileInfo.name,
      md5: fileInfo.md5,
    });
  };

  return (
    <>
      <Form.Item
        label="固件文件"
        name="fileList"
        rules={[{ required: true, message: '请上传固件文件' }]}
      >
        <AliyunOSSUpload onUploadSuccess={handleFileUpload}></AliyunOSSUpload>
      </Form.Item>

      {/* 隐藏的表单项，用于存储文件名 */}
      <Form.Item name="path" hidden>
        <Input />
      </Form.Item>

      {/* 隐藏的表单项，用于存储文件名 */}
      <Form.Item name="filename" hidden>
        <Input />
      </Form.Item>

      {/* 隐藏的表单项，用于存储 MD5 */}
      <Form.Item name="md5" hidden>
        <Input />
      </Form.Item>

      <Form.Item
        label="设备型号"
        name="model"
        rules={[{ required: true, message: '请输入设备型号' }]}
      >
        <Input placeholder="请输入设备型号" />
      </Form.Item>

      <Form.Item
        label="发布方式"
        name="upgrade_type"
        rules={[{ required: true, message: '请选择发布方式' }]}
      >
        <Radio.Group onChange={(e) => setUpgradeType(e.target.value)}>
          {UPGRADE_TYPE_LABEL.map((item) => (
            <Radio key={item.value} value={item.value}>
              {item.label}
            </Radio>
          ))}
        </Radio.Group>
      </Form.Item>

      {upgradeType === UPGRADE_TYPE.TARGETED && (
        <>
          <Form.Item
            label="定向设备"
            name="gray_devices"
            rules={[{ required: false }]}
            extra="指定需要升级的设备"
          >
            <Input.TextArea
              placeholder="请输入设备ID，多个设备用英文逗号分隔，例如：device1,device2"
              style={{ width: '100%' }}
              rows={4}
              autoSize={{ minRows: 2, maxRows: 6 }}
            />
          </Form.Item>
        </>
      )}

      <Form.Item label="版本描述" name="ext">
        <Input.TextArea rows={4} placeholder="请输入版本描述" />
      </Form.Item>
    </>
  );
};

export const OtaUpdataForm = (
  <>
    <Form.Item label="版本描述" name="ext">
      <Input.TextArea rows={4} placeholder="请输入版本描述" />
    </Form.Item>
  </>
);

export const OtaPublishForm = (
  <>
    <Form.Item
      label="灰度比例"
      name="release_range"
      rules={[{ required: true, message: '请选择灰度比例' }]}
    >
      <Slider
        min={0}
        max={100}
        marks={{
          0: '0%',
          25: '25%',
          50: '50%',
          75: '75%',
          100: '100%',
        }}
        tooltip={{
          formatter: (value) => `${value}%`,
        }}
      />
    </Form.Item>
  </>
);
