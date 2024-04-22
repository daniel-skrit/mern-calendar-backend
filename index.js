const express = require("express");
const { dbConnection } = require("./database/config.js");
const cors = require("cors");
require("dotenv").config();

// console.log(process.env)

// Crear el servidor de express
const app = express();

// Base de datos
dbConnection();

//CORS
app.use(cors());

// DIrectorio Publico
app.use(express.static("public"));

// Lectura y parseo
app.use(express.json());

//Rutas
app.use("/api/auth", require("./routes/auth.js"));
app.use("/api/events", require("./routes/events.js"));


// Escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});
