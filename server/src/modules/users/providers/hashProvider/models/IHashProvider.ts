export default interface IHashProvider {
  compareHash(userPassword: string, databasePassword: string): Promise<boolean>
  hashSync(password: string, valueHash: number): Promise<string>
}