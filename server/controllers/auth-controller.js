const User = require("../models/user-model");

// Home logic
const home = async (req, res) => {
  try {
    res.status(200).json({ msg: "Hello from auth-controller.js" });
  } catch (error) {
    // res.status(404).json({ msg: "Page not found" });
    next(err);
  }
};

//Registration Logic
const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      return res.status(400).json({ msg: "Email already exist" });
    }
    const user = await User.create({
      username,
      email,
      phone,
      password,
    });
    res.status(201).json({
      user,
      token: await user.generateToken(),
      userId: user._id.toString(),
    });
  } catch (err) {
    // res.status(400).json({ msg: "Page not found" });
    next(err);
  }
};

//Login Logic
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const isMatch = await userExist.isValidPassword(password);  
    if (isMatch) {
      res.status(200).json({
        msg: "Login Successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    // res.status(400).json({ msg: err.message });
    next(err); 
  }
};

//  To Send User Data - User Logic
const user = async (req,res) =>{
  try{
    const userData = req.user;
    return res.status(200).json({msg : userData});
  }catch(err){
    next(err);
  }
}
module.exports = { home, register, login, user };
