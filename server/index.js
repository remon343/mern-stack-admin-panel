const express = require("express");
const app = express();
const authRoute = require("./router/auth-router");
const contactRoute = require('./router/contact-router');
const serviceRoute = require('./router/service-router');
const adminRoute = require('./router/admin-router');    
const cors = require('cors');
const connectDB = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");
const dotenv = require('dotenv');
dotenv.config();

const corsOptions = {
    origin : process.env.FRONTEND_KEY,
    methods : "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials : true
}
//should have to put due to CORS policy
app.use(cors(corsOptions));

// now you can use json data in your application and it's a middle ware
app.use(express.json());

// Mouth Routes : To use the Express router , you need to mount it a specific path like /api/auth
app.use("/api/auth",authRoute);
app.use("/api/form",contactRoute);
app.use("/api/data",serviceRoute);
app.use("/api/admin",adminRoute);

app.use(errorMiddleware);

const port = 3000;

connectDB().then(()=>{
    app.listen(port,()=>{
        console.log(`Server is running on port ${port}`);
    })

})