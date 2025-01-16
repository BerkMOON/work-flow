import CompanySelect from '@/components/BusinessComponents/CompanySelect';
import StoreSelect from '@/components/BusinessComponents/StoreSelect';
import { useRequest } from '@/hooks/useRequest';
import { StoreAPI } from '@/services/store/StoreController';
import { Navigate, useAccess } from '@umijs/max';
import { Button, Card, Form, Result, Typography } from 'antd';
import { useState } from 'react';
import styles from './index.scss';

const GenCode: React.FC = () => {
  const { isLogin, storeGenCode } = useAccess();
  const storeGenCodeAccess = storeGenCode();
  const [form] = Form.useForm();
  const [code, setCode] = useState<string>();

  const companyId = Form.useWatch('company_id', form);

  const { loading, run } = useRequest(StoreAPI.genStoreCode, {
    onSuccess: (data) => {
      setCode(data.code);
    },
  });

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      run(values);
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  if (!isLogin) {
    return <Navigate to="/login" />;
  }

  if (!storeGenCodeAccess) {
    return <Result status="403" title="403" subTitle="无权限访问" />;
  }

  return (
    <Card title="生成门店码" className={styles.container}>
      <Form form={form} layout="vertical" style={{ maxWidth: 500 }}>
        <Form.Item
          name="company_id"
          label="选择公司"
          rules={[{ required: true, message: '请选择公司' }]}
        >
          <CompanySelect
            placeholder="请选择公司"
            onChange={() => {
              // 当公司变化时，清空门店选择
              form.setFieldValue('store_id', undefined);
            }}
          />
        </Form.Item>

        <Form.Item
          name="store_id"
          label="选择门店"
          rules={[{ required: true, message: '请选择门店' }]}
          dependencies={['company_id']}
        >
          <StoreSelect
            placeholder="请选择门店"
            companyId={companyId}
            disabled={!companyId}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" onClick={handleSubmit} loading={loading}>
            生成门店码
          </Button>
        </Form.Item>

        {code && (
          <div className={styles.codeResult}>
            <h3>门店码：</h3>
            <Typography.Paragraph copyable>{code}</Typography.Paragraph>
          </div>
        )}
      </Form>
    </Card>
  );
};

export default GenCode;
