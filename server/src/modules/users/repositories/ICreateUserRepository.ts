export interface IReturnCreateUser {
  status: number;
  message: string | number;
}

export interface login_userFullInsert {
  status: number;
  message?: string;
}

export default interface ICreateUserRepository {
  usersInsertName(name: string): Promise<IReturnCreateUser>;
  login_userWhereEmailSelect(email: string): Promise<any[] | string>;
  login_userFullInsert(
    email: string,
    encriptPassword: string,
    user_id: number
  ): Promise<login_userFullInsert>;
}