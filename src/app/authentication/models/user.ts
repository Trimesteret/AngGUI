export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
  role: number
  token: string
  tokenExpiration: Date
}
