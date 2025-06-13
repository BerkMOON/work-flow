import BaseListPage, {
  BaseListPageRef,
} from '@/components/BasicComponents/BaseListPage';
import DeleteForm from '@/components/BasicComponents/DeleteForm';
import { useModalControl } from '@/hooks/useModalControl';
import type { UserInfo } from '@/services/userManage/user/typings';
import { UserAPI } from '@/services/userManage/user/UserController';
import { history, Navigate, useAccess } from '@umijs/max';
import { Result } from 'antd';
import React, { useRef } from 'react';
import { getColumns } from './colums';
import { searchForm } from './searchForm';

const TableList: React.FC = () => {
  const { isLogin, userList } = useAccess();
  const userListAccess = userList();
  const baseListRef = useRef<BaseListPageRef>(null);
  const createOrModifyModal = useModalControl();
  const deleteModal = useModalControl();
  const updateRoleModal = useModalControl();
  const [selectedUser, setSelectedUser] = React.useState<UserInfo | null>(null);

  const handleModalOpen = (
    modalControl: ReturnType<typeof useModalControl>,
    user?: UserInfo,
  ) => {
    if (user) {
      setSelectedUser(user);
    } else {
      setSelectedUser(null);
    }
    modalControl.open();
  };

  const columns = getColumns({
    handleModalOpen,
    deleteModal,
    createOrModifyModal,
    updateRoleModal,
  });

  const fetchUserData = async (params: any) => {
    const { data, data2 } = await UserAPI.queryUserList(params);
    return {
      list: data,
      total: data2,
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
        params={selectedUser}
        name="模版"
        recordName={selectedUser?.name}
        api={UserAPI.deleteUser}
      />
    </>
  );
};

export default TableList;
