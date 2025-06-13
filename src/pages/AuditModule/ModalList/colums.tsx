import { ModalControl } from '@/hooks/useModalControl';
import { UserInfo } from '@/services/userManage/user/typings';
import { ColumnsProps } from '@/types/common';
import { Divider, Tag } from 'antd';
import dayjs from 'dayjs';

export const getColumns = (props: ColumnsProps<UserInfo>) => {
  const { handleModalOpen, deleteModal, createOrModifyModal } = props;

  return [
    {
      title: '审批名称',
      dataIndex: 'displayName',
      fixed: 'left',
      width: 150,
      render: () => {
        return <div>宣传文案审批</div>;
      },
    },
    {
      title: '审批紧急程度',
      dataIndex: 'displayName',
      fixed: 'left',
      width: 150,
      render: () => {
        return <Tag color="#f50">紧急</Tag>;
      },
    },
    {
      title: '申请人',
      dataIndex: 'displayName',
      fixed: 'left',
      width: 100,
    },
    {
      title: '部门',
      dataIndex: 'groups',
      render: (groups: string[]) => {
        return groups[0]?.split('/')?.[1];
      },
      fixed: 'left',
      width: 120,
    },
    {
      title: '职务',
      dataIndex: 'title',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
    },
    {
      title: '创建时间',
      dataIndex: 'createdTime',
      render: (time: string) => {
        return dayjs(time).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: '截止时间',
      dataIndex: 'updatedTime',
      render: (time: string) => {
        return dayjs(time).format('YYYY-MM-DD HH:mm:ss');
      },
      fixed: 'right',
      width: 200,
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 300,
      render: (_: unknown, record: UserInfo) => (
        <>
          <a
            onClick={() => handleModalOpen(deleteModal as ModalControl, record)}
          >
            删除用户
          </a>
          <Divider type="vertical" />
          <a onClick={() => handleModalOpen(createOrModifyModal, record)}>
            修改用户信息
          </a>
        </>
      ),
    },
  ];
};
