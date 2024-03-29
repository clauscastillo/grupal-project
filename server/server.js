// Basicos del servidor
require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const cors = require('cors');
const cookieParser = require('cookie-parser'); // para recibir cookies


// Configuracion para peticiones cruzadas y lectura de POST
app.use(cors({
  origin: 'http://localhost:3002',
  //origin: 'http://127.0.0.1:3002',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()) // implementar cookie-parser en al app

// Configuracion de mongoose

require('./config/mongoose.config')


// Rutas

const ServiceRoutes = require('./routes/service.routes');
ServiceRoutes(app);

const UserRoutes = require('./routes/user.routes');
UserRoutes(app);

// test

const fecha = new Date();
const dia = fecha.getDate();
const mes = () => {
  const conversor = fecha.getMonth();
  switch (conversor) {
    case 1:
      return 'Febrero';
      break;
    case 2:
      return 'Marzo'
  }
};
const anio = fecha.getFullYear()

const horalocal = fecha.getHours()

const minutos = fecha.getMinutes()


console.log(`La fecha de hoy es ${dia}/${mes()}/${anio} y son las ${horalocal}:${minutos}`)

// Iniciar server

app.listen(port, () => {
  console.log('Server run at port ' + port)
})


