export interface OssConfig {
  policy: string;
  signature: string;
  ossAccessKeyId: string;
  host: string;
  dir: string;
}

export enum OssSence {
  Origin = 'origin',
  Result = 'result',
}
