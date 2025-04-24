import {
  fieldMapping,
  TableItem,
} from '@/services/warehouse/inbound/typings.d';
import { message } from 'antd';
import * as XLSX from 'xlsx';

interface ExcelParseResult {
  tableData: TableItem[];
  columns: {
    title: string;
    dataIndex?: string;
    key: string;
    width?: number;
    fixed?: 'left' | 'right';
    render?: (text: any, record: TableItem) => React.ReactNode;
  }[];
  duplicateSNs: string[];
}

export const parseExcelData = async (
  url: string,
): Promise<ExcelParseResult | null> => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];

        const options = {
          raw: false,
          dateNF: 'yyyy-mm-dd',
          header: 1,
          defval: '',
        };

        const rawData = XLSX.utils.sheet_to_json(firstSheet, options);

        // 获取表头
        const headers = (rawData[0] as string[]).filter(
          (header) => header !== '',
        );

        // 处理数据行，过滤掉全空的行，并检查重复SN码
        const snCodeMap = new Map<string, number>();
        const tableItems: TableItem[] = rawData
          .slice(1)
          .filter((row: any) => {
            return row.some((value: any) => value !== '');
          })
          .map((row: any, index) => {
            const item: any = {
              key: index.toString(),
              isChecked: false,
            };

            headers.forEach((header) => {
              const colIndex = (rawData[0] as string[]).indexOf(header);
              const englishKey = fieldMapping[header] || header;
              // 如果是 sn 字段，将内容转换为大写
              item[englishKey] =
                englishKey === 'sn' && row[colIndex]
                  ? String(row[colIndex]).toUpperCase()
                  : row[colIndex] || '';
            });

            // 检查SN码是否重复
            if (item?.sn) {
              snCodeMap.set(item.sn, (snCodeMap.get(item.sn) || 0) + 1);
              const count = snCodeMap.get(item.sn);
              if (count && count > 1) {
                item.isDuplicate = true;
              }
            }

            return item;
          });

        // 设置表格列
        const tableColumns: {
          title: string;
          dataIndex?: string;
          key: string;
          width?: number;
          fixed?: 'left' | 'right';
          align?: 'center';
          render?: (text: any, record: TableItem) => React.ReactNode;
        }[] = headers.map((header) => ({
          title: header,
          dataIndex: fieldMapping[header] || header,
          key: fieldMapping[header] || header,
          width: 150,
          fixed: fieldMapping[header] === 'sn' ? 'left' : undefined,
          render: (text: string, record: TableItem) => {
            if (record.isDuplicate) {
              return <span style={{ color: 'red' }}>{text}</span>;
            }
            return text;
          },
        }));

        // 添加状态和操作列
        tableColumns.push({
          title: '是否已录入',
          dataIndex: 'isChecked',
          key: 'isChecked',
          width: 100,
          fixed: 'right',
          align: 'center',
          render: (checked: boolean) =>
            checked ? (
              <span style={{ color: 'green', fontSize: 18 }}>✓</span>
            ) : (
              <span style={{ color: 'red', fontSize: 18 }}>×</span>
            ),
        });

        const duplicates = Array.from(snCodeMap.entries())
          .filter(([, count]) => count > 1)
          .map(([sn]) => sn);

        resolve({
          tableData: tableItems,
          columns: tableColumns,
          duplicateSNs: duplicates,
        });
      };

      reader.onerror = () => {
        reject(new Error('文件读取失败'));
      };

      reader.readAsBinaryString(blob);
    });
  } catch (error) {
    message.error('文件解析失败');
    return null;
  }
};
