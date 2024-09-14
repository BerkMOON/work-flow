import { PageContainer } from '@ant-design/pro-components';
import { Button, Form, Radio } from 'antd';
import ReactPlayer from 'react-player';
import styles from './index.less';

const AuditPage: React.FC = () => {
  const onFinish = () => {};

  return (
    <PageContainer
      header={{
        title: '审核页面',
      }}
    >
      <div className={styles.container}>
        <ReactPlayer url="https://www.youtube.com/watch?v=LXb3EKWsInQ" />
        <Form
          name="login"
          initialValues={{ remember: true }}
          style={{ width: 350, marginTop: 30 }}
          onFinish={onFinish}
        >
          <Form.Item label="审核通过">
            <Radio.Group>
              <Radio value={1}>通过</Radio>
              <Radio value={0}>拒绝</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit">
              确认
            </Button>
          </Form.Item>
        </Form>
      </div>
    </PageContainer>
  );
};

export default AuditPage;
