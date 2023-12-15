import { Role } from '../enums/role';

export interface UserStandardDto {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  signedUp?: boolean;
  role?: Role;
}
