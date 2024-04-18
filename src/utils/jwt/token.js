/* const jwt = require('jsonwebtoken');
const config = require('../../config/config') */

import jwt from 'jsonwebtoken'
import env from '../../config/env.js';

const SECRET_KEY = env.SECRET_KEY;
const TIME_TOKEN = Number(env.TIME_TOKEN);

const generateToken = (res, id, username )=>{
    const expiration = TIME_TOKEN;
    const token = jwt.sign({id, username}, SECRET_KEY, {
        expiresIn: expiration
    });

    return res.cookie('token', token, {
        expires: new Date(Date.now() + expiration),
        secure: false, // set to true if your using https
        httpOnly: true,
    }).redirect('/courses');
}

export default generateToken;