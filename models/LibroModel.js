const mongoose = require('mongoose');

const LibrosSchema = mongoose.Schema({
    id: {
        type: String,
        required: false
    },
    codigo: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: false
    },
    descripcion: {
        type: String,
        required: false
    },
    estado: {
        type: String,
        required: true
    },
    propietario: {
        type: String,
        required: true
    },
    imagen: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Libros', LibrosSchema);