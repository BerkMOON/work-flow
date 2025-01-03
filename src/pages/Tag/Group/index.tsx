import type { TagGroupItem } from '@/services/tag/typings';
import { Navigate, useAccess } from '@umijs/max';
import { Result } from 'antd';
import React, { useRef } from 'react';

import BaseListPage, {
  BaseListPageRef,
} from '@/components/BasicComponents/BaseListPage';
import CreateOrModifyForm from '@/components/BasicComponents/CreateOrModifyForm';
import DeleteForm from '@/components/BasicComponents/DeleteForm';
import { useModalControl } from '@/hooks/useModalControl';
import { TagAPI } from '@/services/tag/TagController';
import { getColumns } from './colums';
import { createAndModifyForm } from './opreatorForm';
import { searchForm } from './searchForm';

const TableList: React.FC = () => {
  const { isLogin, tagGroup } = useAccess();
  const tagGroupAccess = tagGroup();
  const baseListRef = useRef<BaseListPageRef>(null);
  const createOrModifyModal = useModalControl();
  const deleteModal = useModalControl();
  const [selectedTag, setSelectedTag] = React.useState<TagGroupItem | null>(
    null,
  );

  const handleModalOpen = (
    modalControl: ReturnType<typeof useModalControl>,
    tag?: TagGroupItem,
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

  const fetchTagData = async (params: any) => {
    const { data } = await TagAPI.getAllTagGroups(params);
    return {
      list: data.group_list.map((item) => ({
        ...item,
        group_name: item.name,
      })),
      total: data.meta.total_count,
    };
  };

  if (!isLogin) {
    return <Navigate to="/login" />;
  }

  if (!tagGroupAccess) {
    return <Result status="403" title="403" subTitle="无权限访问" />;
  }

  return (
    <>
      <BaseListPage
        ref={baseListRef}
        title="标签管理页面"
        columns={columns}
        searchFormItems={searchForm}
        fetchData={fetchTagData}
        createButton={{
          text: '新建标签组',
          onClick: () => handleModalOpen(createOrModifyModal),
        }}
      />
      <DeleteForm
        modalVisible={deleteModal.visible}
        onCancel={deleteModal.close}
        refresh={() => baseListRef.current?.getData()}
        params={{ group_id: selectedTag?.id || '' }}
        name="标签组"
        api={TagAPI.deleteTagGroup}
      />
      <CreateOrModifyForm
        modalVisible={createOrModifyModal.visible}
        onCancel={() => {
          createOrModifyModal.close();
          setSelectedTag(null);
        }}
        refresh={() => baseListRef.current?.getData()}
        text={{
          title: '标签组',
          successMsg: `${selectedTag ? '修改' : '创建'}标签组成功`,
        }}
        api={selectedTag ? TagAPI.updateTagGroup : TagAPI.createTagGroup}
        record={selectedTag}
        idMapKey="group_id"
      >
        {createAndModifyForm}
      </CreateOrModifyForm>
    </>
  );
};

export default TableList;
