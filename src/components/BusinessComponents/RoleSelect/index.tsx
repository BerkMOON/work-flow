import { COMMON_STATUS } from '@/constants';
import { RoleAPI } from '@/services/role/RoleController';
import { Select } from 'antd';
import React, { useEffect, useState } from 'react';

const RoleSelect: React.FC<any> = (props) => {
  const {
    value,
    onChange,
    roleName,
    placeholder,
    style,
    isBusinessRole = false,
  } = props;
  const [option, setOptions] = useState<any>([]);

  useEffect(() => {
    const api = RoleAPI.getAllRoles;
    api(
      !isBusinessRole
        ? {
            status: COMMON_STATUS.ACTIVE,
          }
        : {},
    )
      .then((result) => {
        const {
          data: { role_list },
        } = result;
        setOptions(
          role_list.map((role: any) => ({
            label: isBusinessRole ? role.desc : role.role_name,
            value: isBusinessRole ? role.role : role.role_id,
          })),
        );
        if (roleName) {
          const role = role_list.find((role: any) =>
            isBusinessRole
              ? role.desc === roleName
              : role.role_name === roleName,
          );
          if (role) {
            onChange(role?.role_id);
          }
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <Select
      style={{ width: '100%', ...style }}
      placeholder={placeholder || '请选择角色'}
      options={option}
      value={value}
      onChange={onChange}
    ></Select>
  );
};

export default RoleSelect;
