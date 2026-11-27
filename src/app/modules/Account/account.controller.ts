import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import type { TFile } from '../../interfaces/file';
import { AccountService } from './account.service';

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const { password, admin } = req.body;

  const file = req.file;

  const result = await AccountService.createAdminInToDB(
    file as TFile,
    password,
    admin,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Admin created successfully!!!',
    data: result,
  });
});

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

const changeUserStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await AccountService.changeUserStatusInToDB(
    id as string,
    req.body,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User status changed successfully!!!',
    data: result,
  });
});

const getMe = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  const result = await AccountService.getMeFromDB(user);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Profile is retrived successfully',
    data: result,
  });
});

const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  const file = req.file;

  const result = await AccountService.updateProfileInToDB(
    user,
    file as TFile,
    req.body,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Profile updated successfully',
    data: result,
  });
});

export const AccountController = {
  createAdmin,
  createUser,
  changeUserStatus,
  getMe,
  updateProfile,
};
