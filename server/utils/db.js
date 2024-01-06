const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const URI = process.env.MONGODB_URI;
const connectDB = async() =>{
    try{
        await mongoose.connect(URI);
        console.log('Database connected');
    }catch(err){
        console.log(err.message);
        process.exit(0);
    }
}
mongoose.connect(URI);

module.exports = connectDB;