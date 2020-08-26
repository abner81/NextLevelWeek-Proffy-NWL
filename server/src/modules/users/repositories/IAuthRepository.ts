/* export interface IStatusMessage {
  status: number
  message: string
}

export interface IGenerateTokenTwo {
  user: any[]
  token: string
}

export default interface IAuthRepository {
  generateToken(
    email: string,
    password: string
  ): Promise<IStatusMessage | IGenerateTokenTwo>;
  forgotPassword(email: string): Promise<IStatusMessage | null>;
  resetPassword(
    email: string,
    password: string,
    token: string
  ): Promise<IStatusMessage | null>;
} */

export default interface IAuthRepository {
  login_userWhereEmail(email: string): Promise<any[] | null>;
  login_userWhereJoinSelect(email: string): Promise<any[] | null>;
  login_userUpdatePassword(email: string, password: string): Promise<number>
}