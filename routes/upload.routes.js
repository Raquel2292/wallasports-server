const router = require("express").Router();

const uploader = require("../middlewares/cloudinary")

// esta ruta existe unicamente para recibir una imagen, llevarla a cloudinary y enviar el URL al frontend
router.post("/", uploader.single("userImage"), (req, res, next) => {

  if (req.file === undefined) {
    res.status(400).json("problemas subiendo la imagen")
    return
  }

  console.log(req.file.path) // el URL de cloudinary
  res.status(200).json({ userImage: req.file.path })

})


router.post("/productImage", uploader.single("productImage"), (req, res, next) => {

  if (req.file === undefined) {
    res.status(400).json("problemas subiendo la imagen")
    return
  }

  console.log("UR DE CLOUDINARY", req.file.path) // el URL de cloudinary
  res.status(200).json({ productImage: req.file.path })

})
module.exports = router