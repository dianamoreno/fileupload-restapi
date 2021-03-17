const uploadFile = require("../middleware/upload");
const fs = require('fs');
const sizeOf = require('image-size')

//metodo POST que recibe el archivo a cargar y retorna un objeto JSON con el resultado
const upload = async (req, res) => {
  try {
    await uploadFile(req, res);

    if (req.file == undefined) {
      return res.status(400).send({ message: "Por favor seleccione un archivo!" });
    }

    res.status(200).send({
      message: "Archivo subido existosamente: " + req.file.originalname,
    });
  } catch (err) {
    res.status(500).send({
      message: "No se puedo susbir el archivo: ${req.file.originalname}. ${err}",
    });
  }
};

//metodo que verifica en el directorio local los archivos que existen y
// retorna un objeto JSON con el resultado
const getListFiles = (req, res) => {
  const directoryPath = __basedir + "/resources/static/assets/uploads/";

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Error al intentar leer los archivos disponibles en el Directorio local!",
      });
    }

    let fileInfos = [];
    let _width = "";
    let _height = "";
    files.forEach((file) => {

      _width = ""; _height = "";
      // obtenemos el tamaño de la imagen
      const dimensions = sizeOf(directoryPath+file)

      fileInfos.push({
        name: file,
        url: __baseurl + file,
        width: dimensions.width,
        height: dimensions.height,
      });
      
      
    });

    res.status(200).send(fileInfos);
  });
};

const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "No se puede descargar el archivo. " + err,
      });
    }
  });
};

module.exports = {
  upload,
  getListFiles,
  download,
};