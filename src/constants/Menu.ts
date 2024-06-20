import React, { ReactNode } from "react";
import { BsGearFill, BsPeopleFill, BsPersonBadge, BsDoorOpenFill } from "react-icons/bs";
import { t } from '@/utils/translator';
import { RoutesName } from "@/constants/index";

export type MenuItemType = {
    label: ReactNode;
    key: string;
    icon?: any;
    children?: MenuItemType[]
}
interface I_SidebarMenuItems {
    [key: string]: MenuItemType[];
}

const getItem = (
    label: ReactNode,
    key: string,
    icon?: any,
    children?: MenuItemType[]
): MenuItemType => {
    const item = {
        icon,
        label,
        key
    }

    return children ? { ...item, children } : item
};

export const SidebarMenuItems: I_SidebarMenuItems = {
    top: [
        getItem(t('_.menu.routes.users'), 'users', BsPeopleFill, [
            getItem(t('_.menu.routes.all'), RoutesName.user.index),
            getItem(t('_.menu.routes.patients'), RoutesName.patient.index),
            getItem(t('_.menu.routes.tutors'), RoutesName.tutor.index),
            getItem(t('_.menu.routes.therapists'), RoutesName.therapist.index),
        ]),
        getItem(t('_.menu.routes.methodology'), 'methodology', BsPersonBadge, [
            getItem(t('_.menu.routes.pictograms'), RoutesName.pictogram.index),
            getItem(t('_.menu.routes.activities'), RoutesName.activity.index),
            getItem(t('_.menu.routes.phases'), RoutesName.phase.index),
        ]),
        getItem(t('_.menu.routes.setting'), 'setting', BsGearFill, [
            getItem(t('_.menu.routes.categories'), RoutesName.category.index),
            getItem(t('_.menu.routes.achievements'), RoutesName.achievement.index),
            getItem(t('_.menu.routes.roles'), RoutesName.role.index),
        ]),
    ],
    bottom: [
        getItem('Cerrar sesión', 'logout', BsDoorOpenFill),
    ]
}