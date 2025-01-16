import BaseListPage, {
  BaseListPageRef,
} from '@/components/BasicComponents/BaseListPage';
import ChangeStatusForm from '@/components/BasicComponents/ChangeStatusForm';
import CreateOrModifyForm from '@/components/BasicComponents/CreateOrModifyForm';
import { COMMON_STATUS, COMMON_STATUS_CODE } from '@/constants';
import { useModalControl } from '@/hooks/useModalControl';
import EquipmentAPI from '@/services/equipment/EquipmentCotroller';
import type {
  EquipmentRecordItem,
  EquipmentRecordParams,
} from '@/services/equipment/typings';
import { Navigate, useAccess } from '@umijs/max';
import { Result } from 'antd';
import React, { useRef, useState } from 'react';
import { getColumns } from './colums';
import { createAndModifyForm } from './opreatorForm';
import { searchForm } from './searchForm';

const DEFAULT_SEARCH_PARAMS = {
  status: COMMON_STATUS.ACTIVE,
};

const EquipmentList: React.FC = () => {
  const { isLogin, equipmentRecordList } = useAccess();
  const equipmentRecordListAccess = equipmentRecordList();
  const baseListRef = useRef<BaseListPageRef>(null);
  const createOrModifyModal = useModalControl();
  const changeStatusModal = useModalControl();
  const [selectedEquipmentRecord, setSelectedEquipmentRecord] =
    useState<EquipmentRecordItem | null>(null);

  const handleModalOpen = (
    modalControl: ReturnType<typeof useModalControl>,
    EquipmentRecord?: EquipmentRecordItem,
  ) => {
    if (EquipmentRecord) {
      setSelectedEquipmentRecord(EquipmentRecord);
    } else {
      setSelectedEquipmentRecord(null);
    }
    modalControl.open();
  };

  const columns = getColumns({
    handleModalOpen: handleModalOpen,
    changeStatusModal: changeStatusModal,
    createOrModifyModal: createOrModifyModal,
  });

  const fetchEquipmentData = async (params: EquipmentRecordParams) => {
    const { data } = await EquipmentAPI.getEquipmentRecords(params);
    return {
      list: data.record_list,
      total: data.meta.total_count,
    };
  };

  if (!isLogin) {
    return <Navigate to="/login" />;
  }

  if (!equipmentRecordListAccess) {
    return <Result status="403" title="403" subTitle="无权限访问" />;
  }

  return (
    <>
      <BaseListPage
        ref={baseListRef}
        title="设备列表"
        columns={columns}
        searchFormItems={searchForm}
        fetchData={fetchEquipmentData}
        defaultSearchParams={DEFAULT_SEARCH_PARAMS}
        createButton={{
          text: '新建设备记录',
          onClick: () => handleModalOpen(createOrModifyModal),
        }}
      />
      <ChangeStatusForm
        modalVisible={changeStatusModal.visible}
        onCancel={changeStatusModal.close}
        refresh={() => baseListRef.current?.getData()}
        params={{
          record_id: selectedEquipmentRecord?.id || '',
          equipment_id: selectedEquipmentRecord?.equipment_id || '',
          status:
            selectedEquipmentRecord?.status.code === COMMON_STATUS_CODE.ACTIVE
              ? COMMON_STATUS.DELETED
              : COMMON_STATUS.ACTIVE,
        }}
        name="设备记录"
        api={EquipmentAPI.updateEquipmentRecordStatus}
      />
      <CreateOrModifyForm
        modalVisible={createOrModifyModal.visible}
        onCancel={() => {
          createOrModifyModal.close();
          setSelectedEquipmentRecord(null);
        }}
        refresh={() => baseListRef.current?.getData()}
        text={{
          title: '设备记录',
          successMsg: `${
            selectedEquipmentRecord ? '修改' : '创建'
          }设备记录成功`,
        }}
        api={
          selectedEquipmentRecord
            ? EquipmentAPI.updateEquipmentRecord
            : EquipmentAPI.createEquipmentRecord
        }
        record={selectedEquipmentRecord}
        idMapKey="record_id"
      >
        {createAndModifyForm}
      </CreateOrModifyForm>
    </>
  );
};

export default EquipmentList;
