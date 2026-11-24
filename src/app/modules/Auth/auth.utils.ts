import bcrypt from 'bcrypt';

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
