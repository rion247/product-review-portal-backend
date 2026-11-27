type TName = {
  firstName?: string;
  middleName?: string;
  lastName?: string;
};

type TGender = 'MALE' | 'FEMALE';

export type TAccountUpdatePayload = {
  name?: TName;
  gender?: TGender;
  address?: string;
  contactNumber?: string;
  profilePhoto?: string;
};
