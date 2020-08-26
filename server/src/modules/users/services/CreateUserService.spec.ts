import "reflect-metadata";
import FakeCreateUserRepository from "../repositories/fakes/FakeCreateUserRepository";
import CreateUserModel from "./CreateUserService";

describe("Test user creation in mobile", () => {
  it("should return status 200 success when entering a username", async () => {
    const fakeRepository = new FakeCreateUserRepository();
    const createUserModel = new CreateUserModel(fakeRepository);

    const response = await createUserModel.userMobileModel("Abner Machado");
    expect(response.status).toBe(200);
  });

  it("should return status 404 success when entering a username", async () => {
    const fakeRepository = new FakeCreateUserRepository();
    const createUserModel = new CreateUserModel(fakeRepository);

    const response = await createUserModel.userMobileModel("Abner Machado");
    expect(response.status).toBe(200);
  });

  it("should return status error 404 when not entering a username", async () => {
    const fakeRepository = new FakeCreateUserRepository();
    const createUserModel = new CreateUserModel(fakeRepository);

    let name: string

    const response = await createUserModel.userMobileModel(name);
    expect(response.status).toBe(404);
  });
})

describe("Test user creation in web", () => {
  it("should return status error 409 when having an empty parameter", async () => {
    const fakeRepository = new FakeCreateUserRepository();
    const createUserModel = new CreateUserModel(fakeRepository);

    const name = 'Abner Machado'
    let email: string
    const password = '109743'

    const response = await createUserModel.userWebModel(name, email, password)
    expect(response.status).toBe(409);
  });

  it("should return status 201 when all fields are filled and the email is available", async () => {
    const fakeRepository = new FakeCreateUserRepository();
    const createUserModel = new CreateUserModel(fakeRepository);

    const response = await createUserModel.userWebModel('Abner', "abner81@live.com", '18734')
    
    expect(response.status).toBe(201);
  });
})
