import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'

interface TokenPayload {
  id: number
  iat: number
  exp: number
}

export default function ForgotMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers

  if(!authorization)
    res.sendStatus(401)

  const token = authorization.replace('Bearer', '').trim()

  try {
    const data = jwt.verify(token, process.env.FORGOT_PASSWORD_TOKEN);

    if (!data) res.status(401).send('Token inválido!');
    
    const { id } = data as TokenPayload;

    req.userId = id

    return next()
  } catch {
    res.sendStatus(401);
  }
}
