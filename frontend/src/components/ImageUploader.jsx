import { useCallback, useRef, useState } from "react";
import { FiUploadCloud, FiX, FiImage } from "react-icons/fi";

const ACCEPTED = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX_SIZE_MB = 10;

export default function ImageUploader({ photo, onSelect }) {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState(null);

  const validateAndSet = useCallback(
    (file) => {
      if (!file) return;
      if (!ACCEPTED.includes(file.type)) {
        setError("Please upload a JPG, PNG, or WEBP image.");
        return;
      }
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        setError(`Image is too large. Keep it under ${MAX_SIZE_MB}MB.`);
        return;
      }
      setError(null);
      onSelect(file);
    },
    [onSelect]
  );

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    validateAndSet(file);
  };

  return (
    <div>
      {!photo ? (
        <div
          role="button"
          tabIndex={0}
          aria-label="Upload a front-facing photo"
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`flex cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed px-6 py-16 text-center transition-colors ${
            dragOver ? "border-gold bg-gold/5" : "border-ink-line hover:border-gold/50"
          }`}
        >
          <FiUploadCloud className="text-4xl text-gold" aria-hidden="true" />
          <div>
            <p className="font-body text-lg text-ivory">Drag and drop your photo here</p>
            <p className="mt-1 text-sm text-muted">or click to browse — JPG, PNG, or WEBP, up to {MAX_SIZE_MB}MB</p>
          </div>
          <span className="mt-2 rounded-full border border-gold/60 px-5 py-2 text-sm text-gold">
            Browse Files
          </span>
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPTED.join(",")}
            className="hidden"
            onChange={(e) => validateAndSet(e.target.files?.[0])}
          />
        </div>
      ) : (
        <div className="card overflow-hidden">
          <div className="relative">
            <img src={photo.previewUrl} alt="Preview of your uploaded photo" className="max-h-[440px] w-full object-cover" />
            <button
              onClick={() => onSelect(null)}
              aria-label="Remove photo"
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-ink/80 text-ivory hover:bg-blush hover:text-ink"
            >
              <FiX />
            </button>
          </div>
          <div className="flex items-center gap-2 px-4 py-3 text-sm text-muted">
            <FiImage />
            <span className="truncate">{photo.file.name}</span>
          </div>
        </div>
      )}

      {error && (
        <p role="alert" className="mt-3 text-sm text-blush-deep">
          {error}
        </p>
      )}

      <p className="mt-4 text-xs text-muted">
        Tip: use a well-lit, front-facing photo with your face (and body, if possible) clearly visible for the most accurate estimate.
      </p>
    </div>
  );
}
