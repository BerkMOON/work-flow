import services from '@/services/user';
import { PageContainer } from '@ant-design/pro-components';
import { Access, Navigate, useAccess } from '@umijs/max';
import { Button, Table } from 'antd';
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
      title: '权限内容',
      dataIndex: 'username',
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
            删除权限
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
        title: '权限管理页面',
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
