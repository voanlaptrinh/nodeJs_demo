import login from '../model/login.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


// const dotenv = require('dotenv').config();

export const postLogin = async (req, res) => {
  const { username, pass } = req.body
  // const username = req.body.username
  try {
    const user = await login.findOne({ username }).exec();
    if (user) {
      const validPassword = await bcrypt.compare(pass, user.pass);
      if (!validPassword) {
        res.status(400).json({ message: "error password" });
      }
    }
    const payload = {
      username,
      _id: user._id,

    }
 

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET)
    return res.status(200).json({
      _id: user._id,
      user: user.username,
      pass: user.pass,
      isAdmin: user.isAdmin,
      token: accessToken,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
};
export const addLogin = async (req, res, next) => {
  try {
    const { username, pass, isAdmin, isActive } = req.body;
    // console.log(req.body);
    //hash
    const salt = await bcrypt.genSalt(4);
    const passwork = await bcrypt.hash(pass, salt);
    // console.log(passwork);
    const newLogin = new login();
    newLogin.username = username;
    newLogin.pass = passwork;
    newLogin.isAdmin = isAdmin;
    newLogin.isActive = isActive;

    const data = await newLogin.save();

    return res.status(200).json(data)
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    })
  }
}


