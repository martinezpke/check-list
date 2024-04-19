/* const user  = require('../models/user')
const encode = require('../utils/encode') */
import { createUser } from '../models/user.js';
import encode from '../utils/encode.js'
import generateToken from '../utils/jwt/token.js'


export const signUp = async (req, res) => {
    const { username, name, last_name, country, email, password } = req.body;
    const pass = await encode.encrypt(password);

    try {
        // llamamos a funcion del modelo de user para crear un nuevo usuario
        const userId = await createUser(username, name, last_name, country, email, pass);
        generateToken(res, userId, username);

        // Devuelve la respuesta adecuada
        res.status(201).json({ userId, message: 'Usuario creado exitosamente' });
    } catch (e) {
        console.error('Error al crear el usuario:', e);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}