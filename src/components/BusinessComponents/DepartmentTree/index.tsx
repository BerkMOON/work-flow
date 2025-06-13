import { COMPANY_NAME } from '@/constants';
import { GroupAPI } from '@/services/userManage/group/GroupController';
import { GroupInfo } from '@/services/userManage/group/typings';
import { DownOutlined } from '@ant-design/icons';
import { Tree } from 'antd';
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

const DepartmentTree: React.FC<any> = () => {
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
    <Tree
      showLine
      switcherIcon={<DownOutlined />}
      defaultExpandedKeys={['0-0-0']}
      treeData={departments}
    />
  );
};

export default DepartmentTree;
