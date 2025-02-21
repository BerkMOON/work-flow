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
  idMapKey = 'id',
  idMapValue = 'id',
  extraParams,
  ownForm,
  filterFields = [], // 添加这个参数，用于指定需要过滤的字段
}) => {
  const { loading, run } = useRequest(api, {
    successMsg: text.successMsg,
    onSuccess: refresh,
  });

  const handleSubmit = async (values: any) => {
    // 过滤指定字段
    const filteredValues = Object.fromEntries(
      Object.entries(values).filter(([key]) => !filterFields.includes(key)),
    );

    return await run(
      record
        ? {
            [idMapKey]: record[idMapValue],
            ...filteredValues,
          }
        : {
            ...filteredValues,
            ...extraParams,
          }, // 有些额外的参数
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
      ownForm={ownForm}
    >
      {children}
    </BaseModalForm>
  );
};

export default CreateOrModifyForm;
