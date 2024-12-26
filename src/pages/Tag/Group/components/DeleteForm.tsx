import BaseModalForm from '@/components/BaseModalForm';
import { useRequest } from '@/hooks/useRequest';
import { TagAPI } from '@/services/tag/TagController';
import { BaseModalFormProps } from '@/types/common';
interface DeleteFormProps extends BaseModalFormProps {
  tagId: string;
}

const DeleteForm: React.FC<DeleteFormProps> = ({
  modalVisible,
  onCancel,
  refresh,
  tagId,
}) => {
  const { loading, run } = useRequest<string, null>(TagAPI.deleteTagGroup, {
    successMsg: '删除标签组成功',
    onSuccess: refresh,
  });

  const handleSubmit = async () => {
    return await run(tagId);
  };

  return (
    <BaseModalForm
      title="删除标签组"
      visible={modalVisible}
      onCancel={onCancel}
      onSubmit={handleSubmit}
      loading={loading}
    >
      <div>是否删除该标签组？删除后不可恢复，请确认。</div>
    </BaseModalForm>
  );
};

export default DeleteForm;
