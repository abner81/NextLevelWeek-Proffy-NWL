import { container } from 'tsyringe'

import ICreateUserRepository from '@users/repositories/ICreateUserRepository'
import CreateUserRepository from '@users/infra/repository/CreateUserRepository'

import AuthRepository from '@users/infra/repository/AuthRepository';
import IAuthRepository from "@users/repositories/IAuthRepository";

container.registerSingleton<ICreateUserRepository>(
  'repository',
  CreateUserRepository,
); 

container.registerSingleton<IAuthRepository>("authRepository", AuthRepository); 