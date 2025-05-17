import { RoutesName } from '@/constants/index';
import i18next from '@/i18n';
import { ReactNode } from 'react';
import { BiSolidDashboard } from 'react-icons/bi';
import {
  BsDoorOpenFill,
  BsGearFill,
  BsPeopleFill,
  BsPersonBadge,
} from 'react-icons/bs';
import { PermissionType, ROLES } from '@/constants/guards';
import { RoleType } from '@/constants/guards/types';

export const SIDEBAR_MENU = {
  TOP: 'top',
  MIDDLE: 'middle',
  BOTTOM: 'bottom',
} as const;
export type SiderMenuType = (typeof SIDEBAR_MENU)[keyof typeof SIDEBAR_MENU];

export type MenuItemBaseType = {
  key: string;
  guard?: string[];
};

export type MenuItemType = {
  label: ReactNode;
  key: string;
  icon?: any;
  guard?: PermissionType[] | RoleType[];
  children?: MenuItemType[];
};
type SidebarMenuItemsType = {
  [k in SiderMenuType]: MenuItemType[];
};

export const SidebarMenuItems: SidebarMenuItemsType = {
  top: [
    {
      label: i18next.t('menu.routes.dashboard'),
      key: RoutesName.dashboard.index,
      icon: BiSolidDashboard,
      guard: [ROLES.SUPERADMIN, ROLES.ADMIN],
    },
  ],
  middle: [
    {
      label: i18next.t('menu.routes.users'),
      key: 'users',
      icon: BsPeopleFill,
      children: [
        {
          label: i18next.t('menu.routes.all'),
          key: RoutesName.user.index,
          guard: [ROLES.SUPERADMIN, ROLES.ADMIN],
        },
        {
          label: i18next.t('menu.routes.patients'),
          key: RoutesName.patient.index,
          guard: [ROLES.SUPERADMIN, ROLES.ADMIN],
        },
        {
          label: i18next.t('menu.routes.tutors'),
          key: RoutesName.tutor.index,
          guard: [ROLES.SUPERADMIN, ROLES.ADMIN],
        },
        {
          label: i18next.t('menu.routes.therapists'),
          key: RoutesName.therapist.index,
          guard: [ROLES.SUPERADMIN, ROLES.ADMIN],
        },
      ],
    },
    {
      label: i18next.t('menu.routes.methodology'),
      key: 'methodology',
      icon: BsPersonBadge,
      children: [
        {
          label: i18next.t('menu.routes.pictograms'),
          key: RoutesName.pictogram.index,
          guard: [ROLES.SUPERADMIN, ROLES.ADMIN],
        },
        {
          label: i18next.t('menu.routes.activities'),
          key: RoutesName.activity.index,
          guard: [ROLES.SUPERADMIN, ROLES.ADMIN],
        },
        {
          label: i18next.t('menu.routes.phases'),
          key: RoutesName.phase.index,
          guard: [ROLES.SUPERADMIN, ROLES.ADMIN],
        },
      ],
    },
    {
      label: i18next.t('menu.routes.setting'),
      key: 'setting',
      icon: BsGearFill,
      children: [
        {
          label: i18next.t('menu.routes.categories'),
          key: RoutesName.category.index,
          guard: [ROLES.SUPERADMIN, ROLES.ADMIN],
        },
        {
          label: i18next.t('menu.routes.achievements'),
          key: RoutesName.achievement.index,
          guard: [ROLES.SUPERADMIN, ROLES.ADMIN],
        },
        {
          label: i18next.t('menu.routes.roles'),
          key: RoutesName.role.index,
          guard: [ROLES.SUPERADMIN],
        },
      ],
    },
  ],
  bottom: [
    {
      label: i18next.t('menu.routes.logout'),
      key: RoutesName.logout.index,
      icon: BsDoorOpenFill,
    },
  ],
};

const extractGuardsFromMenu = (menu: SidebarMenuItemsType) => {
  const guards: MenuItemBaseType[] = [];

  function traverse(items: MenuItemType[]) {
    for (const item of items) {
      if (item.key && Array.isArray(item.guard)) {
        guards.push({ key: item.key, guard: item.guard });
      }
      if (Array.isArray(item.children)) {
        traverse(item.children);
      }
    }
  }

  Object.values(menu).forEach((section) => traverse(section));
  return guards;
};

export const RouterGuards: MenuItemBaseType[] =
  extractGuardsFromMenu(SidebarMenuItems);
