import db from "@shared/infra/database/connection";
import IAuthRepository from "@users/repositories/IAuthRepository";

export default class AuthRepository implements IAuthRepository {
  async login_userWhereEmail(email: string) {
    try {
      const user = await db("login_user").where({ email });

      return user;
    } catch (error) {
      return null;
    }
  }

  async login_userWhereJoinSelect(
    email: string
  ) {
    try {
      const infoUser = await db("login_user")
        .where({ email })
        .join("users", "login_user.user_id", "=", "users.id")
        .select("users.*", "login_user.email");

      return infoUser
    } catch (error) {
      return null
    }
  }

  async login_userUpdatePassword (email: string, password: string) {
    const response = await db("login_user").where({ email }).update({
      password: password,
    });

    return response
  }
}