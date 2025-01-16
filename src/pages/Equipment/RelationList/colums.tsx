import { COMMON_STATUS_CODE } from '@/constants';
import { ModalControl } from '@/hooks/useModalControl';
import { EquipmentRelationItem } from '@/services/equipment/typings';
import { ColumnsProps } from '@/types/common';
import { Button, Divider } from 'antd';

export const getColumns = (props: ColumnsProps<EquipmentRelationItem>) => {
  const { handleModalOpen, changeStatusModal, createOrModifyModal } = props;

  return [
    {
      title: '设备ID',
      dataIndex: 'equipment_id',
      key: 'equipment_id',
    },
    {
      title: '用户open_id',
      dataIndex: 'open_id',
      key: 'open_id',
    },
    {
      title: '用户手机号',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '公司名称',
      dataIndex: 'company_name',
      key: 'company_name',
    },
    {
      title: '门店名称',
      dataIndex: 'store_name',
      key: 'store_name',
    },
    {
      title: '状态',
      dataIndex: ['status', 'name'],
      key: 'status',
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
      render: (_: any, record: EquipmentRelationItem) => (
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
            onClick={() =>
              handleModalOpen(changeStatusModal as ModalControl, record)
            }
          >
            {record.status.code === COMMON_STATUS_CODE.ACTIVE ? '禁用' : '启用'}
          </Button>
        </>
      ),
    },
  ];
};
