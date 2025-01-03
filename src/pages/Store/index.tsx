import BaseListPage, {
  BaseListPageRef,
} from '@/components/BasicComponents/BaseListPage';
import CreateOrModifyForm from '@/components/BasicComponents/CreateOrModifyForm';
import DeleteForm from '@/components/BasicComponents/DeleteForm';
import { useModalControl } from '@/hooks/useModalControl';
import { StoreAPI } from '@/services/store/StoreController';
import type { StoreItem, StoreParams } from '@/services/store/typing';
import { Navigate, useAccess } from '@umijs/max';
import { Result } from 'antd';
import React, { useRef, useState } from 'react';
import { getColumns } from './colums';
import { createAndModifyForm } from './opreatorForm';
import { searchForm } from './searchForm';

const StoreList: React.FC = () => {
  const { isLogin, storeList } = useAccess();
  const storeListAccess = storeList();
  const baseListRef = useRef<BaseListPageRef>(null);
  const createOrModifyModal = useModalControl();
  const deleteModal = useModalControl();
  const [selectedStore, setSelectedStore] = useState<StoreItem | null>(null);

  const handleModalOpen = (
    modalControl: ReturnType<typeof useModalControl>,
    store?: StoreItem,
  ) => {
    if (store) {
      setSelectedStore(store);
    } else {
      setSelectedStore(null);
    }
    modalControl.open();
  };

  const columns = getColumns({
    handleModalOpen: handleModalOpen,
    deleteModal: deleteModal,
    createOrModifyModal: createOrModifyModal,
  });

  const fetchStoreData = async (params: StoreParams) => {
    const { data } = await StoreAPI.getAllStores(params);
    return {
      list: data.store_list.map((item) => ({
        ...item,
        store_name: item.name,
      })),
      total: data.meta.total_count,
    };
  };

  if (!isLogin) {
    return <Navigate to="/login" />;
  }

  if (!storeListAccess) {
    return <Result status="403" title="403" subTitle="无权限访问" />;
  }

  return (
    <>
      <BaseListPage
        ref={baseListRef}
        title="门店列表"
        columns={columns}
        searchFormItems={searchForm}
        fetchData={fetchStoreData}
        createButton={{
          text: '新建门店',
          onClick: () => handleModalOpen(createOrModifyModal),
        }}
      />
      <DeleteForm
        modalVisible={deleteModal.visible}
        onCancel={deleteModal.close}
        refresh={() => baseListRef.current?.getData()}
        params={{ store_id: selectedStore?.id || '' }}
        name="门店"
        api={StoreAPI.deleteStore}
      />
      <CreateOrModifyForm
        modalVisible={createOrModifyModal.visible}
        onCancel={() => {
          createOrModifyModal.close();
          setSelectedStore(null);
        }}
        refresh={() => baseListRef.current?.getData()}
        text={{
          title: '门店',
          successMsg: `${selectedStore ? '修改' : '创建'}门店成功`,
        }}
        api={selectedStore ? StoreAPI.updateStore : StoreAPI.createStore}
        record={selectedStore}
        idMapKey="store_id"
      >
        {createAndModifyForm}
      </CreateOrModifyForm>
    </>
  );
};

export default StoreList;
