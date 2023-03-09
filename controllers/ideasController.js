import Idea from "../models/Idea.js";
export const getIdeas = (req, res) => {
  Idea.find({ userID: res.locals.user._id })
    .lean()
    .sort({ data: "desc" })
    .then((ideas) => {
      console.log(ideas);
      //res.locals.ideas = ideas;
      //res.render("ideas/ideasindex");
      res.render("ideas/ideasindex", { ideas: ideas });
    });
};

export const getAddIdeas = (req, res) => {
  res.render("ideas/add");
};

export const postAddIdeas = (req, res) => {
  let errors = [];
  if (!req.body.title) {
    errors.push({ text: "Please add a title" });
    //req.flash("error_msg", "Please add a title");
  }

  if (!req.body.details) {
    errors.push({ text: "Please add some details" });
    //req.flash("error_msg", "Please add some details");
  }

  if (errors.length > 0) {
    res.render("ideas/add", {
      errors: errors,
      title: req.body.title,
      details: req.body.details,
    });
  } else {
    const newUser = {
      title: req.body.title,
      details: req.body.details,
      userID: res.locals.user._id,
      // userID: req.user.id,
    };
    new Idea(newUser).save().then(() => {
      req.flash("success_msg", "Note Added!");
      console.log(res.locals);
      res.redirect("/");
    });
  }
  //res.render("ideas/add");
};

export const deleteIdeas = (req, res) => {
  Idea.deleteOne({ _id: req.params.id }).then(() => {
    req.flash("error_msg", "Note Deleted");
    res.redirect("/ideas");
  });
};

export const getEditIdeas = (req, res) => {
  Idea.findOne({ _id: req.params.id })
    .lean()
    .then((idea) => {
      res.render("ideas/edit", { idea: idea });
    });
};

// export const putEditIdeas = (req, res) => {
//   Idea.findOne({
//     _id: req.params.id,
//   }).then((idea) => {
//     idea.title = req.body.title;
//     idea.details = req.body.details;
//     idea.save().then(() => {
//       res.redirect("/ideas");
//     });
//   });
// };

export const putEditIdeas = (req, res) => {
  Idea.findOne({
    _id: req.params.id,
  }).then((idea) => {
    let edit_error_msg = "";
    if (!req.body.title) {
      edit_error_msg += "Please add a title";
    }
    if (!req.body.details) {
      edit_error_msg += "Please add some details";
    }
    if (edit_error_msg) {
      req.flash("error_msg", edit_error_msg);
      res.redirect("/ideas/edit/" + idea._id);
    } else {
      idea.title = req.body.title;
      idea.details = req.body.details;
      idea.save().then(() => {
        req.flash("success_msg", "Note updated !");
        res.redirect("/ideas");
      });
    }
  });
};
