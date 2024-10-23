import services from '@/services/user';
import { PageContainer } from '@ant-design/pro-components';
import { Access, Navigate, useAccess } from '@umijs/max';
import { Button, Divider, Table } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import CreateForm from './components/CreateForm';
import DeleteForm from './components/DeleteForm';
import ModifyForm from './components/ModifyForm';
import UpdateRoleForm from './components/UpdateRoleForm';

const { queryUserList } = services.UserController;

const TableList: React.FC<unknown> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const { isLogin, userList } = useAccess();
  const [updateModalVisible, handleUpdateModalVisible] =
    useState<boolean>(false);
  const [deleteModalVisible, handleDeleteModalVisible] =
    useState<boolean>(false);
  const [modifyModalVisible, handleModifyModalVisible] =
    useState<boolean>(false);
  const [deleteUserId, setDeleteUserId] = useState<string>('');
  const [data, setData] = useState<API.UserInfo[]>();
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });

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
      dataIndex: 'nickname',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_: null, record: API.UserInfo) => (
        <>
          <a
            onClick={() => {
              setDeleteUserId(record.user_id);
              handleDeleteModalVisible(true);
            }}
          >
            删除用户
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              handleModifyModalVisible(true);
            }}
          >
            修改用户信息
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
            }}
          >
            修改角色信息
          </a>
        </>
      ),
    },
  ];

  const getData = useCallback(async () => {
    const { data } = await queryUserList({
      page: pageInfo.page,
      limit: pageInfo.limit,
    });

    const { user_info_list, meta } = data || {};
    setData(user_info_list);
    setPageInfo({
      page: pageInfo.page,
      limit: pageInfo.limit,
      total: meta?.total_count || 0,
    });
  }, [pageInfo]);

  useEffect(() => {
    getData();
  }, []);

  if (!isLogin) {
    return <Navigate to="/login" />;
  }

  if (!userList) {
    return (
      <Access
        accessible={userList}
        fallback={<div>Can not read foo content.</div>}
      />
    );
  }

  return (
    <PageContainer
      header={{
        title: '用户列表页面',
      }}
    >
      <div>
        <Button
          onClick={() => handleModalVisible(true)}
          type="primary"
          style={{ marginBottom: 16 }}
        >
          新建
        </Button>
        <Button
          onClick={getData}
          type="primary"
          style={{ marginBottom: 16, marginLeft: 16 }}
        >
          刷新
        </Button>
      </div>
      <Table
        dataSource={data}
        columns={columns}
        pagination={{
          onChange: (page, pageSize) => {
            setPageInfo({
              page,
              limit: pageSize,
              total: pageInfo.total,
            });
          },
        }}
      ></Table>
      <CreateForm
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
        refresh={getData}
      ></CreateForm>
      <DeleteForm
        onCancel={() => handleDeleteModalVisible(false)}
        modalVisible={deleteModalVisible}
        refresh={getData}
        userId={deleteUserId}
      ></DeleteForm>
      <UpdateRoleForm
        onCancel={() => handleUpdateModalVisible(false)}
        modalVisible={updateModalVisible}
        refresh={getData}
        userId={deleteUserId}
      ></UpdateRoleForm>
      <ModifyForm
        onCancel={() => handleModifyModalVisible(false)}
        modalVisible={modifyModalVisible}
        refresh={getData}
      ></ModifyForm>
    </PageContainer>
  );
};

export default TableList;
