import { ModalControl } from '@/hooks/useModalControl';
import { RoleItem } from '@/services/role/typing';
import { ColumnsProps } from '@/types/common';
import { Divider } from 'antd';

export const getColumns = (props: ColumnsProps<RoleItem>) => {
  const { handleModalOpen, deleteModal, createOrModifyModal, updateRoleModal } =
    props;

  return [
    {
      title: '角色名称',
      dataIndex: 'role_name',
      key: 'role_name',
    },
    {
      title: '角色状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: { name: string; code: string }) => status.name,
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
      render: (_: unknown, record: RoleItem) => (
        <>
          <a
            onClick={() =>
              handleModalOpen(updateRoleModal as ModalControl, record)
            }
          >
            更新角色权限
          </a>
          <Divider type="vertical" />
          <a onClick={() => handleModalOpen(createOrModifyModal, record)}>
            更新角色信息
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => handleModalOpen(deleteModal as ModalControl, record)}
          >
            删除角色
          </a>
        </>
      ),
    },
  ];
};
