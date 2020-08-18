import express from 'express'

import ClassesControler from './controllers/ClassesControler'
import ConnectionsController from './controllers/ConnectionsController'
import CreateLoginInfo from "./controllers/LoginController";
import AuthController from './controllers/AuthController';
import AuthMiddleware from './middlewares/AuthMiddlawares';
import CreateUser from './controllers/CreateUser';

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
routes.post("/create-users", userControllers.index);
routes.post("/create-email", createLoginInfo.index);

//Login
routes.post("/generate-token", authControllers.index);
routes.get("/auth", AuthMiddleware, authControllers.respAuth);

export default routes