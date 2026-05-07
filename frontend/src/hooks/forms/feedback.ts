import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const FeedbackSchema = z.object({
  rating: z.number().min(1).max(5),
  text: z.string(),
});

export type FeedbackFields = z.infer<typeof FeedbackSchema>;

export const useFeedbackForm = () => {
  return useForm<FeedbackFields>({ resolver: zodResolver(FeedbackSchema) });
};
