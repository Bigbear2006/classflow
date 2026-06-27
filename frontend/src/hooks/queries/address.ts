import { useQuery } from '@tanstack/react-query';
import { getAddresses } from '../../api/addresses/requests.ts';

export const useAddresses = () => {
  return useQuery({
    placeholderData: [],
    queryKey: ['addresses'],
    queryFn: getAddresses,
  });
};
