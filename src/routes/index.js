const express = require("express");
const router = express.Router();
const controller = require("../controllers/file.controller");

//definimos las rutas a manejar y los metodos a llamar por cada una
let routes = (app) => {
  router.post("/upload", controller.upload);
  router.get("/files", controller.getListFiles);
  router.get("/files/:name", controller.download);

  app.use(router);
};
//exportamos las rutas para que puedan ser usadas de manera externa
module.exports = routes;