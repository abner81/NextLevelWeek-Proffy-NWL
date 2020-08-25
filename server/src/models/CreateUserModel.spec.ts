import FakeCreateUserRepository from "../repositories/fakes/FakeCreateUserRepository";
import CreateUserModel from "./CreateUserModel";

describe("CreateUserMobile", () => {
  it("should give error for having null name", async () => {
    const fakeCreateUserRepository = new FakeCreateUserRepository();
    let name: string;

    if (!name)
      return {
        status: 404,
        message: "Insira corretamente o seu nome!",
      };

    const user = await fakeCreateUserRepository.usersInsertName(name);
    expect(status).toBe(404);
  });

  it("should success in having a name in the requisition", async () => {
    const fakeCreateUserRepository = new FakeCreateUserRepository();
    let name = "Abner Machado";

    if (!name)
      return {
        status: 404,
        message: "Insira corretamente o seu nome!",
      };

    const user = await fakeCreateUserRepository.usersInsertName(name);
    expect(user.status).toBe(200);
  });
});

describe("CreateUserWeb", () => {
  it("should give error when missing some item of the requisition", async () => {
    const fakeCreateUserRepository = new FakeCreateUserRepository();
    let name = "Abner Machado";
    let email: "abner81@live.com";
    let password: string;

    if (!name || !email || !password)
      return {
        status: 409,
        message: "Preencha os campos: nome, email e password.",
      };

    const userExists = await fakeCreateUserRepository.login_userWhereEmailSelect(
      email
    );
    expect(status).toBe(409);
  });

  it("should check if that email already exists in the database and add to user", async () => {
    const fakeCreateUserRepository = new FakeCreateUserRepository();
    let name = "Abner Costa";
    let email: "abner81@live.com";
    let password: '2345665';

    if (!name || !email || !password)
      return {
        status: 409,
        message: "Preencha os campos: nome, email e password.",
      };

    const userExists = await fakeCreateUserRepository.login_userWhereEmailSelect(
      email
    );

    if (userExists.length > 0)
      return {
        status: 409,
        message: "Email indisponível, tente novamente com outro email.",
      };

    const user = await fakeCreateUserRepository.usersInsertName(name);
    expect(user.status).toBe(200);
  });

  it("should after creating user, persist data", async () => {
    const fakeCreateUserRepository = new FakeCreateUserRepository();
    let name = "Abner Costa";
    let email: "abner81@live.com";
    let password: '2345665';

    if (!name || !email || !password)
      return {
        status: 409,
        message: "Preencha os campos: nome, email e password.",
      };

    const userExists = await fakeCreateUserRepository.login_userWhereEmailSelect(
      email
    );

    if (userExists.length > 0)
      return {
        status: 409,
        message: "Email indisponível, tente novamente com outro email.",
      };

    const user = await fakeCreateUserRepository.usersInsertName(name);

    const encriptPassword = '12344'

    const response = await fakeCreateUserRepository.login_userFullInsert(
      email,
      encriptPassword,
      user.message as number
    );
    expect(response.status).toBe(201);
  });

});
