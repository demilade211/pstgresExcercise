const express = require("express");
const route = require("./Routes/routes");
const { request } = require("express");


const app = express();
const PORT = 5000;

//Use body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));//to handle url encoded data

app.use("/player",route);

app.listen(PORT,()=>console.log(`Server started on port ${PORT}`))

