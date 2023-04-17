export interface IUser {
  name: string;
  surname: string;
  // image varchar(255),
  phone_number: string;
  username: string;
  password_hash: string;
  wallet: number;

  email: string;
  isActivated: boolean;
  id: string | number;
}
