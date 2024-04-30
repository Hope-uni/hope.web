'use client';

import React, { useReducer, useMemo, ReactNode } from 'react';
import { TableContext } from './TableContext';
import { TableReducer, initialState } from './TableReducer';

export const TableProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(TableReducer, initialState);

  const sharedState = useMemo(() => {
    return {
      state,
      dispatch,
    };
  }, [state, dispatch]);

  return (
    <TableContext.Provider value={sharedState}>
      {children}
    </TableContext.Provider>
  );
};
