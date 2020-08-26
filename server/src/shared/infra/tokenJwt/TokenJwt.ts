import jwt from 'jsonwebtoken'

export default class TokenJwt {
  public jwtSign(id: number, privateKey: string, expiresIn: string) {
    const token = jwt.sign({ id: id }, privateKey, {
      expiresIn: expiresIn,
    });

    return token;
  }

  public jwtVerify(token: string, privateKey: string) {
    const data = jwt.verify(token, privateKey);

    return data
  }
}