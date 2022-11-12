const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const isAuthenticated = require("../middlewares/auth.middlewares");
/* const uploader = require("../middlewares/cloudinary")
 */
// aquí irán nuestras rutas de autenticación

//POST "/api/auth/signup" => registrar a un usuario
router.post("/signup", async (req, res, next) => {
  console.log("Lo que llega al signup", req.body);
  const { name, lastname, email, password, favorites, userImage } = req.body;
  //1. hacer validaciones de Backend
  if (
    name === "" ||
    lastname === "" ||
    email === "" ||
    password === "" ||
    favorites === "" || 
    userImage === ""
  ) {
    res
      .status(400)
      .json({ errorMessage: "Debe tener todos los datos completos" });
    return;
  }

  //el email tenga la estructura correcta
  const emailStructure =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
  if (emailStructure.test(email) === false) {
    res.status(400).json({ errorMessage: "Formato de email incorrecto" });
    return;
  }

  //constraseña unica
  const foundEmail = await User.findOne({ email: email });
  if (foundEmail !== null) {
    res.status(400).json({ errorMessage: "Email ya registrado" });
    return;
  }
  

  try {
      //el usuario no esté duplicado
    const foundUser = await User.findOne({ name: name });
    if (foundUser !== null) {
      res.status(400).json({ errorMessage: "Username ya registrado." });
      return;
    }
 
    //2. codificar la constraseña
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = {
      name: name,
      lastname: lastname,
      email: email,
      userImage: userImage,
      password: hashPassword,
      favorites: favorites,
    };

    //3. crear el usuario
    await User.create(newUser).then((response) => {
      console.log("LA RESPUESTA!!!!!!!!!!!!!", response)
      const payload = {
        _id: response._id,
        email: response.email,
        name: response.name
      };
  
      // a .sing se le pasan 3 argumentos
      const authToken = jwt.sign(
        payload, // informacion del usuario, que será accesible en distintas partes de server y client
        process.env.TOKEN_SECRET, // palabra secreta que double encrypta el token
        { algorithm: "HS256", expiresIn: "8h" } // va a tener configuraciones adicionales del Token (Header)
      );
  
      //eviar Token al cliente
      res.status(200).json({ authToken: authToken });
    });
  } catch (error) {
    next(error);
  }
});
// POST "/api/auth/login" => validar credenciales del usuario
router.post("/login", async (req, res, next) => {
  console.log(req.body);
  const { email, password } = req.body;

  //1. Validaciones de Backend
  // que todos los campos estén llenos
  if (email === "" || password === "") {
    res
      .status(400)
      .json({ errorMessage: "Debe tener todos los datos completos" });
    return;
  }

  try {
    //que el usuario exista
    const foundUser = await User.findOne({ email: email });
    console.log(foundUser);
    if (foundUser === null) {
      res.status(400).json({ errorMessage: "Creedenciales no válidas" });
      return;
    }
    //que la contraseña sea correcta
    const isPasswordValid = await bcrypt.compare(password, foundUser.password);
    if (isPasswordValid === false) {
      res.status(400).json({ errorMessage: "Creedenciales no válidas" });
      return;
    }
    //a partir de aquí el usuario ha sido validado

    //2. Crear TOKEN (es algo parecido a las sesiones) y enviarlo al cliente
    //creamos payload que es la información del usuario del dueño del TOKEN
    //payload lo podemos usar en cualquier parte de la web
    const payload = {
      _id: foundUser._id,
      email: foundUser.email,
      name: foundUser.name,

      //! la información importante del usuario tiene que ir aquí
    };

    // a .sing se le pasan 3 argumentos
    const authToken = jwt.sign(
      payload, // informacion del usuario, que será accesible en distintas partes de server y client
      process.env.TOKEN_SECRET, // palabra secreta que double encrypta el token
      { algorithm: "HS256", expiresIn: "8h" } // va a tener configuraciones adicionales del Token (Header)
    );

    //eviar Token al cliente
    res.status(200).json({ authToken: authToken });
  } catch (error) {
    next(error);
  }
});
// GET "/api/auth/verify" =>  para que le Backend diga al Fronted si el usuario ya ha sido validado
router.get("/verify", isAuthenticated, (req, res, next) => {
  //esta ruta verifica que el usuario tiene un Token válido
  //se utilizará para la primera vez que el usuario visita la web

  //como tenemos acceso a información del usuario haciendo esta llamada?
  console.log(req.payload); //es toda la informacion creada en const payload hecha más arriba

  res.status(200).json({user: req.payload});
});

module.exports = router;
