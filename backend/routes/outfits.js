import { Router } from "express";
import { listOutfits, saveOutfit } from "../controllers/outfitsController.js";

const router = Router();

router.get("/outfits", listOutfits);
router.post("/outfits/save", saveOutfit);

export default router;
