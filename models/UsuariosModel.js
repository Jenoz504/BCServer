const mongoose = require('mongoose');

const UsuariosSchema = mongoose.Schema({
    id: {
        type: String,
        required: false
    },
    nombre: {
        type: String,
        required: true
    },
    usuario: {
        type: String,
        required: true
    },
    contrasena: {
        type: String,
        required: true
    },
    contacto: {
        type: String,
        required: true
    },
    imagen: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Usuarios', UsuariosSchema);