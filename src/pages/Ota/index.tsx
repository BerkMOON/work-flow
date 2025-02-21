import BaseListPage, {
  BaseListPageRef,
} from '@/components/BasicComponents/BaseListPage';
import CreateOrModifyForm from '@/components/BasicComponents/CreateOrModifyForm';
import DeleteForm from '@/components/BasicComponents/DeleteForm';
import { COMMON_STATUS } from '@/constants';
import { useModalControl } from '@/hooks/useModalControl';
import { OtaAPI } from '@/services/ota/OTAController';
import { OtaItem, OtaParams, UPGRADE_TYPE } from '@/services/ota/typings.d';
import { filterValues } from '@/utils/format';
import { Navigate, useAccess } from '@umijs/max';
import { Form, Result } from 'antd';
import { ColumnType } from 'antd/es/table';
import { useRef, useState } from 'react';
import { getColumns } from './columns';
import { OtaForm, OtaPublishForm, OtaUpdataForm } from './opreatorForm';
import { searchForm } from './searchForm';

const VersionList: React.FC = () => {
  const [form] = Form.useForm();
  const { isLogin, otaVersion } = useAccess();
  const baseListRef = useRef<BaseListPageRef>(null);
  const [selectedOta, setSelectedOta] = useState<OtaItem | null>(null);
  const createOrModifyModal = useModalControl();
  const publishModifyModal = useModalControl();
  const deleteModal = useModalControl();

  const handleModalOpen = (
    modalControl: ReturnType<typeof useModalControl>,
    ota?: OtaItem,
  ) => {
    if (ota) {
      setSelectedOta(ota);
    } else {
      setSelectedOta(null);
    }
    modalControl.open();
  };

  const columns = getColumns({
    handleModalOpen: handleModalOpen,
    deleteModal: deleteModal,
    createOrModifyModal: createOrModifyModal,
    customModal: publishModifyModal,
  });

  const fetchVersionData = async (params: OtaParams) => {
    const { data } = await OtaAPI.getOtaUpdataList(params);
    return {
      list: data.record_list,
      total: data.meta.total_count,
    };
  };

  if (!isLogin) {
    return <Navigate to="/login" />;
  }

  if (!otaVersion) {
    return <Result status="403" title="403" subTitle="无权限访问" />;
  }

  const handleFormValues = (record: Record<string, any>) => {
    const values = filterValues(record, ['fileList']);
    return {
      ...values,
      device_ids: (values?.device_ids as string)
        ?.replace(/\n/g, '')
        ?.split(','),
    };
  };

  return (
    <>
      <BaseListPage
        ref={baseListRef}
        title="版本列表"
        columns={columns as ColumnType<any>[]}
        searchFormItems={searchForm}
        fetchData={fetchVersionData}
        createButton={{
          text: '新建OTA升级',
          onClick: () => handleModalOpen(createOrModifyModal),
        }}
      />
      <CreateOrModifyForm
        modalVisible={createOrModifyModal.visible}
        onCancel={() => {
          createOrModifyModal.close();
          setSelectedOta(null);
        }}
        refresh={() => baseListRef.current?.getData()}
        text={{
          title: '用户',
          successMsg: `${selectedOta ? '修改' : '创建'}Ota升级成功`,
        }}
        api={selectedOta ? OtaAPI.updateOtaStatus : OtaAPI.createOtaUpdate}
        record={{
          ...selectedOta,
          device_ids: selectedOta?.rule.replace(/[[\]"]/g, ''),
        }}
        idMapKey="record_id"
        ownForm={selectedOta ? undefined : form}
        operatorFields={handleFormValues}
      >
        {selectedOta ? (
          <OtaUpdataForm
            isTargeted={selectedOta.upgrade_type.code === UPGRADE_TYPE.TARGETED}
          ></OtaUpdataForm>
        ) : (
          <OtaForm form={form}></OtaForm>
        )}
      </CreateOrModifyForm>
      <CreateOrModifyForm
        modalVisible={publishModifyModal.visible}
        onCancel={() => {
          publishModifyModal.close();
          setSelectedOta(null);
        }}
        refresh={() => baseListRef.current?.getData()}
        text={{
          title: '用户',
          successMsg: `${selectedOta ? '修改' : '创建'}Ota升级成功`,
        }}
        api={OtaAPI.otaRelease}
        record={selectedOta}
        idMapKey="record_id"
      >
        {OtaPublishForm}
      </CreateOrModifyForm>
      <DeleteForm
        modalVisible={deleteModal.visible}
        onCancel={deleteModal.close}
        refresh={() => baseListRef.current?.getData()}
        params={{
          record_id: selectedOta?.id || '',
          status: COMMON_STATUS.DELETED,
        }}
        name="OTA升级项"
        api={OtaAPI.deleteVersion}
      />
    </>
  );
};

export default VersionList;
