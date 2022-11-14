const router = require("express").Router();


router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const authRoutes = require("./auth.routes")
router.use ("/auth", authRoutes)

const productsRoutes = require("./products.routes")
router.use ("/products", productsRoutes)

module.exports = router;
