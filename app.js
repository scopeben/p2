import express from "express";
const app = express();
const PORT = 5000;

app.use(function(req,res,next){
    console.log("Time",Date.now());
    next();
});


app.get("/about",(req,res) =>{
    res.send("hello");
});

app.listen(PORT,() =>{
    console.log(`Server started on port ${PORT}`);
});

