// Occasion -> outfit archetypes. Colors are resolved at request time from the
// user's estimated palette (see controllers/analyzeController.js), so the same
// template produces a different palette-matched card for every user.
export const OUTFIT_TEMPLATES = {
  Formal: [
    { name: "Tailored Evening Look", items: ["Tailored blazer", "Crisp dress shirt", "Slim-fit trousers"], shoes: "Polished oxford shoes", accessories: ["Leather watch", "Silk pocket square"], why: "A tailored, monochrome base built around your palette reads sharp without competing with the occasion." },
    { name: "Classic Formal Dress", items: ["Fitted midi dress", "Structured blazer"], shoes: "Pointed-toe heels", accessories: ["Delicate pendant", "Clutch bag"], why: "Clean lines and a single accent color keep the look formal while staying true to your undertone." },
  ],
  Casual: [
    { name: "Everyday Smart Casual", items: ["Crew-neck T-shirt", "Straight-leg jeans", "Unstructured jacket"], shoes: "White leather sneakers", accessories: ["Canvas tote", "Simple watch"], why: "Neutral basics with one palette-matched accent keep this easy to wear on repeat." },
  ],
  Business: [
    { name: "Office-Ready Set", items: ["Button-down shirt", "Tailored trousers", "Structured blazer"], shoes: "Leather loafers", accessories: ["Minimal watch", "Structured bag"], why: "A tonal palette keeps the outfit professional while your best colors add warmth to a neutral base." },
  ],
  Interview: [
    { name: "Conservative Confidence", items: ["Crisp button-down shirt", "Tailored dress trousers", "Fitted blazer"], shoes: "Polished closed-toe shoes", accessories: ["Simple stud earrings or tie", "Slim portfolio"], why: "Muted neutrals from your palette read as composed and professional without feeling flat." },
  ],
  Party: [
    { name: "Statement Night Out", items: ["Silky button-down or top", "Tailored trousers or skirt"], shoes: "Heeled boots or dress shoes", accessories: ["Bold earrings", "Metallic clutch"], why: "One saturated color from your best-colors list gives the outfit energy while staying flattering." },
  ],
  Wedding: [
    { name: "Semi-Formal Guest Look", items: ["Embellished kurta or dress", "Tailored trousers or flowing skirt"], shoes: "Dressy sandals or juttis", accessories: ["Statement jewelry", "Embroidered dupatta"], why: "Rich jewel tones from your palette photograph well and suit the formality of the day." },
  ],
  Date: [
    { name: "Polished but Easy", items: ["Fitted sweater or blouse", "Dark denim or tailored trousers"], shoes: "Ankle boots or loafers", accessories: ["Delicate layered jewelry"], why: "A soft, palette-matched color keeps the look approachable without underdressing." },
  ],
  College: [
    { name: "Trend-Led Everyday", items: ["Oversized shirt or hoodie", "Wide-leg or straight jeans"], shoes: "Chunky sneakers", accessories: ["Crossbody bag", "Layered necklaces"], why: "Comfortable, trend-forward pieces in your best colors keep the look current and easy." },
  ],
  Travel: [
    { name: "Practical Layers", items: ["Breathable T-shirt", "Joggers or stretch trousers", "Lightweight jacket"], shoes: "Comfortable trainers", accessories: ["Crossbody bag", "Baseball cap"], why: "Neutral, easy-to-mix pieces travel well and still align with your undertone." },
  ],
  Traditional: [
    { name: "Everyday Traditional", items: ["Kurta or traditional tunic", "Matching bottoms"], shoes: "Traditional flats or juttis", accessories: ["Statement earrings", "Bangles"], why: "A palette-matched traditional set feels festive while staying wearable for the occasion." },
  ],
  Athleisure: [
    { name: "Sporty Off-Duty", items: ["Fitted athletic top", "Joggers or leggings"], shoes: "Running sneakers", accessories: ["Sports watch", "Crossbody bag"], why: "Performance-friendly neutrals with one accent color keep it sporty but put-together." },
  ],
};
