import z from 'zod';
import { genderArray } from './user.constant';

const userNameValidationSchema = z.object({
  firstName: z
    .string('First Name must be a string')
    .nonempty('First Name is required'),
  middleName: z.string('Middle Name must be a string').optional(),
  lastName: z
    .string('Last Name must be a string')
    .nonempty('Last Name is required'),
});

const userValidationSchemaForCreate = z.object({
  body: z.object({
    password: z
      .string('Password must be a string')
      .nonempty('Password is required'),
    user: z.object({
      name: userNameValidationSchema,
      email: z.string('Email must be a string').nonempty('Email is required'),
      gender: z.enum(
        [...genderArray] as [string, ...string[]],
        'Gender is required',
      ),
      address: z
        .string('Address must be a string')
        .nonempty('Address is required'),
      contactNumber: z
        .string('Contact Number must be a string')
        .nonempty('Contact Number is required'),
      profilePhoto: z
        .string('Profile Photo must be a string')
        .nonempty('Profile Photo is required')
        .optional(),
    }),
  }),
});

export const UserValidationSchemas = {
  userValidationSchemaForCreate,
};
