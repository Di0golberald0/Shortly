import { Router } from "express";
import { getRanking, getUserById } from "../controllers/users.controllers.js";
import { authValidation } from "../middlewares/authorization.middlewares.js";

const router = Router();

router.get("/users/:id", authValidation, getUserById);
router.get("/ranking", getRanking);

export default router;