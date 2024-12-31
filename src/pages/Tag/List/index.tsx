import BaseListPage, { BaseListPageRef } from '@/components/BaseListPage';
import { useModalControl } from '@/hooks/useModalControl';
import { TagAPI } from '@/services/tag/TagController';
import type { TagItem } from '@/services/tag/typings';
import {
  Access,
  Navigate,
  useAccess,
  useLocation,
  useParams,
} from '@umijs/max';
import { Col, Divider, Form, Input } from 'antd';
import React, { useRef } from 'react';
import CreateForm from './components/CreateForm';
import DeleteForm from './components/DeleteForm';
import ModifyForm from './components/ModifyForm';

interface LocationState {
  groupName?: string;
}

const TableList: React.FC = () => {
  const { isLogin, tagList } = useAccess();
  const { groupId } = useParams<{ groupId: string }>();
  const { state } = useLocation() as { state: LocationState };
  const baseListRef = useRef<BaseListPageRef>(null);
  const createModal = useModalControl();
  const deleteModal = useModalControl();
  const modifyModal = useModalControl();
  const [selectedTag, setSelectedTag] = React.useState<TagItem>();

  const handleModalOpen = (
    modalControl: ReturnType<typeof useModalControl>,
    tag?: TagItem,
  ) => {
    if (tag) {
      setSelectedTag(tag);
    }
    modalControl.open();
  };

  const columns = [
    {
      title: '标签id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '标签名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '标签组id',
      dataIndex: 'group_id',
      key: 'group_id',
    },
    {
      title: '标签描述',
      dataIndex: 'desc',
      key: 'desc',
    },
    {
      title: '标签额外信息',
      dataIndex: 'ext',
      key: 'ext',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
    },
    {
      title: '修改时间',
      dataIndex: 'modify_time',
      key: 'modify_time',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: unknown, record: TagItem) => (
        <>
          <a onClick={() => handleModalOpen(modifyModal, record)}>修改标签</a>
          <Divider type="vertical" />
          <a onClick={() => handleModalOpen(deleteModal, record)}>删除标签</a>
        </>
      ),
    },
  ];

  const searchFormItems = (
    <>
      <Col span={24}>
        <Form.Item name="name" label="标签名称">
          <Input placeholder="请输入标签名称" allowClear />
        </Form.Item>
      </Col>
    </>
  );

  const fetchTagData = async (params: { name?: string }) => {
    const { data } = await TagAPI.getTagItems({
      ...params,
      group_id: groupId || '',
    });
    return {
      list: data.item_list,
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
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span>{state?.groupName || ''} - 标签列表</span>
          </div>
        }
        columns={columns}
        searchFormItems={searchFormItems}
        fetchData={fetchTagData}
        createButton={{
          text: '新建标签',
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
        tagId={selectedTag?.id || 0}
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
