const router = require("express").Router();
const Product = require("../models/Product.model");
const Messages = require("../models/Messages.model");
const isAuthenticated = require("../middlewares/auth.middlewares.js");


router.post("/:productId", isAuthenticated, async (req, res, next) => {
  console.log("Lo que llega al POST de Message", req.body);
  const { text } = req.body;

  //busco el pproducto por el que quiero mandar un sms a partir de su ID 
  const product = await Product.findById(req.params.productId);

  const newMessage = {
    userFrom: req.payload._id, //usuario que envia el mensaje
    userTo: product.owner, // usuario que recive el mensaje
    product: req.params.productId,
    text: text,
  };

  try {
    //2. crear el Message
    const response = await Messages.create(newMessage);
    console.log("Nuevo mensaje creado", response);
    res.status(200).json(response);
    return;
  } catch (error) {
    next(error);
  }
});

//Obtener todos los mensajes de un usuario
router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    //Busco todos los mensajes cuyo destinarario es el usuario logado
    const response = await Messages.find({ userTo: req.payload._id });
    console.log("Mensajes del usuario", response)
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
