import express from 'express';
import cors from 'cors';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import router from './router/index.js'
import { env } from './config/env.js';

// Obtener el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Inicializamos el servidor
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
// Static files
app.use(express.static('public'));
// Middlewares
app.use(express.urlencoded({ extended: true }));

// Ajustes
app.set('port', env.PORT);

// Routes
app.use(router);

// Ajustes
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.listen(env.PORT, () => {
    console.log(`[Server] Server listening on ${env.HOST_API}`);
});
