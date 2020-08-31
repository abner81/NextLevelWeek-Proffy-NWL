import bcrypt from 'bcryptjs'
import IHashProvider from '../models/IHashProvider';

export default class EncriptedHash implements IHashProvider {
  async compareHash(
    userPassword: string,
    databasePassword: string
  ): Promise<boolean> {
    const isValidPassword = await bcrypt.compare(
      userPassword,
      databasePassword
    );

    return isValidPassword;
  }

  async hashSync(password: string, valueHash: number = 8): Promise<string> {
    const encriptedPassword = bcrypt.hashSync(password, valueHash);

    return encriptedPassword;
  }
}