import React, { ReactNode } from "react";
import { BiSolidCategory } from "react-icons/bi";
import { BsFillAwardFill, BsPersonBadge, BsPuzzleFill, BsDoorOpenFill } from "react-icons/bs";
import { FaUserFriends, FaUserShield } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { IoMdListBox } from "react-icons/io";

function getItem(
    label: ReactNode,
    key: React.Key,
    icon?: any,
) {
    return {
        key,
        icon,
        label,
    };
}

export const SidebarMenuItems = {
    top: [
        getItem('Pacientes', 'patients', BsPersonBadge),
        getItem('Tutores', 'tutors', FaUserShield),
        getItem('Terapeutas', 'therapists', FaUserDoctor),
        getItem('Pictogramas', 'pictograms', BsPuzzleFill),
        getItem('Categorías', 'categories', BiSolidCategory),
        getItem('Actividades', 'activities', IoMdListBox),
        getItem('Logros', 'achievements', BsFillAwardFill),
        getItem('Usuarios', 'patient', FaUserFriends),
    ],
    bottom: [
        getItem('Cerrar sesión', 'logout', BsDoorOpenFill),
    ]
}