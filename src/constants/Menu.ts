import React, { ReactNode } from "react";
import { BiSolidCategory } from "react-icons/bi";
import { BsFillAwardFill, BsPersonBadge, BsPuzzleFill, BsDoorOpenFill } from "react-icons/bs";
import { FaUserFriends, FaUserShield, FaUsersCog } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { IoMdListBox } from "react-icons/io";
import { t } from '@/utils/translator';

export type MenuItemType = {
    label: ReactNode;
    path: string;
    icon?: any;
}

interface I_SidebarMenuItems {
    [key: string]: MenuItemType[];
}

export const RoutesName = {
    patient: {
        index: '/admin/patients',
        create: '/admin/patients/create'
    },
    tutor: {
        index: '/admin/tutors',
        create: '/admin/tutors/create'
    },
    therapist: {
        index: '/admin/therapists',
        create: '/admin/therapists/create'
    },
    pictogram: {
        index: '/admin/pictograms',
        create: '/admin/pictograms/create'
    },
    category: {
        index: '/admin/categories',
        create: '/admin/categories/create'
    },
    activity: {
        index: '/admin/activities',
        create: '/admin/activities/create'
    },
    achievement: {
        index: '/admin/achievements',
        create: '/admin/achievements/create'
    },
    user: {
        index: '/admin/users',
        create: '/admin/users/create'
    },
    role: {
        index: '/admin/roles',
        create: '/admin/roles/create'
    },
}

const getItem = (
    label: ReactNode,
    path: string,
    icon?: any,
) => {
    return {
        path,
        icon,
        label,
    };
}

export const SidebarMenuItems: I_SidebarMenuItems = {
    top: [
        getItem(t('_.menu.routes.patients'), RoutesName.patient.index, BsPersonBadge),
        getItem(t('_.menu.routes.tutors'), RoutesName.tutor.index, FaUserShield),
        getItem(t('_.menu.routes.therapists'), RoutesName.therapist.index, FaUserDoctor),
        getItem(t('_.menu.routes.pictograms'), RoutesName.pictogram.index, BsPuzzleFill),
        getItem(t('_.menu.routes.categories'), RoutesName.category.index, BiSolidCategory),
        getItem(t('_.menu.routes.activities'), RoutesName.activity.index, IoMdListBox),
        getItem(t('_.menu.routes.achievements'), RoutesName.achievement.index, BsFillAwardFill),
        getItem(t('_.menu.routes.users'), RoutesName.user.index, FaUserFriends),
        getItem(t('_.menu.routes.roles'), RoutesName.role.index, FaUsersCog),
    ],
    bottom: [
        getItem('Cerrar sesión', 'logout', BsDoorOpenFill),
    ]
}