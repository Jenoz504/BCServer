const LibroModel = require('../models/LibroModel');
const Libros = require('../models/LibroModel');
const mongoose = require('mongoose');

exports.crearLibros = async (req, res) => {
    try {
        let imagen = req.body.imagen;
        
        req.body.imagen = transformarDireccion(imagen);
        let libro = new Libros(req.body);

        await libro.save();
        res.send(libro);    
        console.log(libro);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.obtenerLibro = async (req, res) => {
    try {
        const libro = await Libros.findById(req.params.id)

        if (!libro) {
          res.status(404).json({msg: 'El libro no existe'});  
        }
        res.json(libro);

    } catch (error) {
        console.log(error);
        res.status(500).send(error);        
    }
}
exports.obtenerLibros = async (req, res) => {
    try {
        const libro = await Libros.findById({})

        if (!libro) {
          res.status(404).json({msg: 'El libro no existe'});  
        }
        res.json(libro);

    } catch (error) {
        console.log(error);
        res.status(500).send(error);        
    }
}

exports.obtenerLibrosDelUsuario= async (req, res) => {
    try {
        const libros = await Libros.find({propietario: req.params.propietario})
        res.json(libros);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);    
    }
}
exports.obtenerLibrosDelQueNoSonDelUsuario = async (req, res) => {
    try {
        console.log('Propietario a excluir:', req.params.propietario);
        const libros = await Libros.find({ propietario: { $ne: req.params.propietario } });
        console.log('Libros encontrados:', libros);
        res.json(libros);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};
//transformar json a direccion de imagen y guardarla dentro de public/upload
transformarDireccion = (imagen64) => {
    if (imagen64 == "") {
        return "";
    } else {        
        var filestream = require('fs');
        var nombreArchivo = Math.random().toString() + ".jpg";
        
        //guardar en directorio
        filestream.writeFile("public/images/" + nombreArchivo, imagen64, 'base64', (error) => {
            console.log(error);
        });
        
        return "public/images/" + nombreArchivo;   
    }
}


exports.actualizarLibros = async (req, res) => {
    try {
        const codigo = req.body.codigo, nombre = req.body.nombre, descripcion = req.body.descripcion , estado =req.body.estado, propietario =req.body.propietario, imagen =req.body.imagen   
        let libro = await LibroModel.findById(req.params.id);
        
        if (!libro) {
            res.status(404).json({msg: "El libro no existe"});
        }        
        if (req.body.imagen != "" && req.body.imagen.length > 200) {            
            libro.imagen = transformarDireccion(imagen);
        }
        libro.codigo = codigo;
        libro.nombre = nombre;
        libro.descripcion = descripcion;
        libro.estado = estado;
        libro.propietario = propietario;
        libro.imagen = imagen;
        libro.save();
        res.json({msg: "El libro se ha actualizado"});        
    } catch (error) {
        console.log(error);
        res.status(500).send(error);    
    }
}

exports.eliminarLibros = async (req, res) => {
    try {
        const libro = await Libros.findByIdAndDelete(req.params.id);
        
        if (!libro) {
            res.status(404).json({msg: "El libro no existe"});
        }

        res.json({msg: "El libro ha sido eliminado"})        

    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}