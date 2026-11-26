import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import type { TFile } from '../../interfaces/file';
import { AccountService } from './account.service';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { password, user } = req.body;

  const file = req.file;

  const result = await AccountService.createUserInToDB(
    file as TFile,
    password,
    user,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User created successfully!!!',
    data: result,
  });
});

export const AccountController = {
  createUser,
};
