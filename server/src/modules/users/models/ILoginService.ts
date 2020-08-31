interface IReturn {
  status: number
  message: string
}

export default interface ILoginService {
  index(
    email: string,
    password: string,
    user_id: number
  ): Promise<IReturn>;
}