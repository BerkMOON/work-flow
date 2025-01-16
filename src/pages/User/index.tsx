import BaseListPage, {
  BaseListPageRef,
} from '@/components/BasicComponents/BaseListPage';
import CreateOrModifyForm from '@/components/BasicComponents/CreateOrModifyForm';
import DeleteForm from '@/components/BasicComponents/DeleteForm';
import { COMMON_STATUS } from '@/constants';
import { useModalControl } from '@/hooks/useModalControl';
import type { UserInfo } from '@/services/user/typings';
import { UserAPI } from '@/services/user/UserController';
import { Navigate, useAccess } from '@umijs/max';
import { Result } from 'antd';
import React, { useRef } from 'react';
import { getColumns } from './colums';
import { createAndModifyForm, updateRoleForm } from './opreatorForm';
import { searchForm } from './searchForm';

const DEFAULT_SEARCH_PARAMS = {
  status: COMMON_STATUS.ACTIVE,
};

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
    const { data } = await UserAPI.queryUserList(params);
    return {
      list: data.user_info_list,
      total: data.meta.total_count,
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
        title="用户列表页面"
        columns={columns}
        searchFormItems={searchForm}
        defaultSearchParams={DEFAULT_SEARCH_PARAMS}
        fetchData={fetchUserData}
        createButton={{
          text: '新建用户',
          onClick: () => handleModalOpen(createOrModifyModal),
        }}
      />
      <DeleteForm
        modalVisible={deleteModal.visible}
        onCancel={deleteModal.close}
        refresh={() => baseListRef.current?.getData()}
        params={{ user_id: selectedUser?.user_id || '' }}
        name="用户"
        api={UserAPI.deleteUser}
      />
      <CreateOrModifyForm
        modalVisible={createOrModifyModal.visible}
        onCancel={() => {
          createOrModifyModal.close();
          setSelectedUser(null);
        }}
        refresh={() => baseListRef.current?.getData()}
        text={{
          title: '用户',
          successMsg: `${selectedUser ? '修改' : '创建'}用户成功`,
        }}
        api={selectedUser ? UserAPI.modifyUserInfo : UserAPI.createUser}
        record={selectedUser}
        idMapKey="user_id"
        idMapValue="user_id"
      >
        {createAndModifyForm(!!selectedUser)}
      </CreateOrModifyForm>
      <CreateOrModifyForm
        modalVisible={updateRoleModal.visible}
        onCancel={() => {
          updateRoleModal.close();
          setSelectedUser(null);
        }}
        refresh={() => baseListRef.current?.getData()}
        text={{
          title: '用户',
          successMsg: '修改角色信息成功',
        }}
        api={UserAPI.modifyRole}
        record={selectedUser}
        idMapKey="user_id"
        idMapValue="user_id"
      >
        {updateRoleForm(selectedUser?.role_name || '')}
      </CreateOrModifyForm>
    </>
  );
};

export default TableList;
