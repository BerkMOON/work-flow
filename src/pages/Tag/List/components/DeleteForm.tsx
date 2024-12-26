import BaseModalForm from '@/components/BaseModalForm';
import { useRequest } from '@/hooks/useRequest';
import { TagAPI } from '@/services/tag/TagController';
import { BaseModalFormProps } from '@/types/common';
interface DeleteFormProps extends BaseModalFormProps {
  tagId: number;
}

const DeleteForm: React.FC<DeleteFormProps> = ({
  modalVisible,
  onCancel,
  refresh,
  tagId,
}) => {
  const { loading, run } = useRequest<number, null>(TagAPI.deleteTagItem, {
    successMsg: '删除标签成功',
    onSuccess: refresh,
  });

  const handleSubmit = async () => {
    return await run(tagId);
  };

  return (
    <BaseModalForm
      title="删除标签"
      visible={modalVisible}
      onCancel={onCancel}
      onSubmit={handleSubmit}
      loading={loading}
    >
      <div>是否删除该标签？删除后不可恢复，请确认。</div>
    </BaseModalForm>
  );
};

export default DeleteForm;
