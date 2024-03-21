'use client';

import hopeLogo from '@/assets/img/hope_logo.svg';
import { SidebarMenuItems } from '@/constants/Menu';
import { Link } from '@/intl-navigation';
import styles from '@/styles/modules/layouts.module.scss';
import { Divider, Flex, Layout, Menu } from 'antd';
import Image from 'next/image';

const { Sider } = Layout;

export default function AuthLayout() {
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
          items={SidebarMenuItems.top?.map((item) => ({
            key: item.key,
            type: 'group',
            label: (
              <>
                <Link
                  href={`/${item.key}`}
                  className={`${item.label === 'Pacientes' ? 'active' : ''}`}
                >
                  <item.icon size="20px" />
                  {item.label}
                </Link>
              </>
            ),
          }))}
        />
        <Flex vertical>
          <Divider style={{ marginTop: 0, marginBottom: '20px' }} />
          <Menu
            id="hope_sidebar_menu"
            mode="inline"
            items={SidebarMenuItems.bottom?.map((item) => ({
              key: item.key,
              type: 'group',
              label: (
                <>
                  <Link
                    href={`/${item.key}`}
                    className={`${item.label === 'Pacientes' ? 'active' : ''}`}
                  >
                    <item.icon size="20px" />
                    {item.label}
                  </Link>
                </>
              ),
            }))}
          />
        </Flex>
      </Flex>
    </Sider>
  );
}
