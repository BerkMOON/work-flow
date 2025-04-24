import { SuccessCode } from '@/constants';
import { InboundAPI } from '@/services/warehouse/inbound/InboundController';
import type {
  InboundRecordItem,
  TableItem,
} from '@/services/warehouse/inbound/typings';
import { OssAPI } from '@/services/warehouse/oss/OSSController';
import { OssSence } from '@/services/warehouse/oss/typings.d';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Descriptions, message, Modal } from 'antd';
import { useState } from 'react';
import * as XLSX from 'xlsx';
import { parseExcelData } from '../utils/excelParser';

export const useInboundInput = () => {
  const [record, setRecord] = useState<InboundRecordItem | null>(null);
  const [stageRecord, setStageRecord] = useState<string[]>([]);
  const [tableData, setTableData] = useState<TableItem[]>([]);
  const [columns, setColumns] = useState<any[]>([]);
  const [duplicateSNs, setDuplicateSNs] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [clearing, setClearing] = useState(false);
  const [scanValue, setScanValue] = useState('');
  const [exportUrl, setExportUrl] = useState<string | null>(null);
  const [tableLoading, setTableLoading] = useState(false);

  const showConfirm = (recordList: string[], id: string) => {
    return new Promise((resolve) => {
      Modal.confirm({
        title: '保留录入数据?',
        icon: <ExclamationCircleFilled />,
        content: '检测到此批次曾经录入过数据，是否保留录入数据?',
        onOk() {
          setTableData((prevData) =>
            prevData.map((item) => ({
              ...item,
              isChecked: recordList.includes(item.sn),
            })),
          );
          resolve(true);
        },
        onCancel() {
          InboundAPI.clearStagingRecord({ batch_id: Number(id) });
          resolve(false);
        },
      });
    });
  };

  const recordDevice = async (stageRecord: TableItem) => {
    try {
      const res = await InboundAPI.createStagingRecord({
        batch_id: Number(record?.id),
        sn: stageRecord.sn,
        icc_id: stageRecord.iccid,
        device_id: stageRecord.imei,
        device_model: stageRecord.device_model,
        scan_date: stageRecord.scan_date,
      });
      if (res.response_status.code !== SuccessCode.SUCCESS) {
        message.error(res.response_status.msg);
        return false;
      }
      message.success('商品录入成功');
      return true;
    } catch (error) {
      message.error('商品录入失败');
      return false;
    }
  };

  const handleCheck = async (record: TableItem) => {
    const success = await recordDevice(record);
    if (success) {
      setTableData((prevData) =>
        prevData.map((item) =>
          item.key === record.key ? { ...item, isChecked: true } : item,
        ),
      );
    }
  };

  const handleExport = async () => {
    // 创建导出数据
    setExporting(true);
    const exportData = tableData.map((item) => ({
      SN码: item.sn,
      IMEI号: item.imei,
      ICCID号: item.iccid,
      扫码日期: item.scan_date,
      设备型号: item.device_model,
      所属客户: item.customer,
      是否已录入: item.isChecked ? '是' : '否',
    }));

    // 生成 Excel 文件
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // 将 Excel 转换为 blob
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    try {
      // 获取 OSS 上传地址
      const {
        data: { policy, signature, ossAccessKeyId, host, dir },
      } = await OssAPI.getOSSConfig(OssSence.Result);

      // 构建 FormData
      const formData = new FormData();
      formData.append('policy', policy);
      formData.append('signature', signature);
      formData.append('OSSAccessKeyId', ossAccessKeyId);
      formData.append('success_action_status', '200');

      const fileName = `${record?.name}_${new Date().getTime()}.xlsx`;
      const key = `${dir}${fileName}`;
      formData.append('key', key);
      formData.append('file', blob, fileName);

      // 上传到 OSS
      await fetch(host, {
        method: 'POST',
        body: formData,
      });

      message.success('文件已导出并上传成功');

      // 同时下载到本地
      XLSX.writeFile(wb, `${record?.name}.xlsx`);

      setExportUrl(key);
      setExporting(false);
    } catch (error) {
      message.error('文件上传失败');
      // 如果上传失败，仍然保存到本地
      XLSX.writeFile(wb, `${record?.name}.xlsx`);
      setExporting(false);
    }
  };

  const handleSubmitInfo = async () => {
    if (!record?.id) {
      message.error('入库记录ID不存在');
      return;
    }

    if (!exportUrl) {
      message.error('请先导出数据到OSS');
      return;
    }

    setSubmitting(true);
    try {
      await InboundAPI.commitStagingRecord({
        batch_id: Number(record?.id),
        result_excel_path: exportUrl,
      });
      message.success('商品录入成功');
    } catch (error) {
      message.error('提交失败，请重试');
    } finally {
      setSubmitting(false);
      Modal.destroyAll();
      history.back();
    }
  };

  const handleSubmit = async () => {
    Modal.confirm({
      width: 500,
      title: '是否确认入库？',
      icon: <ExclamationCircleFilled />,
      content: (
        <>
          <Descriptions column={3}>
            <Descriptions.Item label="全部商品：">
              {tableData.length}
            </Descriptions.Item>
            <Descriptions.Item label="已确认商品：">
              {tableData.filter((item) => item.isChecked).length}
            </Descriptions.Item>
            <Descriptions.Item label="未确认商品：">
              {tableData.filter((item) => !item.isChecked).length}
            </Descriptions.Item>
          </Descriptions>
          {tableData.filter((item) => !item.isChecked).length > 0
            ? '检测到此批次还有未提交商品，应入库数量不对，是否确认入库？'
            : '入库商品数量无误，是否确认入库？'}
        </>
      ),
      footer: () => (
        <>
          <Button
            type={
              tableData.filter((item) => !item.isChecked).length > 0
                ? 'primary'
                : 'default'
            }
            onClick={() => Modal.destroyAll()}
          >
            取消
          </Button>
          <Button
            type={
              tableData.filter((item) => !item.isChecked).length > 0
                ? 'default'
                : 'primary'
            }
            loading={submitting}
            onClick={handleSubmitInfo}
          >
            确认入库
          </Button>
        </>
      ),
    });
  };

  const handleScan = async (value: string) => {
    if (!value.trim()) return;

    const formatValue = value.trim().toUpperCase();

    const foundIndex = tableData.findIndex(
      (item) => item.sn === formatValue && !item.isChecked,
    );

    if (foundIndex !== -1) {
      await handleCheck(tableData[foundIndex]);
    } else {
      Modal.warning({
        title: '未找到匹配的未确认商品',
        content: '请确认输入的SN码是否正确，或者excel中是否存在该商品',
      });
    }

    setScanValue('');
  };

  const fetchRecord = async (id: string) => {
    try {
      setTableLoading(true);
      const { data } = await InboundAPI.getInboundDetail({
        batch_id: Number(id),
      });
      setRecord(data);
      if (data?.excel_file_url) {
        const result = await parseExcelData(data.excel_file_url);
        if (result) {
          const { tableData, columns, duplicateSNs } = result;
          setTableData(tableData);
          setColumns(columns);
          setDuplicateSNs(duplicateSNs);
        }
      }

      const {
        data: { record_list },
      } = await InboundAPI.getStagingRecord({
        batch_id: Number(id),
      });

      if (record_list.length > 0) {
        const confirmed = await showConfirm(record_list, id);
        if (confirmed) {
          setTableData((prevData) =>
            prevData.map((item) => ({
              ...item,
              isChecked: record_list.includes(item.sn),
            })),
          );
        }
        setStageRecord(record_list);
      }
      setTableLoading(false);
    } catch (error) {
      message.error('获取入库记录失败');
      setTableLoading(false);
    }
  };

  const handleClear = async () => {
    setClearing(true);
    try {
      await InboundAPI.clearStagingRecord({ batch_id: Number(record?.id) });
      setTableData((prevData) =>
        prevData.map((item) => ({
          ...item,
          isChecked: false,
        })),
      );
      setClearing(false);
    } catch (error) {
      message.error('清除失败');
      setClearing(false);
    }
  };

  return {
    record,
    stageRecord,
    tableData,
    columns,
    duplicateSNs,
    submitting,
    exporting,
    clearing,
    scanValue,
    exportUrl,
    tableLoading,
    setScanValue,
    handleCheck,
    handleScan,
    handleExport,
    handleSubmit,
    fetchRecord,
    handleClear,
  };
};
