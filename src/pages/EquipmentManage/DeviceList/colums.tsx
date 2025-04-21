export const getColumns = () => {
  return [
    {
      title: '公司名称',
      dataIndex: 'company_name',
    },
    {
      title: '门店名称',
      dataIndex: 'store_name',
    },
    {
      title: '设备SN码',
      dataIndex: 'sn',
    },
    {
      title: '车架号',
      dataIndex: 'vin',
    },
    {
      title: '用户手机号',
      dataIndex: 'phone',
    },
    {
      title: '首次上报时间',
      dataIndex: 'onset_time',
    },
    {
      title: '用户状态',
      dataIndex: ['status', 'name'],
    },
    {
      title: '用户绑定时间',
      dataIndex: 'bind_time',
    },
  ];
};
