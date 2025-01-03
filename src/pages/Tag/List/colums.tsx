import { TagItem } from '@/services/tag/typings';
import { ColumnsProps } from '@/types/common';
import { Divider } from 'antd';

export const getColumns = (props: ColumnsProps<TagItem>) => {
  const { handleModalOpen, deleteModal, createOrModifyModal } = props;

  return [
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
          <a onClick={() => handleModalOpen(createOrModifyModal, record)}>
            修改标签
          </a>
          <Divider type="vertical" />
          <a onClick={() => handleModalOpen(deleteModal, record)}>删除标签</a>
        </>
      ),
    },
  ];
};
