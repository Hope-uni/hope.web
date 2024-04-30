import {
    BsPencilFill,
    BsTrash2Fill,
    BsFillPersonCheckFill,
} from 'react-icons/bs';
import { FaEye } from 'react-icons/fa';
import { t } from '@/utils/translator';
import { I_HopeTableConfig, SizeChangerOptionsType } from '@/models/types/Table';

export const HopeLocales = {
    languages: ['es', 'en'],
    default: 'es'
};

const sizeChanger = ['5', '10', '25', '50', '100']

export const HopeTable: I_HopeTableConfig = {
    sizeChangerOptions: sizeChanger.reduce((acc: SizeChangerOptionsType[], cur: string) => [
        ...acc,
        {
            value: cur, label: `${cur}/${t('_.components.table.page')}`
        }
    ], []),
    actionTableOptions: [
        {
            label: 'Ver detalle',
            icon: FaEye,
            key: '1',
            actionType: 'show',
            colorClassName: 'text-color-link',
        },
        {
            label: 'Editar',
            icon: BsPencilFill,
            key: '2',
            actionType: 'edit',
            colorClassName: 'text-color-link',
        },
        {
            label: 'Editar asignaciones',
            icon: BsFillPersonCheckFill,
            key: '3',
            actionType: 'assign',
            colorClassName: 'text-color-link',
        },
        {
            label: 'Deshabilitar',
            icon: BsTrash2Fill,
            key: '4',
            actionType: 'delete',
            colorClassName: 'text-color-error',
        },
    ]
}