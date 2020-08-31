export default interface ITokenProvider {
  jwtSign(id: number, privateKey: string, expiresIn: string): string;
  jwtVerify(token: string, privateKey: string): string | object
}