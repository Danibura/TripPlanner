import express from "express";

import { getTrips, createProduct, updateProduct, deleteProduct } from "../controllers/trip.controller.js";

const router=express.Router();


router.get("/", getTrips);

router.post("/", createProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

export  default router;