'use client';

import hopeLogo from '@/assets/img/hope_logo.svg';
import { SidebarMenuItems } from '@/constants/Menu';
import { usePathname, useRouter } from 'next/navigation';
import styles from '@/styles/modules/layouts.module.scss';
import { Divider, Flex, Layout, Menu, MenuProps } from 'antd';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [selectedKey, setSelectedKey] = useState(pathname);
  const [selectedOpenKeys, setSelectedOpenKeys] = useState<string[]>([]);

  useEffect(() => {
    const open = SidebarMenuItems.top
      .filter((item) => item.children?.some((child) => child.key === pathname))
      .map((item) => item.key);

    setSelectedKey(pathname);
    setSelectedOpenKeys([open[0]]);
  }, [pathname]);

  const menuItemsFormatted = useCallback((key: string) => {
    const items: MenuItem[] = SidebarMenuItems[key]?.map((item) => {
      return {
        key: item.key,
        icon: <item.icon />,
        label: item.label,
        children: item.children,
      };
    });
    return items;
  }, []);

  const handleNavigateToRoute: MenuProps['onClick'] = (e) => {
    router.push(e.key);
  };

  const handleOpenChange = (openKeys: string[]) => {
    setSelectedOpenKeys(openKeys);
  };

  const handleLogut: MenuProps['onClick'] = (e) => {
    if (e.key === 'logout') {
      router.push('/login');
    }
  };

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
          onClick={handleNavigateToRoute}
          onOpenChange={handleOpenChange}
          selectedKeys={[selectedKey]}
          openKeys={selectedOpenKeys}
          items={menuItemsFormatted('top')}
        />
        <Flex vertical>
          <Divider style={{ marginTop: 0, marginBottom: '20px' }} />
          <Menu
            id="hope_sidebar_menu"
            mode="inline"
            onClick={handleLogut}
            items={menuItemsFormatted('bottom')}
          />
        </Flex>
      </Flex>
    </Sider>
  );
}
