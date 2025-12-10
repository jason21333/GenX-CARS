"use client";

import { BugattiViewer } from "./BugattiViewer";

type ThreeSixtyModalProps = {
  open: boolean;
  onClose: () => void;
};

export function ThreeSixtyModal({ open, onClose }: ThreeSixtyModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="glass gradient-border relative w-full max-w-4xl rounded-3xl p-6 md:p-8">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full border border-slate-700 px-3 py-1 text-sm hover:border-accent hover:text-accent transition"
        >
          Close
        </button>
        <h3 className="text-xl font-semibold mb-4">Ferrari SF90 360° Interactive View</h3>
        <p className="text-slate-300 mb-4">
          Auto-rotating GLB from your provided asset. Drag to orbit (mouse/touch) after render;
          model loads from <code>/public/models/ferrari_sf90_stradale.glb</code>.
        </p>
        <BugattiViewer />
      </div>
    </div>
  );
}

