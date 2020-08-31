import "reflect-metadata";

import AuthService from "./AuthService";
import UserModel from "./CreateUserService";
import UserRepository from "@users/infra/repository/CreateUserRepository";
import FakeHashProvider from "@users/providers/hashProvider/fakes/FakeHashProvider";
import FakeTokenProvider from "@users/providers/jwtProvider/fake/FakeTokenProvider";
import FakeEmailService from "@shared/infra/providers/email/fakes/FakeEmailService";

const fakeRepository = new UserRepository();
const fakeHashProvider = new FakeHashProvider();
const fakeTokenProvider = new FakeTokenProvider();
const fakeEmailService = new FakeEmailService();

const authService = new AuthService(
  fakeRepository,
  fakeHashProvider,
  fakeTokenProvider,
  fakeEmailService
);
const createUser = new UserModel(
  fakeRepository,
  fakeHashProvider
);

describe('AuthService - GenerateToken', () => {
  it('should return error: status 404 - email and password required', async () => {
    let name: string
    const response = await authService.generateToken('abner81@live.com', name)
    expect(response.status).toBe(404)
  })

  it('should return error: status 401 - user not found', async () => {
    const response = await authService.generateToken('abive.com', '12345')
    expect(response.status).toBe(401)
  })

  it('should return error: status 401 - invalid password', async () => {
    const response = await authService.generateToken('abner81@live.com', '12345')
    expect(response.status).toBe(401)
  })

  it('should sucess generate token ', async () => {
    //criando user
    await createUser.userWebModel('abner machado', 'abner@live.com', '12345')

    const response = await authService.generateToken('abner@live.com', '12345')
    expect(response).toHaveProperty('token')
  })
})

describe("AuthService - forgotPassword", () => {
  it("should return error status 404: all inputs required", async () => {
    let email: string
    
    const user = await authService.forgotPassword(email);
    expect(user.status).toBe(404);
  });

  it("should return error status 400: user not found", async () => {
    const user = await authService.forgotPassword("x@live.com");
    expect(user.status).toBe(400);
  });

  it("should return sucess", async () => {
    await createUser.userWebModel('john doe', 'amu@hotmail.com', '2345')

    const user = await authService.forgotPassword("amu@hotmail.com");
    expect(user.status).toBe(200);
  });
});

describe("AuthService - resetPassword", () => {
  it("should return error status 404: all inputs required", async () => {
    let token: string

    const response = await authService.resetPassword('abner81@live.com', '12345', token)
    expect(response.status).toBe(404);
  });

  it("should return error status 400: user not found", async () => {
    const response = await authService.resetPassword('s', '12345', '123jhgsd763g3hd')
    expect(response.status).toBe(400);
  });

  it("should return undefined if sucess", async () => {
    await createUser.userWebModel('abner', 'abneremail@hotmail.com', '123456')
    const forgot = await authService.forgotPassword("abneremail@hotmail.com");

    const response = await authService.resetPassword(
      "abneremail@hotmail.com",
      "123456",
      forgot.message
    );
    expect(response).toBeUndefined;
  });
});