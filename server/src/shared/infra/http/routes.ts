import express from 'express'

import ClassesControler from '@classes/services/ClassesControler'
import ConnectionsController from '@users/entities/ConnectionsController'
import CreateLoginInfo from "@users/entities/LoginController";
import AuthController from '../../../modules/users/entities/AuthController';
import AuthMiddleware from '../../../modules/users/infra/http/middlewares/AuthMiddlawares';
import CreateUser from '@users/entities/CreateUser';
//import ForgotMiddleware from './middlewares/ForgotMiddlawares';

const routes = express.Router()

const classesControllers = new ClassesControler()
const connectionsControllers = new ConnectionsController()
const createLoginInfo = new CreateLoginInfo();
const authControllers = new AuthController();
const userControllers = new CreateUser();

routes.post('/classes', classesControllers.create)
routes.get('/classes', classesControllers.index)

routes.post('/connections', connectionsControllers.create)
routes.get('/connections', connectionsControllers.index)

//Create new account
routes.post("/create-users", userControllers.createUserMobile);
routes.post("/create-email", createLoginInfo.index);
routes.post("/create/web", userControllers.createUserWeb);

//Login
routes.post("/generate-token", authControllers.index);
routes.get("/auth", AuthMiddleware, authControllers.respAuth);

//forgot password
routes.post("/forgot_password", authControllers.forgotPassword);
routes.post("/reset_password",authControllers.resetPassword);

export default routes