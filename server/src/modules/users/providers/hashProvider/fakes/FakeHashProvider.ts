import IHashProvider from "../models/IHashProvider";

export default class FakeHashProvider implements IHashProvider {
  async compareHash(
    userPassword: string,
    databasePassword: string
  ): Promise<boolean> {
    return userPassword === databasePassword;
  }

  async hashSync(password: string, valueHash: number = 8): Promise<string> {
    return password;
  }
}
