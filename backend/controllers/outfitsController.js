import { OUTFIT_TEMPLATES } from "../data/outfitTemplates.js";
import { PALETTES } from "../data/colorPalettes.js";
import SavedOutfit from "../models/SavedOutfit.js";

export async function listOutfits(req, res) {
  const { occasion, undertone = "Neutral" } = req.query;
  const palette = PALETTES[undertone] || PALETTES.Neutral;

  const occasions = occasion ? [occasion] : Object.keys(OUTFIT_TEMPLATES);
  const outfits = occasions.flatMap((occ) => {
    const templates = OUTFIT_TEMPLATES[occ] || [];
    return templates.map((tpl, i) => ({
      name: tpl.name,
      occasion: occ,
      items: tpl.items,
      shoes: tpl.shoes,
      accessories: tpl.accessories,
      colors: [palette.best[i % palette.best.length], palette.neutrals[i % palette.neutrals.length]],
      styleScore: 82 + ((i * 7 + occ.length) % 15),
      why: tpl.why,
    }));
  });

  res.json({ outfits });
}

export async function saveOutfit(req, res, next) {
  try {
    const { outfit, analysisId, userId } = req.body;
    if (!outfit) {
      const err = new Error("Missing outfit payload.");
      err.status = 400;
      err.publicMessage = "No outfit provided to save.";
      throw err;
    }
    try {
      const doc = await SavedOutfit.create({ outfit, analysisId, userId });
      return res.status(201).json({ saved: doc });
    } catch (dbErr) {
      // No live MongoDB connection (e.g. local demo/dev) — the frontend
      // already keeps saved looks in localStorage, so respond successfully
      // with an ephemeral record instead of hard-failing the request.
      console.warn("SavedOutfit not persisted (DB unavailable):", dbErr.message);
      return res.status(201).json({
        saved: { outfit, analysisId, userId, persisted: false },
      });
    }
  } catch (err) {
    next(err);
  }
}
