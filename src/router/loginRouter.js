import express from 'express';
import { postLogin, addLogin } from '../controller/loginController.js'


const loginRouter = express.Router();

loginRouter.post('/Login', postLogin)
loginRouter.post('/addLogin', addLogin)


export default loginRouter;