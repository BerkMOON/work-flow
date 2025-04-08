export const getColumns = () => {
  return [
    {
      title: '线索ID',
      dataIndex: 'clue_id',
      key: 'clue_id',
      render: (text: string) => (
        <a
          href={`/review/clue/${text}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {text}
        </a>
      ),
    },
    {
      title: '事故评级',
      dataIndex: 'level',
      key: 'level',
    },
    {
      title: '线索状态',
      dataIndex: ['status', 'name'],
      key: 'status',
    },
    {
      title: '公司',
      dataIndex: 'company_name',
      key: 'company_name',
    },
    {
      title: '门店',
      dataIndex: 'store_name',
      key: 'store_name',
      render: (text: string) => {
        return (
          <a
            href={`/cas/store?store_name=${text}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {text}
          </a>
        );
      },
    },
    {
      title: '设备号',
      dataIndex: 'sn',
      key: 'sn',
    },
    {
      title: '审核通过时间',
      dataIndex: 'create_time',
      key: 'create_time',
    },
  ];
};
