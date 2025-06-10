import BaseListPage, {
  BaseListPageRef,
} from '@/components/BasicComponents/BaseListPage';
import CreateOrModifyForm from '@/components/BasicComponents/CreateOrModifyForm';
import DeleteForm from '@/components/BasicComponents/DeleteForm';
import { COMPANY_NAME } from '@/constants';
import { useModalControl } from '@/hooks/useModalControl';
import type { UserInfo } from '@/services/userManage/user/typings';
import { UserAPI } from '@/services/userManage/user/UserController';
import { formatLocalTime } from '@/utils/format';
import { Navigate, useAccess } from '@umijs/max';
import { Result } from 'antd';
import React, { useRef } from 'react';
import { getColumns } from './colums';
import { createAndModifyForm } from './opreatorForm';
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

  const handleFormValues = (
    values: Record<string, any>,
    record?: Record<string, any>,
  ) => {
    return !record
      ? {
          ...values,
          IsForbidden: false,
          owner: COMPANY_NAME,
          avatar: '',
          createdTime: formatLocalTime(),
          updatedTime: formatLocalTime(),
          type: 'normal-user',
          signupApplication: 'door',
          groups: [`${COMPANY_NAME}/${values?.groups}`],
        }
      : {
          ...record,
          ...values,
          updatedTime: formatLocalTime(),
          groups: [`${COMPANY_NAME}/${values?.groups}`],
        };
  };

  return (
    <>
      <BaseListPage
        ref={baseListRef}
        title="员工列表页面"
        columns={columns as any}
        searchFormItems={searchForm}
        fetchData={fetchUserData}
        createButton={{
          text: '新建员工',
          onClick: () => handleModalOpen(createOrModifyModal),
        }}
      />
      <DeleteForm
        modalVisible={deleteModal.visible}
        onCancel={deleteModal.close}
        refresh={() => baseListRef.current?.getData()}
        params={selectedUser}
        name="员工"
        recordName={selectedUser?.name}
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
          title: '员工',
          successMsg: `${selectedUser ? '修改' : '创建'}员工成功`,
        }}
        api={selectedUser ? UserAPI.modifyUserInfo : UserAPI.createUser}
        record={selectedUser}
        operatorFields={handleFormValues}
        idMapKey="user_id"
        idMapValue="name"
      >
        {createAndModifyForm()}
      </CreateOrModifyForm>
    </>
  );
};

export default TableList;
