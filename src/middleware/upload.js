const util = require("util");
const multer = require("multer");
const maxSize = 10 * 1024 * 1024;

// Hacemos uso del middleware multer para definir al tamaño máximo del archivo,
// la ruta donde se alojara de manera local y el atributo nombre del fichero
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/resources/static/assets/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
//se setean los valores en el objeto tipo multer
// para permitir la subida del archivo al servidor usando multipart/form-data
let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

//permite que el objeto del middleware exportado sea usado con async-await
let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;