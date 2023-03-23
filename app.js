import express from "express";
import { engine } from "express-handlebars";
import morgan from "morgan";
import bodyParser from "body-parser";

//import flash and express-session
import flash from "connect-flash";
import session from "express-session";
//load mongooes
import mongoose from "mongoose";
import Idea from "./models/Idea.js";
import ideasRoute from "./routes/ideasRoute.js";
import usersRoute from "./routes/usersRoute.js";

import passport from "passport";
import passportConfig from "./config/passportConfig.js";

import dotenv from "dotenv";
dotenv.config();

console.log(process.env.PORT);
console.log(process.env.mongoURI);

passportConfig(passport);

// import {
//   getIdeas,
//   getAddIdeas,
//   postAddIdeas,
//   deleteIdeas,
//   getEditIdeas,
//   putEditIdeas,
// } from "./controllers/ideasController.js";

//load method override
import methodOverrdie from "method-override";

const app = express();
const PORT = process.env.PORT || 5100;

mongoose
  .connect(process.env.mongoURI)
  .then(() => console.log("Mongodb connected.."))
  .catch((err) => console.log(err));

//setup handlebars middleware
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");
app.use(morgan("tiny"));

app.use(express.static("views/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  session({
    secret: "anything",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 1000 },
  })
);

app.use(passport.initialize());
app.use(passport.session());

//connect -flash store flash messages in session,
//therefore the setup of express-session is needed
app.use(flash());

app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg"); //gobal var
  res.locals.error_msg = req.flash("error_msg");
  res.locals.fail_passport = req.flash("fail_passport");
  res.locals.user = req.user || null;
  // console.log("--- login user ---", res.locals.user);
  next();
});

app.get("/", (req, res) => {
  console.log(req.session.cookie.maxAge / 1000);
  res.render("index", { title: "Welcome !" });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.use(methodOverrdie("_method"));
import ensureauthenticated from "./helpers/auth.js";

app.use("/ideas", ensureauthenticated, ideasRoute);

app.use(function (req, res, next) {
  console.log("Time", Date.now());
  next();
});

// app.get("/ideas", getIdeas);
// app.get("/ideas/add", getAddIdeas);
// app.post("/ideas/add", postAddIdeas);
// app.delete("/ideas/:id", deleteIdeas);
// app.get("/ideas/edit/(:id)", getEditIdeas);
// app.put("/ideas/edit/:id", putEditIdeas);

// app.use("/ideas", ideasRoute);
app.use("/users", usersRoute);

//set up express-session
// app.use(
//   session({
//     secret: "anything",
//     resave: true,
//     saveUninitialized: true,
//   })
// );

//connect -flash store flash messages in session,
//therefore the setup of express-session is needed
// app.use(flash());

// app.use(function (req, res, next) {
//   res.locals.success_msg = req.flash("success_msg"); //gobal var
//   res.locals.error_msg = req.flash("error_msg");
//   next();
// });

app.get("*", (req, res) => {
  res.status(404);
  res.render("404");
});

// app.get("/about",(req,res) =>{
//     res.send("hello");
// });

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
