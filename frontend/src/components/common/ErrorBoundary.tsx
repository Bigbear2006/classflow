import { isRouteErrorResponse, Link, useRouteError } from 'react-router';

export const ErrorBoundary = () => {
  const error = useRouteError();

  let errorMessage = 'An error occurred';
  if (isRouteErrorResponse(error)) {
    errorMessage = `${error.status} ${error.statusText}`;
  }

  return (
    <div className="bg-white p-6">
      <h1>{errorMessage}</h1>
      <Link to="/" replace>
        На главную
      </Link>
    </div>
  );
};
