import { Router } from "express";
import { getProfile } from "../controllers/userController.js";

const router = Router();

router.get("/user/profile", getProfile);

export default router;
