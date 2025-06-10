import { API_STATUS } from '@/constants';
import { ResponseInfoType } from '@/types/common';
import { message } from 'antd';
import { useEffect, useRef, useState } from 'react';
interface RequestOptions<T> {
  successMsg?: string;
  errorMsg?: string;
  onSuccess?: (data: T) => void;
  polling?: boolean; // 是否开启轮询
  pollingInterval?: number; // 轮询间隔，单位毫秒
  showError?: boolean; // 是否显示错误信息
  immediate?: boolean; // 是否立即请求
  immediateParams?: any;
}

export function useRequest<TParams = any, TData = any>(
  requestFn: (params: TParams) => Promise<ResponseInfoType<TData, any>>,
  options?: RequestOptions<TData>,
) {
  const {
    polling = false,
    pollingInterval = 5000,
    showError = true,
    immediate = false, // 默认不直接请求
    immediateParams,
    ...restOptions
  } = options || {};

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TData>();
  const timerRef = useRef<any>();
  const paramsRef = useRef<TParams>();

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = undefined;
    }
  };

  const run = async (params: TParams): Promise<TData> => {
    setLoading(true);
    const finalParams = params || paramsRef.current;
    if (finalParams) {
      paramsRef.current = finalParams;
    }

    try {
      const response = await requestFn(finalParams as TParams);
      const { status, data, msg } = response;

      if (status === API_STATUS.SUCCESS) {
        setData(data);
        if (restOptions?.successMsg) message.success(restOptions.successMsg);
        restOptions?.onSuccess?.(data);
        return data;
      } else {
        if (showError) {
          message.error(msg || '请求失败');
        }
        return Promise.reject(msg);
      }
    } catch (error: any) {
      message.error(error.message || restOptions?.errorMsg || '请求失败');
      return Promise.reject(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (immediate) {
      run(immediateParams);
    }
  }, []);

  useEffect(() => {
    if (polling) {
      timerRef.current = setInterval(() => {
        run(paramsRef.current as TParams);
      }, pollingInterval);
    }

    return () => clearTimer();
  }, [polling, pollingInterval]);

  return {
    loading,
    run,
    cancel: clearTimer,
    data,
    params: paramsRef.current,
  };
}
