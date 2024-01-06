// Schema is the blueprint of the model of the database
// Model is the actual database object
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

//secure the password using bcrypt.js
userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) {
    return next();
  }
  try {
    const hashedPassword = await bcrypt.genSalt(10).then((salt) => {
      return bcrypt.hash(user.password, salt);
    });
    user.password = hashedPassword;
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );
  } catch (err) {
    console.error(err);
  }
};

userSchema.methods.isValidPassword = async function(password){
  try{
    return await bcrypt.compare(password,this.password);
  }catch(err){
    throw err;
  }
}

//define the model or collection name
const User = new mongoose.model("user",userSchema);
module.exports = User;
