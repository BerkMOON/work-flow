import { ConditionValue } from '@/components/BasicComponents/ConditionInput';
import { ReviewerTypeEnum } from '@/components/BusinessComponents/FlowDesigner/constants';
import { FlowNode } from '@/services/auditModule/flow/typings';

export let arrNameToStr = (arr: any[]) => {
  if (arr) {
    return arr
      .map((item) => {
        return item.name;
      })
      .toString();
  }
  return '';
};

// export let toggleClass = (arr, elem, key = 'id') => {
//   return arr.some(item => { return item[key] === elem[key] });
// }
// export let toChecked = (arr, elem, key = 'id') => {
//   var isIncludes = toggleClass(arr, elem, key);
//   !isIncludes ? arr.push(elem) : removeEle(arr, elem, key);
//   return [...arr]
// }
// export let removeEle = (arr, elem, key = 'id') => {
//   var includesIndex;
//   arr.forEach((item, index) => {
//       if (item[key] === elem[key]) {
//           includesIndex = index
//       }
//   });
//   arr.splice(includesIndex, 1);
//   return [...arr]
// }
// export let dealStr = (str, obj) => {
//   let arr = [];
//   let list = str.split(",");
//   for (var elem in obj) {
//       // eslint-disable-next-line no-loop-func
//       list.forEach(item => {
//           if (item === elem) {
//               arr.push(obj[elem].value)
//           }
//       })
//   }
//   return arr.join("或")
// }
export let getConditionStr = (nodeConfig: FlowNode, index: number) => {
  if (!nodeConfig?.conditionNodes?.[index]) {
    return '请设置条件';
  }
  const { conditionList } = nodeConfig.conditionNodes[index];
  if (!conditionList) {
    return '请设置条件';
  }
  if (conditionList?.length === 0) {
    return index === nodeConfig.conditionNodes.length - 1 &&
      nodeConfig.conditionNodes[0]?.conditionList?.length !== 0
      ? '其他条件进入此流程'
      : '请设置条件';
  } else {
    let str = '';
    for (let i = 0; i < conditionList?.length; i++) {
      const { showName, zdy1, opt1, zdy2, opt2 } = conditionList[i];
      if (zdy1 && zdy2) {
        str += `${zdy1} ${opt1} ${showName} ${opt2} ${zdy2} `;
      } else {
        str += `${showName} ${opt1} ${zdy1}`;
      }
      return str ? str : '请设置条件';
    }
  }
};

export let getCopyerStr = (nodeConfig: FlowNode) => {
  if (nodeConfig?.nodeUserList?.length !== 0) {
    return arrNameToStr(nodeConfig.nodeUserList || []);
  } else {
    // if (nodeConfig.ccSelfSelectFlag === 1) {
    //     return "发起人自选"
    // }
    return '';
  }
};

export let getApproverStr = (nodeConfig: FlowNode) => {
  if (nodeConfig.setType === ReviewerTypeEnum.Optional) {
    return '发起人自选审批人';
  }
  if (nodeConfig?.nodeUserList?.length !== 0) {
    return arrNameToStr(nodeConfig.nodeUserList || []);
  }
  return '';
};

export const getSponsorStr = (nodeConfig: FlowNode) => {
  if (nodeConfig?.nodeUserList?.length) {
    return arrNameToStr(nodeConfig.nodeUserList || []);
  } else {
    return '所有人';
  }
};

// export let toggleStrClass = (item, key) => {
//   let a = item.zdy1 ? item.zdy1.split(",") : []
//   return a.some(item => { return item === key });
// }

export const getConditionList = (condition: ConditionValue) => {
  let conditionList = [];
  if (condition.condition === 'between') {
    conditionList.push({
      showName: '价格',
      optType: condition.condition,
      zdy1: condition.values[0],
      zdy2: condition.values[1],
      opt1: condition.lowerBoundType === 'open' ? '>' : '>=',
      opt2: condition.upperBoundType === 'open' ? '<' : '<=',
    });
  } else {
    conditionList.push({
      showName: '价格',
      optType: condition.condition,
      zdy1: condition.values[0],
      opt1: condition.condition,
    });
  }
  return conditionList;
};
