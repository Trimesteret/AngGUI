import { Roles } from '../../enums/roles';

export interface AuthPas {
  token: string
  tokenExpiration?: Date
  role?: Roles
}
