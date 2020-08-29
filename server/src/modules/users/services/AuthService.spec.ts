import "reflect-metadata";

import AuthService from "./AuthService";
import UserModel from "./CreateUserService";
import UserRepository from "@users/infra/repository/CreateUserRepository";

const fakeRepository = new UserRepository();

const authService = new AuthService(fakeRepository);
const createUser = new UserModel(fakeRepository);

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
    await createUser.userWebModel('abner machado', 'abner1@live.com', '123456')

    const response = await authService.generateToken('abner1@live.com', '123456')
    expect(response).toHaveProperty('token')
  })
})

describe("AuthService - forgotPassword", () => {
  it("should return error status 400: user not found", async () => {
    const user = await authService.forgotPassword("x@live.com");
    expect(user.status).toBe(400);
  });

  it("should return sucess", async () => {
    await createUser.userWebModel('john doe', 'amu@hotmail.com', '2345')

    const user = await authService.forgotPassword("amu@hotmail.com");
    console.log(user);
    
    expect(user).toBe(undefined);
  });
});