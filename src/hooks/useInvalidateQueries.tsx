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

  return { invalidateQueries, queryClient };
};

export default useInvalidateQueries;
