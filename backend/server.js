import express from 'express';
import rutas from './router/routes.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors({
    origin: [process.env.FRONTEND_URL,process.env.DEV_URL],
}));

app.use('/api', rutas);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})