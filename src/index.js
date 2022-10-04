import express from "express";
// import db from '../src/config/db.js'
import mongoose from "mongoose";
import todoRouter from '../src/router/RouterToDo.js';
import loginRouter from '../src/router/loginRouter.js';
import dotenv from 'dotenv'
import multer from 'multer';

const app = express()

const upload = multer()
const port = 3000
app.use(express.json());

dotenv.config()
 
const mongooseUrl = 'mongodb://localhost:27017/f8_education_dev'

mongoose.connect(mongooseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
},
function(err) {
  if (err) {
    console.log(`Failed to connect to Mongoose: ${mongooseUrl}`);
  }
  else {
    console.log(`Connected to Mongoose: ${mongooseUrl}`);
  }
}
);



app.use('/toDo', todoRouter);
app.use('/login', loginRouter)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})