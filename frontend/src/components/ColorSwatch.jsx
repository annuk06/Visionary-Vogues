export default function ColorSwatch({ name, hex, onClick, selected = false, size = "md" }) {
  const dims = size === "sm" ? "h-10 w-10" : "h-14 w-14";
  return (
    <button
      onClick={() => onClick?.({ name, hex })}
      className={`group flex flex-col items-center gap-2 rounded-xl p-2 transition-colors ${
        selected ? "bg-ink-soft ring-1 ring-gold" : "hover:bg-ink-soft"
      }`}
      aria-label={`${name}, ${hex}`}
    >
      <span
        className={`${dims} rounded-full border border-ink-line shadow-inner`}
        style={{ backgroundColor: hex }}
      />
      <span className="text-xs text-ivory">{name}</span>
      <span className="font-mono text-[10px] text-muted">{hex}</span>
    </button>
  );
}
