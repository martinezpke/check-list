// routers/userRouter.js
import express from 'express';
const router = express.Router();
import verifyToken from '../utils/jwt/verifyToken.js'
import { getUserByUsername } from '../models/user.js';
import { signIn } from '../controllers/signIn.js';
import { signUp } from '../controllers/signUp.js';
import { controllersClientCreate } from '../controllers/createClient.js';

router.get('/sign-in', (req, res) => {
    res.render('login', {msg: null});
})

router.get('/sign-up', (req, res) => {
    res.render('register');
})

router.get('/config', verifyToken, async (req, res) => {
    try {
        const userData = await getUserByUsername(req.user.name);
        console.log(userData)
        res.render('config', { user: userData});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error interno del servidor');
    }
});

router.post('/sign-in', signIn)
router.post('/sign-up', signUp)
router.post('/clienteCreate', controllersClientCreate)

export default router; // Cambia esta línea
