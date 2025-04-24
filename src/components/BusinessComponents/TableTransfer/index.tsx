import type { TransferProps } from 'antd';
import { Table, Transfer } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React from 'react';

interface TableTransferProps extends TransferProps<any> {
  columns: ColumnsType<any>;
}

const TableTransfer: React.FC<TableTransferProps> = ({
  columns,
  ...restProps
}) => (
  <Transfer {...restProps} showSelectAll={false} oneWay={true}>
    {({
      filteredItems,
      onItemSelectAll,
      onItemSelect,
      selectedKeys: listSelectedKeys,
    }) => {
      const transferColumns = columns.map((column) => ({
        ...column,
        onCell: (record: any) => ({
          onClick: () => {
            onItemSelect(record.key, !listSelectedKeys.includes(record.key));
          },
        }),
      }));

      return (
        <Table
          rowSelection={{
            onSelectAll(selected, selectedRows) {
              const treeSelectedKeys = selectedRows
                .filter((item) => !item.disabled)
                .map(({ key }) => key);
              onItemSelectAll(treeSelectedKeys, selected);
            },
            onSelect({ key }, selected) {
              onItemSelect(key, selected);
            },
            selectedRowKeys: listSelectedKeys,
          }}
          columns={transferColumns}
          dataSource={filteredItems}
          size="small"
          style={{ marginBottom: 16 }}
          onRow={({ key, disabled: itemDisabled }) => ({
            onClick: () => {
              if (itemDisabled || !key) return;
              onItemSelect(key, !listSelectedKeys.includes(key));
            },
          })}
        />
      );
    }}
  </Transfer>
);

export default TableTransfer;
