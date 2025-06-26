import { InputNumber, Select, Space } from 'antd';
import React from 'react';

// 定义条件类型
type ConditionType = '>' | '>=' | '<' | '<=' | '=' | 'between';

// 定义组件值结构
export interface ConditionValue {
  condition?: ConditionType;
  values: (number | null)[];
  lowerBoundType?: 'open' | 'closed'; // 下限开闭类型
  upperBoundType?: 'open' | 'closed'; // 上限开闭类型
}

// 定义组件 Props 类型
interface ConditionInputProps {
  value?: ConditionValue;
  onChange?: (value: ConditionValue) => void;
}

const ConditionInput: React.FC<ConditionInputProps> = ({
  value = { values: [], lowerBoundType: 'closed', upperBoundType: 'closed' },
  onChange,
}) => {
  // 处理条件选择变化
  const handleConditionChange = (condition: ConditionType) => {
    const newValue: ConditionValue =
      condition === 'between'
        ? {
            condition,
            values: [null, null],
            lowerBoundType: 'closed',
            upperBoundType: 'closed',
          }
        : {
            condition,
            values: [null],
          };

    onChange?.(newValue);
  };

  // 处理数字输入变化
  const handleValueChange = (index: number, num: number | null) => {
    if (!value.condition) return;

    const newValues = [...value.values];
    newValues[index] = num;

    onChange?.({
      ...value,
      values: newValues,
    });
  };

  // 处理开闭类型变化
  const handleBoundTypeChange = (
    bound: 'lower' | 'upper',
    type: 'open' | 'closed',
  ) => {
    onChange?.({
      ...value,
      [`${bound}BoundType`]: type,
    });
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      {/* 条件选择器 */}
      <Select<ConditionType>
        value={value?.condition}
        onChange={handleConditionChange}
        placeholder="选择条件"
        style={{ width: 200 }}
      >
        <Select.Option value=">">大于</Select.Option>
        <Select.Option value=">=">大于等于</Select.Option>
        <Select.Option value="<">小于</Select.Option>
        <Select.Option value="<=">小于等于</Select.Option>
        <Select.Option value="=">等于</Select.Option>
        <Select.Option value="between">介于两者之间</Select.Option>
      </Select>

      {/* 动态输入区域 */}
      {value?.condition && (
        <Space wrap>
          {/* 单个数值输入 */}
          {value.condition !== 'between' && (
            <InputNumber
              value={value.values?.[0] as number | undefined}
              onChange={(num) => handleValueChange(0, num)}
              placeholder="输入数值"
            />
          )}

          {/* 范围数值输入 */}
          {value.condition === 'between' && (
            <Space wrap>
              {/* 下限输入 */}
              <Space>
                <InputNumber
                  value={value.values?.[0] as number | undefined}
                  onChange={(num) => handleValueChange(0, num)}
                  placeholder="最小值"
                />
                <Select
                  value={value.lowerBoundType}
                  onChange={(type) => handleBoundTypeChange('lower', type)}
                  style={{ width: 70 }}
                >
                  <Select.Option value="open">＜</Select.Option>
                  <Select.Option value="closed">≤</Select.Option>
                </Select>
              </Space>

              <span>金额</span>

              {/* 上限输入 */}
              <Space>
                <Select
                  value={value.upperBoundType}
                  onChange={(type) => handleBoundTypeChange('upper', type)}
                  style={{ width: 70 }}
                >
                  <Select.Option value="open">＜</Select.Option>
                  <Select.Option value="closed">≤</Select.Option>
                </Select>
                <InputNumber
                  value={value.values?.[1] as number | undefined}
                  onChange={(num) => handleValueChange(1, num)}
                  placeholder="最大值"
                />
              </Space>
            </Space>
          )}
        </Space>
      )}
    </Space>
  );
};

export default ConditionInput;
