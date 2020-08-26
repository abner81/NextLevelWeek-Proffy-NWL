import AuthRepository from "@users/infra/repository/AuthRepository";
const repository = new AuthRepository()

import EncriptedHash from "@shared/infra/encriptedHelper/EncriptedHash";
const bcryptEncripted = new EncriptedHash();

import TokenJwt from "@shared/infra/tokenJwt/TokenJwt";
const tokenJwt = new TokenJwt();

import EmailService from "@shared/infra/email/EmailService";
const emailService = new EmailService()

import IAuthRepository from "@users/repositories/IAuthRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class AuthService {
  constructor(
    @inject('authRepository')
    private repository: IAuthRepository) {}

  async generateToken(email: string, password: string) {
    try {
      if (!email || !password)
        return { status: 404, message: "Email e senha são obrigatórios." };

      const user = await this.repository.login_userWhereEmail(email);

      if (!user) return { status: 401, message: "Usuário não encontrado" };

      const isValidPassword = await bcryptEncripted.compareHash(
        password,
        user[0].password
      );

      if (!isValidPassword) return { status: 401, message: "Senha inválida" };

      const token = tokenJwt.jwtSign(user[0].id, "secret", "365d");

      const infoUser = await this.repository.login_userWhereJoinSelect(email);

      if (!infoUser)
        return {
          status: 404,
          message:
            "Ocorreu um erro ao buscar o usuário na nossa base de dados.",
        };

      return {
        user: infoUser[0],
        token,
      };
    } catch (error) {
      return { status: 404, message: error.message };
    }
  }

  async forgotPassword(email: string) {
    try {
      const user = await this.repository.login_userWhereEmail(email);

      if (!user) return { status: 400, message: "Usuário não encontrado" };

      const token = tokenJwt.jwtSign(
        user[0].id,
        process.env.FORGOT_PASSWORD_TOKEN,
        "1h"
      );

      user[0].password = "";

      const sendEmailSucess = await emailService.sendEmail(
        email,
        "Administrador <1bc06c3f38-638a4b@inbox.mailtrap.io>",
        "Recuperação de senha",
        `O seu token de autenticação é: ${token}`
      );

      if (!sendEmailSucess)
        return {
          status: 400,
          message: "Erro ao enviar o email de recuperação",
        };
      return;
    } catch (error) {
      return { status: 404, message: error.message };
    }
  }

  async resetPassword(email: string, password: string, token: string) {
    try {
      const user = await this.repository.login_userWhereEmail(email);

      if (!user) return { status: 400, message: "Usuário não encontrado" };

      const data = tokenJwt.jwtVerify(token, process.env.FORGOT_PASSWORD_TOKEN);

      if (!data) return { status: 401, message: "Token inválido!" };

      const encriptedPassword = await bcryptEncripted.hashSync(password, 8);

      await this.repository.login_userUpdatePassword(email, encriptedPassword);

      return;
    } catch (error) {
      return { status: 404, message: "Ocorreu um erro ao recuperar sua senha" };
    }
  }
}

export default AuthService