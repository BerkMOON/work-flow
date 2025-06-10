import BaseListPage, {
  BaseListPageRef,
} from '@/components/BasicComponents/BaseListPage';
import CreateOrModifyForm from '@/components/BasicComponents/CreateOrModifyForm';
import DeleteForm from '@/components/BasicComponents/DeleteForm';
import { COMPANY_NAME, GROUP_TYPE } from '@/constants';
import { useModalControl } from '@/hooks/useModalControl';
import { GroupAPI } from '@/services/userManage/group/GroupController';
import { GroupInfo } from '@/services/userManage/group/typings';
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
  const [selectedGroup, setSelectedGroup] = React.useState<GroupInfo | null>(
    null,
  );

  const handleModalOpen = (
    modalControl: ReturnType<typeof useModalControl>,
    user?: GroupInfo,
  ) => {
    if (user) {
      setSelectedGroup(user);
    } else {
      setSelectedGroup(null);
    }
    modalControl.open();
  };

  const columns = getColumns({
    handleModalOpen,
    deleteModal,
    createOrModifyModal,
  });

  const fetchUserData = async (params: any) => {
    const { data, data2 } = await GroupAPI.queryGroupList(params);
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
          isEnabled: true,
          isTopGroup: false,
          owner: COMPANY_NAME,
          type: GROUP_TYPE.Physical,
          displayName: values?.name,
          createdTime: formatLocalTime(),
          updatedTime: formatLocalTime(),
          contactEmail: '',
          haveChildren: false,
          manager: '',
          users: null,
        }
      : {
          ...record,
          ...values,
          displayName: values?.name,
          updatedTime: formatLocalTime(),
        };
  };

  return (
    <>
      <BaseListPage
        ref={baseListRef}
        title="部门列表页面"
        columns={columns as any}
        searchFormItems={searchForm}
        fetchData={fetchUserData}
        createButton={{
          text: '新建部门',
          onClick: () => handleModalOpen(createOrModifyModal),
        }}
      />
      <DeleteForm
        modalVisible={deleteModal.visible}
        onCancel={deleteModal.close}
        refresh={() => baseListRef.current?.getData()}
        params={{
          name: selectedGroup?.name,
          owner: COMPANY_NAME,
        }}
        name="部门"
        recordName={selectedGroup?.name}
        api={GroupAPI.deleteGroup}
      />
      <CreateOrModifyForm
        modalVisible={createOrModifyModal.visible}
        onCancel={() => {
          createOrModifyModal.close();
          setSelectedGroup(null);
        }}
        refresh={() => baseListRef.current?.getData()}
        text={{
          title: '部门',
          successMsg: `${selectedGroup ? '修改' : '创建'}部门成功`,
        }}
        id={selectedGroup?.name}
        api={selectedGroup ? GroupAPI.updateGroup : GroupAPI.createGroup}
        record={selectedGroup}
        idMapValue="name"
        operatorFields={handleFormValues}
      >
        {createAndModifyForm()}
      </CreateOrModifyForm>
    </>
  );
};

export default TableList;
