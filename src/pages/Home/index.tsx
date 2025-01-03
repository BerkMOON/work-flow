import { SmileOutlined } from '@ant-design/icons';
import { Result } from 'antd';

const Home = () => {
  return (
    <Result
      icon={<SmileOutlined />}
      title="欢迎使用车辆管理系统"
      subTitle="请选择上方的菜单进行操作，若无权限请联系管理员"
    />
  );
};

export default Home;
