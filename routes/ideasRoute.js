import express from "express";
import {
  getIdeas,
  getAddIdeas,
  postAddIdeas,
  deleteIdeas,
  getEditIdeas,
  putEditIdeas,
} from "../controllers/ideasController.js";

const router = express.Router();

router.get("/", getIdeas);
router.get("/add", getAddIdeas);
router.post("/add", postAddIdeas);
router.delete("/:id", deleteIdeas);
router.get("/edit/(:id)", getEditIdeas);
router.put("/edit/:id", putEditIdeas);

export default router;
