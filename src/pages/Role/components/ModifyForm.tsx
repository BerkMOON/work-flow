import { modifyRole } from '@/services/role/RoleController';
import { Form, Input, message, Modal } from 'antd';
import React from 'react';

interface ModifyFormProps {
  modalVisible: boolean;
  roleId: string;
  refresh: () => void;
  onCancel: () => void;
}

const ModifyForm: React.FC<ModifyFormProps> = (props) => {
  const { modalVisible, onCancel, refresh, roleId } = props;
  const [form] = Form.useForm();

  const onModify = async (values: any) => {
    try {
      await modifyRole({
        name: values.name,
        role_id: roleId,
      });
      refresh();
      onCancel();
    } catch (e) {
      message.error('接口报错，请稍后再试');
      console.error(e);
    }
  };

  return (
    <Modal
      destroyOnClose
      title="更新角色信息"
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
          onFinish={(values) => onModify(values)}
        >
          {dom}
        </Form>
      )}
    >
      <Form.Item label="角色名称" name="name">
        <Input />
      </Form.Item>
    </Modal>
  );
};

export default ModifyForm;
