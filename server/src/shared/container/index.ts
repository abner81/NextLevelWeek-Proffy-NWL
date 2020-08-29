import { container } from 'tsyringe'

import CreateUserRepository from '@users/infra/repository/CreateUserRepository'
import IUserRepository from '@users/repositories/ICreateUserRepository';

container.registerSingleton<IUserRepository>(
  'userRepository',
  CreateUserRepository,
); 
