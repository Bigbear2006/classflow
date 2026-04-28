import { useQuery } from '@tanstack/react-query';
import { getCabinets } from '../../api/cabinets/requests.ts';

export const useCabinets = () => {
  return useQuery({
    initialData: [],
    queryKey: ['cabinets'],
    queryFn: getCabinets,
  });
};
