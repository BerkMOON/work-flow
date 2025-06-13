import { searchParamsTransform } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useSearchParams } from '@umijs/max';
import type { TableProps } from 'antd';
import { Button, Form, Row, Space, Table } from 'antd';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';

interface BaseListPageProps<T = any, U = any> {
  title: string | React.ReactNode;
  columns: TableProps<T>['columns'];
  searchFormItems?: React.ReactNode;
  defaultSearchParams?: U;
  ignoreSearchParmas?: string[];
  fetchData: (params: { p: number; pageSize: number } & U) => Promise<{
    list: T[];
    total: number;
  }>;
  createButton?: {
    text: string;
    onClick: () => void;
  };
  extraButtons?: React.ReactNode;
  customNode?: React.ReactNode;
}

export interface BaseListPageRef {
  getData: () => void;
}

const formStyle: React.CSSProperties = {
  maxWidth: 'none',
  borderRadius: '8px',
  marginBottom: '16px',
};

const BaseListPage = forwardRef<BaseListPageRef, BaseListPageProps>(
  (props, ref) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [form] = Form.useForm();
    const {
      title,
      columns,
      searchFormItems,
      defaultSearchParams = {} as any,
      ignoreSearchParmas = [],
      fetchData,
      createButton,
      extraButtons,
      customNode,
    } = props;

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any[]>([]);
    const [pageInfo, setPageInfo] = useState({
      p: 1,
      pageSize: 10,
      total: 0,
    });

    const fetchTableData = useCallback(
      async (params: { p: number; pageSize: number } & any) => {
        setLoading(true);
        try {
          const result = await fetchData(params);
          setData(result.list);
          setPageInfo({
            p: params.p,
            pageSize: params.pageSize,
            total: result.total,
          });
        } catch (error) {
          console.error('获取数据失败:', error);
        } finally {
          setLoading(false);
        }
      },
      [fetchData],
    );

    // 修改 URL 参数处理的 effect
    useEffect(() => {
      const urlParams: Record<string, any> = {};
      searchParams.forEach((value, key) => {
        urlParams[key] = value;
      });

      form.setFieldsValue(urlParams);
      fetchTableData({
        p: 1,
        pageSize: pageInfo.pageSize,
        ...urlParams,
        ...defaultSearchParams,
      });
    }, []);

    const handleSearch = useCallback(
      (values: any) => {
        // 更新 URL 参数
        const newParams = new URLSearchParams();
        newParams.set('p', '1'); // 搜索时重置为第一页
        newParams.set('pageSize', pageInfo.pageSize.toString());
        setSearchParams(newParams);

        const searchParams = searchParamsTransform(values, ignoreSearchParmas);

        // 执行搜索
        fetchTableData({ p: 1, pageSize: pageInfo.pageSize, ...searchParams });
      },
      [fetchTableData, pageInfo.pageSize, setSearchParams],
    );

    const handlePageChange = useCallback(
      (p: number, pageSize: number) => {
        let formValues = form.getFieldsValue();
        formValues = searchParamsTransform(formValues, ignoreSearchParmas);
        const newParams = new URLSearchParams(searchParams);
        newParams.set('p', p.toString());
        newParams.set('pageSize', pageSize.toString());
        setSearchParams(newParams);

        fetchTableData({
          p,
          pageSize: pageSize,
          ...formValues,
        });
      },
      [fetchTableData, form, searchParams, setSearchParams],
    );

    const handleReset = useCallback(() => {
      form.resetFields();
      // 清空 URL 参数
      setSearchParams(new URLSearchParams());
      fetchTableData({
        p: 1,
        pageSize: pageInfo.pageSize,
        ...defaultSearchParams,
      });
    }, [
      form,
      defaultSearchParams,
      fetchTableData,
      pageInfo.pageSize,
      setSearchParams,
    ]);

    useImperativeHandle(ref, () => ({
      getData: () => {
        let formValues = form.getFieldsValue();
        formValues = searchParamsTransform(formValues, ignoreSearchParmas);
        fetchTableData({
          p: pageInfo.p,
          pageSize: pageInfo.pageSize,
          ...formValues,
        });
      },
    }));

    return (
      <PageContainer header={{ title }}>
        {searchFormItems && (
          <Form
            form={form}
            layout="inline"
            onFinish={handleSearch}
            initialValues={defaultSearchParams}
            style={formStyle}
          >
            <Row gutter={[16, 16]}>{searchFormItems}</Row>
            <div style={{ textAlign: 'right', width: '100%', marginTop: 16 }}>
              <Space>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button onClick={handleReset}>重置</Button>
              </Space>
            </div>
          </Form>
        )}

        <div style={{ marginBottom: 16 }}>
          <Space>
            {createButton && (
              <Button type="primary" onClick={createButton.onClick}>
                {createButton.text}
              </Button>
            )}
            <Button
              type="primary"
              onClick={() =>
                fetchTableData({
                  p: pageInfo.p,
                  pageSize: pageInfo.pageSize,
                  ...form.getFieldsValue(),
                })
              }
            >
              刷新
            </Button>
            {extraButtons}
          </Space>
        </div>

        <div
          style={
            customNode
              ? { display: 'flex', justifyContent: 'space-between' }
              : {}
          }
        >
          {customNode}

          <Table<any>
            loading={loading}
            rowKey={(record) => record.id || record.role_id || record.user_id}
            columns={columns}
            dataSource={data}
            scroll={{ x: 'max-content' }}
            pagination={{
              current: pageInfo.p,
              pageSize: pageInfo.pageSize,
              total: pageInfo.total,
              onChange: handlePageChange,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total) => `共 ${total} 条`,
            }}
          />
        </div>
      </PageContainer>
    );
  },
);

export default BaseListPage;
