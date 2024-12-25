import BaseListPage, { BaseListPageRef } from '@/components/BaseListPage';
import { useModalControl } from '@/hooks/useModalControl';
import { RoleAPI } from '@/services/role/RoleController';
import type { RoleItem } from '@/services/role/typing';
import { Access, Navigate, useAccess } from '@umijs/max';
import { Col, Divider, Form, Input, Select } from 'antd';
import React, { useRef, useState } from 'react';
import CreateForm from './components/CreateForm';
import DeleteForm from './components/DeleteForm';
import ModifyForm from './components/ModifyForm';
import UpdateRoleForm from './components/UpdateRoleForm';

const DEFAULT_SEARCH_PARAMS = {
  status: 'active',
};

const TableList: React.FC = () => {
  const baseListRef = useRef<BaseListPageRef>(null);
  const { isLogin, userList } = useAccess();
  const createModal = useModalControl();
  const deleteModal = useModalControl();
  const updateRoleModal = useModalControl();
  const modifyModal = useModalControl();
  const [selectedRole, setSelectedRole] = useState<RoleItem | null>(null);

  const handleModalOpen = (
    modalControl: ReturnType<typeof useModalControl>,
    role?: RoleItem,
  ) => {
    if (role) {
      setSelectedRole(role);
    }
    modalControl.open();
  };

  const columns = [
    {
      title: '角色名称',
      dataIndex: 'role_name',
      key: 'role_name',
    },
    {
      title: '角色状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: { name: string; code: string }) => status.name,
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
      title: '操作',
      key: 'action',
      render: (_: unknown, record: RoleItem) => (
        <>
          <a onClick={() => handleModalOpen(updateRoleModal, record)}>
            更新角色权限
          </a>
          <Divider type="vertical" />
          <a onClick={() => handleModalOpen(modifyModal, record)}>
            更新角色信息
          </a>
          <Divider type="vertical" />
          <a onClick={() => handleModalOpen(deleteModal, record)}>删除角色</a>
        </>
      ),
    },
  ];

  const searchFormItems = (
    <>
      <Col span={12}>
        <Form.Item name="name" label="角色姓名">
          <Input placeholder="请输入角色姓名" allowClear />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="status" label="角色状态">
          <Select
            placeholder="请选择角色状态"
            allowClear
            style={{ width: 200 }}
            options={[
              { label: '生效', value: 'active' },
              { label: '已失效', value: 'deleted' },
            ]}
          />
        </Form.Item>
      </Col>
    </>
  );

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

  if (!userList) {
    return <Access accessible={userList} fallback={<div>无权限访问</div>} />;
  }

  return (
    <>
      <BaseListPage
        ref={baseListRef}
        title="角色管理页面"
        columns={columns}
        searchFormItems={searchFormItems}
        defaultSearchParams={DEFAULT_SEARCH_PARAMS}
        fetchData={fetchRoleData}
        createButton={{
          text: '新建角色',
          onClick: () => handleModalOpen(createModal),
        }}
      />

      <CreateForm
        modalVisible={createModal.visible}
        onCancel={createModal.close}
        refresh={() => baseListRef.current?.getData()}
      />
      <DeleteForm
        modalVisible={deleteModal.visible}
        onCancel={deleteModal.close}
        refresh={() => baseListRef.current?.getData()}
        roleId={selectedRole?.role_id}
      />
      <UpdateRoleForm
        modalVisible={updateRoleModal.visible}
        onCancel={updateRoleModal.close}
        refresh={() => baseListRef.current?.getData()}
        roleId={selectedRole?.role_id}
      />
      <ModifyForm
        modalVisible={modifyModal.visible}
        onCancel={modifyModal.close}
        refresh={() => baseListRef.current?.getData()}
        roleId={selectedRole?.role_id}
        name={selectedRole?.role_name}
      />
    </>
  );
};

export default TableList;
