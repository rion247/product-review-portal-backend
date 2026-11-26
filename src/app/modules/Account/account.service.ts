import { UserRole, UserStatus } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { sendImageToCloudinary } from '../../../utils/sendImageToCloudinary';
import type { TFile } from '../../interfaces/file';
import type { TUserPayload } from '../User/user.interface';
import { passwordHashed } from './../Auth/auth.utils';

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

export const AccountService = {
  createUserInToDB,
};
