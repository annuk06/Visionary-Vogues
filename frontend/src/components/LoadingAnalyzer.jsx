import { useEffect, useState } from "react";
import ScanSilhouette from "./ScanSilhouette.jsx";

const STEPS = [
  "Detecting face...",
  "Analyzing skin tone...",
  "Identifying face shape...",
  "Analyzing body proportions...",
  "Generating outfit recommendations...",
];

export default function LoadingAnalyzer() {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setStepIndex((i) => (i < STEPS.length - 1 ? i + 1 : i));
    }, 900);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mx-auto flex max-w-md flex-col items-center py-16 text-center">
      <ScanSilhouette active className="h-72 w-56" />
      <p className="eyebrow mt-8">Reading your style</p>
      <ul className="mt-4 space-y-2" aria-live="polite">
        {STEPS.map((step, i) => (
          <li
            key={step}
            className={`font-body text-sm transition-colors ${
              i === stepIndex ? "text-gold" : i < stepIndex ? "text-muted line-through" : "text-ink-line"
            }`}
          >
            {step}
          </li>
        ))}
      </ul>
    </div>
  );
}
