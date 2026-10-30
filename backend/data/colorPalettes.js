// Static color-theory reference data, keyed by undertone.
// A real implementation would refine this against the estimated skin-tone
// category too; kept undertone-keyed here to stay readable and easy to extend.

export const PALETTES = {
  Warm: {
    best: [
      { name: "Olive", hex: "#7A7A3E" },
      { name: "Mustard", hex: "#D9A441" },
      { name: "Rust", hex: "#B5502B" },
      { name: "Burgundy", hex: "#7A2436" },
      { name: "Terracotta", hex: "#C1652F" },
      { name: "Camel", hex: "#C19A6B" },
      { name: "Forest Green", hex: "#33512E" },
      { name: "Amber", hex: "#C48A2A" },
    ],
    neutrals: [
      { name: "Cream", hex: "#F1E7D0" },
      { name: "Beige", hex: "#D8C3A5" },
      { name: "Chocolate Brown", hex: "#4A2E1E" },
      { name: "Warm Grey", hex: "#8A8073" },
    ],
    careful: [
      { name: "Icy Blue", hex: "#BFE3F0" },
      { name: "Fuchsia", hex: "#C2185B" },
      { name: "Cool Grey", hex: "#9AA0AE" },
    ],
  },
  Cool: {
    best: [
      { name: "Sapphire", hex: "#1F4E79" },
      { name: "Emerald", hex: "#177245" },
      { name: "Plum", hex: "#5B2A57" },
      { name: "Charcoal", hex: "#2B2E33" },
      { name: "Icy Pink", hex: "#E7B7C4" },
      { name: "Slate Blue", hex: "#4A5A83" },
      { name: "Berry", hex: "#7A2048" },
      { name: "Cool Lavender", hex: "#8B7CB6" },
    ],
    neutrals: [
      { name: "Pure White", hex: "#F7F7F7" },
      { name: "Cool Grey", hex: "#9AA0AE" },
      { name: "Navy", hex: "#1B2A4A" },
      { name: "Black", hex: "#15161A" },
    ],
    careful: [
      { name: "Mustard", hex: "#D9A441" },
      { name: "Orange", hex: "#D9622B" },
      { name: "Warm Beige", hex: "#D8C3A5" },
    ],
  },
  Neutral: {
    best: [
      { name: "Soft Teal", hex: "#3E7C74" },
      { name: "Dusty Rose", hex: "#C08A8F" },
      { name: "Warm Navy", hex: "#273449" },
      { name: "Sage", hex: "#7C8B6F" },
      { name: "Mocha", hex: "#6B4A38" },
      { name: "Muted Coral", hex: "#C97B63" },
      { name: "Soft Gold", hex: "#C9A667" },
      { name: "Deep Plum", hex: "#4B2A45" },
    ],
    neutrals: [
      { name: "Ivory", hex: "#F3EFE7" },
      { name: "Taupe", hex: "#9C8C7A" },
      { name: "Graphite", hex: "#3A3B40" },
      { name: "Black", hex: "#15161A" },
    ],
    careful: [
      { name: "Neon Yellow", hex: "#E8E13A" },
      { name: "Hot Pink", hex: "#E0218A" },
    ],
  },
};

export const SKIN_TONE_CATEGORIES = ["Very Fair", "Fair", "Light", "Medium", "Tan", "Deep"];
export const UNDERTONES = ["Warm", "Cool", "Neutral"];
