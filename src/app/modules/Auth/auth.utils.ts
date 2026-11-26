import bcrypt from 'bcrypt';
import config from '../../config';

export const passwordHashed = async (
  plainTextPassword: string,
): Promise<string> => {
  return await bcrypt.hash(
    plainTextPassword,
    Number(config.bcrypt_salt_rounds),
  );
};

export const isUserPasswordMatched = async (
  plainText: string,
  hashText: string,
): Promise<boolean> => {
  return await bcrypt.compare(plainText, hashText);
};

export const isTokenIssuedBeforePasswordChange = (
  passwordTimeStamp: Date,
  jwtIssuedTimeStamp: number,
): boolean => {
  const passwordTime = new Date(passwordTimeStamp).getTime() / 1000;

  return passwordTime > jwtIssuedTimeStamp;
};
