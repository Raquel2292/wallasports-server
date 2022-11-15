const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(

    {
      name: String,
      description: String,
      price: Number,
      imageProduct: String,
      type: {
        type: String,
        enum: ["material", "clothing"]
      },
      reserved: Boolean,

      owner : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    }
  );


  const Product = mongoose.model("Product", productSchema)



module.exports = Product;
