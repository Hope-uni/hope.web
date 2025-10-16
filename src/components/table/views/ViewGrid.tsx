/* eslint-disable react-hooks/exhaustive-deps */
import { SmileOutlined } from '@ant-design/icons';
import { Card, Flex, List } from 'antd';
import { ListGridType } from 'antd/es/list';
import { ReactNode } from 'react';

interface Props {
  source: any[];
  grid?: ListGridType | undefined;
  renderItemViewGrid?: (item: any) => ReactNode;
}

function ViewGrid({ source, grid, renderItemViewGrid }: Props) {
  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 4,
        xl: 5,
        xxl: 5,
        ...grid,
      }}
      dataSource={source}
      renderItem={(item) =>
        renderItemViewGrid ? (
          <List.Item>{renderItemViewGrid(item)}</List.Item>
        ) : (
          <List.Item>
            <Card>
              <Flex justify="center" align="center" style={{ height: 100 }}>
                <SmileOutlined style={{ fontSize: 20 }} />
              </Flex>
            </Card>
          </List.Item>
        )
      }
    />
  );
}

export default ViewGrid;
