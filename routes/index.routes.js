const router = require("express").Router();


router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const authRoutes = require("./auth.routes")
router.use ("/auth", authRoutes)

const productsRoutes = require("./products.routes")
router.use ("/products", productsRoutes)

const uploadRoutes = require("./upload.routes")
router.use("/upload", uploadRoutes)

module.exports = router;
