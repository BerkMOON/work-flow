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
