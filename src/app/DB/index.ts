import { UserRole, UserStatus } from '@prisma/client';
import prisma from '../../shared/prisma';
import config from '../config';
import { passwordHashed } from '../modules/Auth/auth.utils';
import type {
  TGender,
  TName,
  TSuperAdmin,
} from '../modules/SuperAdmin/superAdmin.interface';

const seedSuperAdminInToDB = async () => {
  const isSuperAdminExist = await prisma.account.findFirst({
    where: {
      role: UserRole.SUPER_ADMIN,
    },
  });

  if (isSuperAdminExist) {
    console.log('Super Admin Data Found!!!');
    return;
  }

  const hashPassword = await passwordHashed(
    config.super_admin_password as string,
  );

  const modifiedAccountDataforBackEnd: {
    email: string;
    password: string;
    role: UserRole;
    status: UserStatus;
  } = {
    email: config.super_admin_email as string,
    password: hashPassword,
    role: UserRole.SUPER_ADMIN,
    status: UserStatus.ACTIVE,
  };

  const modifiedSuperAdminDataforBackEnd: TSuperAdmin = {
    name: {
      firstName: config.super_admin_first_name as string,
      middleName: config.super_admin_middle_name,
      lastName: config.super_admin_last_name as string,
    } as TName,
    email: config.super_admin_email as string,
    gender: config.super_admin_gender as TGender,
    address: config.super_admin_address as string,
    contactNumber: config.super_admin_contact_number as string,
    profilePhoto: config.super_admin_profile_photo as string,
    isDeleted: false,
  };

  try {
    await prisma.$transaction(async (transactionClient) => {
      const createAccount = await transactionClient.account.create({
        data: { ...modifiedAccountDataforBackEnd },
      });

      const createSuperAdmin = await transactionClient.superAdmin.create({
        data: { ...modifiedSuperAdminDataforBackEnd },
      });

      console.log('Super Admin created successfully!!!');
    });
  } catch (err) {
    console.log('Failed to create Super Admin', err);
  }
};

export default seedSuperAdminInToDB;
