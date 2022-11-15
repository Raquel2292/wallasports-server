const { Schema, model, mongoose } = require("mongoose");

const messagesSchema = new Schema(
    {
     user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
     },
     products: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
     },
     text: String
    }
  );

const Messages = mongoose.model("Messages", messagesSchema)



module.exports = Messages;