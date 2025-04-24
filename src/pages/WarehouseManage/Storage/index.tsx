import BaseListPage from '@/components/BasicComponents/BaseListPage';
import { StorageAPI } from '@/services/warehouse/storage/StorageController';
import type { StorageParams } from '@/services/warehouse/storage/typings';
import { TableProps } from 'antd';
import React from 'react';
import { getColumns } from './columns';
import { searchForm } from './searchForm';

const StorageList: React.FC = () => {
  const columns = getColumns();

  const fetchStorageData = async (params: StorageParams) => {
    const { data } = await StorageAPI.getStorageList(params);
    return {
      list: data.record_list,
      total: data.meta.total_count,
    };
  };

  const searchParamsTransform = (params: any) => {
    const { inbound_time_range, outbound_time_range, ...rest } = params;
    return {
      ...rest,
      inbound_start_time: inbound_time_range?.[0]?.format(
        'YYYY-MM-DD HH:mm:ss',
      ),
      inbound_end_time: inbound_time_range?.[1]?.format('YYYY-MM-DD HH:mm:ss'),
      outbound_start_time: outbound_time_range?.[0]?.format(
        'YYYY-MM-DD HH:mm:ss',
      ),
      outbound_end_time: outbound_time_range?.[1]?.format(
        'YYYY-MM-DD HH:mm:ss',
      ),
    };
  };

  return (
    <BaseListPage
      title="仓储列表"
      columns={columns as TableProps<any>['columns']}
      searchFormItems={searchForm}
      fetchData={fetchStorageData}
      searchParamsTransform={searchParamsTransform}
    />
  );
};

export default StorageList;
