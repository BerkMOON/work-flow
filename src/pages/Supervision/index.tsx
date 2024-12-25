import { UserInfo } from '@/services/user/typings';
import { UserAPI } from '@/services/user/UserController';
import { PageContainer } from '@ant-design/pro-components';
import { Access, Navigate, useAccess } from '@umijs/max';
import { Button, Table } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';

const TableList: React.FC<unknown> = () => {
  const { isLogin, userList } = useAccess();
  const [data, setData] = useState<UserInfo[]>();
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });

  const columns = [
    {
      title: '审核Id',
      dataIndex: 'username',
    },
    {
      title: '审核结果',
      dataIndex: 'phone',
    },
    {
      title: '审核评级',
      dataIndex: 'department',
    },
    {
      title: '审核详情',
      dataIndex: 'nickname',
    },
    {
      title: '审核视频',
      dataIndex: 'nickname',
    },
  ];

  const getData = useCallback(async () => {
    const { data } = await UserAPI.queryUserList({
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
        title: '客服督查页面',
      }}
    >
      <div>
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
    </PageContainer>
  );
};

export default TableList;
