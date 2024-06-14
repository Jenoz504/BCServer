const express = require('express');
const router = express.Router();
const UsuariosController = require('../controllers/UsuariosController');

router.post('/',UsuariosController.crearUsuario);
router.get('/porUsuario/:usuario',UsuariosController.obtenerUsuarioPorUsuario);
router.get('/',UsuariosController.obtenerUsuarios);
router.get('/:id',UsuariosController.obtenerUsuario);
router.put('/:id/',UsuariosController.actualizarUsuario); 
router.delete('/:id/',UsuariosController.eliminarUsuario);
module.exports = router;