import BaseListPage, {
  BaseListPageRef,
} from '@/components/BasicComponents/BaseListPage';
import CreateOrModifyForm from '@/components/BasicComponents/CreateOrModifyForm';
import DeleteForm from '@/components/BasicComponents/DeleteForm/DeleteForm';
import CompanySelect from '@/components/BusinessComponents/CompanySelect';
import { useModalControl } from '@/hooks/useModalControl';
import { StoreAPI } from '@/services/store/StoreController';
import type { StoreItem, StoreParams } from '@/services/store/typing';
import { Access, Navigate, useAccess } from '@umijs/max';
import { Button, Col, Divider, Form, Input } from 'antd';
import React, { useRef, useState } from 'react';

const StoreList: React.FC = () => {
  const { isLogin, storeList } = useAccess();
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

  const columns = [
    {
      title: '门店ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '门店名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '通知方式',
      dataIndex: 'notify',
      key: 'notify',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
    },
    {
      title: '更新时间',
      dataIndex: 'modify_time',
      key: 'modify_time',
    },
    {
      title: '备注',
      dataIndex: 'extra',
      key: 'extra',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: StoreItem) => (
        <>
          <Button
            type="link"
            onClick={() => handleModalOpen(createOrModifyModal, record)}
          >
            修改
          </Button>
          <Divider type="vertical" />
          <Button
            type="link"
            onClick={() => handleModalOpen(deleteModal, record)}
          >
            删除
          </Button>
        </>
      ),
    },
  ];

  const searchFormItems = (
    <>
      <Col>
        <Form.Item name="name" label="门店名称">
          <Input placeholder="请输入门店名称" allowClear />
        </Form.Item>
      </Col>
      <Col>
        <Form.Item name="company_id" label="公司">
          <CompanySelect />
        </Form.Item>
      </Col>
    </>
  );

  const operateFormItems = (
    <>
      <Form.Item
        label="门店名称"
        name="name"
        rules={[{ required: true, message: '请输入门店名称' }]}
      >
        <Input placeholder="请输入门店名称" />
      </Form.Item>
      <Form.Item
        label="公司"
        name="company_id"
        rules={[{ required: true, message: '请选择公司' }]}
      >
        <CompanySelect />
      </Form.Item>
      <Form.Item label="通知方式" name="notify">
        <Input placeholder="请输入通知方式" />
      </Form.Item>
      <Form.Item label="描述" name="extra">
        <Input placeholder="请输入描述" />
      </Form.Item>
    </>
  );

  const fetchStoreData = async (params: StoreParams) => {
    const { data } = await StoreAPI.getAllStores(params);
    return {
      list: data.store_list,
      total: data.meta.total_count,
    };
  };

  if (!isLogin) {
    return <Navigate to="/login" />;
  }

  if (!storeList) {
    return <Access accessible={storeList} fallback={<div>无权限访问</div>} />;
  }

  return (
    <>
      <BaseListPage
        ref={baseListRef}
        title="门店列表"
        columns={columns}
        searchFormItems={searchFormItems}
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
        id={selectedStore?.id}
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
        text="门店"
        api={selectedStore ? StoreAPI.updateStore : StoreAPI.createStore}
        record={selectedStore}
      >
        {operateFormItems}
      </CreateOrModifyForm>
    </>
  );
};

export default StoreList;
