// routers/userRouter.js
import express from 'express';
const router = express.Router();
import verifyToken from '../utils/jwt/verifyToken.js'
import { getUserByUsername } from '../models/user.js';
import { signIn } from '../controllers/signIn.js';
import { signUp } from '../controllers/signUp.js';
import { controllersClientCreate } from '../controllers/createClient.js';
import { controllerCreateTheme } from '../controllers/createThemeChecklist.js';
import { getCliente } from '../controllers/getCliente.js';
import { getAsk } from '../controllers/getAsk.js';

router.get('/sign-in', (req, res) => {
    res.render('login', {msg: null});
})

router.get('/sign-up', (req, res) => {
    res.render('register');
})

router.get('/checklist/:id', verifyToken, async (req, res) => {
    const id = req.params
    const asks = await getAsk(id)
    console.log(asks.client)
    res.render('checkList', {checkListData: asks.check, client: asks.client});
})

router.get('/config', verifyToken, async (req, res) => {
    try {
        const listClient = await getCliente();
        const userData = await getUserByUsername(req.user.name);
        console.log({userData, listClient})
        res.render('config', { user: userData, clients: listClient});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error interno del servidor');
    }
});

router.post('/sign-in', signIn)
router.post('/sign-up', signUp)
router.post('/clienteCreate', controllersClientCreate)
router.post('/themeCreate', controllerCreateTheme)

export default router; // Cambia esta línea
