import express from "express";
// import bcrypt from "bcryptjs";
import User from "../models/User.js";
// import passportConfig from "../config/passportConfig.js";
// import passport from "passport";
import {
  getRegister,
  postRegister,
  getLogin,
  postLogin,
  getLogout,
} from "../controllers/usersController.js";

// const router = express.Router();

// router.get("/register", (req, res) => {
//   res.render("users/register");
// });

// router.post("/register", (req, res) => {
//   let errors = [];
//   if (!req.body.name) {
//     errors.push({ text: "Name is missing!" });
//   }
//   if (!req.body.email) {
//     errors.push({ text: "email is missing!" });
//   }

//   if (req.body.password != req.body.password2) {
//     errors.push({ text: "password do not match!" });
//   }

//   if (req.body.password.length < 4) {
//     errors.push({ text: "Password must be at least 4 characters !" });
//   }

//   if (errors.length > 0) {
//     res.render("users/register", {
//       errors: errors,
//       name: req.body.name,
//       email: req.body.email,
//       password: req.body.password,
//       password2: req.body.password2,
//     });
//   } else {
//     User.findOne({ email: req.body.email }).then((user) => {
//       if (user) {
//         console.log(user);
//         req.flash("error_msg", "Email already register !");
//         res.redirect("/users/register");
//       } else {
//         const newUser = new User({
//           name: req.body.name,
//           email: req.body.email,
//           password: req.body.password,
//         });

//         bcrypt.genSalt(10, (err, salt) => {
//           bcrypt.hash(newUser.password, salt, (err, hash) => {
//             if (err) throw err;
//             newUser.password = hash;
//             newUser
//               .save()
//               .then(() => {
//                 req.flash("success_msg", "Register Done !");
//                 res.redirect("/users/login");
//               })
//               .catch((err) => {
//                 console.log(err);
//                 req.flash("error_msg", "Server went wrong!");
//                 res.redirect("/users/register");
//               });
//           });
//         });
//       }
//     });

//     // res.redirect("/");
//   }
// });

// router.get("/login", (req, res) => {
//   res.render("users/login");
// });

// router.post("/login", (req, res, next) => {
//   passport.authenticate("local", {
//     successRedirect: "/ideas",
//     failureRedirect: "/users/login",
//     failureFlash: true,
//     //session: false,
//   })(req, res, next);
// });

// router.get("/logout", (req, res) => {
//   req.logout((err) => {
//     if (err) throw err;
//   });
//   req.flash("success_msg", "You are logged out !");
//   res.redirect("/users/login");
// });
// export default router;

const router = express.Router();

// const getRegister = (req, res) => {
//   res.render("users/register");
// };

// const postRegister = (req, res) => {
//   let errors = [];
//   if (!req.body.name) {
//     errors.push({ text: "Name is missing!" });
//   }
//   if (!req.body.email) {
//     errors.push({ text: "email is missing!" });
//   }

//   if (req.body.password != req.body.password2) {
//     errors.push({ text: "password do not match!" });
//   }

//   if (req.body.password.length < 4) {
//     errors.push({ text: "Password must be at least 4 characters !" });
//   }

//   if (errors.length > 0) {
//     res.render("users/register", {
//       errors: errors,
//       name: req.body.name,
//       email: req.body.email,
//       password: req.body.password,
//       password2: req.body.password2,
//     });
//   } else {
//     User.findOne({ email: req.body.email }).then((user) => {
//       if (user) {
//         console.log(user);
//         req.flash("error_msg", "Email already register !");
//         res.redirect("/users/register");
//       } else {
//         const newUser = new User({
//           name: req.body.name,
//           email: req.body.email,
//           password: req.body.password,
//         });

//         bcrypt.genSalt(10, (err, salt) => {
//           bcrypt.hash(newUser.password, salt, (err, hash) => {
//             if (err) throw err;
//             newUser.password = hash;
//             newUser
//               .save()
//               .then(() => {
//                 req.flash("success_msg", "Register Done !");
//                 res.redirect("/users/login");
//               })
//               .catch((err) => {
//                 console.log(err);
//                 req.flash("error_msg", "Server went wrong!");
//                 res.redirect("/users/register");
//               });
//           });
//         });
//       }
//     });

//     // res.redirect("/");
//   }
// };
// const getLogin = (req, res) => {
//   res.render("users/login");
// };

// const postLogin = (req, res, next) => {
//   passport.authenticate("local", {
//     successRedirect: "/ideas",
//     failureRedirect: "/users/login",
//     failureFlash: true,
//     //session: false,
//   })(req, res, next);
// };

// const getLogout = (req, res) => {
//   req.logout((err) => {
//     if (err) throw err;
//   });
//   req.flash("success_msg", "You are logged out !");
//   res.redirect("/users/login");
// };

// router.get("/register", getRegister);
// router.post("/register", postRegister);
// router.get("/login", getLogin);
// router.post("/login", postLogin);
// router.get("/logout", getLogout);

router.route("/register").get(getRegister).post(postRegister);
router.route("/login").get(getLogin).post(postLogin);
router.route("logout").get(getLogout);

export default router;
