import BaseModalForm from '@/components/BasicComponents/BaseModalForm';
import CompanySelect from '@/components/BusinessComponents/CompanySelect';
import StoreSelect from '@/components/BusinessComponents/StoreSelect';
import { useRequest } from '@/hooks/useRequest';
import { BaseCreateModalFormProps } from '@/types/common';
import { Form, Input } from 'antd';

const CreateOrModifyForm: React.FC<BaseCreateModalFormProps> = ({
  modalVisible,
  onCancel,
  refresh,
  text,
  api,
  record,
  idMapKey = 'id',
  idMapValue = 'id',
}) => {
  let [form] = Form.useForm();
  const companyId = Form.useWatch('company_id', form);

  const { loading, run } = useRequest(api, {
    successMsg: text.successMsg,
    onSuccess: refresh,
  });

  const handleSubmit = async (values: any) => {
    return await run(
      record
        ? {
            [idMapKey]: record[idMapValue],
            ...values,
          }
        : {
            ...values,
          },
    );
  };

  return (
    <BaseModalForm
      title={text.title}
      visible={modalVisible}
      onCancel={onCancel}
      onSubmit={handleSubmit}
      loading={loading}
      initialValues={record}
      ownForm={form}
    >
      <Form.Item
        name="device_id"
        label="设备号"
        rules={[{ required: true, message: '请输入设备号' }]}
      >
        <Input placeholder="请输入设备号" allowClear />
      </Form.Item>
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
      <Form.Item name="open_id" label="用户open_id">
        <Input placeholder="请输入用户open_id" allowClear />
      </Form.Item>
      <Form.Item name="phone" label="用户手机号">
        <Input placeholder="请输入用户手机号" allowClear />
      </Form.Item>
    </BaseModalForm>
  );
};

export default CreateOrModifyForm;
