const { Schema, model, mongoose } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    name: String,
    lastName: String,
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
    },
    userImage: String,
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    favorites: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    }] 
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
