import bcrypt from 'bcryptjs'

export default class EncriptedHash {
  async compareHash(userPassword: string, databasePassword: string) {
    const isValidPassword = await bcrypt.compare(userPassword, databasePassword);

    return isValidPassword;
  }

  async hashSync(password: string, valueHash: number = 8) {
    const encriptedPassword = bcrypt.hashSync(password, valueHash);

    return encriptedPassword;
  }
}