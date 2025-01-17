import { ReactNode } from 'react';
import {
  BsGearFill,
  BsPeopleFill,
  BsPersonBadge,
  BsDoorOpenFill,
} from 'react-icons/bs';
import i18next from '@/i18n';
import { RoutesName } from '@/constants/index';

export type MenuItemType = {
  label: ReactNode;
  key: string;
  icon?: any;
  children?: MenuItemType[];
};
interface I_SidebarMenuItems {
  [key: string]: MenuItemType[];
}

const getItem = (
  label: ReactNode,
  key: string,
  icon?: any,
  children?: MenuItemType[],
): MenuItemType => {
  const item = {
    icon,
    label,
    key,
  };

  return children ? { ...item, children } : item;
};

export const SidebarMenuItems: I_SidebarMenuItems = {
  top: [
    getItem(i18next.t('menu.routes.users'), 'users', BsPeopleFill, [
      getItem(i18next.t('menu.routes.all'), RoutesName.user.index),
      getItem(i18next.t('menu.routes.patients'), RoutesName.patient.index),
      getItem(i18next.t('menu.routes.tutors'), RoutesName.tutor.index),
      getItem(i18next.t('menu.routes.therapists'), RoutesName.therapist.index),
    ]),
    getItem(
      i18next.t('menu.routes.methodology'),
      'methodology',
      BsPersonBadge,
      [
        getItem(
          i18next.t('menu.routes.pictograms'),
          RoutesName.pictogram.index,
        ),
        getItem(i18next.t('menu.routes.activities'), RoutesName.activity.index),
        getItem(i18next.t('menu.routes.phases'), RoutesName.phase.index),
      ],
    ),
    getItem(i18next.t('menu.routes.setting'), 'setting', BsGearFill, [
      getItem(i18next.t('menu.routes.categories'), RoutesName.category.index),
      getItem(
        i18next.t('menu.routes.achievements'),
        RoutesName.achievement.index,
      ),
      getItem(i18next.t('menu.routes.roles'), RoutesName.role.index),
    ]),
  ],
  bottom: [getItem('Cerrar sesión', 'logout', BsDoorOpenFill)],
};
