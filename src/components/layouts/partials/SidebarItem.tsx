'use client';

import { MenuItemType } from '@/constants/Menu';
import { Link } from '@/intl-navigation';
import { usePathname } from 'next/navigation';

interface Props {
  item: MenuItemType;
}

export default function SidebarItem({ item }: Props) {
  const pathname = usePathname();

  return (
    <Link
      href={`${item.path}`}
      className={`${pathname.includes(item.path) ? 'active' : ''}`}
    >
      <item.icon size="20px" />
      {item.label}
    </Link>
  );
}
