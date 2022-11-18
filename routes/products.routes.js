const router = require("express").Router();
const Product = require("../models/Product.model");
const User = require("../models/User.model");
const isAuthenticated = require("../middlewares/auth.middlewares.js");

router.post("/upload", async (req, res, next) => {
  console.log("Lo que llega al productsList", req.body);
  const { name, description, price, type, reserved, productImage, owner } =
    req.body;
  //1. hacer validaciones de Backend
  const newProduct = {
    name,
    description,
    price,
    type,
    reserved,
    productImage,
    owner,
  };

  try {
    //2. crear el producto
    const response = await Product.create(newProduct);
    res.status(201).json(response);
    console.log("respuesta", newProduct);
    return;
  } catch (error) {
    next(error);
  }
});

//GET "/products/listProduct"
router.get("/list/:type", async (req, res, next) => {
  try {
    const response = await Product.find({ type: req.params.type }); //recojo los parámetros por el type
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

router.get("/owner/:userId", async (req, res, next) => {
  try {
    const response = await Product.find({ owner: req.params.userId }); //recojo los parámetros por el owner
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

//GET "/products/favorites/:favorites"
//crear una lista de productos favoritos
router.get("/favorites", isAuthenticated, async (req, res, next) => {
  try {
    const user = await User.findById(req.payload._id).populate("favorites");//populate => cambia los ids por toda la información de ese documento. nos da toda la informacion de ese producto
    const response = await Product.find({ _id: { $in: user.favorites } });
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

//PATCH "/products/favorites/:idProduct"
router.patch(
  "/add-favorites/:idProduct",
  isAuthenticated,
  async (req, res, next) => {
    //1.sacar id del producto
    const idProduct = req.params.idProduct;
    //2.sacar id del usuario
    const userId = req.payload._id;

    try {
      const response = await User.findByIdAndUpdate(userId, {
        $push: { favorites: idProduct },  
      }); //en mi usuario me crea un favorito que sea el Id del producto
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
);

//PATCH "/products/favorites/:idProduct"
router.patch(
  "/delete-favorites/:idProduct",
  isAuthenticated,
  async (req, res, next) => {
    //1.sacar id del producto
    const idProduct = req.params.idProduct;
    //2.sacar id del usuario
    const userId = req.payload._id;

    try {
      const response = await User.findByIdAndUpdate(userId, {
        $pull: { favorites: idProduct },
      }); //en mi usuario me elimina un favorito que sea el Id del producto
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
);

// GET "/products/detail/:id" => enviar todos los detalles de un Producto por su id
router.get("/detail/:id", async (req, res, next) => {
  try {
    // 1. buscar un documento de Product por su id
    const response = await Product.findById(req.params.id);

    // 2. enviar el documento al cliente (postman)
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

//DELETE "/products/:deleteId" => borra el documento de productos de la BD por su id
router.delete("/:deleteId", async (req, res, next) => {
  try {
    //borrar documento por su id y enviar respuesta al fronted
    await Product.findByIdAndDelete(req.params.deleteId);
    //enviar respuesta al fronted
    res.status(200).json("OK, documento borrado");
  } catch (error) {
    next(error);
  }
});

//PATCH "/products/:editId" => edita el documento de productos de la Bd por su id
router.patch("/:editId", async (req, res, next) => {
  // buscar los cambios a editar del documento
  const productUpLoad = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    reserved: req.body.reserved,
    productImage: req.body.productImage,
  };

  try {
    // editar el documento por su id
    await Product.findByIdAndUpdate(req.params.editId, productUpLoad);
    // pasar 2 argumento. (el id, la info a actualizar)

    // enviar mensaje de "todo bien" al FE
    res.status(200).json("OK, documento editado");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
