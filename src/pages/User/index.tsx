import BaseListPage, { BaseListPageRef } from '@/components/BaseListPage';
import { useModalControl } from '@/hooks/useModalControl';
import type { UserInfo } from '@/services/user/typings';
import { UserAPI } from '@/services/user/UserController';
import { Access, Navigate, useAccess } from '@umijs/max';
import { Col, Divider, Form, Input, Select } from 'antd';
import React, { useRef } from 'react';
import CreateForm from './components/CreateForm';
import DeleteForm from './components/DeleteForm';
import ModifyForm from './components/ModifyForm';
import UpdateRoleForm from './components/UpdateRoleForm';

const DEFAULT_SEARCH_PARAMS = {
  status: 'active',
};

const TableList: React.FC = () => {
  const { isLogin, userList } = useAccess();
  const baseListRef = useRef<BaseListPageRef>(null);
  const createModal = useModalControl();
  const deleteModal = useModalControl();
  const updateRoleModal = useModalControl();
  const modifyModal = useModalControl();
  const [selectedUser, setSelectedUser] = React.useState<UserInfo>();

  const handleModalOpen = (
    modalControl: ReturnType<typeof useModalControl>,
    user?: UserInfo,
  ) => {
    if (user) {
      setSelectedUser(user);
    }
    modalControl.open();
  };

  const columns = [
    {
      title: '姓名',
      dataIndex: 'username',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
    },
    {
      title: '门店',
      dataIndex: 'department',
    },
    {
      title: '角色',
      dataIndex: 'role_name',
    },
    {
      title: '用户状态',
      dataIndex: 'status',
      render: (status: { name: string; code: string }) => status.name,
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
    },
    {
      title: '更新时间',
      dataIndex: 'modify_time',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: unknown, record: UserInfo) => (
        <>
          <a onClick={() => handleModalOpen(deleteModal, record)}>删除用户</a>
          <Divider type="vertical" />
          <a onClick={() => handleModalOpen(modifyModal, record)}>
            修改用户信息
          </a>
          <Divider type="vertical" />
          <a onClick={() => handleModalOpen(updateRoleModal, record)}>
            修改角色信息
          </a>
        </>
      ),
    },
  ];

  const searchFormItems = (
    <>
      <Col span={6}>
        <Form.Item name="name" label="用户姓名">
          <Input placeholder="请输入用户姓名" allowClear />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item name="phone" label="手机号">
          <Input placeholder="请输入手机号" allowClear />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item name="email" label="邮箱">
          <Input placeholder="请输入邮箱" allowClear />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item name="company" label="公司">
          <Input placeholder="请输入公司id" allowClear />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item name="role" label="角色id">
          <Input placeholder="请输入角色id" allowClear />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item name="status" label="用户状态">
          <Select
            placeholder="请选择用户状态"
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

  if (!userList) {
    return <Access accessible={userList} fallback={<div>无权限访问</div>} />;
  }

  return (
    <>
      <BaseListPage
        ref={baseListRef}
        title="用户列表页面"
        columns={columns}
        searchFormItems={searchFormItems}
        defaultSearchParams={DEFAULT_SEARCH_PARAMS}
        fetchData={fetchUserData}
        createButton={{
          text: '新建用户',
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
        userId={selectedUser?.user_id || ''}
      />
      <UpdateRoleForm
        modalVisible={updateRoleModal.visible}
        onCancel={updateRoleModal.close}
        refresh={() => baseListRef.current?.getData()}
        record={selectedUser}
      />
      <ModifyForm
        modalVisible={modifyModal.visible}
        onCancel={modifyModal.close}
        refresh={() => baseListRef.current?.getData()}
        record={selectedUser}
      />
    </>
  );
};

export default TableList;
