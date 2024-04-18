// routers/userRouter.js
import express from 'express';
const router = express.Router();

router.get('/sign-in', (req, res) => {
    res.render('login');
})

export default router; // Cambia esta línea
