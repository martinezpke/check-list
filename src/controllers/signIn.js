/* const user  = require('../models/user')
const encode = require('../utils/encode')
const generateToken = require('../utils/jwt/token') */
import { getUserByUsername, validateUser } from '../models/user.js';
import encode from '../utils/encode.js';
import generateToken from '../utils/jwt/token.js';

export const signIn = async (req, res) => {
    const { username, password } = req.body;
    
    try {
        const data = await validateUser(username, password);
        if (data === true) {
            const userData = await getUserByUsername(username);
            await generateToken(res, userData.id, username);
        } else if (data === null) {
            res.render('login', {msg: "Contraseña o usuario incorrectos"});
        }
        
    } catch (error) {
        console.error('Error al validar el usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};