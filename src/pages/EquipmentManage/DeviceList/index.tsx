import BaseListPage, {
  BaseListPageRef,
} from '@/components/BasicComponents/BaseListPage';
import { DeviceAPI } from '@/services/device/DeviceController';
import { Navigate, useAccess } from '@umijs/max';
import React, { useRef } from 'react';
import { getColumns } from './colums';
import { searchForm } from './searchForm';

const TableList: React.FC = () => {
  const { isLogin } = useAccess();
  const baseListRef = useRef<BaseListPageRef>(null);

  const columns = getColumns();

  const fetchUserData = async (params: any) => {
    const { data } = await DeviceAPI.getDeviceList(params);
    return {
      list: data.device_list,
      total: data.meta.total_count,
    };
  };

  if (!isLogin) {
    return <Navigate to="/login" />;
  }

  const searchParamsTransform = (params: any) => {
    const { bind_time, onset_time, ...rest } = params;
    return {
      ...rest,
      bind_start_time: bind_time?.[0]?.format('YYYY-MM-DD HH:mm:ss'),
      bind_end_time: bind_time?.[1]?.format('YYYY-MM-DD HH:mm:ss'),
      onset_start_time: onset_time?.[0]?.format('YYYY-MM-DD HH:mm:ss'),
      onset_end_time: onset_time?.[1]?.format('YYYY-MM-DD HH:mm:ss'),
    };
  };

  return (
    <>
      <BaseListPage
        ref={baseListRef}
        title="设备列表页面"
        columns={columns}
        searchFormItems={searchForm}
        searchParamsTransform={searchParamsTransform}
        fetchData={fetchUserData}
      />
    </>
  );
};

export default TableList;
