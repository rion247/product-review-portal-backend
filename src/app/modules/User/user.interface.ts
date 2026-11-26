type TName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TGender = 'MALE' | 'FEMALE';

export type TUserPayload = {
  name: TName;
  email: string;
  gender: TGender;
  address: string;
  contactNumber: string;
  profilePhoto?: string;
};
