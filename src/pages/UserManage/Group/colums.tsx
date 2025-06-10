import { ModalControl } from '@/hooks/useModalControl';
import type { GroupInfo } from '@/services/userManage/group/typings';
import { ColumnsProps } from '@/types/common';
import { Divider, Tooltip } from 'antd';
import dayjs from 'dayjs';

export const getColumns = (props: ColumnsProps<GroupInfo>) => {
  const { handleModalOpen, deleteModal, createOrModifyModal } = props;

  return [
    {
      title: '部门名称',
      dataIndex: 'displayName',
    },
    {
      title: '部门人数',
      dataIndex: 'users',
      render: (users: string[]) => {
        return users?.length || 0;
      },
    },
    {
      title: '上级部门',
      dataIndex: 'parentId',
    },
    {
      title: '创建时间',
      dataIndex: 'createdTime',
      render: (time: string) => {
        return dayjs(time).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: '更新时间',
      dataIndex: 'updatedTime',
      render: (time: string) => {
        return dayjs(time).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 300,
      render: (_: unknown, record: GroupInfo) => (
        <>
          <Tooltip title="请保证删除的部门并无子部门">
            <a
              onClick={() =>
                handleModalOpen(deleteModal as ModalControl, record)
              }
            >
              删除部门
            </a>
          </Tooltip>
          <Divider type="vertical" />
          <a onClick={() => handleModalOpen(createOrModifyModal, record)}>
            修改部门信息
          </a>
        </>
      ),
    },
  ];
};
