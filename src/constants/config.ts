import {
  BsPencilFill,
  BsTrash2Fill,
  BsFillPersonCheckFill,
} from 'react-icons/bs';
import { FaEye, FaUserPlus } from 'react-icons/fa';
import i18next from '@/i18n';
import {
  I_HopeTableConfig,
  SizeChangerOptionsType,
} from '@/models/types/Table';
import placeholderImage from '@/assets/img/placeholderImage_bn.svg';

export const HopeLocales = {
  languages: ['es', 'en'],
  default: 'es',
};

const sizeChanger = ['1', '5', '10', '25', '50', '100'];

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
  actionTableOptions: [
    {
      label: i18next.t('components.popupActions.show.label'),
      icon: FaEye,
      key: '1',
      actionType: 'show',
      colorClassName: 'text-color-link',
    },
    {
      label: i18next.t('components.popupActions.edit.label'),
      icon: BsPencilFill,
      key: '2',
      actionType: 'edit',
      colorClassName: 'text-color-link',
    },
    {
      label: i18next.t('components.popupActions.assign_patients.label'),
      icon: FaUserPlus,
      key: '3',
      actionType: 'assign_patient',
      colorClassName: 'text-color-link',
    },
    {
      label: i18next.t('components.popupActions.ediAssigments.label'),
      icon: BsFillPersonCheckFill,
      key: '4',
      actionType: 'assign',
      colorClassName: 'text-color-link',
    },
    {
      label: i18next.t('components.popupActions.delete.label'),
      icon: BsTrash2Fill,
      key: '5',
      actionType: 'delete',
      colorClassName: 'text-color-error',
    },
  ],
};

export const ImageConfig = {
  defaultPlaceholder: placeholderImage,
};
