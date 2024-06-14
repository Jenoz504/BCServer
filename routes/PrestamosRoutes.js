const express = require('express');
const router = express.Router();
const PrestamosController = require('../controllers/PrestamosController');

router.post('/',PrestamosController.crearPrestamo);
router.get('/porUsuario/:usuario',PrestamosController.obtenerPrestamosDelUsuario);
router.get('/porLibro/:libro',PrestamosController.obtenerPrestamosDelLibro);
router.get('/:id',PrestamosController.obtenerPrestamo);
router.put('/:id/',PrestamosController.actualizarPrestamo); 
router.delete('/:id/',PrestamosController.eliminarPrestamo);
module.exports = router;