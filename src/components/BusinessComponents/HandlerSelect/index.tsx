import InfiniteSelect from '@/components/BasicComponents/InfiniteSelect';
import { AuditAPI } from '@/services/audit/AuditController';
import React from 'react';

interface HandlerSelectProps {
  value?: string | number;
  onChange?: (value: string | number) => void;
  placeholder?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}

const HandlerSelect: React.FC<HandlerSelectProps> = ({
  value,
  onChange,
  placeholder = '请选择处理人',
  disabled = false,
  style,
}) => {
  const fetchHandlers = async ({
    page,
    pageSize,
  }: {
    page: number;
    pageSize: number;
  }) => {
    const { data } = await AuditAPI.getHandlerList({
      page,
      limit: pageSize,
    });

    return {
      list: data.handler_list,
      total: data.meta.total_count,
    };
  };

  const formatOption = (handler: any) => ({
    label: `${handler.handler_name}`,
    value: handler.handler_id,
  });

  return (
    <InfiniteSelect
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      style={{ width: '100%', ...style }}
      fetchData={fetchHandlers}
      formatOption={formatOption}
      allowClear
      showSearch
      optionFilterProp="label"
    />
  );
};

export default HandlerSelect;
