import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { analyzePhoto } from "../services/api.js";

const AnalysisContext = createContext(null);

const SAVED_LOOKS_KEY = "vv_saved_looks";

export function AnalysisProvider({ children }) {
  const [photo, setPhoto] = useState(null); // { file, previewUrl }
  const [preferences, setPreferences] = useState({
    styleGoal: "",
    ageRange: "",
    favoriteColor: "",
    budget: "",
  });
  const [analysis, setAnalysis] = useState(null); // result object
  const [occasion, setOccasion] = useState("Casual");
  const [status, setStatus] = useState("idle"); // idle | analyzing | done | error
  const [error, setError] = useState(null);
  const [savedLooks, setSavedLooks] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(SAVED_LOOKS_KEY);
      if (stored) setSavedLooks(JSON.parse(stored));
    } catch {
      // ignore corrupted storage
    }
  }, []);

  const persistSavedLooks = (looks) => {
    setSavedLooks(looks);
    try {
      localStorage.setItem(SAVED_LOOKS_KEY, JSON.stringify(looks));
    } catch {
      // storage may be unavailable (private browsing, quota) — fail silently
    }
  };

  const saveLook = (look) => {
    const next = [...savedLooks, { ...look, savedAt: new Date().toISOString(), id: crypto.randomUUID() }];
    persistSavedLooks(next);
  };

  const removeLook = (id) => {
    persistSavedLooks(savedLooks.filter((l) => l.id !== id));
  };

  const setUploadedPhoto = useCallback((file) => {
    if (photo?.previewUrl) URL.revokeObjectURL(photo.previewUrl);
    if (!file) {
      setPhoto(null);
      return;
    }
    setPhoto({ file, previewUrl: URL.createObjectURL(file) });
    setAnalysis(null);
    setStatus("idle");
    setError(null);
  }, [photo]);

  const runAnalysis = useCallback(async () => {
    if (!photo?.file) {
      setError("Please upload a photo before starting analysis.");
      setStatus("error");
      return;
    }
    setStatus("analyzing");
    setError(null);
    try {
      const result = await analyzePhoto(photo.file, preferences);
      setAnalysis(result);
      setStatus("done");
    } catch (err) {
      setError(err?.message || "We couldn't analyze this photo. Please try another.");
      setStatus("error");
    }
  }, [photo, preferences]);

  const reset = () => {
    if (photo?.previewUrl) URL.revokeObjectURL(photo.previewUrl);
    setPhoto(null);
    setAnalysis(null);
    setStatus("idle");
    setError(null);
  };

  const value = {
    photo,
    setUploadedPhoto,
    preferences,
    setPreferences,
    analysis,
    status,
    error,
    runAnalysis,
    occasion,
    setOccasion,
    reset,
    savedLooks,
    saveLook,
    removeLook,
  };

  return <AnalysisContext.Provider value={value}>{children}</AnalysisContext.Provider>;
}

export function useAnalysis() {
  const ctx = useContext(AnalysisContext);
  if (!ctx) throw new Error("useAnalysis must be used within an AnalysisProvider");
  return ctx;
}
