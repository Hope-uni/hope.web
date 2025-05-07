import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

const useInvalidateQueries = () => {
  const queryClient = useQueryClient();

  const invalidateQueries = useCallback(
    async (queries: string[]) => {
      await queryClient.invalidateQueries({
        queryKey: queries,
      });
    },
    [queryClient],
  );

  const removeQueries = useCallback(
    async (queries: string[]) => {
      await queryClient.removeQueries({
        queryKey: queries,
      });
    },
    [queryClient],
  );

  return { invalidateQueries, removeQueries, queryClient };
};

export default useInvalidateQueries;
