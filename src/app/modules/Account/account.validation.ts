import z from 'zod';
import { genderArray, statusArray } from './account.constant';

const accountValidationSchemaForChangeStatus = z.object({
  body: z.object({
    status: z.enum(
      [...statusArray] as [string, ...string[]],
      'Status is required',
    ),
  }),
});

const userNameValidationSchemaForUpdateProfile = z.object({
  firstName: z
    .string('First Name must be a string')
    .nonempty('First Name is required')
    .optional(),
  middleName: z.string('Middle Name must be a string').optional(),
  lastName: z
    .string('Last Name must be a string')
    .nonempty('Last Name is required')
    .optional(),
});

const accountValidationSchemaForUpdateProfile = z
  .object({
    body: z.object({
      name: userNameValidationSchemaForUpdateProfile,
      gender: z
        .enum([...genderArray] as [string, ...string[]], 'Gender is required')
        .optional(),
      address: z
        .string('Address must be a string')
        .nonempty('Address is required')
        .optional(),
      contactNumber: z
        .string('Contact Number must be a string')
        .nonempty('Contact Number is required')
        .optional(),
      profilePhoto: z
        .string('Profile Photo must be a string')
        .nonempty('Profile Photo is required')
        .optional(),
    }),
  })
  .loose()
  .superRefine((data, ctx) => {
    if ('email' in data) {
      ctx.addIssue({
        code: 'custom',
        path: ['email'],
        message: 'Email can not be updated',
      });
    }

    if ('isDeleted' in data) {
      ctx.addIssue({
        code: 'custom',
        path: ['isDeleted'],
        message: 'isDeleted can not be updated',
      });
    }
  });

export const AccountValidationSchemas = {
  accountValidationSchemaForChangeStatus,
  accountValidationSchemaForUpdateProfile,
};
