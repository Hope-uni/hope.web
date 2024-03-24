'use client';

import hopeLogo from '@/assets/img/hope_logo.svg';
import { SidebarMenuItems } from '@/constants/Menu';
import { Link } from '@/intl-navigation';
import styles from '@/styles/modules/layouts.module.scss';
import { Divider, Flex, Layout, Menu } from 'antd';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import SidebarItem from '@/components/layouts/partials/SidebarItem';

const { Sider } = Layout;

export default function Sidebar() {
  const pathname = usePathname();

  console.log(pathname);

  const menuItemsFormatted = useCallback(
    (key: string) => {
      return SidebarMenuItems[key]?.map((item) => {
        return {
          key: item.path,
          type: 'group',
          label: <SidebarItem item={item} />,
        };
      });
    },
    [SidebarMenuItems],
  );

  return (
    <Sider
      className={styles.wrapper_sidebar}
      width={300}
      breakpoint="lg"
      collapsedWidth="0"
    >
      <div className={styles.sidebar_logo}>
        <Image src={hopeLogo} alt="hope_admin" width={120} height={90} />
      </div>
      <Flex className={styles.flex_menu} vertical justify="space-between">
        <Menu
          id="hope_sidebar_menu"
          mode="inline"
          selectedKeys={['patients']}
          items={menuItemsFormatted('top')}
        />
        <Flex vertical>
          <Divider style={{ marginTop: 0, marginBottom: '20px' }} />
          <Menu
            id="hope_sidebar_menu"
            mode="inline"
            items={menuItemsFormatted('bottom')}
          />
        </Flex>
      </Flex>
    </Sider>
  );
}
