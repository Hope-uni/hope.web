import placeholderImage from '@/assets/img/placeholderImage_bn.svg';
import i18next from '@/i18n';
import {
  ActionTableOptionsType,
  I_HopeTableConfig,
  SizeChangerOptionsType,
} from '@/models/types/Table';
import {
  BsFillPersonCheckFill,
  BsPencilFill,
  BsTrash2Fill,
} from 'react-icons/bs';
import { FaEye, FaMinus, FaPlus, FaUserPlus } from 'react-icons/fa';

export const HopeLocales = {
  languages: ['es', 'en'],
  default: 'es',
};

const sizeChanger = ['1', '5', '10', '25', '50', '100'];

const ActionTableOptions: Omit<ActionTableOptionsType, 'key'>[] = [
  {
    label: i18next.t('components.popupActions.show.label'),
    icon: FaEye,
    actionType: 'show',
    colorClassName: 'text-color-link',
  },
  {
    label: i18next.t('components.popupActions.edit.label'),
    icon: BsPencilFill,
    actionType: 'edit',
    colorClassName: 'text-color-link',
  },
  {
    label: i18next.t('components.popupActions.assign_patients.label'),
    icon: FaUserPlus,
    actionType: 'assign_patient',
    colorClassName: 'text-color-link',
  },
  {
    label: i18next.t('components.popupActions.unassign_patients.label'),
    icon: FaUserPlus,
    actionType: 'unassign_patient',
    colorClassName: 'text-color-link',
  },
  {
    label: i18next.t('components.popupActions.assign_activity.label'),
    icon: FaPlus,
    actionType: 'assign_activity',
    colorClassName: 'text-color-link',
  },
  {
    label: i18next.t('components.popupActions.unassign_activity.label'),
    icon: FaMinus,
    actionType: 'unassign_activity',
    colorClassName: 'text-color-link',
  },
  {
    label: i18next.t('components.popupActions.ediAssigments.label'),
    icon: BsFillPersonCheckFill,
    actionType: 'assign',
    colorClassName: 'text-color-link',
  },
  {
    label: i18next.t('components.popupActions.delete.label'),
    icon: BsTrash2Fill,
    actionType: 'delete',
    colorClassName: 'text-color-error',
  },
];

export const HopeTable: I_HopeTableConfig = {
  sizeChangerOptions: sizeChanger.reduce(
    (acc: SizeChangerOptionsType[], cur: string) => [
      ...acc,
      {
        value: cur,
        label: `${cur}/${i18next.t('components.table.page')}`,
      },
    ],
    [],
  ),
  actionTableOptions: ActionTableOptions.map((item, index) => ({
    ...item,
    key: String(index + 1),
  })) as ActionTableOptionsType[],
};

export const ImageConfig = {
  defaultPlaceholder: placeholderImage,
};
