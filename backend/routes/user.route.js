import express from "express";

import {
  getUsers,
  register,
  login,
  authToken,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getUsers);

router.post("/register", register);

router.post("/login", authToken, login);
export default router;
