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
      dataIndex: 'device_id',
      key: 'device_id',
    },
    {
      title: '设备SN',
      dataIndex: 'sn',
      key: 'sn',
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
      title: '车架号',
      dataIndex: 'vin',
      key: 'vin',
    },
    {
      title: '车辆品牌',
      dataIndex: 'brand',
      key: 'brand',
    },
    {
      title: '车辆型号',
      dataIndex: 'car_model',
      key: 'car_model',
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
      title: 'B端关联状态',
      dataIndex: ['b_status', 'name'],
      key: 'b_status',
    },
    {
      title: 'C端关联状态',
      dataIndex: ['c_status', 'name'],
      key: 'c_status',
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
            {record.b_status.code === COMMON_STATUS_CODE.ACTIVE
              ? '解绑'
              : '绑定'}
          </Button>
        </>
      ),
    },
  ];
};
