import IUserRepository from "@users/repositories/ICreateUserRepository"

interface IUsers {
  name: string;
  email?: string;
  whatsapp?: string | null;
  id: number;
  password?: string;
}

export default class FakeUserRepository implements IUserRepository {
  private id = +1;
  private users: IUsers[] = [
   /*  {
      name: "abner",
      email: "abner81@live.com",
      whatsapp: null,
      id: 99,
      password: "123456",
    }, */
  ];

  async usersInsertName(name: string) {
    let id = this.id;
    let user = { name: name, id: id };

    this.users.push(user);

    return { status: 200, message: id };
  }

  async login_userWhereEmailSelect(email: string) {
    const findEmail = this.users.filter((user) => user.email === email);

    return findEmail;
  }

  async login_userFullInsert(
    email: string,
    encriptPassword: string,
    user_id: number
  ) {
    const findUserIndex = this.users.findIndex((user) => user.id === user_id);
    
    let user = this.users[findUserIndex];
    user = { ...user, email: email, password: encriptPassword };

    this.users[findUserIndex] = user;

    return { status: 201 };
  }

  async login_userWhereEmail(email: string) {
      const user = this.users.filter((array) => array.email === email);
      
      return user;
  }

  async login_userWhereJoinSelect(email: string) {
      const infoUser = this.users.filter((array) => array.email === email);

      return infoUser;
  }

  async login_userUpdatePassword(email: string, password: string) {
    const indexArray = this.users.findIndex((user) => user.email === email);

    let user = this.users[indexArray];
    user.password = password;

    this.users[indexArray] = user;

    return this.users[indexArray].id;
  }
}
