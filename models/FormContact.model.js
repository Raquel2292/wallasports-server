const { Schema, model, mongoose } = require("mongoose");

const formContactSchema = new Schema(
    {
     user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: user
     }],
     products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: products
     }],
     text: String
    }
  );

const FormContact = mongoose.model("FormContact", formContactSchema)



module.exports = FormContact;