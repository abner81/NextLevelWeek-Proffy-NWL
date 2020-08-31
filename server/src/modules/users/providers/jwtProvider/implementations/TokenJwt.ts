import jwt from 'jsonwebtoken'
import ITokenProvider from '../models/ITokenProvider';

export default class TokenJwt implements ITokenProvider {
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