'use client';

import dashboard_welcome from '@/assets/img/dashboardWelcome.png';
import { Flex, Grid } from 'antd';
import Image from 'next/image';

const { useBreakpoint } = Grid;

export default function Admin() {
  const screens = useBreakpoint();

  return (
    <div>
      <Flex vertical gap={20} justify="center" align="center">
        {/* <h1>Bienvenido</h1> */}
        <Image
          src={dashboard_welcome}
          alt="hope_logo"
          width={screens.sm ? 400 : 250}
        />
      </Flex>
    </div>
  );
}
