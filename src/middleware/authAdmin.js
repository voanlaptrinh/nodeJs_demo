import login from '../model/login.js';
import jwt from 'jsonwebtoken';


const authAdmin = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(404).json({ message: 'Token is undefined' });
        }
        const token = authHeader.split(' ')[1];
        const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const { username, _id } = decodeToken;
        const user = await login.findOne({ _id: _id });

        const isAdmin = user.isAdmin
        // console.log(user);
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        // console.log(res.isAdmin);
        if (!isAdmin) {
            return res.status(403).json({ message: 'not IsAdmin' });
        }

        req.username = username;
        req._id = _id

        next();
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}
export default authAdmin;