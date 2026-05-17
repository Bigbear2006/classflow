import type { ReactNode } from 'react';

interface ModalProps {
  children: ReactNode;
  close: () => void;
}

export const Modal = ({ children, close }: ModalProps) => {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      onClick={close}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
