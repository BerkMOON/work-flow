import RoleSelect from '@/components/RoleSelect/RoleSelect';
import { register } from '@/services/user/UserController';
import { Form, Input, Modal } from 'antd';
import React, { useState } from 'react';

interface CreateFormProps {
  modalVisible: boolean;
  refresh: () => void;
  onCancel: () => void;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { modalVisible, onCancel, refresh } = props;
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState<any>();

  const onCreate = async (values: any) => {
    console.log('Received values of form: ', formValues);
    setFormValues(values);
    await register(values);
    refresh();
    onCancel();
  };

  return (
    <Modal
      destroyOnClose
      title="注册用户"
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
      <Form.Item required label="用户名" name="username">
        <Input />
      </Form.Item>
      <Form.Item required label="密码" name="password">
        <Input />
      </Form.Item>
      <Form.Item label="角色" name="role_id">
        <RoleSelect></RoleSelect>
      </Form.Item>
      <Form.Item label="手机号" name="phone">
        <Input />
      </Form.Item>
      <Form.Item label="门店名" name="department">
        <Input />
      </Form.Item>
    </Modal>
  );
};

export default CreateForm;
