const { Schema, model, mongoose } = require("mongoose");

const messagesSchema = new Schema({
  userTo: { //usuario que recibe el mensaje
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  userFrom: { // usuario que envia el mensaje
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  text: String,
});

const Messages = mongoose.model("Messages", messagesSchema);

module.exports = Messages;
