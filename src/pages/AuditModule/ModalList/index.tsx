import BaseListPage, {
  BaseListPageRef,
} from '@/components/BasicComponents/BaseListPage';
import DeleteForm from '@/components/BasicComponents/DeleteForm';
import FlowBoard from '@/components/BusinessComponents/FlowBoard';
import { useModalControl } from '@/hooks/useModalControl';
import { ModalAPI } from '@/services/auditModule/modal/ModalController';
import { ModalInfo } from '@/services/auditModule/modal/typings';
import { history, Navigate, useAccess } from '@umijs/max';
import { Drawer, Result } from 'antd';
import React, { useRef } from 'react';
import { getColumns } from './colums';
import { searchForm } from './searchForm';

const TableList: React.FC = () => {
  const { isLogin, userList } = useAccess();
  const userListAccess = userList();
  const baseListRef = useRef<BaseListPageRef>(null);
  const deleteModal = useModalControl();
  const customModal = useModalControl();
  const [selectedModal, setSelectedModal] = React.useState<ModalInfo | null>(
    null,
  );

  const handleModalOpen = (
    modalControl: ReturnType<typeof useModalControl>,
    modal?: ModalInfo,
  ) => {
    if (modal) {
      setSelectedModal(modal);
    } else {
      setSelectedModal(null);
    }
    modalControl.open();
  };

  const columns = getColumns({
    handleModalOpen,
    deleteModal,
    customModal,
  });

  const fetchUserData = async (params: any) => {
    const list = await ModalAPI.queryModalList(params);
    return {
      list,
      total: list?.length,
    };
  };

  if (!isLogin) {
    return <Navigate to="/login" />;
  }

  if (!userListAccess) {
    return <Result status="403" title="403" subTitle="无权限访问" />;
  }

  return (
    <>
      <BaseListPage
        ref={baseListRef}
        title="模版列表页面"
        columns={columns as any}
        searchFormItems={searchForm}
        ignoreSearchParmas={['groupName']}
        fetchData={fetchUserData}
        createButton={{
          text: '新建模版',
          onClick: () => {
            history.push('/audit/modal/create');
          },
        }}
      />
      <DeleteForm
        modalVisible={deleteModal.visible}
        onCancel={deleteModal.close}
        refresh={() => baseListRef.current?.getData()}
        params={selectedModal}
        name="模版"
        recordName={selectedModal?.value}
        api={ModalAPI.deleteModal as any}
      />
      <Drawer
        title="查看模版"
        onClose={customModal.close}
        open={customModal.visible}
        width={1000}
      >
        <FlowBoard nodes={selectedModal?.nodeConig} />
      </Drawer>
    </>
  );
};

export default TableList;
