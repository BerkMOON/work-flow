import { ModalControl } from '@/hooks/useModalControl';
import { ModalInfo } from '@/services/auditModule/modal/typings';
import { ColumnsProps } from '@/types/common';
import { history } from '@umijs/max';
import { Divider } from 'antd';

export const getColumns = (props: ColumnsProps<ModalInfo>) => {
  const { handleModalOpen, deleteModal } = props;

  return [
    {
      title: '类型标识',
      dataIndex: 'key',
    },
    {
      title: '类型名称',
      dataIndex: 'value',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
    {
      title: '备注',
      dataIndex: 'remark',
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 300,
      render: (_: unknown, record: ModalInfo) => (
        <>
          <a
            onClick={() => handleModalOpen(deleteModal as ModalControl, record)}
          >
            删除模版
          </a>
          <Divider type="vertical" />
          <a onClick={() => history.push(`/audit/modal/modify/${record.key}`)}>
            修改模版
          </a>
        </>
      ),
    },
  ];
};
