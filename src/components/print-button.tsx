"use client";

export function PrintButton({ className = "" }: { className?: string }) {
  return (
    <button type="button" className={`btn ${className}`.trim()} onClick={() => window.print()}>
      Print
      <span aria-hidden className="text-accent">⎙</span>
    </button>
  );
}
