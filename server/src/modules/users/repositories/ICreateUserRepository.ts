export interface IReturnCreateUser {
  status: number;
  message: string | number;
}

export interface login_userFullInsert {
  status: number;
  message?: string;
}

export default interface IUserRepository {
  usersInsertName(name: string): Promise<IReturnCreateUser>;
  login_userWhereEmailSelect(email: string): Promise<any[] | string>;
  login_userFullInsert(
    email: string,
    encriptPassword: string,
    user_id: number
  ): Promise<login_userFullInsert>;
  login_userWhereEmail(email: string): Promise<any[] | null>;
  login_userWhereJoinSelect(email: string): Promise<any[] | null>;
  login_userUpdatePassword(email: string, password: string): Promise<number>;
}