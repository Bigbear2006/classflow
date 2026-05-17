import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';
import { toast } from 'sonner';
import { isAxiosError } from 'axios';

interface ResponseError {
  errorCode?: string;
  statusCode?: number;
}

interface UseCustomMutationOptions<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TOnMutateResult = unknown,
> extends UseMutationOptions<TData, TError, TVariables, TOnMutateResult> {
  invalidateQueryKeyOnSuccess?: any[];
  toastErrorMessage?: string | ((err: ResponseError) => string);
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
      if (options.toastErrorMessage) {
        let errorCode: string | undefined;
        let statusCode: number | undefined;
        if (isAxiosError(error)) {
          errorCode = error.response?.data.code;
          statusCode = error.status;
        }
        toast.error(
          typeof options.toastErrorMessage === 'string'
            ? options.toastErrorMessage
            : options.toastErrorMessage({ errorCode, statusCode }),
        );
      }
      options.onError?.(error, variables, onMutateResult, context);
    },
  });
};
