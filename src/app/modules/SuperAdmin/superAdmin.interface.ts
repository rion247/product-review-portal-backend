type TName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

type TGender = 'MALE' | 'FEMALE';

export type TSuperAdmin = {
  name: TName;
  email: string;
  gender: TGender;
  address: string;
  contactNumber: string;
  profilePhoto?: string;
};
