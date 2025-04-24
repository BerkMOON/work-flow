import { OssAPI } from '@/services/warehouse/oss/OSSController';
import { OssSence } from '@/services/warehouse/oss/typings.d';
import { UploadOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Button, message, Upload, UploadFile, UploadProps } from 'antd';
import { useEffect, useState } from 'react';

interface OSSDataType {
  dir: string;
  host: string;
  accessId: string;
  policy: string;
  signature: string;
}

interface AliyunOSSUploadProps {
  value?: UploadFile[];
  onChange?: (fileList: UploadFile[]) => void;
  scene: OssSence;
  onUploadSuccess?: (fileInfo: { path: string }) => void;
}

export const WarehouseUpload = ({
  value,
  onChange,
  onUploadSuccess,
  scene,
}: AliyunOSSUploadProps) => {
  const [OSSData, setOSSData] = useState<OSSDataType>();

  const { run: getOSSConfig } = useRequest(OssAPI.getOSSConfig, {
    manual: true,
    onSuccess: (res) => {
      const {
        data: { dir, host, ossAccessKeyId, policy, signature },
      } = res;
      setOSSData({
        dir,
        host,
        accessId: ossAccessKeyId,
        policy,
        signature,
      });
    },
  });

  const handleChange: UploadProps['onChange'] = async ({ fileList, file }) => {
    if (file.status === 'done') {
      onUploadSuccess?.({
        path: `${OSSData?.dir}${file.url}`,
      });
    }
    onChange?.([...fileList]);
  };

  const onRemove = (file: UploadFile) => {
    const files = (value || []).filter((v) => v.url !== file.url);

    if (onChange) {
      onChange(files);
    }
  };

  useEffect(() => {
    if (scene) {
      getOSSConfig(scene);

      if (value && value.length > 0) {
        onRemove(value?.[0]);
      }
    }
  }, [scene]);

  const getExtraData: UploadProps['data'] = (file) => ({
    key: `${OSSData?.dir}${file.url}`,
    OSSAccessKeyId: OSSData?.accessId,
    policy: OSSData?.policy,
    Signature: OSSData?.signature,
    success_action_status: '200', // 添加这个字段
  });

  const beforeUpload: UploadProps['beforeUpload'] = async (file) => {
    const isSheet = file.name.endsWith('.xlsx') || file.name.endsWith('.xls');
    if (!isSheet) {
      message.error('只能上传xlsx或者xls文件！');
      return Upload.LIST_IGNORE;
    }

    const suffix = file.name.slice(file.name.lastIndexOf('.'));
    const filename = Date.now() + suffix;
    // @ts-ignore
    file.url = filename;

    return file;
  };

  const uploadProps: UploadProps = {
    name: 'file',
    maxCount: 1,
    fileList: value,
    action: OSSData?.host,
    onChange: handleChange,
    onRemove,
    data: getExtraData,
    beforeUpload,
    disabled: !OSSData,
  };

  return (
    <Upload {...uploadProps}>
      <Button icon={<UploadOutlined />}>点击上传</Button>
    </Upload>
  );
};
