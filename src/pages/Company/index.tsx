import BaseListPage, {
  BaseListPageRef,
} from '@/components/BasicComponents/BaseListPage';
import CreateOrModifyForm from '@/components/BasicComponents/CreateOrModifyForm';
import DeleteForm from '@/components/BasicComponents/DeleteForm/DeleteForm';
import { useModalControl } from '@/hooks/useModalControl';
import { CompanyAPI } from '@/services/company/CompanyController';
import type { CompanyItem, CompanyParams } from '@/services/company/typing';
import { Access, Navigate, useAccess } from '@umijs/max';
import { Button, Col, Divider, Form, Input } from 'antd';
import React, { useRef, useState } from 'react';

const CompanyList: React.FC = () => {
  const { isLogin, companyList } = useAccess();
  const baseListRef = useRef<BaseListPageRef>(null);
  const deleteModal = useModalControl();
  const createOrModifyModal = useModalControl();
  const [selectedCompany, setSelectedCompany] = useState<CompanyItem | null>(
    null,
  );

  const handleModalOpen = (
    modalControl: ReturnType<typeof useModalControl>,
    company?: CompanyItem,
  ) => {
    if (company) {
      setSelectedCompany(company);
    } else {
      setSelectedCompany(null);
    }
    modalControl.open();
  };

  const columns = [
    {
      title: '公司ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '公司名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
    },
    {
      title: '更新时间',
      dataIndex: 'modify_time',
      key: 'modify_time',
    },
    {
      title: '描述',
      dataIndex: 'extra',
      key: 'extra',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: CompanyItem) => (
        <>
          <Button
            type="link"
            onClick={() => handleModalOpen(createOrModifyModal, record)}
          >
            修改
          </Button>
          <Divider type="vertical" />
          <Button
            type="link"
            onClick={() => handleModalOpen(deleteModal, record)}
          >
            删除
          </Button>
        </>
      ),
    },
  ];

  const searchFormItems = (
    <>
      <Col span={24}>
        <Form.Item name="name" label="公司名称">
          <Input placeholder="请输入公司名称" allowClear />
        </Form.Item>
      </Col>
    </>
  );

  const operateFormItems = (
    <>
      <Form.Item
        name="name"
        label="公司名称"
        rules={[{ required: true, message: '请输入公司名称' }]}
      >
        <Input placeholder="请输入公司名称" allowClear />
      </Form.Item>
      <Form.Item name="extra" label="描述">
        <Input placeholder="请输入描述" allowClear />
      </Form.Item>
    </>
  );

  const fetchCompanyData = async (params: CompanyParams) => {
    const { data } = await CompanyAPI.getAllCompanies(params);
    return {
      list: data.company_list,
      total: data.meta.total_count,
    };
  };

  if (!isLogin) {
    return <Navigate to="/login" />;
  }

  if (!companyList) {
    return <Access accessible={companyList} fallback={<div>无权限访问</div>} />;
  }

  return (
    <>
      <BaseListPage
        ref={baseListRef}
        title="公司列表"
        columns={columns}
        searchFormItems={searchFormItems}
        fetchData={fetchCompanyData}
        createButton={{
          text: '新建公司',
          onClick: () => handleModalOpen(createOrModifyModal),
        }}
      />
      <DeleteForm
        modalVisible={deleteModal.visible}
        onCancel={deleteModal.close}
        refresh={() => baseListRef.current?.getData()}
        id={selectedCompany?.id}
        name="公司"
        api={CompanyAPI.deleteCompany}
      />
      <CreateOrModifyForm
        modalVisible={createOrModifyModal.visible}
        onCancel={() => {
          createOrModifyModal.close();
          setSelectedCompany(null);
        }}
        refresh={() => baseListRef.current?.getData()}
        text="门店"
        api={
          selectedCompany ? CompanyAPI.updateCompany : CompanyAPI.createCompany
        }
        record={selectedCompany}
      >
        {operateFormItems}
      </CreateOrModifyForm>
    </>
  );
};

export default CompanyList;
