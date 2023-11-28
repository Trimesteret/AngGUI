import { Role } from '../../enums/role';

export interface UserStandardDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: Role;
}
