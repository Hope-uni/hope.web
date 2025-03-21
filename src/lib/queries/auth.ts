import { QueryKeys } from '@/constants';
import { MePayload } from '@/models/schema';
import { serviceMe } from '@/services/auth/auth.service';
import { useQuery } from '@tanstack/react-query';

export const useFetchProfileQuery = (MePayload: MePayload) => {
  return useQuery({
    queryKey: [QueryKeys.User.Profile],
    queryFn: () => serviceMe(MePayload),
    enabled: !!MePayload.accessToken,
  });
};
