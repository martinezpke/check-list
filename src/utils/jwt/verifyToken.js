const jwt = require('jsonwebtoken');
const config = require('../../config/config')

const SECRET_KEY = config.SECRET_KEY;

const verifyToken = (req, res, next) => {
    const token = req.cookies.token || '';
    try{
        if(!token){
            res.redirect('/sign-in')
        }
        const decrypt = jwt.verify(token, SECRET_KEY);
        req.user ={
            id: decrypt.id,
            name: decrypt.username
        };
        next();
    }catch(error){
        return res.status(500).json(error.toString());
    }
}

module.exports = verifyToken;