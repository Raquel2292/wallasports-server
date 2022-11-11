const { Schema, model } = require("mongoose");

const productSchema = new Schema(
    [{
      name: String,
      description: String,
      price: Number,
      image: String,
      userId: String,
      type: String,
      reserved: Boolean
    }]
  );


  const Product = mongoose.model("Product", productSchema)



module.exports = Product;
