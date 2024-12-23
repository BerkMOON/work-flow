import { getRoleDetail } from '@/services/role/RoleController';
import { Tree } from 'antd';
import React, { useEffect, useState } from 'react';

function processItem(item: any) {
  // 处理当前项
  const processedItem = {
    key: item.code,
    title: item.name,
    value: item.code,
    children: item.children ? [] : undefined,
  };

  // 如果当前项有children，则递归处理它们
  if (item.children && item.children.length > 0) {
    processedItem.children = item.children.map((child: any) =>
      processItem(child),
    );
  }

  if (item.endpoints && item.endpoints.length > 0) {
    processedItem.children = processedItem.children?.concat(
      item.endpoints.map((endpoint: any) => {
        return {
          key: endpoint.code,
          title: endpoint.name,
          value: endpoint.code,
          children: [],
        };
      }),
    );
  }

  return processedItem;
}

function findSelectedEndpointsCodes(authority: any[]) {
  let selectedCodes: any = [];

  function recursiveSearch(items: any[]) {
    for (let item of items) {
      if (item.endpoints && item.endpoints.length > 0) {
        for (let endpoint of item.endpoints) {
          if (endpoint.is_selected === true) {
            selectedCodes.push(endpoint.code);
          }
        }
      }
      if (item.children && item.children.length > 0) {
        recursiveSearch(item.children);
      }
    }
  }

  recursiveSearch(authority);
  return selectedCodes;
}

const defaultRoleId = 0;

const AuthoritySelect: React.FC<any> = (props) => {
  const { value, onChange, roleId } = props;
  const [authority, setAuthority] = useState<any>();

  useEffect(() => {
    getRoleDetail(roleId ?? defaultRoleId).then((roleInfo) => {
      const {
        data: { authority },
      } = roleInfo;
      const info = authority.map((item) => processItem(item));
      setAuthority(info);
      const defaultSelectedKeys = findSelectedEndpointsCodes(authority);
      onChange(defaultSelectedKeys);
    });
  }, [roleId]);

  return (
    <Tree
      checkable
      onCheck={onChange}
      checkedKeys={value}
      treeData={authority}
    />
  );
};

export default AuthoritySelect;
