const mongoose = require('mongoose');

const PrestamoSchema = mongoose.Schema({
    id: {
        type: String,
        required: false
    },
    libro: {
        type: String,
        required: true
    },
    idPropietario: {
        type: String,
        required: false
    },
    fechaPrestamo: {
        type: String,
        required: true
    },
    fechaDevolucion: {
        type: String,
        required: true
    },
    prestador: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Prestamos', PrestamoSchema);