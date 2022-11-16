const Product = require ("../models/Product.model");
const User = require ("../models/User.model");

router.get("/messages/:userId", async (req, res, next)=> {
    const response = await Messages.findById(req.params.id)
})



module.exports = router;


