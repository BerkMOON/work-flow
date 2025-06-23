import UserTableTransfer from '@/components/BusinessComponents/UserTableTransfer';
import { FlowNode } from '@/services/auditModule/flow/typings';
import { UserAPI } from '@/services/userManage/user/UserController';
import { UserInfo } from '@/services/userManage/user/typings';
import { fetchAllPaginatedData } from '@/utils/request';
import { message, Modal, TransferProps } from 'antd';
import { cloneDeep } from 'lodash';
import React, { useEffect, useState } from 'react';
import { ApproverUserType } from '../FlowDesigner/constants';

interface SelectUserModal {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  tempNode?: FlowNode;
  setTempNode: React.Dispatch<React.SetStateAction<FlowNode | undefined>>;
}

const SelectedUserModal: React.FC<SelectUserModal> = (props) => {
  const { visible, setVisible, tempNode, setTempNode } = props;
  const [dataSource, setDataSource] = useState<UserInfo[]>([]);
  const [targetKeys, setTargetKeys] = useState<TransferProps['targetKeys']>([]);

  const fetchUserData = async () => {
    const data = await fetchAllPaginatedData<UserInfo, any>(
      UserAPI.queryUserList,
      {},
    );
    setDataSource(data);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const onConfirm = () => {
    if (tempNode) {
      const newNode = {
        ...cloneDeep(tempNode),
        nodeUserList: targetKeys?.map((key) => ({
          targetId: key as string,
          type: ApproverUserType.User,
          name: dataSource.find((item) => item.name === key)?.displayName || '',
        })),
      };
      setTempNode(newNode);
      setVisible(false);
    } else {
      message.error('步骤节点出错');
    }
  };

  return (
    <Modal
      width={1000}
      open={visible}
      title="选择用户"
      onCancel={() => setVisible(false)}
      onOk={onConfirm}
    >
      <UserTableTransfer
        dataSource={dataSource}
        targetKeys={targetKeys as React.Key[]}
        setTargetKeys={setTargetKeys}
      />
    </Modal>
  );
};

export default SelectedUserModal;
