import { COMMON_STATUS_CODE } from '@/constants';
import { ModalControl } from '@/hooks/useModalControl';
import { EquipmentRecordItem } from '@/services/equipment/typings';
import { ColumnsProps } from '@/types/common';
import { Button, Divider } from 'antd';

export const getColumns = (props: ColumnsProps<EquipmentRecordItem>) => {
  const { handleModalOpen, changeStatusModal, createOrModifyModal } = props;

  return [
    {
      title: '设备ID',
      dataIndex: 'device_id',
      key: 'device_id',
    },
    {
      title: '设备SN',
      dataIndex: 'sn',
      key: 'sn',
    },
    {
      title: '版本型号',
      dataIndex: 'model',
      key: 'model',
    },
    {
      title: '用户名称',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '密钥',
      dataIndex: 'secret',
      key: 'secret',
    },
    {
      title: '状态',
      dataIndex: ['status', 'name'],
      key: 'status',
    },
    {
      title: '描述',
      dataIndex: 'ext',
      key: 'ext',
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
      fixed: 'right',
      width: 200,
      title: '操作',
      key: 'action',
      render: (_: any, record: EquipmentRecordItem) => (
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
