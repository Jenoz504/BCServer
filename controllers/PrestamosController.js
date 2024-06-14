const PrestamoModel = require('../models/PrestamoModel');

exports.crearPrestamo = async (req, res) => {
    try {
        let prestamo = new PrestamoModel(req.body);

        await prestamo.save();
        res.send(prestamo);    
        console.log(prestamo);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}
exports.obtenerPrestamosDelUsuario= async (req, res) => {
    try {
        const Prestamos = await PrestamoModel.find({prestador: req.params.usuario})
        res.json(Prestamos);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);    
    }
}
exports.obtenerPrestamo = async (req, res) => {
    try {
        const prestamo = await PrestamoModel.findById(req.params.id)

        if (!prestamo) {
          res.status(404).json({msg: 'El prestamo no existe'});  
        }
        res.json(prestamo);

    } catch (error) {
        console.log(error);
        res.status(500).send(error);        
    }
}
exports.obtenerPrestamosDelLibro= async (req, res) => {
    try {
        const Prestamos = await PrestamoModel.find({usuario: req.params.libro})
        res.json(Prestamos);
    } catch (error) {
        console.log(error);
        res.status(500).send(error); 
    }
}

exports.actualizarPrestamo = async (req, res) => {
    try {
        const libro = req.body.libro, idPropietario = req.body.idPropietario , fechaPrestamo =req.body.fechaPrestamo, fechaDevolucion =req.body.fechaDevolucion, prestador = req.body.prestador   
        let prestamo = await PrestamoModel.findById(req.params.id);
        
        if (!prestamo) {
            res.status(404).json({msg: "El Prestamo no existe"});
        }        

        prestamo.libro = libro;
        prestamo.idPropietario = idPropietario;
        prestamo.fechaPrestamo = fechaPrestamo;
        prestamo.fechaDevolucion = fechaDevolucion;
        prestamo.prestador = prestador;
        prestamo.save();
        res.json({msg: "El Prestamo se ha actualizado"});        
    } catch (error) {
        console.log(error);
        res.status(500).send(error);    
    }
}

exports.eliminarPrestamo = async (req, res) => {
    try {
        const Prestamo = await PrestamoModel.findByIdAndDelete(req.params.id);
        
        if (!Prestamo) {
            res.status(404).json({msg: "El Prestamo no existe"});
        }

        res.json({msg: "El Prestamo ha sido eliminado"})        

    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}