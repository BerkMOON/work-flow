import BaseModalForm from '@/components/BasicComponents/BaseModalForm';
// import { useRequest } from '@/hooks/useRequest';
import { ResponseInfoType } from '@/types/common';
import { ReactNode } from 'react';

export interface DeleteFormProps {
  modalVisible: boolean;
  onCancel: () => void;
  refresh: () => void;
  name?: string | ReactNode;
  recordName?: string | ReactNode;
  params?: any;
  api: (params?: any) => Promise<ResponseInfoType<string, null>>;
}

const DeleteForm: React.FC<DeleteFormProps> = ({
  modalVisible,
  onCancel,
  refresh,
  params = {},
  name = '',
  recordName = '',
  api,
}) => {
  //   const { loading, run } = useRequest<null, any>(api, {
  //     successMsg: `删除${name}成功`,
  //     onSuccess: refresh,
  //   });

  const handleSubmit = async () => {
    await api(params);
    refresh();
  };

  return (
    <BaseModalForm
      title={`删除${name}`}
      visible={modalVisible}
      onCancel={onCancel}
      onSubmit={handleSubmit}
      //   loading={loading}
    >
      <div>
        是否删除该{name}:{' '}
        <b style={{ color: 'rgb(255, 77, 79)' }}>{recordName}</b>
        ？删除后不可恢复，请确认。
      </div>
    </BaseModalForm>
  );
};

export default DeleteForm;
