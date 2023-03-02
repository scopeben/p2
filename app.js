import express from "express";
import {engine} from "express-handlebars";
import morgan from "morgan";

//load mongooes
import mongoose from "mongoose";


const app = express();
const PORT = 5000;

mongoose
.connect("mongodb://localhost:27017/note-dev")
.then(()=>console.log("Mongodb connected.."))
.catch((err) => console.log(err));

//setup handlebars middleware
app.engine("handlebars",engine());
app.set("view engine","handlebars");
app.set("views","./views");
app.use(morgan("tiny"));



app.get("/",(req,res) =>{
    res.render("index",{title:"Welcome !"});
});




app.get("/about",(req,res) =>{
    res.render("about");
});



// app.get("/about",(req,res) =>{
//     res.send("hello");
// });


// app.use(function(req,res,next){
//     console.log("Time",Date.now());
//     next();
// });



app.listen(PORT,() =>{
    console.log(`Server started on port ${PORT}`);
});

