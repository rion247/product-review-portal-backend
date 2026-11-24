import { StatusCodes } from 'http-status-codes';
import type { TErrorSources, TGenericErrorResponse } from '../interfaces/error';

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const statusCode = StatusCodes.CONFLICT;
  const message = 'Duplicatte Error!!!';

  const field = err.meta?.target[0];

  const formattedField = field.charAt(0).toUpperCase() + field.slice(1);

  const errorSources: TErrorSources = [
    {
      path: err.meta?.target[0],
      message: `${formattedField} already exists`,
    },
  ];

  return { statusCode, message, errorSources };
};

export default handleDuplicateError;
