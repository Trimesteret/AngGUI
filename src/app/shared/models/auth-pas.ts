import { Role } from '../enums/role';

export interface AuthPas {
  token: string
  tokenExpiration: Date | null
  role: Role | null
}
