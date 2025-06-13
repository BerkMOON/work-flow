export interface TodoItem {
  id: string;
  title: string;
  type: '文本' | '图片' | '视频';
  priority: 'high' | 'medium' | 'low';
  deadline: string; // ISO格式时间
  status: 'pending' | 'processing' | 'completed';
}
