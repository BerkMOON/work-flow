export function filterValues(values: any, filterFields: string[]) {
  const filteredValues = Object.fromEntries(
    Object.entries(values).filter(([key]) => !filterFields.includes(key)),
  );
  return filteredValues;
}

export const parseVideoTime = (videoPath: string) => {
  if (!videoPath) return '';
  const fileName = videoPath.split('/').pop() || '';
  const match = fileName.match(/SOS(\d{8})-(\d{2})(\d{2})(\d{2})-(\d{1,3})/);
  if (!match) return '';
  const [, date, hour, minute, second, millisecond] = match;
  return `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(
    6,
    8,
  )} ${hour}:${minute}:${second}.${millisecond}`;
};

export const searchParamsTransform = (
  params: Record<string, any>,
  ignoreKeys?: string[],
) => {
  let newParams = {};
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      if (ignoreKeys?.find((el) => el === key)) {
        newParams = {
          ...newParams,
          [key]: value,
        };
      } else {
        newParams = {
          ...newParams,
          field: key,
          value,
        };
      }
    }
  });
  return newParams;
};

export const formatLocalTime = (date: Date = new Date()) => {
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate(),
  )}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
    date.getSeconds(),
  )}+08:00`;
};
