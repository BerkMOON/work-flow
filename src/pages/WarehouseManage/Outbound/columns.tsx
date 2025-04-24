import { INBOUND_STATUS_CODE } from '@/services/warehouse/inbound/typings.d';
import { OutboundRecordItem } from '@/services/warehouse/outbound/typings.d';
import { ColumnsProps } from '@/types/common';
import { history } from '@umijs/max';
import { Button } from 'antd';

export const getColumns = (props: ColumnsProps<OutboundRecordItem>) => {
  const { handleModalOpen, createOrModifyModal } = props;

  return [
    {
      title: '批次ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '出库批次名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '出库数量',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: '出库公司',
      dataIndex: 'company_name',
      key: 'company_name',
    },
    {
      title: '出库门店',
      dataIndex: 'store_name',
      key: 'store_name',
    },

    {
      title: '出库时间',
      dataIndex: 'modify_time',
      key: 'modify_time',
    },
    {
      title: '状态',
      dataIndex: ['status', 'name'],
      key: 'status',
    },
    {
      title: '出库人',
      dataIndex: 'creator_name',
      key: 'creator_name',
    },
    {
      title: '备注',
      dataIndex: 'extra',
      key: 'extra',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: OutboundRecordItem) => (
        <>
          {record.status.code === INBOUND_STATUS_CODE.PENDING ? (
            <>
              <Button
                type="link"
                onClick={() => handleModalOpen(createOrModifyModal, record)}
              >
                修改
              </Button>
              <Button
                type="link"
                onClick={() =>
                  history.push(`/warehouse/outbound/input/${record.id}`)
                }
              >
                商品出库
              </Button>
            </>
          ) : (
            <Button
              type="link"
              onClick={() =>
                history.push(`/warehouse/outbound/detail/${record.id}`)
              }
            >
              详情
            </Button>
          )}
        </>
      ),
    },
  ];
};
