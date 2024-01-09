const User = require("../models/user-model");
const Contact = require("../models/contact-model");
const getAllUsers = async (req, res) => {
  try {
    // const users = await User.find({}).select("-password");
    const users = await User.find({}, { password: 0 });
    if (!users && users.length === 0) {
      return res.status(500).json({ msg: "No Users Found" });
    }
    return res.status(200).json({ users });
  } catch (err) {
    next(err);
  }
};

const deleteUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    await User.deleteOne({ _id: id });
    return res.status(200).json({ msg: "User Deleted Successfully" });
  } catch (err) {
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
const updateUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedUserData = req.body;
    const userExist = await User.findOne({email : updatedUserData.email});
    if(userExist){
        return res.status(400).json({msg: "Email already exists."});
    }
    const updatedUser = await User.updateOne(
      { _id: id },
      {
        $set: updatedUserData,
      }
    );
    return res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    if (!contacts && contacts.length === 0) {
      return res.status(500).json({ msg: "No Contacts Found" });
    }
    return res.status(200).json({ contacts });
  } catch (err) {
    next(err);
  }
};

const deleteContactById = async(req,res) =>{
  try{
      const id = req.params.id;
      await Contact.deleteOne({_id : id});
      return res.status(200).json({msg : "Contact Delete Successsfully."});
  }catch(err){
    next(err);
  }
}

const getContactById = async(req,res) =>{
  try{
    const id = req.params.id;
    const contact = await Contact.findById(id);
    if(!contact){
      return res.status(400).json({msg: "Cannot find the contact detail."})
    }
    return res.status(200).json({msg : contact});
  }catch(err){
    next(err);
  }
}

const updateContactById = async(req,res)=>{
  try{
    const id = req.params.id;
    const updatedContactData = req.body;
    const updatedContact = await Contact.updateOne({_id: id},{$set : updatedContactData});
    return res.status(200).json({msg: updatedContact});
  }catch(err){
    next(err);
  }
}

module.exports = {
  getAllUsers,
  getAllContacts,
  deleteUserById,
  deleteContactById,
  getUserById,
  getContactById,
  updateUserById,
  updateContactById
};
