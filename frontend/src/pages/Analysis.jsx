import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAnalysis } from "../context/AnalysisContext.jsx";
import LoadingAnalyzer from "../components/LoadingAnalyzer.jsx";

export default function Analysis() {
  const { photo, status, error, runAnalysis } = useAnalysis();
  const navigate = useNavigate();

  useEffect(() => {
    if (!photo) {
      navigate("/upload");
      return;
    }
    if (status === "idle") {
      runAnalysis();
    }
  }, [photo, status, runAnalysis, navigate]);

  useEffect(() => {
    if (status === "done") {
      const t = setTimeout(() => navigate("/dashboard"), 500);
      return () => clearTimeout(t);
    }
  }, [status, navigate]);

  if (status === "error") {
    return (
      <div className="mx-auto max-w-md px-5 py-24 text-center sm:px-8">
        <p className="eyebrow text-blush-deep">Analysis failed</p>
        <h1 className="section-heading mt-4 text-3xl">
          We couldn&rsquo;t confidently analyze this image.
        </h1>
        <p className="mt-4 text-sm text-muted">
          {error || "Please upload a clear, well-lit photo with your face and body visible."}
        </p>
        <button
          onClick={() => navigate("/upload")}
          className="mt-8 rounded-full bg-gold px-7 py-3 font-body text-sm font-medium text-ink"
        >
          Try Another Photo
        </button>
      </div>
    );
  }

  return <LoadingAnalyzer />;
}
