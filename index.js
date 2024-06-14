const express = require('express');
const cors = require('cors');
const conectarDB = require('./config/database');
require('dotenv').config({ path: 'enviroment.env' });

const app = express();

conectarDB();

app.use(cors());

app.use(express.json({limit: '50mb'})); //Limites para las imagenes
app.use(express.urlencoded({limit: '50mb'}));

app.use('/api/libros', require('./routes/LibrosRoutes'));

app.use('/api/prestamos', require('./routes/PrestamosRoutes'));

app.use('/api/usuarios', require('./routes/UsuariosRoutes'));

app.use('/public/images', express.static( './public/images'));

app.listen(process.env.PORT, () => {
    console.log('listening on port ' + process.env.PORT);
});