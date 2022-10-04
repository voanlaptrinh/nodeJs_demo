// const express = require('express')
import login from '../model/login.js'
import jwt from 'jsonwebtoken'
// import loginController from '../controller/loginController.js'

const auth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(404).json({ message: 'Token is undefined' });
        }
        const token = authHeader.split(' ')[1];

        const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const { username, isAdmin } = decodeToken;
        //get user
        const user = await login.findOne({ username: username });
        // console.log(user);
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        //req
        req.username = username;
        req.isAdmin = isAdmin;
        next()


    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    //get token form headers

    //=> lay token
    //=> check token => decode => payload
    //> user
    //=> find one user
    //if(user)

    //req.user = user

}

//lam the nao de su dung middleware 

export default auth;

//add in router