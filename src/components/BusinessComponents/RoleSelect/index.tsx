import { COMMON_STATUS } from '@/constants';
import { RoleAPI } from '@/services/role/RoleController';
import { Select } from 'antd';
import React, { useEffect, useState } from 'react';

const RoleSelect: React.FC<any> = (props) => {
  const { value, onChange, roleName } = props;
  const [option, setOptions] = useState<any>([]);

  useEffect(() => {
    RoleAPI.getAllRoles({
      status: COMMON_STATUS.ACTIVE,
    })
      .then((result) => {
        const {
          data: { role_list },
        } = result;
        setOptions(
          role_list.map((role: any) => ({
            label: role.role_name,
            value: role.role_id,
          })),
        );
        if (roleName) {
          const role = role_list.find(
            (role: any) => role.role_name === roleName,
          );
          if (role) {
            onChange(role.role_id);
          }
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return <Select options={option} value={value} onChange={onChange}></Select>;
};

export default RoleSelect;
