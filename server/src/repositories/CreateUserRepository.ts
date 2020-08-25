import db from "../database/connection";

export default class CreateUserRepository {
  async usersInsertName(name: string) {
    try {
      const user = await db("users").insert({
        name: name,
      });

      if (!user)
        return {
          status: 404,
          message: "Erro ao cadastrar usuário!",
        };

      return { status: 200, message: user[0] };
    } catch (error) {
      return {
        status: 404,
        message: "Erro ao cadastrar usuário!",
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

      return {status: 201};
    } catch (error) {
      return {status: 404, message: 'Erro ao cadastrar o usuário'};
    }
  }
}
