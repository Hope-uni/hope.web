import { initialState, TableReducer } from '@/context/Table/TableReducer';
import { I_TableState } from '@/models/types';
import { create } from 'zustand';
import { redux } from 'zustand/middleware';

export interface I_TableReduxState extends I_TableState {
  dispatch: any;
}

export const useTableStore = create<I_TableReduxState>()(
  redux(TableReducer, initialState),
);
