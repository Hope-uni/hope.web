import { Card, List, Skeleton, Space } from 'antd';

interface Props {
  size?: number;
}

const SkeletonGrid = ({ size = 15 }: Props) => {
  const items = Array.from({ length: size }, (_, i) => ({ id: i }));

  return (
    <Space
      id="grid-skeleton"
      direction="vertical"
      size={20}
      style={{ marginTop: '20px', width: '100%' }}
    >
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 5,
          xxl: 5,
        }}
        dataSource={items}
        renderItem={() => (
          <List.Item>
            <Card style={{ width: '100%' }}>
              <Skeleton
                avatar={{ size: 'large' }}
                title={false}
                paragraph={{
                  rows: 2,
                  width: ['80%', '60%'],
                }}
                active
              />
            </Card>
          </List.Item>
        )}
      />
    </Space>
  );
};

export default SkeletonGrid;
