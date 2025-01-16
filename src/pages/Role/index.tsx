import BaseListPage, {
  BaseListPageRef,
} from '@/components/BasicComponents/BaseListPage';
import CreateOrModifyForm from '@/components/BasicComponents/CreateOrModifyForm';
import DeleteForm from '@/components/BasicComponents/DeleteForm';
import { COMMON_STATUS } from '@/constants';
import { useModalControl } from '@/hooks/useModalControl';
import { RoleAPI } from '@/services/role/RoleController';
import type { RoleItem } from '@/services/role/typing';
import { Navigate, useAccess } from '@umijs/max';
import { Result } from 'antd';
import React, { useRef, useState } from 'react';
import { getColumns } from './colums';
import { createAndModifyForm, updateRoleForm } from './opreatorForm';
import { searchForm } from './searchForm';

const DEFAULT_SEARCH_PARAMS = {
  status: COMMON_STATUS.ACTIVE,
};

const TableList: React.FC = () => {
  const baseListRef = useRef<BaseListPageRef>(null);
  const { isLogin, roleList } = useAccess();
  const roleListAccess = roleList();
  const createOrModifyModal = useModalControl();
  const deleteModal = useModalControl();
  const updateRoleModal = useModalControl();

  const [selectedRole, setSelectedRole] = useState<RoleItem | null>(null);

  const handleModalOpen = (
    modalControl: ReturnType<typeof useModalControl>,
    role?: RoleItem,
  ) => {
    if (role) {
      setSelectedRole(role);
    } else {
      setSelectedRole(null);
    }
    modalControl.open();
  };

  const columns = getColumns({
    handleModalOpen: handleModalOpen,
    deleteModal: deleteModal,
    createOrModifyModal: createOrModifyModal,
    updateRoleModal: updateRoleModal,
  });

  const fetchRoleData = async (params: any) => {
    const { data } = await RoleAPI.getAllRoles(params);
    return {
      list: data.role_list,
      total: data?.meta?.total_count,
    };
  };

  if (!isLogin) {
    return <Navigate to="/login" />;
  }

  if (!roleListAccess) {
    return <Result status="403" title="403" subTitle="无权限访问" />;
  }

  return (
    <>
      <BaseListPage
        ref={baseListRef}
        title="角色管理页面"
        columns={columns}
        searchFormItems={searchForm}
        defaultSearchParams={DEFAULT_SEARCH_PARAMS}
        fetchData={fetchRoleData}
        createButton={{
          text: '新建角色',
          onClick: () => handleModalOpen(createOrModifyModal),
        }}
      />
      <CreateOrModifyForm
        modalVisible={createOrModifyModal.visible}
        onCancel={() => {
          createOrModifyModal.close();
          setSelectedRole(null);
        }}
        refresh={() => baseListRef.current?.getData()}
        text={{
          title: '用户',
          successMsg: `${selectedRole ? '修改' : '创建'}角色成功`,
        }}
        api={selectedRole ? RoleAPI.modifyRole : RoleAPI.createRole}
        record={selectedRole}
        idMapKey="role_id"
        idMapValue="role_id"
      >
        {createAndModifyForm(!selectedRole)}
      </CreateOrModifyForm>
      <CreateOrModifyForm
        modalVisible={updateRoleModal.visible}
        onCancel={() => {
          updateRoleModal.close();
          setSelectedRole(null);
        }}
        refresh={() => baseListRef.current?.getData()}
        text={{
          title: '用户',
          successMsg: '修改角色信息成功',
        }}
        api={RoleAPI.updateRoleDetail}
        record={selectedRole}
        idMapKey="role_id"
        idMapValue="role_id"
      >
        {updateRoleForm(selectedRole?.role_id || 0)}
      </CreateOrModifyForm>
      <DeleteForm
        modalVisible={deleteModal.visible}
        onCancel={deleteModal.close}
        refresh={() => baseListRef.current?.getData()}
        params={{ role_id: selectedRole?.role_id || '' }}
        name="角色"
        api={RoleAPI.deleteRole}
      />
    </>
  );
};

export default TableList;
