import AuthoritySelect from '@/components/AuthoritySelect/AuthoritySelect';
import { updateRoleDetail } from '@/services/role/RoleController';
import { Form, message, Modal } from 'antd';
import React from 'react';

interface UpdateRoleFormProps {
  modalVisible: boolean;
  roleId: string;
  refresh: () => void;
  onCancel: () => void;
}

const UpdateRoleForm: React.FC<UpdateRoleFormProps> = (props) => {
  const { modalVisible, onCancel, refresh, roleId } = props;
  const [form] = Form.useForm();

  const onModify = async (values: any) => {
    console.log('Received values of form: ', values);
    try {
      await updateRoleDetail({
        role_id: roleId,
        code_list: values.code_list,
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
      title="修改角色权限详情"
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
      <Form.Item label="角色权限" name="code_list">
        <AuthoritySelect roleId={roleId}></AuthoritySelect>
      </Form.Item>
    </Modal>
  );
};

export default UpdateRoleForm;
