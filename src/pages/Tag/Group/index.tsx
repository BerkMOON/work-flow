import type { TagGroupItem } from '@/services/tag/typings';
import { Access, history, Navigate, useAccess } from '@umijs/max';
import { Col, Divider } from 'antd';
import React, { useRef } from 'react';

import BaseListPage, { BaseListPageRef } from '@/components/BaseListPage';
import { useModalControl } from '@/hooks/useModalControl';
import { TagAPI } from '@/services/tag/TagController';
import { Form, Input } from 'antd';
import CreateForm from './components/CreateForm';
import DeleteForm from './components/DeleteForm';
import ModifyForm from './components/ModifyForm';
const DEFAULT_SEARCH_PARAMS = {
  status: 'active',
};

const TableList: React.FC = () => {
  const { isLogin, tagList } = useAccess();
  const baseListRef = useRef<BaseListPageRef>(null);
  const createModal = useModalControl();
  const deleteModal = useModalControl();
  const modifyModal = useModalControl();
  const [selectedTag, setSelectedTag] = React.useState<TagGroupItem>();

  const handleModalOpen = (
    modalControl: ReturnType<typeof useModalControl>,
    tag?: TagGroupItem,
  ) => {
    if (tag) {
      setSelectedTag(tag);
    }
    modalControl.open();
  };

  const columns = [
    {
      title: '标签组名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: TagGroupItem) => (
        <a
          onClick={() =>
            history.push(`/tag/${record.id}`, { groupName: record.name })
          }
        >
          {text}
        </a>
      ),
    },
    {
      title: '标签组描述',
      dataIndex: 'desc',
      key: 'desc',
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
      render: (_: unknown, record: TagGroupItem) => (
        <>
          <a onClick={() => handleModalOpen(modifyModal, record)}>修改标签组</a>
          <Divider type="vertical" />
          <a onClick={() => handleModalOpen(deleteModal, record)}>删除标签组</a>
        </>
      ),
    },
  ];

  const searchFormItems = (
    <>
      <Col span={24}>
        <Form.Item name="name" label="标签组名称">
          <Input placeholder="请输入标签组名称" allowClear />
        </Form.Item>
      </Col>
    </>
  );

  const fetchTagData = async (params: any) => {
    const { data } = await TagAPI.getAllTagGroups(params);
    return {
      list: data.group_list,
      total: data.meta.total_count,
    };
  };

  if (!isLogin) {
    return <Navigate to="/login" />;
  }

  if (!tagList) {
    return <Access accessible={tagList} fallback={<div>无权限访问</div>} />;
  }

  return (
    <>
      <BaseListPage
        ref={baseListRef}
        title="标签管理页面"
        columns={columns}
        searchFormItems={searchFormItems}
        defaultSearchParams={DEFAULT_SEARCH_PARAMS}
        fetchData={fetchTagData}
        createButton={{
          text: '新建标签组',
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
        tagId={selectedTag?.id || ''}
      />
      <ModifyForm
        modalVisible={modifyModal.visible}
        onCancel={modifyModal.close}
        refresh={() => baseListRef.current?.getData()}
        record={selectedTag}
      />
    </>
  );
};

export default TableList;
