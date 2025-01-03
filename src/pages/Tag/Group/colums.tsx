import { TagGroupItem } from '@/services/tag/typings';
import { ColumnsProps } from '@/types/common';
import { history } from '@umijs/max';
import { Divider } from 'antd';

export const getColumns = (props: ColumnsProps<TagGroupItem>) => {
  const { handleModalOpen, deleteModal, createOrModifyModal } = props;

  return [
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
          <a onClick={() => handleModalOpen(createOrModifyModal, record)}>
            修改标签组
          </a>
          <Divider type="vertical" />
          <a onClick={() => handleModalOpen(deleteModal, record)}>删除标签组</a>
        </>
      ),
    },
  ];
};
