export interface User {
  id?: number
  name: string
  email: string
  password: string
  phone: number
  role?: number
  token?: string
  tokenExpiration?: Date
}
