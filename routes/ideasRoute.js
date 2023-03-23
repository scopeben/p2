import express from "express";
import {
  getIdeas,
  getAddIdeas,
  postAddIdeas,
  deleteIdeas,
  getEditIdeas,
  putEditIdeas,
  getRecords,
} from "../controllers/ideasController.js";
//import ensureauthenticated from "../helpers/auth.js";

const router = express.Router();

// router.get("/", getIdeas);
// router.get("/add", getAddIdeas);
// router.post("/add", postAddIdeas);
// router.delete("/:id", deleteIdeas);
// router.get("/edit/(:id)", getEditIdeas);
// router.put("/edit/:id", putEditIdeas);

router.get("/records", getRecords);

router.route("/").get(getIdeas);
router.route("/:id").delete(deleteIdeas);
router.route("/edit/:id").get(getEditIdeas).put(putEditIdeas);
//router.route("/add").get(ensureauthenticated, getAddIdeas).post(ensureauthenticated, postAddIdeas);
router.route("/add").get(getAddIdeas).post(postAddIdeas);

export default router;
