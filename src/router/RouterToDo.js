import express from 'express';
import { getTodo, createTodo, deleteTodo, updateTodo, editStatus, getStatus, TodoFromUser, ListTodoFromUser, getAdmin } from '../controller/toDoController.js'
import auth from '../middleware/auth.js';
import authAdmin from '../middleware/authAdmin.js';
import multer from 'multer';
import fs from 'fs';

const todoRouter = express.Router();

const upload = multer({ dest: 'uploads/' })

//! todoRouter.post('/profile', upload.single('avatar'), function (req, res, next) {
    //! req.file is the `avatar` file
   //! req.body will hold the text fields, if there were any

//  !   console.log(req.file);
//  !   return res.status(200).json({ path: req.file.path });
// ! })

todoRouter.get('/Todo/list', auth, getTodo)
todoRouter.post('/Todo/create', auth, upload.single('avatar'), createTodo)
todoRouter.patch('/Todo/update/:id', updateTodo)
todoRouter.delete('/Todo/remove/:id', deleteTodo);
todoRouter.get('/Todo/status', getStatus)
todoRouter.patch('/Todo/updateStatus/:id', editStatus)

todoRouter.get('/Admin/getAll', authAdmin, getAdmin)

todoRouter.get('/User/list/ListTodoFromUser', auth, ListTodoFromUser)
todoRouter.post('/User/list/TodoFromUser', auth, TodoFromUser)
//task/create
//User/list

export default todoRouter;