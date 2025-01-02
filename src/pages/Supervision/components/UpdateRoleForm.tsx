import RoleSelect from '@/components/BusinessComponents/RoleSelect/RoleSelect';
import { UserAPI } from '@/services/user/UserController';
import { Form, Modal } from 'antd';
import React, { useState } from 'react';

interface UpdateRoleFormProps {
  modalVisible: boolean;
  userId: string;
  refresh: () => void;
  onCancel: () => void;
}

const UpdateRoleForm: React.FC<UpdateRoleFormProps> = (props) => {
  const { modalVisible, onCancel, refresh, userId } = props;
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState<any>();

  const onCreate = async (values: any) => {
    console.log('Received values of form: ', formValues);
    setFormValues(values);
    await UserAPI.modifyRole({
      user_id: userId,
      role_id: values.role_id,
    });
    refresh();
    onCancel();
  };

  return (
    <Modal
      destroyOnClose
      title="修改角色信息"
      width={420}
      open={modalVisible}
      onCancel={() => onCancel()}
      okButtonProps={{ autoFocus: true, htmlType: 'submit' }}
      modalRender={(dom) => (
        <Form
          layout="vertical"
          form={form}
          name="form_in_modal"
          clearOnDestroy
          onFinish={(values) => onCreate(values)}
        >
          {dom}
        </Form>
      )}
    >
      <Form.Item label="角色" name="role_id">
        <RoleSelect></RoleSelect>
      </Form.Item>
    </Modal>
  );
};

export default UpdateRoleForm;
