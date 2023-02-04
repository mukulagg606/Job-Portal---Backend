const app= require("./app");
const connectDatabase= require("./config/db");

//config
require("dotenv").config({path:"config/config.env"})

//connecting to database
connectDatabase();


app.listen(process.env.PORT,()=>{
    console.log(`server is working on http://localhost:${process.env.PORT}`);
});

