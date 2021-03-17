const cors = require("cors");
const express = require("express");
const app = express();

let port = 8080;
global.__basedir = __dirname;
global.__baseurl = "http://localhost:"+port+"/";

//utilizamos el middleware CORS para permitir el uso del intercambio de recursos de origen cruzado
//con el dominio de la aplicacion web que realiza el cargue de los archivos y consume los servicios
//de esta API rest
var corsOptions = {
  origin: "http://localhost:3006"
};
app.use(cors(corsOptions));

//definimos la ruta estatica para visulizar las imagenes cargadas
app.use(express.static(__dirname+'/resources/static/assets/uploads'));

//importamos las rutas declaradas para el API, le indicamos a la app que las use
//y las inicializamos
const initRoutes = require("./src/routes");

app.use(express.urlencoded({ extended: true }));
initRoutes(app);

//levantamos el servidor con escucha sobre el puerto seteado
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});