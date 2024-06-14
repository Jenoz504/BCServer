const Usuarios = require('../models/UsuariosModel');

exports.crearUsuario = async (req, res) => {
    try {
        let imagen = req.body.imagen;
        
        req.body.imagen = transformarDireccion(imagen);
        let usuario = new Usuarios(req.body);

        await usuario.save();
        res.send(usuario);    
        console.log(usuario);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

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


exports.obtenerUsuarios = async (req, res) => {
    try {
        const usuario = await Usuarios.find({})
        res.json(usuario);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);    
    }
}

exports.obtenerUsuarioPorUsuario = async (req, res) => {
    try {
        const usuario = await Usuarios.findOne({usuario: req.params.usuario});

        if (!usuario) {
          res.status(404).json({msg: 'El usuario no existe'});  
        }else {
            res.json(usuario);
        }

    } catch (error) {
        console.log(error);
        res.status(500).send(error);        
    }
}

exports.obtenerUsuario = async (req, res) => {
    try {
        const usuario = await Usuarios.findById(req.params.id)

        if (!usuario) {
          res.status(404).json({msg: 'El usuario no existe'});  
        }
        res.json(usuario);

    } catch (error) {
        console.log(error);
        res.status(500).send(error);        
    }
}

exports.actualizarUsuario = async (req, res) => {
    try {
        const {id, nombre, usuario, contrasena, contacto, imagen} = req.body;
        let user = await Usuarios.findById(req.params.id);

        if (!user) {
            res.status(404).json({msg: "La user no existe"});
        }
        if (req.body.imagen != "" && req.body.imagen.length > 200) {            
            user.imagen = transformarDireccion(imagen);
        }
        user.id = id;
        user.nombre = nombre;
        user.usuario = usuario;
        user.contrasena = contrasena;
        user.contacto = contacto;

    } catch (error) {
        console.log(error);
        res.status(500).send(error);    
    }
}

exports.eliminarUsuario = async (req, res) => {
    try {
        const usuario = await usuarios.findByIdAndDelete(req.params.id);
        
        if (!usuario) {
            res.status(404).json({msg: "El usuario no existe"});
        }

        res.json({msg: "El usuario ha sido eliminada"})        

    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
};