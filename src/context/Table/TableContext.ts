import { createContext, useContext } from "react";
import { initialState } from '@/context/Table/TableReducer';
import { I_TableState } from "@/models/types/Table";


interface TableReducer {
    state: I_TableState;
    dispatch: any
}

export const TableContext = createContext<TableReducer>({
    state: initialState,
    dispatch: null
});

export const useTable = () => useContext(TableContext);