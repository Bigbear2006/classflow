import { toast } from 'sonner';

interface UseConfirmProps<T> {
  message: string;
  action: (args: T) => any;
  actionLabel: string;
}

export const useConfirm = <T>({
  message,
  action,
  actionLabel,
}: UseConfirmProps<T>): ((args: T) => void) => {
  return (args: T) => {
    toast(message, {
      action: { label: actionLabel, onClick: () => action(args) },
      cancel: { label: 'Отмена', onClick: () => {} },
    });
  };
};
