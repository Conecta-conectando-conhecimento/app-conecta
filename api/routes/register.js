import express from "express";
import {
  getUsers,
  addUsers,
  deleteUsers,
  getUser,
  login,
  updateUser,
} from "../controllers/users.js";

const router = express.Router();

router.get("/", getUsers);

router.get("/edit", getUser);

router.get("/checkemail", getUsers);

router.post("/login", login);

router.post("/", addUsers);

router.put("/:email", updateUser);

router.delete("/:cpf", deleteUsers);

router.delete("/:email", deleteUsers);

export default router;
