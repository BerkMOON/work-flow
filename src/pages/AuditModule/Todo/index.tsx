import { Alert, Card, List, Select, Statistic, Tag } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import { mockData } from './mock';

export default function TodoPage() {
  const [filterType, setFilterType] = useState<string>('all');
  const [sortField, setSortField] = useState<string>('priority');

  // 筛选排序逻辑
  const processedData = mockData
    .filter((item) => filterType === 'all' || item.type === filterType)
    .sort((a, b) => {
      if (sortField === 'deadline')
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      return a.priority.localeCompare(b.priority);
    });

  // 超时计算
  const isTimeout = (deadline: string) => {
    return dayjs().isAfter(dayjs(deadline).subtract(24, 'hour'));
  };

  return (
    <Card title="我的待办看板">
      <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
        <Statistic title="待处理总数" value={mockData.length} />

        <Select
          placeholder="任务类型"
          style={{ width: 120 }}
          onChange={setFilterType}
          options={[
            { value: 'all', label: '全部类型' },
            { value: '文本', label: '文本' },
            { value: '图片', label: '图片' },
            { value: '视频', label: '视频' },
          ]}
        />

        <Select
          placeholder="排序方式"
          style={{ width: 140 }}
          onChange={setSortField}
          options={[
            { value: 'priority', label: '按优先级' },
            { value: 'deadline', label: '按截止时间' },
          ]}
        />
      </div>

      <List
        dataSource={processedData}
        renderItem={(item) => (
          <List.Item>
            <Card
              title={item.title}
              style={{
                width: '100%',
                borderLeft: `4px solid ${
                  isTimeout(item.deadline) ? '#ff4d4f' : '#1890ff'
                }`,
              }}
            >
              <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                <Tag
                  color={
                    item.priority === 'high'
                      ? '#ff4d4f'
                      : item.priority === 'medium'
                      ? '#faad14'
                      : '#52c41a'
                  }
                >
                  {item.priority === 'high'
                    ? '紧急'
                    : item.priority === 'medium'
                    ? '中等'
                    : '普通'}
                </Tag>

                <span>
                  截止时间：{dayjs(item.deadline).format('YYYY-MM-DD HH:mm')}
                </span>

                {isTimeout(item.deadline) && (
                  <Alert
                    message="即将超时"
                    type="error"
                    showIcon
                    style={{ padding: '4px 12px' }}
                  />
                )}
              </div>
            </Card>
          </List.Item>
        )}
      />
    </Card>
  );
}
