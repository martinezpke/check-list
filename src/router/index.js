// routers/userRouter.js
import express from 'express';
const router = express.Router();
import verifyToken from '../utils/jwt/verifyToken.js'
import { signIn } from '../controllers/signIn.js';

router.get('/sign-in', (req, res) => {
    res.render('login', {msg: null});
})

router.get('/courses', verifyToken, async (req, res) => {
    try {
        const data = await getCourses();
        const userData = await getUserByUsername(req.user.name);
        res.render('courses', { user: userData, courses: data });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error interno del servidor');
    }
});

router.post('/sign-in', signIn)

export default router; // Cambia esta línea
