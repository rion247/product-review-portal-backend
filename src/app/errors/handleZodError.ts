import { StatusCodes } from 'http-status-codes';
import type { ZodError } from 'zod';
import type { TErrorSources, TGenericErrorResponse } from '../interfaces/error';

const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const statusCode = StatusCodes.BAD_REQUEST;

  const message = 'Validation Error';

  const errorSources: TErrorSources = err?.issues?.map((issue) => {
    return {
      path: issue?.path[issue?.path?.length - 1] as string | number,
      message: issue?.message,
    };
  });

  return { statusCode, message, errorSources };
};

export default handleZodError;
