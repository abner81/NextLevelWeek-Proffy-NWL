import {container} from 'tsyringe'

import IHashProvider from '@users/providers/hashProvider/models/IHashProvider'
import BcryptHashProvider from "@users/providers/hashProvider/implementations/BcryptHashProvider";

import ITokenProvider from './jwtProvider/models/ITokenProvider';
import TokenJwt from './jwtProvider/implementations/TokenJwt';

container.registerSingleton<IHashProvider>("hashProvider", BcryptHashProvider);

container.registerSingleton<ITokenProvider>("tokenProvider", TokenJwt);