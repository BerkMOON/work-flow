import BaseListPage, {
  BaseListPageRef,
} from '@/components/BasicComponents/BaseListPage';
import CreateOrModifyForm from '@/components/BasicComponents/CreateOrModifyForm';
import DeleteForm from '@/components/BasicComponents/DeleteForm';
import { useModalControl } from '@/hooks/useModalControl';
import { CompanyAPI } from '@/services/company/CompanyController';
import type { CompanyItem, CompanyParams } from '@/services/company/typing';
import { Navigate, useAccess } from '@umijs/max';
import { Result } from 'antd';
import React, { useRef, useState } from 'react';
import { getColumns } from './colums';
import { createAndModifyForm } from './opreatorForm';
import { searchForm } from './searchForm';

const CompanyList: React.FC = () => {
  const { isLogin, companyList } = useAccess();
  const companyListAccess = companyList();
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

  const columns = getColumns({
    handleModalOpen,
    deleteModal,
    createOrModifyModal,
  });

  const fetchCompanyData = async (params: CompanyParams) => {
    const { data } = await CompanyAPI.getAllCompanies(params);
    return {
      list: data.company_list.map((item) => ({
        ...item,
        company_name: item.name,
      })),
      total: data.meta.total_count,
    };
  };

  if (!isLogin) {
    return <Navigate to="/login" />;
  }

  if (!companyListAccess) {
    return <Result status="403" title="403" subTitle="无权限访问" />;
  }

  return (
    <>
      <BaseListPage
        ref={baseListRef}
        title="公司列表"
        columns={columns}
        searchFormItems={searchForm}
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
        params={{ company_id: selectedCompany?.id || '' }}
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
        text={{
          title: '公司',
          successMsg: `${selectedCompany ? '修改' : '创建'}公司成功`,
        }}
        api={
          selectedCompany ? CompanyAPI.updateCompany : CompanyAPI.createCompany
        }
        record={selectedCompany}
        idMapKey="company_id"
      >
        {createAndModifyForm}
      </CreateOrModifyForm>
    </>
  );
};

export default CompanyList;
