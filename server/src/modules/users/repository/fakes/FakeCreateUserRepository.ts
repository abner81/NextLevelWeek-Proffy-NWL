interface iUserInsertName {
  name: string
  id: number
}

export default class FakeCreateUserRepository {
  private users = []

  async usersInsertName(name: string) {
    let num =+ 1 
    let user: object = {name: name, id: num}
    
    this.users.push(user)
    
    return {status: 200, message: this.users[0].id }
  }

  async login_userWhereEmailSelect(email: string) {
    const findEmail = this.users.find(user => user.email === email)
    
    if (!findEmail) return [{ email: email }, { id: 1 }];

    return []
  }

  async login_userFullInsert(
    email: string,
    encriptPassword: string,
    user_id: number
  ) {
    const findUserIndex = this.users.findIndex(user => user.id === user_id)

    this.users[findUserIndex].push({email}, {encriptPassword}, {user_id})

    return {status: 201}
  }
}
