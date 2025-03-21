import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

const useInvalidateQueries = () => {
  const queryClient = useQueryClient();

  const invalidateQueries = useCallback(async (queries: string[]) => {
    await queryClient.invalidateQueries({
      queryKey: queries,
    });
  }, []);

  return [invalidateQueries];
};

export default useInvalidateQueries;
