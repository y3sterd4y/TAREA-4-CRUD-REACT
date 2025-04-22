import { Router } from "express";
import { obtenerCanciones, crearCancion, actualizarCancion, eliminarCancion } from "../controller/SongController.js";

const router = Router();

router.get('/canciones', obtenerCanciones);
router.post('/canciones', crearCancion);
router.put('/canciones/:id', actualizarCancion);
router.delete('/canciones/:id', eliminarCancion);

export default router;

