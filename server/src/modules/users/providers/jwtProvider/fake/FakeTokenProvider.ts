import ITokenProvider from "../models/ITokenProvider";

export default class FakeTokenJwt implements ITokenProvider {
  constructor(
    private token = '123456aqwert'
  ){}
  public jwtSign(id: number, privateKey: string, expiresIn: string) {
    return this.token;
  }

  public jwtVerify(token: string, privateKey: string) {
    if (token === this.token)
      return {id: 1, token: this.token};

    return 'undefined'
  }
}
