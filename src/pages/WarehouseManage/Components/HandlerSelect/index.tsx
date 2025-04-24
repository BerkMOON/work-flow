import InfiniteSelect from '@/components/BasicComponents/InfiniteSelect';
import { InboundAPI } from '@/services/warehouse/inbound/InboundController';
import { OutboundAPI } from '@/services/warehouse/outbound/OutboundController';
import { CreatorInfo } from '@/types/common';
import React from 'react';

interface HandlerSelectProps {
  value?: string | number;
  onChange?: (value: string | number) => void;
  placeholder?: string;
  disabled?: boolean;
  type?: 'inbound' | 'outbound';
  style?: React.CSSProperties;
}

const HandlerSelect: React.FC<HandlerSelectProps> = ({
  value,
  onChange,
  placeholder = '请选择处理人',
  disabled = false,
  type,
  style,
}) => {
  const fetchHandlers = async ({
    page,
    pageSize,
  }: {
    page: number;
    pageSize: number;
  }) => {
    const api =
      type === 'inbound'
        ? OutboundAPI.getCreatorList
        : InboundAPI.getCreatorList;

    const { data } = await api({
      page,
      limit: pageSize,
    });

    return {
      list: data.creators,
      total: data.meta.total_count,
    };
  };

  const formatOption = (handler: CreatorInfo) => ({
    label: `${handler.username}`,
    value: handler.user_id,
  });

  return (
    <InfiniteSelect
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      style={{ width: '100%', ...style }}
      fetchData={fetchHandlers}
      formatOption={formatOption as any}
      allowClear
      showSearch
      optionFilterProp="label"
    />
  );
};

export default HandlerSelect;
