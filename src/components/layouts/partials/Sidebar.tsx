'use client';

import HopeLogo from '@/components/common/hopeLogo';
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
import { Divider, Flex, Grid, Layout, Menu, MenuProps } from 'antd';
import { CollapseType } from 'antd/lib/layout/Sider';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import {
  TbLayoutSidebarLeftCollapseFilled,
  TbLayoutSidebarRightCollapseFilled,
} from 'react-icons/tb';

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
            popupClassName: 'hidden',
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
    const lastItemOpen = openKeys[openKeys.length - 1];
    setSelectedOpenKeys([lastItemOpen]);
  };

  const handleLogout: MenuProps['onClick'] = async (e) => {
    if (e.key === 'logout') {
      await logout();
    }
  };

  const handleCollapsed = (collapsed: boolean, type: CollapseType) => {
    setCollapsed(collapsed);
  };

  return (
    <Sider
      id="hope_sidebar"
      collapsed={collapsed}
      collapsible={!screen.xxl}
      className={styles.wrapper_sidebar}
      width={300}
      breakpoint="xl"
      collapsedWidth="0"
      onCollapse={handleCollapsed}
      trigger={
        collapsed ? (
          <TbLayoutSidebarRightCollapseFilled />
        ) : (
          <TbLayoutSidebarLeftCollapseFilled />
        )
      }
    >
      <div className={styles.wrapper_sidebar_scroll}>
        <div className={styles.sidebar_logo_wrapper}>
          <div className={styles.sidebar_logo}>
            <HopeLogo width={120} height={90} />
            {!screen.xxl && screen.lg && (
              <TbLayoutSidebarLeftCollapseFilled
                className={styles.sidebar_toggle}
                onClick={() => setCollapsed(true)}
              />
            )}
          </div>
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
              onClick={handleLogout}
              items={menuItemsFormatted(SIDEBAR_MENU.BOTTOM)}
            />
          </Flex>
        </Flex>
      </div>
    </Sider>
  );
}
