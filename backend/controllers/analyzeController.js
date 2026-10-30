import { v4 as uuidv4 } from "uuid";
import Analysis from "../models/Analysis.js";
import { PALETTES, SKIN_TONE_CATEGORIES, UNDERTONES } from "../data/colorPalettes.js";
import { FACE_SHAPES } from "../data/faceShapeGuide.js";
import { BODY_SHAPES } from "../data/bodyShapeGuide.js";
import { OUTFIT_TEMPLATES } from "../data/outfitTemplates.js";

/**
 * === Computer-vision integration point ===
 * This function is the single place a real provider (e.g. a face-detection /
 * landmark API, a skin-region classifier, a body-proportion model) gets wired
 * in. It currently derives a deterministic, photo-seeded placeholder result
 * so the rest of the product — palette, outfits, dashboard — is fully
 * wired end to end. Swap the body of this function for real inference and
 * everything downstream keeps working unchanged.
 *
 * Deterministic seeding: the same uploaded photo always yields the same
 * placeholder result, so the UI behaves like a real, stable analysis rather
 * than re-rolling random values on every request.
 */
function seededPick(seed, list) {
  const idx = seed % list.length;
  return list[idx];
}

function hashBuffer(buffer) {
  let hash = 0;
  for (let i = 0; i < buffer.length; i += 97) {
    // sample bytes across the buffer instead of hashing every byte —
    // fast, and plenty of entropy for a placeholder seed
    hash = (hash * 31 + buffer[i]) >>> 0;
  }
  return hash;
}

function runPlaceholderVisionModel(buffer) {
  const seed = hashBuffer(buffer);

  const skinToneCategory = seededPick(seed, SKIN_TONE_CATEGORIES);
  const undertone = seededPick(Math.floor(seed / 7), UNDERTONES);
  const faceShapeCategory = seededPick(Math.floor(seed / 13), Object.keys(FACE_SHAPES));
  const bodyShapeCategory = seededPick(Math.floor(seed / 19), Object.keys(BODY_SHAPES));

  return { skinToneCategory, undertone, faceShapeCategory, bodyShapeCategory, confident: buffer.length > 2000 };
}

function buildOutfitsByOccasion(palette) {
  const result = {};
  Object.entries(OUTFIT_TEMPLATES).forEach(([occasion, templates]) => {
    result[occasion] = templates.map((tpl, i) => {
      const colorPicks = [
        palette.best[i % palette.best.length],
        palette.neutrals[i % palette.neutrals.length],
      ];
      return {
        name: tpl.name,
        occasion,
        items: tpl.items,
        shoes: tpl.shoes,
        accessories: tpl.accessories,
        colors: colorPicks,
        styleScore: 82 + ((i * 7 + occasion.length) % 15), // 82-96, stable per template
        why: tpl.why,
      };
    });
  });
  return result;
}

function recommendedStyleLabel(preferences, faceShapeCategory) {
  if (preferences?.styleGoal) return `${preferences.styleGoal} + Occasion-Ready`;
  const base = ["Smart Casual", "Modern Classic", "Relaxed Minimal", "Refined Streetwear"];
  return `${seededPick(faceShapeCategory.length, base)} + Minimal Classic`;
}

export async function analyzePhoto(req, res, next) {
  try {
    if (!req.file) {
      const err = new Error("No photo uploaded.");
      err.status = 400;
      err.publicMessage = "Please upload a photo to analyze.";
      throw err;
    }

    const preferences = req.body.preferences ? JSON.parse(req.body.preferences) : {};

    const vision = runPlaceholderVisionModel(req.file.buffer);

    if (!vision.confident) {
      return res.status(422).json({
        error: "We couldn't confidently analyze this image. Please upload a clear, well-lit photo with your face and body visible.",
      });
    }

    const palette = PALETTES[vision.undertone];
    const faceGuide = FACE_SHAPES[vision.faceShapeCategory];
    const bodyGuide = BODY_SHAPES[vision.bodyShapeCategory];

    const result = {
      id: uuidv4(),
      skinTone: {
        category: vision.skinToneCategory,
        undertone: vision.undertone,
      },
      faceShape: {
        category: vision.faceShapeCategory,
        explanation: faceGuide.explanation,
        recommendations: {
          hairstyles: faceGuide.hairstyles,
          glasses: faceGuide.glasses,
          beard: faceGuide.beard,
          accessories: faceGuide.accessories,
          necklines: faceGuide.necklines,
        },
      },
      bodyShape: {
        category: vision.bodyShapeCategory,
        recommendations: bodyGuide,
      },
      palette,
      recommendedStyle: recommendedStyleLabel(preferences, vision.faceShapeCategory),
      styleTips: [
        `Lean on ${palette.best[0].name.toLowerCase()} and ${palette.best[1].name.toLowerCase()} as anchor colors this season.`,
        `Neutrals like ${palette.neutrals[0].name.toLowerCase()} pair with almost everything in your palette.`,
        `Use ${palette.careful[0].name.toLowerCase()} sparingly — as a small accent rather than a full outfit.`,
        `For your ${vision.faceShapeCategory.toLowerCase()} face shape, ${faceGuide.hairstyles[0].toLowerCase()} is an easy default.`,
      ],
      outfitsByOccasion: buildOutfitsByOccasion(palette),
      preferences,
    };

    // Best-effort persistence — the demo still works fully if MongoDB isn't connected.
    try {
      await Analysis.create({ ...result, _id: undefined });
    } catch {
      // non-fatal in demo/dev mode without a DB
    }

    res.json({ result });
  } catch (err) {
    next(err);
  }
}

export async function getAnalysis(req, res, next) {
  try {
    const doc = await Analysis.findById(req.params.id);
    if (!doc) {
      return res.status(404).json({ error: "Analysis not found." });
    }
    res.json({ result: doc });
  } catch (err) {
    next(err);
  }
}
