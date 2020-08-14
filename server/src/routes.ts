import express from 'express'

import ClassesControler from './controllers/ClassesControler'
import ConnectionsController from './controllers/ConnectionsController'
import LoginController from "./controllers/LoginController";
import AuthController from './controllers/AuthController';
import AuthMiddleware from './middlewares/AuthMiddlawares';

const routes = express.Router()

const classesControllers = new ClassesControler()
const connectionsControllers = new ConnectionsController()
const loginControllers = new LoginController();
const authControllers = new AuthController();

routes.post('/classes', classesControllers.create)
routes.get('/classes', classesControllers.index)

routes.post('/connections', connectionsControllers.create)
routes.get('/connections', connectionsControllers.index)

routes.post("/users", loginControllers.index);
// routes.get("/users", loginControllers.listUsers);

routes.post("/auth", authControllers.index);
routes.get("/auth", AuthMiddleware, authControllers.respAuth);

export default routes