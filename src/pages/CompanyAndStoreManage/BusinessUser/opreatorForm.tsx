import CompanySelect from '@/components/BusinessComponents/CompanySelect';
import RoleSelect from '@/components/BusinessComponents/RoleSelect';
import StoreSelect from '@/components/BusinessComponents/StoreSelect';
import { Form, FormInstance, Input } from 'antd';
import { useWatch } from 'antd/es/form/Form';

interface BusinessUserFormProps {
  form: FormInstance;
  isModify: boolean;
}

export const BusinessUserForm: React.FC<BusinessUserFormProps> = ({
  form,
  isModify,
}) => {
  const companyId = useWatch('company_id', form);

  return (
    <>
      <Form.Item
        required
        label="用户名"
        name="username"
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input />
      </Form.Item>
      {!isModify && (
        <>
          <Form.Item required label="密码" name="password">
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="角色"
            name="role"
            rules={[{ required: true, message: '请选择角色' }]}
          >
            <RoleSelect isBusinessRole={true}></RoleSelect>
          </Form.Item>
          <Form.Item
            name="company_id"
            label="选择公司"
            rules={[{ required: true, message: '请选择公司' }]}
          >
            <CompanySelect
              placeholder="请选择公司"
              onChange={() => {
                // 当公司变化时，清空门店选择
                form.setFieldValue('store_id', undefined);
              }}
            />
          </Form.Item>

          <Form.Item
            name="store_id"
            label="选择门店"
            rules={[{ required: true, message: '请选择门店' }]}
            dependencies={['company_id']}
          >
            <StoreSelect
              placeholder="请选择门店"
              companyId={companyId}
              disabled={!companyId}
            />
          </Form.Item>
        </>
      )}
      <Form.Item label="显示名称" name="nickname">
        <Input />
      </Form.Item>
      <Form.Item label="手机号" name="phone">
        <Input />
      </Form.Item>
      <Form.Item label="邮箱" name="email">
        <Input />
      </Form.Item>
    </>
  );
};

export const updateRoleForm = (role_name: string) => (
  <Form.Item
    name="role"
    label="角色"
    rules={[{ required: true, message: '请选择角色' }]}
  >
    <RoleSelect roleName={role_name} isBusinessRole={true} />
  </Form.Item>
);
