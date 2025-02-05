import { MePayload } from '@/models/schema';
import { serviceMe } from '@/services/auth/auth.service';
import { useQuery } from '@tanstack/react-query';

export const useFetchProfileQuery = (MePayload: MePayload) => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: () => serviceMe(MePayload),
    enabled: !!MePayload.accessToken,
  });
};
