const Contact = require('../models/contact-model');

//Contact Logic
const contactForm = async(req,res) =>{
    try{
        const response = req.body;
        await Contact.create(response);
        return res.status(200).json({message : "message send successfully"});
    }catch(err){
        res.status(400).json({message : "Cannot submit the contact form"});
    }
}

module.exports = contactForm;