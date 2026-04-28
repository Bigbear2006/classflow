import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';
import { toast } from 'sonner';

interface UseCustomMutationOptions<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TOnMutateResult = unknown,
> extends UseMutationOptions<TData, TError, TVariables, TOnMutateResult> {
  invalidateQueryKeyOnSuccess: string[];
  toastErrorMessage: string;
}

export const useCustomMutation = <
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TOnMutateResult = unknown,
>(
  options: UseCustomMutationOptions<TData, TError, TVariables, TOnMutateResult>,
) => {
  return useMutation({
    ...options,
    onSuccess: (data, variables, onMutateResult, context) => {
      context.client
        .invalidateQueries({ queryKey: options.invalidateQueryKeyOnSuccess })
        .then(() => options.onSuccess?.(data, variables, onMutateResult, context));
    },
    onError: (error, variables, onMutateResult, context) => {
      toast.error(options.toastErrorMessage);
      options.onError?.(error, variables, onMutateResult, context);
    },
  });
};
