import { ErrorCard } from './ErrorCard.tsx';

interface ErrorsBlockProps {
  errors: { message?: string }[];
}

export const ErrorsBlock = ({ errors }: ErrorsBlockProps) => {
  return (
    <>
      {Object.values(errors).map(
        (error, index) => error.message && <ErrorCard key={index} message={error.message} />,
      )}
    </>
  );
};
