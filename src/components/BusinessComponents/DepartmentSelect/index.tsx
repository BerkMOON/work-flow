import { COMPANY_NAME } from '@/constants';
import { GroupAPI } from '@/services/userManage/group/GroupController';
import { GroupInfo } from '@/services/userManage/group/typings';
import { TreeSelect } from 'antd';
import React, { useEffect, useState } from 'react';

const formatTree = (
  data: GroupInfo[],
): { title: string; value: string | number; children: any[] }[] => {
  return data.map((item) => {
    return {
      title: item.key || '',
      value: item.key || '',
      children: item.children ? formatTree(item.children) : [],
    };
  });
};

const DepartmentSelect: React.FC<any> = (props) => {
  const { value, onChange } = props;
  const [departments, setDepartments] = useState<any[]>();

  useEffect(() => {
    GroupAPI.queryGroupList({ withTree: true }).then((res) => {
      const treeData = formatTree(res.data);
      setDepartments([
        {
          title: COMPANY_NAME,
          value: COMPANY_NAME,
          children: treeData,
        },
      ]);
    });
  }, []);

  return (
    <TreeSelect
      showSearch
      //   style={{ width: '100%' }}
      value={value}
      styles={{
        popup: { root: { maxHeight: 400, overflow: 'auto' } },
      }}
      placeholder="请选择部门"
      allowClear
      treeDefaultExpandAll
      onChange={onChange}
      treeData={departments}
    />
  );
};

export default DepartmentSelect;
