import { ModalControl } from '@/hooks/useModalControl';
import { UserInfo } from '@/services/userManage/user/typings';
import { ColumnsProps } from '@/types/common';
import { Divider, Tag } from 'antd';
import dayjs from 'dayjs';

export const getColumns = (props: ColumnsProps<UserInfo>) => {
  const { handleModalOpen, deleteModal, createOrModifyModal } = props;

  return [
    {
      title: '审批类型',
      dataIndex: 'displayName',
      render: () => {
        return <div>宣传文案审批</div>;
      },
    },
    {
      title: '审批编号',
      dataIndex: 'displayName',
      render: () => {
        return <div>xxxxxx</div>;
      },
    },
    {
      title: '审批描述',
      dataIndex: 'displayName',
      render: () => {
        return <div>测试</div>;
      },
    },
    {
      title: '状态',
      dataIndex: 'displayName',
      render: () => {
        return <Tag color="#2db7f5">审批中</Tag>;
      },
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
      render: (_: unknown, record: UserInfo) => (
        <>
          <a
            onClick={() => handleModalOpen(deleteModal as ModalControl, record)}
          >
            撤销审批
          </a>
          <Divider type="vertical" />
          <a onClick={() => handleModalOpen(createOrModifyModal, record)}>
            修改审批信息
          </a>
        </>
      ),
    },
  ];
};
