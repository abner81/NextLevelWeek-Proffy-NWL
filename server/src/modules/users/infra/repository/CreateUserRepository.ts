import db from "../../../../shared/infra/database/connection";
import IUserRepository from "@users/repositories/ICreateUserRepository";

export default class UserRepository implements IUserRepository {
  async usersInsertName(name: string) {
    try {
      const user = await db("users").insert({
        name: name,
      });

      return { status: 200, message: user[0] };
    } catch (error) {
      return {
        status: 404,
        message: "Erro ao cadastrar o usuário!",
      };
    }
  }

  async login_userWhereEmailSelect(email: string) {
    try {
      const userExists = await db("login_user")
        .where({
          email: email,
        })
        .select("email");

      return userExists;
    } catch (error) {
      return "Erro ao procurar usuário!";
    }
  }

  async login_userFullInsert(
    email: string,
    encriptPassword: string,
    user_id: number
  ) {
    try {
      await db("login_user").insert({
        email: email,
        password: encriptPassword,
        user_id: user_id,
      });

      return { status: 201 };
    } catch (error) {
      return {
        status: 404,
        message: "Erro ao cadastrar o usuário",
      };
    }
  }

  async login_userWhereEmail(email: string) {
    try {
      const user = await db("login_user").where({ email });

      return user;
    } catch (error) {
      return null;
    }
  }

  async login_userWhereJoinSelect(email: string) {
    try {
      const infoUser = await db("login_user")
        .where({ email })
        .join("users", "login_user.user_id", "=", "users.id")
        .select("users.*", "login_user.email");

      return infoUser;
    } catch (error) {
      return null;
    }
  }

  async login_userUpdatePassword(email: string, password: string) {
    const response = await db("login_user").where({ email }).update({
      password: password,
    });

    return response;
  }
}
