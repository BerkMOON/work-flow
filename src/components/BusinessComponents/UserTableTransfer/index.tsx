import { UserInfo } from '@/services/userManage/user/typings';
import type {
  GetProp,
  TableColumnsType,
  TableProps,
  TransferProps,
} from 'antd';
import { Flex, Table, Transfer } from 'antd';
import React from 'react';

type TransferItem = GetProp<TransferProps, 'dataSource'>[number];
type TableRowSelection<T extends object> = TableProps<T>['rowSelection'];

interface TableTransferProps extends TransferProps<TransferItem> {
  dataSource: UserInfo[];
  leftColumns?: TableColumnsType<UserInfo>;
  rightColumns?: TableColumnsType<UserInfo>;
}

// Customize Table Transfer
const TableTransfer: React.FC<TableTransferProps> = (props) => {
  const { leftColumns, rightColumns, ...restProps } = props;
  return (
    <Transfer style={{ width: '100%' }} {...restProps}>
      {({
        direction,
        filteredItems,
        onItemSelect,
        onItemSelectAll,
        selectedKeys: listSelectedKeys,
        disabled: listDisabled,
      }) => {
        const columns = direction === 'left' ? leftColumns : rightColumns;
        const rowSelection: TableRowSelection<TransferItem> = {
          getCheckboxProps: () => ({ disabled: listDisabled }),
          onChange(selectedRowKeys) {
            onItemSelectAll(selectedRowKeys, 'replace');
          },
          selectedRowKeys: listSelectedKeys,
        };

        return (
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={filteredItems}
            size="small"
            rowKey={(record) => record.name}
            style={{ pointerEvents: listDisabled ? 'none' : undefined }}
            onRow={({ name }) => ({
              onClick: () => {
                onItemSelect(name, !listSelectedKeys.includes(name));
              },
            })}
          />
        );
      }}
    </Transfer>
  );
};

const columns: TableColumnsType<UserInfo> = [
  {
    dataIndex: 'displayName',
    title: '姓名',
  },
  {
    dataIndex: 'groups',
    render: (groups: string[]) => {
      return groups[0]?.split('/')?.[1];
    },
    title: '部门',
  },
  {
    dataIndex: 'email',
    title: '邮箱',
  },
];

const filterOption = (input: string, item: UserInfo) =>
  item.name?.includes(input) ||
  item.groups?.includes(input) ||
  item.email?.includes(input);

interface UserTableTransferProps {
  dataSource: UserInfo[];
  targetKeys: React.Key[];
  setTargetKeys: (targetKeys: React.Key[]) => void;
}

const UserTableTransfer: React.FC<UserTableTransferProps> = (props) => {
  const { dataSource, targetKeys, setTargetKeys } = props;

  const onChange: TableTransferProps['onChange'] = (nextTargetKeys) => {
    setTargetKeys(nextTargetKeys);
  };

  return (
    <Flex align="start" gap="middle" vertical>
      <TableTransfer
        dataSource={dataSource}
        targetKeys={targetKeys}
        showSearch
        rowKey={(record) => record.name}
        showSelectAll={false}
        onChange={onChange}
        filterOption={filterOption}
        leftColumns={columns}
        rightColumns={columns}
        disabled={false}
      />
    </Flex>
  );
};

export default UserTableTransfer;
