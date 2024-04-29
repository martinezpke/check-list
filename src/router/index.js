// routers/userRouter.js
import express from 'express';
import multer from 'multer';
const router = express.Router();
import verifyToken from '../utils/jwt/verifyToken.js'
import { getUserByUsername } from '../models/user.js';
import { signIn } from '../controllers/signIn.js';
import { signUp } from '../controllers/signUp.js';
import { controllersClientCreate } from '../controllers/createClient.js';
import { controllerCreateTheme } from '../controllers/createThemeChecklist.js';
import { getCliente } from '../controllers/getCliente.js';
import { getAsk } from '../controllers/getAsk.js';
import { getAllCheckList } from '../controllers/getAllCheckList.js';
import { setRating } from '../controllers/setRating.js';

router.get('/sign-in', (req, res) => {
    res.render('login', { msg: null });
})

router.get('/sign-up', (req, res) => {
    res.render('register');
})

router.get('/checklist/:id', verifyToken, async (req, res) => {
    const id = req.params.id
    const asks = await getAsk(id)
    console.log(asks.client)
    const idCliente = req.query.idCliente || null;
    const listRating = req.query.respuestas ? JSON.parse(req.query.respuestas) : null;
    console.log(listRating)

    res.render('checkList', { checkListData: asks.check, client: asks.client, rating: idCliente, listRating: listRating });
})

router.get('/config', verifyToken, async (req, res) => {
    try {
        const listCheck = await getAllCheckList()
        const listClient = await getCliente();
        const userData = await getUserByUsername(req.user.name);
        /* console.log({userData, listClient}) */
        /* console.log(listCheck) */
        res.render('config', { user: userData, clients: listClient, checks: listCheck.checks });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error interno del servidor');
    }
});

router.post('/sign-in', signIn)
router.post('/sign-up', signUp)
router.post('/rating/:id', setRating)
router.post('/themeCreate', controllerCreateTheme)


function cleanOriginalName(originalname) {
    let cleanedName = originalname.trim();
    cleanedName = cleanedName.replace(/[^\w\s.-]/gi, '');
    return cleanedName;
}

// Configuración de multer para manejar la subida de archivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/'); // La carpeta donde se guardarán las imágenes
    },
    filename: function (req, file, cb) {
        const cleanedName = cleanOriginalName(file.originalname);
        cb(null, `${Date.now()}-${cleanedName}`); // Se asigna un nombre único a cada archivo
    }
});
const upload = multer({ storage: storage });


router.post('/clienteCreate', upload.fields([
    { name: 'fileLogo', maxCount: 1 }
]), controllersClientCreate);





export default router;
