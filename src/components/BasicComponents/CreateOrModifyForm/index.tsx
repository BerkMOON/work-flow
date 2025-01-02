import BaseModalForm from '@/components/BasicComponents/BaseModalForm';
import { useRequest } from '@/hooks/useRequest';
import { BaseCreateModalFormProps } from '@/types/common';

const CreateOrModifyForm: React.FC<BaseCreateModalFormProps> = ({
  modalVisible,
  onCancel,
  refresh,
  children,
  text,
  api,
  record,
}) => {
  const { loading, run } = useRequest(api, {
    successMsg: `创建${text}成功`,
    onSuccess: refresh,
  });

  const handleSubmit = async (values: any) => {
    return await run(record ? { id: record.id, ...values } : values);
  };

  return (
    <BaseModalForm
      title={`新建${text}`}
      visible={modalVisible}
      onCancel={onCancel}
      onSubmit={handleSubmit}
      loading={loading}
      initialValues={record}
    >
      {children}
    </BaseModalForm>
  );
};

export default CreateOrModifyForm;
