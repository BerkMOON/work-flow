/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！
import { request } from '@umijs/max';

export async function getAuditInfo() {
  return request<any>('api/admin/audit/getTask', {
    method: 'GET',
  });
}

export async function auditTask(params: {
  task_id: number;
  audit_result: string;
}) {
  return request<any>('api/admin/audit/processTask', {
    method: 'POST',
    data: params,
  });
}
