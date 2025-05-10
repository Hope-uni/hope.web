'use client';

import hopeLogo from '@/assets/img/hope_logo.svg';
import {
  MenuItemType,
  SIDEBAR_MENU,
  SidebarMenuItems,
  SiderMenuType,
} from '@/constants/Menu';
import useLogout from '@/hooks/useLogout';
import { useCan } from '@/lib/access-guard';
import { MethodGuardValidation } from '@/lib/access-guard/helpers';
import styles from '@/styles/modules/layouts.module.scss';
import { Divider, Flex, Grid, Image, Layout, Menu, MenuProps } from 'antd';
import { CollapseType } from 'antd/lib/layout/Sider';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
const { Sider } = Layout;

const { useBreakpoint } = Grid;

type MenuItem = Required<MenuProps>['items'][number];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const screen = useBreakpoint();
  const { can } = useCan();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState(pathname);
  const [selectedOpenKeys, setSelectedOpenKeys] = useState<string[]>([]);
  const { logout } = useLogout();

  useEffect(() => {
    const open = SidebarMenuItems.middle
      .filter((item) => item.children?.some((child) => child.key === pathname))
      .map((item) => item.key);

    setSelectedKey(pathname);
    setSelectedOpenKeys([open[0]]);
  }, [pathname, collapsed]);

  const filterSidebarItemsWithGuard = useCallback(
    (items: MenuItemType[]): MenuItemType[] => {
      return items
        .filter((item) => {
          if (item.guard && item.guard?.length > 0) {
            return can(item.guard, MethodGuardValidation.ROLE);
          }
          return true;
        })
        .map((item) => {
          const newItem = { ...item };
          if (newItem.children) {
            newItem.children = filterSidebarItemsWithGuard(newItem.children);
          }
          return newItem;
        })
        .filter((item) =>
          Object.hasOwn(item, 'children')
            ? item.children && item.children.length > 0
            : true,
        );
    },
    [can],
  );

  const menuItemsFormatted = useCallback(
    (key: SiderMenuType) => {
      const SidebarMenuWithOutChildrenFilters = filterSidebarItemsWithGuard(
        SidebarMenuItems[key],
      );

      const items: MenuItem[] = SidebarMenuWithOutChildrenFilters?.map(
        (item) => {
          return {
            key: item.key,
            icon: <item.icon />,
            label: item.label,
            children: item.children,
          };
        },
      );
      return items;
    },
    [filterSidebarItemsWithGuard],
  );

  const handleNavigateToRoute: MenuProps['onClick'] = (e) => {
    router.push(e.key);
    if (screen.xs) {
      setCollapsed(true);
    }
  };

  const handleOpenChange = (openKeys: string[]) => {
    setSelectedOpenKeys(openKeys);
  };

  const handleLogut: MenuProps['onClick'] = async (e) => {
    if (e.key === 'logout') {
      await logout();
    }
  };

  const handleCollapsed = (collapsed: boolean, type: CollapseType) => {
    setCollapsed(collapsed);
  };

  return (
    <Sider
      collapsed={collapsed}
      className={styles.wrapper_sidebar}
      width={300}
      breakpoint="lg"
      collapsedWidth="0"
      onCollapse={handleCollapsed}
    >
      <div className={styles.sidebar_logo}>
        <Image src={hopeLogo} alt="hope_admin" width={120} height={90} />
      </div>
      <Flex className={styles.flex_menu} vertical justify="space-between">
        <Flex vertical>
          <Menu
            id="hope_sidebar_menu"
            mode="inline"
            onClick={handleNavigateToRoute}
            onOpenChange={handleOpenChange}
            selectedKeys={[selectedKey]}
            openKeys={selectedOpenKeys}
            items={menuItemsFormatted(SIDEBAR_MENU.TOP)}
          />
          <Divider style={{ marginTop: 0, marginBottom: '20px' }} />
          <Menu
            id="hope_sidebar_menu"
            mode="inline"
            onClick={handleNavigateToRoute}
            onOpenChange={handleOpenChange}
            selectedKeys={[selectedKey]}
            openKeys={selectedOpenKeys}
            items={menuItemsFormatted(SIDEBAR_MENU.MIDDLE)}
          />
        </Flex>
        <Flex vertical>
          <Divider style={{ marginTop: 0, marginBottom: '20px' }} />
          <Menu
            id="hope_sidebar_menu"
            mode="inline"
            onClick={handleLogut}
            items={menuItemsFormatted(SIDEBAR_MENU.BOTTOM)}
          />
        </Flex>
      </Flex>
    </Sider>
  );
}
