const express = require('express');
const router = express.Router();
const LibrosController = require('../controllers/LibrosController');

router.post('/',LibrosController.crearLibros);
router.get('/porUsuario/:propietario',LibrosController.obtenerLibrosDelUsuario);
router.get('/noUsuario/:propietario',LibrosController.obtenerLibrosDelQueNoSonDelUsuario);
router.get('/:id',LibrosController.obtenerLibro);
router.get('/',LibrosController.obtenerLibros);
router.put('/:id/',LibrosController.actualizarLibros); 
router.delete('/:id/',LibrosController.eliminarLibros);
module.exports = router;