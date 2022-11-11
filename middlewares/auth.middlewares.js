const { expressjwt: jwt } = require("express-jwt");

const isAuthenticated = jwt({
  secret: process.env.TOKEN_SECRET,
  algorithms: ["HS256"],
  requestProperty: "payload", //lo que me devuelve el payload cuando haya validado el Token
  getToken: (req) => {
    //función que se invoca para extraer el Token
    console.log(req.headers);
    // si el usuario no envia token, lanza un error
    if (req.headers === undefined || req.headers.authorization === undefined) {
      console.log("no hay token");
      return null;
    }
    //si el token existe, extraerlo del string y retornalo de la función
    const tokenArr = req.headers.authorization.split(" ");
    const tokenType = tokenArr[0];
    const token = tokenArr[1];

    if (tokenType !== "Bearer") {
      console.log("tipo de token incorrecto");
      return null;
    }
    // a partir de este punto el token ha sido recibido
    //para validarlo lo retornamos de la función
    console.log("el token ha sido entregado");
    return token;
  },
});

module.exports = isAuthenticated;
