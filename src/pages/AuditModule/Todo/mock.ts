import { TodoItem } from '@/services/auditModule/todo/typings.d';
import dayjs from 'dayjs';

export const mockData: TodoItem[] = [
  {
    id: '1',
    title: '宣传文案审核',
    type: '文本',
    priority: 'high',
    deadline: dayjs().add(6, 'hour').format('YYYY-MM-DDTHH:mm:ss+08:00'),
    status: 'pending',
  },
  {
    id: '2',
    title: '产品宣传图审核',
    type: '图片',
    priority: 'medium',
    deadline: dayjs().subtract(2, 'hour').format('YYYY-MM-DDTHH:mm:ss+08:00'),
    status: 'processing',
  },
  {
    id: '3',
    title: '广告视频审核',
    type: '视频',
    priority: 'low',
    deadline: dayjs().add(3, 'day').format('YYYY-MM-DDTHH:mm:ss+08:00'),
    status: 'pending',
  },
  {
    id: '4',
    title: '社交媒体文案审核',
    type: '文本',
    priority: 'medium',
    deadline: dayjs().add(30, 'minute').format('YYYY-MM-DDTHH:mm:ss+08:00'),
    status: 'pending',
  },
  {
    id: '5',
    title: '产品手册配图审核',
    type: '图片',
    priority: 'high',
    deadline: dayjs().subtract(1, 'day').format('YYYY-MM-DDTHH:mm:ss+08:00'),
    status: 'completed',
  },
  {
    id: '6',
    title: '培训视频审核',
    type: '视频',
    priority: 'medium',
    deadline: dayjs().add(12, 'hour').format('YYYY-MM-DDTHH:mm:ss+08:00'),
    status: 'processing',
  },
];
