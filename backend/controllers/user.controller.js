import User from "../models/user.model.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const getUsers = async (req, res) => {};

const register = async (req, res) => {};

const login = async (req, res) => {
  const name = req.body.name;
  const user = { name: name };

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.json({ accessToken: accessToken });
};

function authToken(req, res, next) {}
export { getUsers, register, login, authToken };
