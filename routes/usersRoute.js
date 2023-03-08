import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

router.get("/register", (req, res) => {
  res.render("users/register");
});

router.post("/register", (req, res) => {
  let errors = [];
  if (!req.body.name) {
    errors.push({ text: "Name is missing!" });
  }
  if (!req.body.email) {
    errors.push({ text: "email is missing!" });
  }

  if (req.body.password != req.body.password2) {
    errors.push({ text: "password do not match!" });
  }

  if (req.body.password.length < 4) {
    errors.push({ text: "Password must be at least 4 characters !" });
  }

  if (errors.length > 0) {
    res.render("users/register", {
      errors: errors,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      password2: req.body.password2,
    });
  } else {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then(() => {
            req.flash("success_msg", "Register Done !");
            res.redirect("/users/login");
          })
          .catch((err) => {
            console.log(err);
            req.flash("error_msg", "Server went wrong!");
            res.redirect("/users/register");
          });
      });
    });
    // res.redirect("/");
  }
});
export default router;
