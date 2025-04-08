import { ModalControl } from '@/hooks/useModalControl';
import { StoreItem } from '@/services/store/typing';
import { ColumnsProps } from '@/types/common';
import { Button, Divider } from 'antd';

export const getColumns = (props: ColumnsProps<StoreItem>) => {
  const { handleModalOpen, deleteModal, createOrModifyModal } = props;

  return [
    {
      title: '公司',
      dataIndex: 'company_name',
      key: 'company_name',
    },
    {
      title: '门店ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '门店名称',
      dataIndex: 'name',
      key: 'name',
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
      title: '备注',
      dataIndex: 'extra',
      key: 'extra',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: StoreItem) => (
        <>
          <Button
            type="link"
            onClick={() => handleModalOpen(createOrModifyModal, record)}
          >
            修改
          </Button>
          <Divider type="vertical" />
          <Button
            type="link"
            onClick={() => handleModalOpen(deleteModal as ModalControl, record)}
          >
            删除
          </Button>
        </>
      ),
    },
  ];
};
