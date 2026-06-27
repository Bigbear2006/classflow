import { useQuery } from '@tanstack/react-query';
import { getCabinets } from '../../api/cabinets/requests.ts';

export const useCabinets = () => {
  return useQuery({
    placeholderData: [],
    queryKey: ['cabinets'],
    queryFn: getCabinets,
  });
};
