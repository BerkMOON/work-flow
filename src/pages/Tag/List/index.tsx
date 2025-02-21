import BaseListPage, {
  BaseListPageRef,
} from '@/components/BasicComponents/BaseListPage';
import CreateOrModifyForm from '@/components/BasicComponents/CreateOrModifyForm';
import DeleteForm from '@/components/BasicComponents/DeleteForm';
import { useModalControl } from '@/hooks/useModalControl';
import { TagAPI } from '@/services/tag/TagController';
import type { TagItem } from '@/services/tag/typings';
import { Navigate, useAccess, useLocation, useParams } from '@umijs/max';
import { Result } from 'antd';
import React, { useRef } from 'react';
import { getColumns } from './colums';
import { createAndModifyForm } from './opreatorForm';
import { searchForm } from './searchForm';

interface LocationState {
  groupName?: string;
}

const TableList: React.FC = () => {
  const { isLogin, tagList } = useAccess();
  const tagListAccess = tagList();
  const { groupId } = useParams<{ groupId: string }>();
  const { state } = useLocation() as { state: LocationState };
  const baseListRef = useRef<BaseListPageRef>(null);
  const deleteModal = useModalControl();
  const createOrModifyModal = useModalControl();
  const [selectedTag, setSelectedTag] = React.useState<TagItem | null>(null);

  const handleModalOpen = (
    modalControl: ReturnType<typeof useModalControl>,
    tag?: TagItem,
  ) => {
    if (tag) {
      setSelectedTag(tag);
    } else {
      setSelectedTag(null);
    }
    modalControl.open();
  };

  const columns = getColumns({
    handleModalOpen,
    deleteModal,
    createOrModifyModal,
  });

  const fetchTagData = async (params: { name?: string }) => {
    const { data } = await TagAPI.getTagItems({
      ...params,
      group_id: groupId || '',
    });
    return {
      list: data.item_list.map((item) => ({
        ...item,
        item_name: item.name,
      })),
      total: data.meta.total_count,
    };
  };

  if (!isLogin) {
    return <Navigate to="/login" />;
  }

  if (!tagListAccess) {
    return <Result status="403" title="403" subTitle="无权限访问" />;
  }

  const handleFormValues = (record: Record<string, any>) => {
    return {
      ...record,
      group_id: Number(groupId),
    };
  };

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
        searchFormItems={searchForm}
        fetchData={fetchTagData}
        createButton={{
          text: '新建标签',
          onClick: () => handleModalOpen(createOrModifyModal),
        }}
      />
      <DeleteForm
        modalVisible={deleteModal.visible}
        onCancel={deleteModal.close}
        refresh={() => baseListRef.current?.getData()}
        params={{ item_id: selectedTag?.id || '' }}
        name="标签"
        api={TagAPI.deleteTagItem}
      />
      <CreateOrModifyForm
        modalVisible={createOrModifyModal.visible}
        onCancel={() => {
          createOrModifyModal.close();
          setSelectedTag(null);
        }}
        refresh={() => baseListRef.current?.getData()}
        text={{
          title: '标签',
          successMsg: `${selectedTag ? '修改' : '创建'}标签组成功`,
        }}
        api={selectedTag ? TagAPI.updateTagItem : TagAPI.createTagItem}
        record={selectedTag}
        operatorFields={handleFormValues}
        idMapKey="item_id"
      >
        {createAndModifyForm}
      </CreateOrModifyForm>
    </>
  );
};

export default TableList;
