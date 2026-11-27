import { UserRole, UserStatus } from '@prisma/client';
import type { JwtPayload } from 'jsonwebtoken';
import prisma from '../../../shared/prisma';
import { sendImageToCloudinary } from '../../../utils/sendImageToCloudinary';
import type { TFile } from '../../interfaces/file';
import type { TAdminPayload } from '../Admin/admin.interface';
import type { TUserPayload } from '../User/user.interface';
import { passwordHashed } from './../Auth/auth.utils';
import type { TAccountUpdatePayload } from './account.interface';

const createAdminInToDB = async (
  file: TFile,
  password: string,
  userData: TAdminPayload,
) => {
  const hashPassword = await passwordHashed(password);

  if (file) {
    const path = file?.path;

    const imageName = `${userData?.name?.firstName}-${userData?.name?.middleName}-${userData?.name?.lastName}`;

    const { secure_url } = await sendImageToCloudinary(imageName, path);

    userData.profilePhoto = secure_url as string;
  }

  const modifiedAccountDataforBackEnd = {
    email: userData?.email,
    password: hashPassword,
    role: UserRole.ADMIN,
    status: UserStatus.ACTIVE,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    const createAccount = await transactionClient.account.create({
      data: { ...modifiedAccountDataforBackEnd },
    });

    const createAdmin = await transactionClient.admin.create({
      data: { ...userData },
    });

    return createAdmin;
  });

  return result;
};

const createUserInToDB = async (
  file: TFile,
  password: string,
  userData: TUserPayload,
) => {
  const hashPassword = await passwordHashed(password);

  if (file) {
    const path = file?.path;

    const imageName = `${userData?.name?.firstName}-${userData?.name?.middleName}-${userData?.name?.lastName}`;

    const { secure_url } = await sendImageToCloudinary(imageName, path);

    userData.profilePhoto = secure_url as string;
  }

  const modifiedAccountDataforBackEnd = {
    email: userData?.email,
    password: hashPassword,
    role: UserRole.USER,
    status: UserStatus.ACTIVE,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    const createAccount = await transactionClient.account.create({
      data: { ...modifiedAccountDataforBackEnd },
    });

    const createUser = await transactionClient.user.create({
      data: { ...userData },
    });

    return createUser;
  });

  return result;
};

const changeUserStatusInToDB = async (
  id: string,
  payload: {
    status: UserStatus;
  },
) => {
  const accountData = await prisma.account.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.account.update({
    where: {
      id,
    },
    data: {
      ...payload,
    },
  });

  return result;
};

const getMeFromDB = async (userInfo: JwtPayload) => {
  const accountData = await prisma.account.findUniqueOrThrow({
    where: {
      email: userInfo?.email,
      status: UserStatus.ACTIVE,
    },
    select: {
      id: true,
      email: true,
      role: true,
      passwordChangedAt: true,
      status: true,
    },
  });

  let profileData;

  if (accountData?.role === UserRole.ADMIN) {
    profileData = await prisma.admin.findUniqueOrThrow({
      where: {
        email: accountData?.email,
        isDeleted: false,
      },
    });
  }

  if (accountData?.role === UserRole.USER) {
    profileData = await prisma.user.findUniqueOrThrow({
      where: {
        email: accountData?.email,
        isDeleted: false,
      },
    });
  }

  const result = { ...accountData, ...profileData };

  return result;
};

const updateProfileInToDB = async (
  userInfo: JwtPayload,
  file: TFile,
  payload: TAccountUpdatePayload,
) => {
  const accountData = await prisma.account.findUniqueOrThrow({
    where: {
      email: userInfo?.email,
      status: UserStatus.ACTIVE,
    },
  });

  if (file) {
    const path = file?.path;

    const imageName = `${accountData?.id}`;

    const { secure_url } = await sendImageToCloudinary(imageName, path);

    payload.profilePhoto = secure_url as string;
  }

  let result;

  if (accountData?.role === UserRole.ADMIN) {
    const adminData = await prisma.admin.findUniqueOrThrow({
      where: {
        email: accountData?.email,
        isDeleted: false,
      },
    });

    result = await prisma.admin.update({
      where: {
        email: adminData?.email,
      },
      data: { ...payload },
    });
  }

  if (accountData?.role === UserRole.USER) {
    const userData = await prisma.user.findUniqueOrThrow({
      where: {
        email: accountData?.email,
        isDeleted: false,
      },
    });

    result = await prisma.user.update({
      where: {
        email: userData?.email,
      },
      data: { ...payload },
    });
  }
};

export const AccountService = {
  createAdminInToDB,
  createUserInToDB,
  changeUserStatusInToDB,
  getMeFromDB,
  updateProfileInToDB,
};
