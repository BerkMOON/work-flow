import { ResponseInfoType } from '@/types/common';
import { message } from 'antd';
import { useEffect, useRef, useState } from 'react';
interface RequestOptions<T> {
  successMsg?: string;
  errorMsg?: string;
  onSuccess?: (data: T) => void;
  polling?: boolean; // 是否开启轮询
  pollingInterval?: number; // 轮询间隔，单位毫秒
}

export function useRequest<TParams = any, TData = any>(
  requestFn: (params: TParams) => Promise<ResponseInfoType<TData>>,
  options?: RequestOptions<TData>,
) {
  const {
    polling = false,
    pollingInterval = 5000,
    ...restOptions
  } = options || {};

  const [loading, setLoading] = useState(false);
  const timerRef = useRef<any>();
  const paramsRef = useRef<TParams>();

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const run = async (params: TParams): Promise<TData> => {
    setLoading(true);
    paramsRef.current = params;

    try {
      const response = await requestFn(params);
      const { response_status, data } = response;

      if (response_status.code === 200) {
        if (restOptions?.successMsg) message.success(restOptions.successMsg);
        restOptions?.onSuccess?.(data);
        return data;
      } else {
        message.error(
          response_status.msg || restOptions?.errorMsg || '请求失败',
        );
        return Promise.reject(response_status.msg);
      }
    } catch (error: any) {
      message.error(error.message || restOptions?.errorMsg || '请求失败');
      return Promise.reject(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (polling && paramsRef.current) {
      timerRef.current = setInterval(() => {
        run(paramsRef.current as TParams);
      }, pollingInterval);
    }

    return () => clearTimer();
  }, [polling, pollingInterval]);

  const cancel = () => {
    clearTimer();
  };

  return {
    loading,
    run,
    cancel,
  };
}
